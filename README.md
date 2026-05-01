# 🗳️ ElectionGuide

> An interactive, visually rich web app that teaches users the **complete election process** for both 🇮🇳 India and 🇺🇸 USA — step by step.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

---

## 📸 Preview

| Desktop — Timeline + Detail | Mobile — Tab Navigation |
|---|---|
| Two-panel layout: timeline on left, step detail on right | Bottom tab bar switches between Timeline and Detail views |

---

## ✨ Features

| Feature | Details |
|---|---|
| 📅 Interactive Timeline | Click any phase to see full details; completed phases show a ✔ checkmark |
| 📊 Animated Progress Bar | Header bar tracks which step you are on (percentage + step counter) |
| ⬅ ➡ Keyboard Navigation | Arrow keys (← ↑ ↓ →) cycle through all election phases |
| 🌏 India & USA Links | Real external links to ECI, vote.gov, MyNeta, C-SPAN, and more |
| 🎨 Glassmorphism UI | Frosted-glass panels, gradient glows, and shimmer text effects |
| ✨ Particle Background | Canvas-based 60-particle animated system with fade-in/out lifecycle |
| 📱 Fully Mobile Responsive | Bottom tab bar, back button, and panel switching for small screens |
| 🛡️ Eligibility Section | Accordion cards for India & USA voting eligibility rules |
| 🔗 Scroll-to Section CTA | Animated banner that smooth-scrolls to the Eligibility section |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** — [Download](https://nodejs.org/)
- **npm 9+** (bundled with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Arijit-x/Election_Process.git

# 2. Move into the project directory
cd Election_Process

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Compile production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | Component-based UI |
| [Vite](https://vitejs.dev/) | 8 | Build tool & dev server with HMR |
| [lucide-react](https://lucide.dev/) | ^1.11 | SVG icon library |
| Vanilla CSS | — | Design system, glassmorphism, animations |
| Canvas API | native | Particle background animation |

---

## 📁 Project Structure

```
Election_Process/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint flat config
├── package.json
└── src/
    ├── main.jsx                # React root — mounts <App /> to #root
    ├── App.jsx                 # Root component — layout, state, keyboard nav
    ├── App.css                 # Layout grid, mobile helpers, action buttons
    ├── index.css               # Design system: tokens, animations, typography
    ├── assets/                 # Static assets (SVGs, images)
    ├── data/
    │   └── electionData.js     # All 6 election steps with links & metadata
    └── components/
        ├── Header.jsx          # Logo + animated progress bar
        ├── Timeline.jsx        # Clickable vertical timeline list
        ├── StepDetail.jsx      # Full phase detail panel (right column)
        ├── EligibilitySection.jsx  # Accordion eligibility cards (India & USA)
        └── Particles.jsx       # Canvas particle background
```

---

## 🧩 Component Reference

### `<App />` — Root Orchestrator

**File:** `src/App.jsx`

The single source of truth for application state. Manages which step is active and which view is shown on mobile.

#### State

| State variable | Type | Default | Description |
|---|---|---|---|
| `activeStepId` | `string` | `electionSteps[0].id` | ID of the currently selected election step |
| `mobileView` | `'timeline' \| 'detail'` | `'timeline'` | Controls which panel is visible on mobile |

#### Key Logic

```jsx
// Keyboard navigation — arrow keys cycle through steps
useEffect(() => {
  const onKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      setActiveStepId(electionSteps[Math.min(activeIndex + 1, electionSteps.length - 1)].id);
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      setActiveStepId(electionSteps[Math.max(activeIndex - 1, 0)].id);
    }
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, [activeIndex]);
```

```jsx
// Selecting a step on mobile auto-switches to detail view
const handleStepSelect = (id) => {
  setActiveStepId(id);
  setMobileView('detail');
};
```

---

### `<Header />` — Progress Tracker

**File:** `src/components/Header.jsx`

Displays the app logo, India & USA badge, and an animated progress bar.

#### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `totalSteps` | `number` | ✅ | Total number of election phases |
| `currentStep` | `number` | ✅ | Zero-based index of the active step |

#### Progress Calculation

```js
const progress = ((currentStep + 1) / totalSteps) * 100;
// Example: step 2 of 6 → ((2+1)/6)*100 = 50%
```

The progress bar width animates via CSS `transition: width var(--transition-slow)`.

---

### `<Timeline />` — Interactive Step List

**File:** `src/components/Timeline.jsx`

Renders the vertical timeline with dots, a connecting track, and clickable step cards.

#### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `steps` | `ElectionStep[]` | ✅ | Array of all election step objects |
| `activeStepId` | `string` | ✅ | ID of the currently active step |
| `onStepSelect` | `(id: string) => void` | ✅ | Callback fired when user clicks a step |

#### Visual States

| State | Dot colour | Card background | Icon colour |
|---|---|---|---|
| **Past** | Green (✔ check icon) | Transparent | `--color-success` |
| **Active** | Primary → Accent gradient + glow pulse | `--color-surface-hover` | `--color-accent` |
| **Upcoming** | Dark background | Transparent | `--color-text-muted` |

#### Track Fill Logic

```js
// The vertical line fills from top down to the active item
background: `linear-gradient(
  to bottom,
  var(--color-primary) ${(activeIndex / (steps.length - 1)) * 100}%,
  var(--color-surface-active) ${(activeIndex / (steps.length - 1)) * 100}%
)`
```

---

### `<StepDetail />` — Phase Detail Panel

**File:** `src/components/StepDetail.jsx`

Sticky right-column panel showing full information for the selected step.

#### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `step` | `ElectionStep` | ✅ | The active election step object |
| `stepIndex` | `number` | ✅ | Zero-based index (reserved for future use) |

#### Animation Re-trigger Pattern

Each time the active step changes, the CSS animation is forcibly replayed:

```js
useEffect(() => {
  const el = panelRef.current;
  if (!el) return;
  el.style.animation = 'none';
  void el.offsetHeight; // forces reflow — resets animation state
  el.style.animation = '';
}, [step?.id]);
```

#### Action Button Behaviour

```js
const handleAction = (url) => {
  if (url.startsWith('tel:')) {
    window.location.href = url;   // dials the number on mobile
  } else {
    window.open(url, '_blank', 'noopener,noreferrer'); // opens in new tab
  }
};
```

---

### `<EligibilitySection />` — Accordion Eligibility Cards

**File:** `src/components/EligibilitySection.jsx`

Renders two collapsible `<CountryCard>` components — one for India, one for USA.

#### `<CountryCard />` Internal State

| State | Type | Default | Description |
|---|---|---|---|
| `expanded` | `boolean` | `true` | Whether the accordion body is visible |

#### Accordion Animation

```css
/* Height animates smoothly using max-height trick */
max-height: expanded ? '1200px' : '0';
opacity: expanded ? 1 : 0;
transition: max-height 0.5s cubic-bezier(0.2,0.8,0.2,1), opacity 0.3s ease;
```

#### Each card shows three sections:

1. ✅ **Who CAN vote** — eligibility checklist
2. ❌ **Who CANNOT vote** — disqualification list
3. ℹ️ **Good to Know** — notable edge cases and NRI rules

---

### `<Particles />` — Canvas Background Animation

**File:** `src/components/Particles.jsx`

A full-viewport `<canvas>` with 60 floating particles using a class-based lifecycle.

#### Particle Lifecycle

```
spawn at bottom → float upward → fade in (0–10% of life)
                              → stay visible (10–80% of life)
                              → fade out (80–100% of life)
                              → reset() and repeat
```

#### Particle Properties

| Property | Range | Description |
|---|---|---|
| `size` | 0.5 – 3 px | Radius |
| `speedY` | −0.2 to −0.8 | Upward drift speed |
| `speedX` | −0.2 to +0.2 | Lateral drift |
| `maxOpacity` | 0.1 – 0.6 | Peak visibility |
| `maxLife` | 200 – 600 frames | Total particle lifespan |
| `color` | Blue / Pink / Cyan | Matches the design system palette |

#### Cleanup

```js
return () => {
  cancelAnimationFrame(animId);        // stop the animation loop
  window.removeEventListener('resize', resize); // avoid memory leaks
};
```

---

## 📊 Data Schema — `electionData.js`

**File:** `src/data/electionData.js`

The single source of truth for all election content. Exports `electionSteps` — an array of `ElectionStep` objects.

### `ElectionStep` Shape

```ts
type ElectionStep = {
  id: string;                  // Unique kebab-case identifier
  title: string;               // Display name for the phase
  dateRange: string;           // Human-readable timing description
  icon: LucideIcon;            // Lucide icon component (not an element)
  shortDescription: string;    // One-line summary shown in the timeline card
  fullDescription: string;     // Multi-sentence detail shown in StepDetail
  requirements: string[];      // Documents / items the voter may need
  actions: ActionLink[];       // External resource buttons
};

type ActionLink = {
  label: string;               // Button text
  primary: boolean;            // true = filled blue, false = ghost button
  url: string;                 // Full URL or 'tel:XXXX' for phone links
};
```

### Covered Phases

| # | ID | Title |
|---|---|---|
| 1 | `registration` | Voter Registration |
| 2 | `campaign` | Campaign Period |
| 3 | `early-voting` | Postal / Early Voting |
| 4 | `election-day` | Election Day |
| 5 | `counting` | Vote Counting & Audits |
| 6 | `certification` | Certification & Transition |

### Adding a New Step

1. Open `src/data/electionData.js`
2. Import the icon you want from `lucide-react`
3. Add a new object to the `electionSteps` array following the schema above

```js
import { Scale } from 'lucide-react';

{
  id: 'legal-challenges',
  title: 'Legal Challenges',
  dateRange: 'Immediately post-election if contested',
  icon: Scale,
  shortDescription: 'Courts resolve any disputes over results.',
  fullDescription: '...',
  requirements: [],
  actions: [
    { label: 'ECI Legal Framework', primary: true, url: 'https://www.eci.gov.in/...' }
  ]
}
```

---

## 🎨 Design System — `index.css`

All design tokens are CSS custom properties on `:root`.

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#080c18` | Page background |
| `--color-primary` | `#4361ee` | Primary accent (blue) |
| `--color-secondary` | `#f72585` | Secondary accent (pink) |
| `--color-accent` | `#4cc9f0` | Highlight / cyan |
| `--color-success` | `#2ec4b6` | Completed step indicators |
| `--color-surface-hover` | `rgba(255,255,255,0.07)` | Card hover state |
| `--color-border-glow` | `rgba(67,97,238,0.5)` | Active card border |

### Spacing & Radius Tokens

| Token | Value |
|---|---|
| `--spacing-sm` | `0.75rem` |
| `--spacing-md` | `1.25rem` |
| `--spacing-lg` | `2rem` |
| `--spacing-xl` | `3rem` |
| `--radius-md` | `12px` |
| `--radius-lg` | `20px` |
| `--radius-full` | `9999px` |

### Key Animation Classes

| Class / Keyframe | Effect |
|---|---|
| `@keyframes fadeSlideUp` | Elements slide up and fade in |
| `@keyframes fadeSlideLeft` | Timeline items slide in from the left |
| `@keyframes pulseGlow` | Breathing glow effect (used on active timeline dots) |
| `@keyframes bounceDown` | Infinite bounce (used on the scroll CTA chevron) |
| `.text-shimmer` | Animated shimmer on the "Guide" wordmark |
| `.text-gradient` | Static primary→accent gradient text |
| `.glass-panel` | Frosted glass card (`backdrop-filter: blur`) |

---

## 📱 Mobile Responsiveness

The layout switches at `≤768px` (CSS media query in `App.css`).

| Behaviour | Desktop | Mobile |
|---|---|---|
| Layout | Two-column grid | Single panel |
| Navigation | Keyboard arrows + Prev/Next buttons | Bottom tab bar + Prev/Next buttons |
| Panel switch | Both panels always visible | Tab bar toggles between Timeline / Detail |
| Back button | Hidden | Visible in Detail view |

### CSS Classes Used

| Class | Applied when |
|---|---|
| `.mobile-hidden` | Hides a panel on mobile |
| `.mobile-only` | Shows an element only on mobile |
| `.mobile-tab-bar` | The fixed bottom navigation bar |
| `.tab-btn.active` | Highlighted active tab |

---

## 🔗 External Resources

### 🇮🇳 India — Election Commission of India (ECI)

| Resource | URL |
|---|---|
| Voter Portal | https://voters.eci.gov.in/ |
| Electoral Search | https://electoralsearch.eci.gov.in/ |
| Candidate Affidavits | https://affidavit.eci.gov.in/ |
| Know Your Candidate | https://www.myneta.info/ |
| Live Results | https://results.eci.gov.in/ |
| EVM & VVPAT Info | https://www.eci.gov.in/evm |
| Statistical Archive | https://www.eci.gov.in/statistical-report |
| Voters FAQ | https://www.eci.gov.in/voters-faqs |
| Voter Helpline | **1950** (tel:1950) |

### 🇺🇸 USA

| Resource | URL |
|---|---|
| Vote.gov | https://www.vote.gov/ |
| Register / Verify | https://www.vote.gov/register/verify/ |
| Early Voting Info | https://www.vote.gov/early-voting/ |
| Find Polling Place | https://www.vote.gov/find-polling-place/ |
| C-SPAN Debates | https://www.c-span.org/debates/ |
| BallotReady | https://www.ballotready.org/ |
| USPS Vote by Mail | https://www.usps.com/vote |
| USA.gov Election Results | https://www.usa.gov/election-results |
| Who Can Vote | https://www.usa.gov/who-can-vote |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open a Pull Request** on GitHub

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add a new feature
fix: fix a bug
docs: documentation changes only
style: formatting, no logic change
refactor: code refactor, no feature/fix
chore: build process or tooling changes
```

### Adding Election Steps

See the [Adding a New Step](#adding-a-new-step) section in the Data Schema guide above.

### Adding a New Country

1. Add a new entry to `eligibilityData` in `EligibilitySection.jsx`
2. Add country-specific `actions` inside the relevant steps in `electionData.js`

---

## 📄 License

MIT © [Arijit-x](https://github.com/Arijit-x)

---

<div align="center">
  Made with ❤️ to promote civic awareness
</div>
