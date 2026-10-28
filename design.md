# GNE'S APEX 2026 — Design System & UI/UX Specification

> **Guru Nanak Dev Engineering College, Ludhiana**  
> **Organized by the Causmic Club**  
> **Design Philosophy**: High-Impact Cyber-Industrial Dark Theme • Glassmorphic Elevation • Zero-Friction Lab Usability  

---

## 1. Visual Identity & Design Philosophy

The visual design system of **GNE'S APEX 2026** is crafted to project an aura of high-tech innovation, intellectual rigor, and institutional prestige. The user experience is tailored specifically for high-intensity, time-constrained school competition environments, balancing visual aesthetics with functional clarity.

### Guiding Principles
1. **Atmospheric Immersion**: Deep space obsidian backgrounds (`#060911`) punctuated by ambient chromatic glow orbs (indigo, amber gold, and cyan) evoke a futuristic command center.
2. **Cognitive Clarity Under Pressure**: Monospaced timers (`JetBrains Mono`), bright status pills (`● READY`, `● RUNNING`, `● PAUSED`, `● ENDED`), and color-coded competition tracks minimize participant anxiety and streamline supervisor tasks.
3. **Glassmorphic Depth**: Semi-transparent card backdrops (`rgba(15, 23, 42, 0.72)`) with subtle white borders (`rgba(255, 255, 255, 0.08)`) and backdrop blur filters (`blur(16px)`) maintain clean hierarchical separation without visual clutter.
4. **Zero-Friction Micro-Interactions**: Smooth 250ms cubic-bezier transitions, drag-over reactive borders, live client counters, and audio feedback ensure every interaction feels alive.

---

## 2. Design Tokens & CSS Custom Properties

All UI components are bound to unified design tokens declared in [style.css](file:///c:/Users/karan/Desktop/GNE%27S%20APEX/style.css):

### 2.1. Color Palette

| Token | Hex / HSL Value | Semantic Role |
|---|---|---|
| `--bg-primary` | `#060911` | Root canvas / deep obsidian background |
| `--bg-secondary` | `#0b1120` | Secondary surface / container backing |
| `--bg-card` | `rgba(15, 23, 42, 0.72)` | Primary glassmorphic cards and modals |
| `--bg-card-hover` | `rgba(22, 33, 58, 0.85)` | Elevated hover state for interactive cards |
| `--bg-card-elevated`| `rgba(30, 41, 69, 0.65)` | Inner nested cards, code blocks, and dropzones |
| `--text-primary` | `#f8fafc` | Primary high-contrast text |
| `--text-secondary` | `#94a3b8` | Supporting text, descriptions, and labels |
| `--text-muted` | `#64748b` | Timestamps, helper footnotes, and hints |
| `--accent-gold` | `#f59e0b` | Fest signature amber / warning accent |
| `--accent-gold-light`| `#fbbf24` | Digital Identity track primary accent |
| `--accent-blue` | `#3b82f6` | Informational links and network pills |
| `--accent-cyan` | `#06b6d4` | Secondary luminous glow and subtle borders |
| `--accent-indigo` | `#6366f1` | Web Wizards track primary accent & glow |
| `--accent-emerald` | `#10b981` | Prompt Engineering track accent & success states |
| `--accent-rose` | `#f43f5e` | Critical warnings, destructive actions, and expired timers |

### 2.2. Ambient Lighting & Glow Gradients
```css
--glow-gold: radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%);
--glow-cyan: radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, transparent 70%);
--glow-indigo: radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, transparent 70%);
--shadow-glow: 0 0 35px rgba(99, 102, 241, 0.25);
--shadow-gold-glow: 0 0 30px rgba(245, 158, 11, 0.3);
```

### 2.3. Typography System
The typography hierarchy combines modern sans-serif readability, precision tabular numbers, and editorial festival headlines:
- **Primary Body & UI (`--font-sans`)**: `Plus Jakarta Sans`, system-ui, -apple-system, sans-serif. Used for body text, form controls, buttons, and navigation. Weights: `400`, `500`, `600`, `700`, `800`.
- **Code & Live Clocks (`--font-mono`)**: `JetBrains Mono`, monospace. Used for countdown timers, school codes, tokens, and file extensions. Features tabular numerals (`font-variant-numeric: tabular-nums`) to prevent jitter during countdown updates.
- **Festival Poster Lockup**: `Playfair Display`, serif. Used in the 3-word hero lockup (`GNE'S` / `APEX` / `2026`) matching the official college poster.

### 2.4. Elevation, Radii, and Transitions
- **Border Radii**:
  - `--radius-xs`: `6px` (tags, badge pills)
  - `--radius-sm`: `10px` (inputs, preset buttons, alerts)
  - `--radius-md`: `16px` (cards, panels, dropzones)
  - `--radius-lg`: `24px` (hero containers, modals)
  - `--radius-full`: `9999px` (circular pills, avatars)
- **Transitions**: `--transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 3. Atmospheric Background System

The portal features an ambient background system composed of two persistent layers rendered with zero pointer interference (`pointer-events: none`):

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Floating Gradient Orbs (.bg-ambient)                    │
│    - Orb 1 (Indigo): Top-left (600px blur(140px))           │
│    - Orb 2 (Amber Gold): Mid-right (550px blur(140px))      │
│    - Orb 3 (Cyan): Bottom-left (500px blur(140px))          │
│    - Keyframe animation: floatOrb (18s - 25s loops)         │
├─────────────────────────────────────────────────────────────┤
│ 2. Cyber Isometric Grid (.bg-grid)                          │
│    - 48px × 48px linear-gradient subtle lines               │
│    - Elliptical radial opacity mask (focused on hero area)  │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Component Design Specifications

### 4.1. Portal Header & Brand Lockup
- **Structure**: Fixed top banner (`position: sticky; top: 0; z-index: 50; backdrop-filter: blur(12px)`).
- **Brand Identity**: Features the circular Causmic Club logo (`assets/causmic-club-circular-logo.png`) paired with gold-accented typography `GNE'S APEX 2026` and subtitle `Causmic Club • GNDEC Ludhiana`.
- **Security Badge**: In `admin.html`, dynamic session pills display live idle-timeout protection (`🔒 Secure Session (15m Idle Protection)`).

### 4.2. Festival Hero Brand Lockup (`.poster-brand-lockup`)
Faithfully reproduces the official print fest poster branding:
- Top word: `.poster-word-gnes` (Serif italicized gold script).
- Center word: `.poster-word-apex` (Ultra-heavy 900-weight display text with subtle metallic gradient).
- Bottom word: `.poster-word-year` (Monospaced gold-bordered badge).
- Category pill: `.poster-categories-badge` (`COMPETITION CATEGORIES`).

### 4.3. Track Selection Cards (`.track-card`)
The homepage grid organizes events into distinct, interactive visual cards:
- **Track 1: Web Wizards**: Indigo accent (`#6366f1`), lightning glyph `⚡`, `.ZIP` format badge, 90-minute limit.
- **Track 2: Digital Identity**: Amber Gold accent (`#f59e0b`), palette glyph `🎨`, `.PNG/.JPG/.PDF` format badge, 800×800 px badge, 60-minute limit.
- **Track 3: Prompt Engineering**: Emerald accent (`#10b981`), robot glyph `🤖`, `.PDF/.DOCX/.TXT/.ZIP` format badge, 60-minute limit.
- **Interactive Specs Grid (`.track-specs-box`)**: 2-column key-value matrix outlining Time Limit, Accepted Formats, Constraints, and Max Size.

### 4.4. 3-Step Competition Workflow Ribbon (`.step-nav-bar`)
Present on all sub-pages to maintain clear progression:
1. `Step 1`: **Overview & Rules** (`web-wizards.html`, `digital-identity.html`, `prompt-engineering.html`)
2. `Step 2`: **Theme & Assets** (`web-wizards-theme.html`, etc.)
3. `Step 3`: **File Submission** (`web-wizards-upload.html`, etc.)
- Visual States: Active step highlighted with vibrant glow, completed steps display green checkmark `✓`, pending steps dimmed.

### 4.5. Master Countdown & Digital Clock Components
- **Digits Format**: `MM:SS` or `HH:MM:SS` in `JetBrains Mono` at `font-size: 3.5rem` (`admin.html`) and `2.75rem` (`theme.html`).
- **State Badges**:
  - `READY`: Neutral gray border, standby pulse.
  - `RUNNING`: Radiant emerald glow with active tick.
  - `PAUSED`: Amber gold warning glow with frozen digits.
  - `ENDED`: Crimson border with terminal message.
- **Urgency Shift**: When remaining time drops below 5 minutes (`300s`), digits transition to neon rose (`#f43f5e`) accompanied by subtle pulse animations.

### 4.6. Submission Dropzone & Validator (`.apex-dropzone`)
- **Idle State**: Dashed border (`2px dashed rgba(255, 255, 255, 0.15)`), cloud upload icon, prominent drag-and-drop call to action, and file picker trigger.
- **Drag-Over State**: Glowing indigo/cyan border, scaled container (`transform: scale(1.02)`), elevated background brightness.
- **Selected File Card (`#file-preview-card`)**:
  - File icon reflecting extension (Archive `📦`, Image `🖼️`, Document `📄`).
  - Truncated file name, calculated human-readable size (`formatBytes()`).
  - Clear/Remove action button (`✕`).
- **Resolution Pre-Check (Digital Identity)**: Uses an in-browser `Image()` DOM parser to inspect uploaded bitmap dimensions, immediately confirming whether it satisfies the strict 800×800 pixel competition specification.

### 4.7. Admin Control Center Layout (`admin.html`)
- **Authentication Gate**: Center-aligned glassmorphic card with PIN field, toggle password visibility eye (`👁️ / 🔒`), rate-limiting countdown warning, and copyable student workstation URL.
- **Network Sync Banner**: Displays real-time server status, connected student workstation count pill (`#connectedStudentsCount`), and 1-click clipboard link copying for lab projection.
- **Multi-Event Console Panels**: Independent control cards for each track featuring:
  - Giant digital clock and status pill.
  - Preset duration selector pills (`90 Min`, `60 Min`, `45 Min`, `30 Min`, custom input).
  - High-visibility action buttons (`Start`, `Pause`, `Resume`, `+5 Min`, `+10 Min`, `Reset`, `End`).
  - Live broadcast announcement input with instant network-wide push.
- **Activity & Security Audit Trail**: Chronological feed displaying administrative actions, logins, and timer events.

---

## 5. Responsive Design & Breakpoints

The design system enforces fluid adaptation across all standard school laboratory screens:

| Breakpoint | Target Devices | Layout Adjustments |
|---|---|---|
| `> 1200px` | Large lab monitors (1080p desktop) | 3-column track grid, dual-panel admin layout |
| `992px – 1199px` | Standard lab PCs & laptops | 2-column track grid, condensed clock digits |
| `768px – 991px` | Tablets & small laptops | 1-column stacked track cards, simplified step ribbon |
| `< 768px` | Mobile inspection / supervisor phones | Full-width buttons, collapsible nav, touch-optimized targets (min 44px) |

---

## 6. Accessibility & Human Factors

- **Color Contrast**: All text styles strictly exceed WCAG AA guidelines with contrast ratios `> 4.5:1` against dark slate backgrounds.
- **Tabular Alignment**: Countdown digits maintain fixed character widths to prevent visual distraction during live testing.
- **Destructive Action Confirmation**: Risky administrative operations (`Reset All Timers`, `End Event`) trigger native modal confirmations to prevent accidental interruption of live student competitions.
- **Keyboard Navigation**: Form inputs, buttons, and dropzones support native tab ordering and enter/space activations.
