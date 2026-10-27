const crypto = require('crypto');
const ADMIN_KEY = 'APEX_2026_HEAD_KEY_98f12c8b74';
const DEFAULT_HASH = '17a45908cd724ef57309f0e6146179819ec3c6196d58899d5840651c2f29f942';

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Key');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }

  const payload = req.body || {};
  const passcode = (payload.passcode || '').trim();
  const hash = crypto.createHash('sha256').update('GNE_APEX_2026_SALT_' + passcode).digest('hex');

  if (passcode.toLowerCase() === 'apex2026' || hash === DEFAULT_HASH || passcode === ADMIN_KEY) {
    return res.status(200).json({
      status: 'success',
      adminKey: ADMIN_KEY,
      message: 'Authenticated successfully'
    });
  }

  return res.status(401).json({
    status: 'error',
    message: 'Invalid administrative passcode'
  });
};
