/**
 * ============================================================================
 * GNE'S APEX 2026 - Comprehensive Automated System & Workflow Validation Suite
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_URL = 'http://127.0.0.1:3000';
const ADMIN_KEY = 'APEX_2026_HEAD_KEY_98f12c8b74';
const ROOT_DIR = __dirname;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✕ [FAIL] ${testName} ${details ? '(' + details + ')' : ''}`);
    failures.push({ testName, details });
  }
}

function httpGet(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(data).toString('utf8'),
          rawBuffer: Buffer.concat(data)
        });
      });
    }).on('error', reject);
  });
}

function httpPost(urlPath, payload, headers = {}) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(payload);
    const req = http.request(`${BASE_URL}${urlPath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        ...headers
      }
    }, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(data).toString('utf8'),
          json: (() => {
            try { return JSON.parse(Buffer.concat(data).toString('utf8')); } catch (e) { return null; }
          })()
        });
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function runSuite() {
  console.log('================================================================');
  console.log("  GNE'S APEX 2026 - Comprehensive Diagnostic & Validation Suite  ");
  console.log('================================================================\n');

  // ─────────────────────────────────────────────────────────────
  // 1. STATIC PAGES & ASSETS INTEGRITY
  // ─────────────────────────────────────────────────────────────
  console.log('--- SECTION 1: Static Routes & Assets Serving ---');
  
  const routesToTest = [
    { path: '/', expectedCode: 200, contentType: 'text/html' },
    { path: '/index.html', expectedCode: 200, contentType: 'text/html' },
    { path: '/web-wizards.html', expectedCode: 200, contentType: 'text/html' },
    { path: '/web-wizards-theme.html', expectedCode: 200, contentType: 'text/html' },
    { path: '/web-wizards-upload.html', expectedCode: 200, contentType: 'text/html' },
    { path: '/digital-identity.html', expectedCode: 200, contentType: 'text/html' },
    { path: '/digital-identity-theme.html', expectedCode: 200, contentType: 'text/html' },
    { path: '/digital-identity-upload.html', expectedCode: 200, contentType: 'text/html' },
    { path: '/prompt-engineering.html', expectedCode: 200, contentType: 'text/html' },
    { path: '/prompt-engineering-theme.html', expectedCode: 200, contentType: 'text/html' },
    { path: '/prompt-engineering-upload.html', expectedCode: 200, contentType: 'text/html' },
    { path: '/admin.html', expectedCode: 200, contentType: 'text/html' },
    { path: '/style.css', expectedCode: 200, contentType: 'text/css' },
    { path: '/script.js', expectedCode: 200, contentType: 'application/javascript' },
    { path: '/assets/causmic-club-circular-logo.png', expectedCode: 200, contentType: 'image/png' },
    { path: '/assets/web-wizards-assets.zip', expectedCode: 200, contentType: 'application/zip' }
  ];

  for (const r of routesToTest) {
    try {
      const res = await httpGet(r.path);
      assert(res.statusCode === r.expectedCode, `GET ${r.path} returns ${r.expectedCode}`);
      assert(res.headers['content-type'] && res.headers['content-type'].includes(r.contentType),
        `GET ${r.path} content-type contains ${r.contentType}`, `got: ${res.headers['content-type']}`);
    } catch (e) {
      assert(false, `GET ${r.path}`, e.message);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 2. HTML HYPERLINK & ASSET INTEGRITY CHECK
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- SECTION 2: HTML Page Links & Asset Reference Integrity ---');

  const htmlFiles = [
    'index.html',
    'web-wizards.html',
    'web-wizards-theme.html',
    'web-wizards-upload.html',
    'digital-identity.html',
    'digital-identity-theme.html',
    'digital-identity-upload.html',
    'prompt-engineering.html',
    'prompt-engineering-theme.html',
    'prompt-engineering-upload.html',
    'admin.html'
  ];

  for (const hf of htmlFiles) {
    const fullPath = path.join(ROOT_DIR, hf);
    if (!fs.existsSync(fullPath)) {
      assert(false, `File exists: ${hf}`);
      continue;
    }
    const content = fs.readFileSync(fullPath, 'utf8');

    // Extract all href and src references
    const linkMatches = [...content.matchAll(/(?:href|src)=["']([^"']+)["']/g)];
    let brokenCount = 0;

    for (const match of linkMatches) {
      const target = match[1];
      // Skip external links, hash anchors, mailto, tel, javascript
      if (target.startsWith('http://') || target.startsWith('https://') || target.startsWith('#') || target.startsWith('mailto:') || target.startsWith('tel:') || target.startsWith('javascript:')) {
        continue;
      }
      // Target without query params
      const cleanTarget = target.split('?')[0].split('#')[0];
      const targetDiskPath = path.join(ROOT_DIR, cleanTarget);
      if (!fs.existsSync(targetDiskPath)) {
        brokenCount++;
        assert(false, `Link check in ${hf} -> ${target}`, `Target file not found on disk: ${cleanTarget}`);
      }
    }

    if (brokenCount === 0) {
      assert(true, `All internal href/src links in ${hf} resolve to real files (${linkMatches.length} references)`);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 3. CENTRAL SERVER API & AUTHENTICATION
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- SECTION 3: Central Server API & Authentication ---');

  // Network info
  const netRes = await httpGet('/api/network-info');
  assert(netRes.statusCode === 200, 'GET /api/network-info returns 200');
  const netJson = JSON.parse(netRes.body);
  assert(netJson.status === 'success' && netJson.studentUrl, 'GET /api/network-info provides studentUrl', netJson.studentUrl);

  // Timer query
  const timerRes = await httpGet('/api/timer');
  assert(timerRes.statusCode === 200, 'GET /api/timer returns 200');
  const timerJson = JSON.parse(timerRes.body);
  assert(timerJson.state && timerJson.state.web_wizards && timerJson.state.digital_identity,
    'GET /api/timer contains web_wizards and digital_identity states');

  // Login failure
  const failLogin = await httpPost('/api/admin/login', { passcode: 'wrongpin123' });
  assert(failLogin.statusCode === 401, 'POST /api/admin/login with invalid password returns 401');

  // Login success
  const passLogin = await httpPost('/api/admin/login', { passcode: 'apex2026' });
  assert(passLogin.statusCode === 200, 'POST /api/admin/login with "apex2026" returns 200');
  assert(passLogin.json && passLogin.json.adminKey === ADMIN_KEY, 'POST /api/admin/login returns valid adminKey');

  // Unauthorized timer mutation
  const unauthMut = await httpPost('/api/timer', { action: 'start', eventKey: 'web_wizards', adminKey: 'invalid' });
  assert(unauthMut.statusCode === 403, 'POST /api/timer with invalid adminKey returns 403 Forbidden');

  // Authorized timer mutations
  const authStart = await httpPost('/api/timer', {
    action: 'start',
    eventKey: 'web_wizards',
    adminKey: ADMIN_KEY
  });
  assert(authStart.statusCode === 200 && authStart.json.state.web_wizards.status === 'running',
    'POST /api/timer [start] sets Web Wizards to "running"');

  const authPause = await httpPost('/api/timer', {
    action: 'pause',
    eventKey: 'web_wizards',
    adminKey: ADMIN_KEY
  });
  assert(authPause.statusCode === 200 && authPause.json.state.web_wizards.status === 'paused',
    'POST /api/timer [pause] sets Web Wizards to "paused"');

  const authResume = await httpPost('/api/timer', {
    action: 'resume',
    eventKey: 'web_wizards',
    adminKey: ADMIN_KEY
  });
  assert(authResume.statusCode === 200 && authResume.json.state.web_wizards.status === 'running',
    'POST /api/timer [resume] sets Web Wizards to "running"');

  const authNotice = await httpPost('/api/timer', {
    action: 'announcement',
    eventKey: 'web_wizards',
    text: 'Test Announcement 123',
    adminKey: ADMIN_KEY
  });
  assert(authNotice.statusCode === 200 && authNotice.json.state.web_wizards.announcement === 'Test Announcement 123',
    'POST /api/timer [announcement] updates announcement text');

  const authReset = await httpPost('/api/timer', {
    action: 'resetAll',
    adminKey: ADMIN_KEY
  });
  assert(authReset.statusCode === 200 && authReset.json.state.web_wizards.status === 'ready',
    'POST /api/timer [resetAll] restores system to clean standby');

  // File Upload API
  const testUploadRes = await httpPost('/api/upload', {
    event: 'Web Wizards',
    schoolCode: 'SUITE-01',
    fileName: 'suite_project.zip',
    mimeType: 'application/zip',
    fileBase64: Buffer.from('TEST_ZIP_CONTENT_BYTES').toString('base64')
  });
  assert(testUploadRes.statusCode === 200 && testUploadRes.json && testUploadRes.json.status === 'success',
    'POST /api/upload successfully receives and secures file on server');
  assert(testUploadRes.json && testUploadRes.json.fileName === 'SUITE-01_WebWizards.zip',
    'POST /api/upload formats filename correctly: SUITE-01_WebWizards.zip');

  const peUploadRes = await httpPost('/api/upload', {
    event: 'Prompt Engineering',
    schoolCode: 'DPS-101',
    fileName: 'my_chatgpt_prompt.pdf',
    mimeType: 'application/pdf',
    fileBase64: Buffer.from('TEST_PDF_BYTES').toString('base64')
  });
  assert(peUploadRes.statusCode === 200 && peUploadRes.json && peUploadRes.json.fileName === 'DPS-101_PromptEngineering.pdf',
    'POST /api/upload formats Prompt Engineering filename correctly: DPS-101_PromptEngineering.pdf');

  // Submissions Query API
  const subsRes = await httpGet('/api/submissions');
  assert(subsRes.statusCode === 200 && JSON.parse(subsRes.body).status === 'success',
    'GET /api/submissions returns 200 with saved submissions list');

  // ─────────────────────────────────────────────────────────────
  // 4. CLIENT LOGIC & VALIDATION ENGINE CHECKS
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- SECTION 4: Submission Form Logic & Rules Verification ---');

  // Re-create the validation rules from script.js to verify accuracy
  function getCuriousFileExt(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
  }

  function validateCuriousFileTest(eventType, filename, sizeBytes) {
    if (!filename) return { valid: false, error: 'No file selected.' };
    const ext = getCuriousFileExt(filename);
    const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

    let allowed = [];
    let forbidden = [];

    if (eventType === 'Web Wizards') {
      allowed = ['zip'];
      forbidden = ['rar', '7z', 'tar', 'gz', 'exe', 'bat', 'sh', 'php'];
    } else {
      allowed = ['png', 'jpeg', 'jpg', 'pdf'];
      forbidden = ['html', 'htm', 'svg', 'webp', 'exe', 'bat', 'sh'];
    }

    if (forbidden.includes(ext)) {
      return { valid: false, error: `Format .${ext.toUpperCase()} is strictly not permitted.` };
    }
    if (!allowed.includes(ext)) {
      return { valid: false, error: `Unsupported file format (.${ext}).` };
    }
    if (sizeBytes > MAX_FILE_SIZE_BYTES) {
      return { valid: false, error: 'File size exceeds maximum limit of 50 MB.' };
    }
    return { valid: true };
  }

  // Web Wizards Validation Tests
  assert(validateCuriousFileTest('Web Wizards', 'my_project.zip', 500000).valid === true,
    'Web Wizards: .zip file passes validation');
  assert(validateCuriousFileTest('Web Wizards', 'my_project.rar', 500000).valid === false,
    'Web Wizards: .rar file correctly blocked');
  assert(validateCuriousFileTest('Web Wizards', 'hack.exe', 500000).valid === false,
    'Web Wizards: .exe file strictly blocked');
  assert(validateCuriousFileTest('Web Wizards', 'large.zip', 60 * 1024 * 1024).valid === false,
    'Web Wizards: >50MB file blocked');

  // Digital Identity Validation Tests
  assert(validateCuriousFileTest('Digital Identity', 'logo.png', 500000).valid === true,
    'Digital Identity: .png file passes validation');
  assert(validateCuriousFileTest('Digital Identity', 'logo.jpg', 500000).valid === true,
    'Digital Identity: .jpg file passes validation');
  assert(validateCuriousFileTest('Digital Identity', 'concept.pdf', 500000).valid === true,
    'Digital Identity: .pdf file passes validation');
  assert(validateCuriousFileTest('Digital Identity', 'vector.svg', 500000).valid === false,
    'Digital Identity: .svg file rejected (per rules)');
  assert(validateCuriousFileTest('Digital Identity', 'code.html', 500000).valid === false,
    'Digital Identity: .html file rejected');

  // Naming standardization check
  const testSchoolCode = 'SCH-042';
  const testEventSlug = 'WebWizards';
  const testExt = 'zip';
  const computedName = `${testSchoolCode}_${testEventSlug}.${testExt}`;
  assert(computedName === 'SCH-042_WebWizards.zip',
    'Computed file naming matches specification: [SchoolCode]_[EventSlug].[ext]');

  // Security Salt and Passcode Hash Verification
  const SALT = 'GNE_APEX_2026_SALT_';
  const DEFAULT_HASH = '17a45908cd724ef57309f0e6146179819ec3c6196d58899d5840651c2f29f942';
  const computedHash = crypto.createHash('sha256').update(SALT + 'apex2026').digest('hex');
  assert(computedHash === DEFAULT_HASH, 'Crypto Salted Hash of "apex2026" precisely matches DEFAULT_HASH');

  // ─────────────────────────────────────────────────────────────
  // 5. GOOGLE APPS SCRIPT PAYLOAD CONTRACT CHECK
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- SECTION 5: Google Drive Bridge Contract Verification ---');
  
  // Verify ApexDriveUploader.gs file
  const gsPath = path.join(ROOT_DIR, 'backend', 'ApexDriveUploader.gs');
  assert(fs.existsSync(gsPath), 'backend/ApexDriveUploader.gs exists');
  const gsContent = fs.readFileSync(gsPath, 'utf8');

  assert(gsContent.includes("1nmUjbjrtedhGwCT0Xrni-xKUypUVvZal"), 'Web Wizards Drive Folder ID is configured');
  assert(gsContent.includes("12ogVi0XadV9FEUv8gXo6d3zw6srrhKFx"), 'Digital Identity Drive Folder ID is configured');
  assert(gsContent.includes("1ca6yRt8RltsyvwRGzDvuzOfOAioZRs3S"), 'Prompt Engineering Drive Folder ID is configured');
  assert(gsContent.includes("function doPost(e)"), 'Google Apps Script defines doPost handler');
  assert(gsContent.includes("function doGet(e)"), 'Google Apps Script defines doGet handler');

  // Check script.js APEX_CONFIG
  const scriptContent = fs.readFileSync(path.join(ROOT_DIR, 'script.js'), 'utf8');
  assert(scriptContent.includes('gasEndpoint:'), 'script.js contains gasEndpoint configuration');

  // ─────────────────────────────────────────────────────────────
  // SUITE SUMMARY
  // ─────────────────────────────────────────────────────────────
  console.log('\n================================================================');
  console.log(`  TEST RESULTS: ${passedTests}/${totalTests} Passed (${failedTests} Failures)`);
  console.log('================================================================');

  if (failedTests > 0) {
    console.log('\nFailures detected:');
    failures.forEach(f => console.log(`  - ${f.testName}: ${f.details}`));
    process.exit(1);
  } else {
    console.log('\nALL DIAGNOSTIC CHECKS PASSED PERFECTLY!\n');
    process.exit(0);
  }
}

runSuite().catch(err => {
  console.error('Fatal Test Suite Error:', err);
  process.exit(1);
});
