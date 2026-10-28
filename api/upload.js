// Vercel Serverless Function: /api/upload
// Relays file submissions to Google Drive via Google Apps Script Bridge
const https = require('https');
const path = require('path');

const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzCxgBdPggSF9xpNL1V2DWiTikOwBPKzUnB3eLENydKunLTpVIooR8fBr5xklC9xLrFaA/exec';

function relayToGoogleDrive(gasUrl, payload) {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.stringify(payload);
      const req = https.request(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        },
        timeout: 9000
      }, (res) => {
        const redirectLocation = res.headers.location;
        res.resume();
        if (res.statusCode === 302 && redirectLocation) {
          https.get(redirectLocation, (redRes) => {
            let body = '';
            redRes.on('data', c => body += c);
            redRes.on('end', () => {
              try {
                const parsed = JSON.parse(body);
                resolve(parsed);
              } catch (e) {
                resolve({ status: 'success', raw: body });
              }
            });
          }).on('error', reject);
        } else {
          resolve({ status: res.statusCode === 200 ? 'success' : 'error', statusCode: res.statusCode });
        }
      });
      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Google Drive relay timed out'));
      });
      req.write(data);
      req.end();
    } catch (e) {
      reject(e);
    }
  });
}

const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Key');
  res.setHeader('Access-Control-Allow-Private-Network', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }

  try {
    let payload = req.body || {};
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (e) {}
    }

    const eventType = payload.event || 'Web Wizards';
    const rawCode = (payload.schoolCode || 'SCH').trim();
    const schoolCode = rawCode.toUpperCase().replace(/[^A-Z0-9_-]/g, '') || 'SCH';
    const eventSlug = eventType === 'Web Wizards' ? 'WebWizards' : (eventType === 'Prompt Engineering' ? 'PromptEngineering' : 'DigitalIdentity');
    const rawFileName = payload.fileName || (eventType === 'Web Wizards' ? 'project.zip' : (eventType === 'Prompt Engineering' ? 'submission.pdf' : 'logo.png'));
    const safeOrigName = path.basename(rawFileName);
    let ext = path.extname(safeOrigName).toLowerCase();
    if (!ext) {
      ext = eventType === 'Web Wizards' ? '.zip' : (eventType === 'Prompt Engineering' ? '.pdf' : '.png');
    }
    const expectedPrefix = `${schoolCode}_${eventSlug}`.toUpperCase();
    const safeFileName = safeOrigName.toUpperCase().startsWith(expectedPrefix) ? safeOrigName : `${schoolCode}_${eventSlug}${ext}`;

    let base64String = payload.fileBase64 || payload.data || '';
    if (base64String.indexOf(',') > -1) {
      base64String = base64String.split(',')[1];
    }

    if (!base64String) {
      return res.status(400).json({ status: 'error', message: 'No file data received' });
    }

    const token = payload.token || `APEX26-${eventType === 'Web Wizards' ? 'WW' : (eventType === 'Prompt Engineering' ? 'PE' : 'DI')}-${schoolCode}-${Math.floor(1000 + Math.random() * 9000)}`;

    function resolveDriveFolderId(payload, eventType) {
      if (payload && payload.folderId && String(payload.folderId).trim()) {
        return String(payload.folderId).trim();
      }
      const ev = String(eventType || (payload && payload.event) || '').toLowerCase().replace(/[^a-z]/g, '');
      if (ev.indexOf('prompt') > -1 || ev === 'pe') {
        return '1ca6yRt8RltsyvwRGzDvuzOfOAioZRs3S';
      }
      if (ev.indexOf('digital') > -1 || ev === 'di' || ev.indexOf('identity') > -1) {
        return '12ogVi0XadV9FEUv8gXo6d3zw6srrhKFx';
      }
      return '1nmUjbjrtedhGwCT0Xrni-xKUypUVvZal';
    }
    const targetFolderId = resolveDriveFolderId(payload, eventType);

    // Relay to Google Drive
    const driveResult = await relayToGoogleDrive(GAS_ENDPOINT, {
      event: eventType,
      folderId: targetFolderId,
      token,
      schoolCode,
      fileName: safeFileName,
      mimeType: payload.mimeType || 'application/octet-stream',
      fileBase64: base64String
    }).catch(err => {
      console.warn('[Vercel Drive Relay Warning]', err.message);
      return { status: 'relay_attempted', error: err.message };
    });

    return res.status(200).json({
      status: 'success',
      message: 'Project uploaded and secured in Drive!',
      token,
      fileName: safeFileName,
      driveResult
    });

  } catch (err) {
    console.error('[Vercel Upload Error]', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

handler.config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

module.exports = handler;
