module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Key');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const host = req.headers.host || 'gnes-apex-2026.vercel.app';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const baseUrl = `${proto}://${host}`;

  return res.status(200).json({
    status: 'success',
    port: 443,
    primaryIp: host,
    allIps: [{ ip: host, iface: 'Vercel Cloud Edge' }],
    studentUrl: baseUrl,
    webWizardsUrl: `${baseUrl}/web-wizards-theme.html`,
    digitalIdentityUrl: `${baseUrl}/digital-identity-theme.html`,
    connectedClients: 1,
    mode: 'vercel-cloud'
  });
};
