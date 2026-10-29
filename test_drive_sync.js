/**
 * GNE'S APEX 2026 - Google Apps Script Drive Bridge Live Diagnostics
 * Run anytime: node test_drive_sync.js
 */
const https = require('https');

const GAS_URL = 'https://script.google.com/macros/s/AKfycbyuES78qX_vMNAOzxhghe3-UFcVwNHVGPq7n3LAyy5T_haGhkqkIsuZ1dGL_qPPe_qihA/exec';

function fetchUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    https.get(targetUrl, (res) => {
      if (res.statusCode === 302 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function checkDeployment() {
  console.log('\n================================================================');
  console.log('  GNE APEX 2026 - Google Apps Script Deployment Validator       ');
  console.log('================================================================');
  console.log('Target Web App Endpoint:', GAS_URL);
  console.log('Testing live deployment version...\n');

  try {
    const versionRes = await fetchUrl(GAS_URL + '?action=version');
    let parsed = null;
    try {
      parsed = JSON.parse(versionRes.body);
    } catch (e) {}

    if (parsed && parsed.bridgeVersion === 'v3.0.0-prompt-engineering') {
      console.log('✅ [SUCCESS] Google Apps Script is running the NEW version (v3.0.0-prompt-engineering)!');
      console.log('Configured Target Folders:');
      console.log('  - Web Wizards:       ', parsed.configuredFolders['Web Wizards']);
      console.log('  - Digital Identity:  ', parsed.configuredFolders['Digital Identity']);
      console.log('  - Prompt Engineering:', parsed.configuredFolders['Prompt Engineering']);
      console.log('\nAll Prompt Engineering submissions will now save directly into:');
      console.log('https://drive.google.com/drive/folders/' + parsed.configuredFolders['Prompt Engineering']);
    } else {
      console.log('⚠️ [WARNING] Google Apps Script is STILL running the OLD version!');
      console.log('Current response:', versionRes.body.trim());
      console.log('\nWHY THIS HAPPENED:');
      console.log('In Google Apps Script, clicking "Manage deployments" -> "Done" does NOT deploy changes.');
      console.log('It simply closes the window without updating the version.');
      console.log('\nHOW TO APPLY THE UPDATE IN 1 MINUTE:');
      console.log('1. Go to your Google Apps Script editor at https://script.google.com');
      console.log('2. Make sure you pasted the latest backend/ApexDriveUploader.gs code and saved (Ctrl+S).');
      console.log('3. At the top right, click "Deploy" > "Manage deployments".');
      console.log('4. Click the Pencil (Edit) icon at the top right of the deployment.');
      console.log('5. In the "Version" dropdown, select "New version".');
      console.log('6. Click the blue "Deploy" button.');
      console.log('7. Re-run "node test_drive_sync.js" to confirm!');
    }
  } catch (err) {
    console.error('Network Error while checking Google Apps Script:', err.message);
  }
}

checkDeployment();

