# GNE'S APEX 2026 — Official Competition Portal & Event Engine

> **Guru Nanak Dev Engineering College, Ludhiana**  
> Organized by the **Causmic Club**  
> High-concurrency competition platform, real-time timer sync, and direct Google Drive submission bridge.

---

## ⚡ Overview

**GNE'S APEX 2026** is the official inter-school technical competition portal engineered for high-density lab environments and seamless cloud deployment. It supports hundreds of simultaneous student participants with sub-millisecond local responses, zero runtime dependencies, and instant cloud edge serving.

### Active Competition Tracks
1. **Web Wizards (Group Event • 2 Participants)**
   - 90-Minute on-the-spot website development challenge.
   - Deliverables: `.ZIP` project archive (up to 50 MB).
   - Strict blind-judging filename validation: `[SchoolCode]_[FileName]`.
2. **Digital Identity (Individual Event • 1 Participant)**
   - 60-Minute vector/raster brand logo design challenge.
   - Deliverables: `.PNG`, `.JPG`, `.PDF` at 800×800 px resolution.
3. **Event Heads Admin Hub (`admin.html`)**
   - Central control center for competition supervisors.
   - Synchronized master timers, live workstation counter, and audit trail.

---

## 🚀 Deployment on Vercel

This repository is pre-configured for **zero-config deployment on Vercel**.

### Steps to Deploy:
1. Open [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** &rarr; **"Project"**.
3. Import the repository: `prabhdeepsingh-design/gnes-apex-2026`.
4. Leave settings as default:
   - **Framework Preset**: *Other*
   - **Root Directory**: `./`
   - **Build Command**: Automatically detected from `package.json` (`npm run build`)
   - **Output Directory**: Automatically serves static root files
5. Click **Deploy**.
6. Your portal is live with global edge CDN caching and SSL (`https://gnes-apex-2026.vercel.app`)!

---

## 💻 Running Locally (LAN / Wi-Fi)

The portal can also run locally as a high-concurrency Node.js server with Server-Sent Events (SSE) for air-gapped lab testing:

```bash
# Clone the repository
git clone https://github.com/prabhdeepsingh-design/gnes-apex-2026.git
cd gnes-apex-2026

# Start the native server (Zero npm dependencies required)
npm start
# or
node server.js
```

The console will display local network access URLs:
- **Student Portal**: `http://localhost:3000` or `http://192.168.x.x:3000`
- **Web Wizards**: `http://localhost:3000/web-wizards-theme.html`
- **Digital Identity**: `http://localhost:3000/digital-identity-theme.html`
- **Event Heads Hub**: `http://localhost:3000/admin.html`

To run concurrency and validation tests:
```bash
npm test
```

---

## 📁 Project Structure

```
├── index.html                     # Portal Homepage & Track Navigation
├── admin.html                     # Event Heads Admin Control Center
├── web-wizards.html               # Track 1 Overview & Rules
├── web-wizards-theme.html         # Track 1 Spot Theme & Resource Download
├── web-wizards-upload.html        # Track 1 Submission Workspace & Validator
├── digital-identity.html          # Track 2 Overview & Rules
├── digital-identity-theme.html    # Track 2 Spot Theme & Guidelines
├── digital-identity-upload.html   # Track 2 Submission Workspace & Validator
├── style.css                      # Unified Design System & Responsive Layouts
├── script.js                      # Client logic, timer sync & GAS Drive bridge
├── server.js                      # High-concurrency native Node.js SSE server
├── timer_state.json               # Default countdown timer persistence
├── vercel.json                    # Vercel security headers & clean URL routing
├── package.json                   # Project metadata & npm scripts
├── api/                           # Vercel Serverless Functions
│   ├── network-info.js            # Network IP & cloud status resolver
│   ├── timer.js                   # Cloud timer status & admin mutations
│   └── admin/login.js             # Administrative passcode verification
├── assets/                        # Brand logos, posters, extracted brochure images
├── backend/
│   └── ApexDriveUploader.gs       # Google Apps Script Drive bridge
├── pdf_preview/                   # School brochure page previews
└── GNE-APEX26-SCHOOL-BROCHURE.pdf # Official 20-page Competition Brochure
```

---

## 🔒 Security & Admin Passcode

- **Event Heads Master Passcode**: `apex2026`
- **Blind Judging Protocol**: All uploaded files automatically enforce `[SchoolCode]_[FileName]` to prevent bias.
- **Drive Upload Bridge**: Files submitted by students are seamlessly routed to designated Google Drive folders via Google Apps Script with zero CORS complications.

---

## 🏫 Credits

- **Host Institution**: Guru Nanak Dev Engineering College, Ludhiana (Established 1953)
- **Organized By**: Causmic Club, GNDEC
