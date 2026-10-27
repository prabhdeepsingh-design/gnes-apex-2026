// Standalone In-Memory Timer Handler for Vercel
let timerState = {
  web_wizards: {
    name: 'Web Wizards',
    status: 'ready',
    totalSeconds: 5400,
    remainingSeconds: 5400,
    endTime: null,
    announcement: '',
    lastUpdated: Date.now()
  },
  digital_identity: {
    name: 'Digital Identity',
    status: 'ready',
    totalSeconds: 3600,
    remainingSeconds: 3600,
    endTime: null,
    announcement: '',
    lastUpdated: Date.now()
  },
  prompt_engineering: {
    name: 'Prompt Engineering',
    status: 'ready',
    totalSeconds: 3600,
    remainingSeconds: 3600,
    endTime: null,
    announcement: '',
    lastUpdated: Date.now()
  }
};

const ADMIN_KEY = 'APEX_2026_HEAD_KEY_98f12c8b74';

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Key');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'success',
      state: timerState,
      serverTime: Date.now(),
      connectedClients: 1
    });
  }

  if (req.method === 'POST') {
    const payload = req.body || {};
    const adminKey = payload.adminKey || req.headers['x-admin-key'];
    if (adminKey !== ADMIN_KEY) {
      return res.status(403).json({ status: 'error', message: 'Forbidden: Invalid Admin Key' });
    }

    const { action, eventKey } = payload;
    if (action === 'resetAll') {
      timerState.web_wizards.status = 'ready';
      timerState.web_wizards.remainingSeconds = 5400;
      timerState.web_wizards.endTime = null;
      timerState.digital_identity.status = 'ready';
      timerState.digital_identity.remainingSeconds = 3600;
      timerState.digital_identity.endTime = null;
      timerState.prompt_engineering.status = 'ready';
      timerState.prompt_engineering.remainingSeconds = 3600;
      timerState.prompt_engineering.endTime = null;
    } else if (timerState[eventKey]) {
      const ev = timerState[eventKey];
      if (action === 'start') {
        ev.status = 'running';
        ev.endTime = Date.now() + (ev.remainingSeconds * 1000);
      } else if (action === 'pause') {
        ev.status = 'paused';
        if (ev.endTime) {
          ev.remainingSeconds = Math.max(0, Math.round((ev.endTime - Date.now()) / 1000));
          ev.endTime = null;
        }
      } else if (action === 'reset') {
        ev.status = 'ready';
        ev.remainingSeconds = ev.totalSeconds;
        ev.endTime = null;
      }
      ev.lastUpdated = Date.now();
    }

    return res.status(200).json({
      status: 'success',
      action,
      state: timerState,
      connectedClients: 1
    });
  }

  return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
};
