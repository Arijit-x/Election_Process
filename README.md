# 🗳️ ElectionGuide — Interactive Election Process Education

An interactive, visually rich web application that helps users understand the election process, timelines, and steps in an easy-to-follow way. Built with **React + Vite**.

![ElectionGuide Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple)

---

## ✨ Features

- **Interactive Timeline** — Click any election phase to explore its details
- **Animated Progress Bar** — Track which stage of the process you're on
- **Prev / Next Navigation** — Step through all phases with keyboard (← →) or buttons
- **India 🇮🇳 & USA 🇺🇸 Links** — Real links to ECI, voters.eci.gov.in, MyNeta, vote.gov, C-SPAN, and more
- **Floating Particle Background** — Canvas-based animated particle system
- **Glassmorphism UI** — Frosted-glass panels with glow effects and micro-animations
- **Fully Mobile Responsive** — Tab bar navigation, back button, and panel switching on mobile
- **Keyboard Navigation** — Use arrow keys to navigate steps

---

## 📋 Election Phases Covered

1. **Voter Registration** — How to register, check status (ECI / vote.gov)
2. **Campaign Period** — Research candidates via MyNeta, C-SPAN debates
3. **Postal / Early Voting** — Postal ballot applications (Form 12D), early voting info
4. **Election Day** — Find your polling booth (ECI), Voter Helpline 1950
5. **Vote Counting & Audits** — Live ECI results, EVMs & VVPATs explained
6. **Certification & Transition** — Official certification process

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
git clone https://github.com/Arijit-x/Election_Process.git
cd Election_Process
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Components |
| Vite 8 | Build tool & dev server |
| lucide-react | Icons |
| Vanilla CSS | Glassmorphism design system |
| Canvas API | Particle animation |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx        # Header with animated progress bar
│   ├── Timeline.jsx      # Interactive election timeline
│   ├── StepDetail.jsx    # Detailed phase information panel
│   └── Particles.jsx     # Canvas particle background
├── data/
│   └── electionData.js   # All election steps, links, and content
├── App.jsx               # Main app with mobile/desktop layout
├── App.css               # Layout & responsive styles
└── index.css             # Design system (colors, animations, typography)
```

---

## 📱 Mobile Support

On mobile devices the app shows a **bottom tab bar** to switch between the Timeline and Step Detail views, along with a Back button and Prev/Next step navigation.

---

## 🔗 External Resources Linked

### 🇮🇳 India
- [Voter Portal — ECI](https://voters.eci.gov.in/)
- [Electoral Search — ECI](https://electoralsearch.eci.gov.in/)
- [Candidate Affidavits — ECI](https://affidavit.eci.gov.in/)
- [MyNeta — Know Your Candidate](https://www.myneta.info/)
- [Live Results — ECI](https://results.eci.gov.in/)
- Voter Helpline: **1950**

### 🇺🇸 USA
- [Vote.gov](https://www.vote.gov/)
- [C-SPAN Debates](https://www.c-span.org/debates/)
- [BallotReady](https://www.ballotready.org/)
- [USPS Vote by Mail](https://www.usps.com/vote)
- [USA.gov Elections](https://www.usa.gov/election-results)

---

## 📄 License

MIT
