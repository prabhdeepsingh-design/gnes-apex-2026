# GNE'S APEX 2026 — Master Documentation Index & Operations Portal

> **Guru Nanak Dev Engineering College, Ludhiana**  
> **Organized by Causmic Club (Department of Computer Science & Engineering)**  
> **Master Technical Documentation, Architecture Index, and Operations Manual**  

---

## 1. Documentation Map & Navigation

Welcome to the comprehensive technical documentation repository for **GNE'S APEX 2026**. Navigate to any specialized document using the links below:

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                          APEX 2026 DOCUMENTATION SUITE                        │
├────────────────────┬──────────────────────────────────────────────────────────┤
│ Document           │ Core Scope & Contents                                    │
├────────────────────┼──────────────────────────────────────────────────────────┤
│ 📐 architecture.md │ Multi-tier topology, native Node.js core engine, SSE     │
│                    │ pipeline, dual submission storage, GAS bridge & security │
├────────────────────┼──────────────────────────────────────────────────────────┤
│ 🎨 design.md       │ Design philosophy, tokens, color system, typography,     │
│                    │ glassmorphic components, audio feedback & responsive UX  │
├────────────────────┼──────────────────────────────────────────────────────────┤
│ 🏫 contxt.md       │ Institutional history of GNDEC Ludhiana, Causmic Club,   │
│                    │ competition tracks, lab realities & blind-judging rules  │
├────────────────────┼──────────────────────────────────────────────────────────┤
│ 📋 index.md        │ This master index, complete file directory, runbooks,    │
│                    │ API endpoints, configuration constants & operational CLI │
├────────────────────┼──────────────────────────────────────────────────────────┤
│ 🚀 progress.md     │ Project evolution, completed milestones, test suite      │
│                    │ benchmarks (77/77 passed), active logs & future roadmap  │
└────────────────────┴──────────────────────────────────────────────────────────┘
```

---

## 2. Quick Operations Runbook

### 2.1. Starting the Local Event Server (Lab / Wi-Fi)
The portal is engineered to run **with zero npm dependencies** directly on standard Node.js:
```bash
# Option A: Standard npm start
npm start

# Option B: Direct native Node execution
node server.js
```
The server will automatically detect the machine's local IPv4 subnets and print access URLs:
```text
================================================================
  GNE'S APEX 2026 - Central Real-Time Event Server (SSE Ready)
================================================================
  Local Access:     http://localhost:3000
  Lab / Wi-Fi IP:   http://192.168.18.10:3000
    ↳ Interface:    http://192.168.18.10:3000 (Wi-Fi)
----------------------------------------------------------------
  Student Portal:   http://192.168.18.10:3000
  Web Wizards:      http://192.168.18.10:3000/web-wizards-theme.html
  Digital Identity: http://192.168.18.10:3000/digital-identity-theme.html
  Prompt Engg:      http://192.168.18.10:3000/prompt-engineering-theme.html
  Event Heads Hub:  http://192.168.18.10:3000/admin.html
----------------------------------------------------------------
  Live Real-Time SSE: Ready for 200+ simultaneous workstations
================================================================
```

### 2.2. Running Automated Concurrency & Integrity Tests
Validate the entire portal, API routes, authentication logic, file naming standards, and assets:
```bash
npm test
# or
node test_full_suite.js
```

### 2.3. Deploying to Vercel (Edge Cloud)
Pre-configured for zero-config global deployment via [vercel.json](file:///c:/Users/karan/Desktop/GNE%27S%20APEX/vercel.json):
1. Import repository `prabhdeepsingh-design/gnes-apex-2026` into [Vercel](https://vercel.com).
2. Framework Preset: **Other**. Root Directory: `./`.
3. Click **Deploy**. Vercel Edge Serverless functions in `/api` take over routing and edge caching.

---

## 3. Complete File & Directory Map

```text
c:\Users\karan\Desktop\GNE'S APEX\
├── index.html                     # Portal Homepage, Track Directory & 4-Step Guide
├── admin.html                     # Event Heads Control Center & Multi-Track Timers
├── style.css                      # Unified Design System, Tokens, Glassmorphism & Animations
├── script.js                      # Client Logic, SSE Listener, Dropzone Engine & Auth
├── server.js                      # High-Concurrency Native Node.js Server & SSE Broadcaster
├── timer_state.json               # Persistent Multi-Event Countdown & Announcement Store
├── vercel.json                    # Vercel Serverless Routing & Security Header Rules
├── package.json                   # Project Metadata & CLI Test Scripts
├── README.md                      # High-Level Project Summary & Quick Start
├── architecture.md                # System Architecture, Multi-Tier Runtime & Data Flows
├── design.md                      # Design System, Tokens, UI Components & Responsive UX
├── contxt.md                      # Institutional Background, Tracks & Operational Context
├── context.md                     # Canonical Alias Pointer to contxt.md
├── index.md                       # Master Documentation Index & Operations Runbook
├── progress.md                    # Project Milestones, Validation Results & Future Roadmap
├── test_full_suite.js             # Automated 77-Check Diagnostic & Verification Suite
├── test_concurrency.js            # High-Concurrency Load Simulation Test Script
│
├── api/                           # Vercel Serverless Function Endpoints
│   ├── network-info.js            # Edge Hostname, Cloud Status & Network Resolver
│   ├── timer.js                   # Cloud Timer Mutation & Polling Endpoint
│   └── admin/
│       └── login.js               # Administrative Passcode Verification & Key Issuer
│
├── backend/
│   └── ApexDriveUploader.gs       # Google Apps Script Web App for Direct Drive & Sheet Ingestion
│
├── assets/                        # Official Visual Assets, Logos & Download Packages
│   ├── causmic-club-circular-logo.png  # Official Causmic Club Circular Brand Crest
│   ├── causmic-logo.png                # Transparent Brand Emblem
│   ├── gndec-logo.png                  # GNDEC Institutional Crest
│   ├── college-building.png            # GNDEC Heritage Campus Building Photography
│   ├── web-wizards-assets.zip          # Official 1.3 MB Asset Pack for Track 1 Participants
│   └── extracted/                      # Extracted Visual Assets from Fest Brochure
│
├── submissions/                   # Local Submissions Vault (Zero-Data-Loss Fail-Safe)
│   ├── Web Wizards/               # Partitioned Ingestion Directory for Track 1
│   ├── Digital Identity/          # Partitioned Ingestion Directory for Track 2
│   ├── submissions_log.json       # Structured Audit Records of All Received Projects
│   └── submissions_log.csv        # Spreadsheet-Compatible Audit Log (Excel / Calc Ready)
│
├── pdf_preview/                   # High-Resolution Extracted Brochure Page Renders (Pages 1-20)
└── GNE-APEX26-SCHOOL-BROCHURE.pdf # Official 20-Page Fest Information & Rules Brochure
```

---

## 4. Competition Tracks Quick Reference

| Track Name | Event Type | Team Size | Limit | Allowed Formats | Dimensions | Target Drive Folder ID |
|---|---|---|---|---|---|---|
| **Web Wizards** | Web Development | 2 Students | 90 Min | `.ZIP` | N/A | `1nmUjbjrtedhGwCT0Xrni-xKUypUVvZal` |
| **Digital Identity** | Logo Design | 1 Student | 60 Min | `.PNG`, `.JPG`, `.PDF` | 800×800 px | `12ogVi0XadV9FEUv8gXo6d3zw6srrhKFx` |
| **Prompt Engineering** | ChatGPT AI Reasoning | 1 Student | 60 Min | `.PDF`, `.DOCX`, `.TXT`, `.ZIP` | N/A | `1ca6yRt8RltsyvwRGzDvuzOfOAioZRs3S` |

---

## 5. System Configuration & Security Constants

| Constant Name | Value | Purpose / Location |
|---|---|---|
| **Master Admin Passcode** | `apex2026` | Event Heads Console Login (`admin.html`) |
| **Salt String** | `GNE_APEX_2026_SALT_` | Cryptographic SHA-256 Pre-Hash Salt (`server.js`, `script.js`) |
| **Master Admin Key** | `APEX_2026_HEAD_KEY_98f12c8b74` | Timer Mutation Protection Key |
| **Default Port** | `3000` | Local HTTP Port (`HOST = '0.0.0.0'`) |
| **Max File Upload Size** | `50 MB` | Client-Side Pre-Flight Check |
| **Max Server Buffer Limit** | `150 MB` | Native Server Body Parser Limit (`server.js`) |
| **SSE Heartbeat Interval** | `15 Seconds` | NAT Keep-Alive Interval |
| **Idle Logout Timeout** | `15 Minutes` | Event Heads Session Security Expiry |

---

## 6. API Route Specification

- `GET /api/timer/stream` — Real-time Server-Sent Events (SSE) stream.
- `GET /api/timer` — JSON snapshot of active countdowns.
- `POST /api/timer` — Authenticated state mutation (`action`: `start`, `pause`, `resume`, `reset`, `setDuration`, `addExtra`, `end`, `announcement`, `clearAnnouncement`, `resetAll`).
- `GET /api/network-info` — Resolves local network interfaces and workstation access URLs.
- `POST /api/admin/login` — Authenticates event head passcode against salted SHA-256 hash.
- `POST /api/upload` — Ingests base64 project files into local disk vault and triggers Google Drive bridge.
- `GET /api/submissions` — Queries JSON array of recorded submissions for jury scoring.

---

## 7. Operational Contact Directory

- **Host Institution**: Guru Nanak Dev Engineering College, Ludhiana — [gndec.ac.in](https://gndec.ac.in)
- **Organizing Body**: Causmic Club, Department of Computer Science & Engineering
- **Prompt Engineering Lead**: Saksham (+91 98884 78606)
- **Technical Steering Team**: Ishmeet Singh, Harleen Kaur, Prabhdeep Singh
