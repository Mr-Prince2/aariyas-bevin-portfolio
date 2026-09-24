# Aariyas Bevin — Portfolio (ものづくり // 創造)

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=for-the-badge" alt="Lenis" />
  <img src="https://img.shields.io/badge/License-MIT-crimson?style=for-the-badge" alt="License" />
</p>

A high-performance creative developer portfolio at the intersection of **animated web development**, **Japanese aesthetic philosophy** (*Monozukuri*, *Wabi-sabi*, Sumi ink, Washi paper), and **AI & Data Science engineering**.

Designed with award-winning editorial typography, real-time canvas animation, view-transition effects, and fluid spring physics.

---

## ✨ Signature Features

### 🎬 1. Animated Editorial Chess Preloader
- Inspired by high-end narrative web design ([moneyincheck.org](https://moneyincheck.org/)).
- **Transparent Canvas Rendering**: Uses real-time HTML5 `<canvas>` pixel processing to strip the background from the animation video, rendering the character with pure alpha transparency directly on the grid.
- **Dynamic Floating Chess Coordinates**: Injects classic chess moves (`e4`, `e5`, `Nf3`, `Nc6`, `O-O`, `d4`, `d6`, `a4`, `ものづくり`) with organic rotation and bouncy spring physics.
- **Theater Curtain Unveil**: Smooth two-phase exit sequence that dissolves stage content and slides the screen upward like a luxury silk curtain (`cubic-bezier(0.76, 0, 0.24, 1)`).

### 🌓 2. Celestial Eclipse View Transition (`日` ↔ `月`)
- Powered by the modern **View Transitions API** with zero-jank hardware acceleration.
- Clicking the theme toggle triggers an expanding **circular clip-path ripple** originating from the exact physical coordinates of the button across the entire viewport.
- **Dark Theme (`月`)**: Deep Japanese obsidian ink (`#0a0a0f`) with crimson and gold accents.
- **Light Theme (`日`)**: Warm Washi parchment paper (`#f7f4ee`) with deep Sumi ink typography (`#050508`) and Kyoto matcha green (`#166534`) accents.

### ✍️ 3. Editorial Outline-to-Solid-Fill Scroll Reveals
- Applied across the **Skills** and **About** sections using **GSAP ScrollTrigger**.
- Text starts as a delicate hollow outline (`-webkit-text-stroke`) and smoothly scrubs into solid fill as the user scrolls through the section.
- Color hierarchy preserves distinct tones for body text (`var(--text-dim)`), strong highlights (`var(--white)`), and emphasis keywords (`var(--jade-light)` with matcha underlines).

### 🎯 4. Minimalist Monochrome Dual-Element Cursor
- **5px Precision Dot**: High-contrast central pointer core with subtle ambient glow.
- **28px Fluid Follower Ring**: Smooth spring interpolation (`0.18` factor) with soft backdrop blur.
- **Tactile Reactive States**: Expands into a 44px halo on interactive hover and compresses on click.
- Fully suppresses native OS pointers reliably across all desktop browsers.

### 🌸 5. Atmospheric Japanese Cyber Backgrounds
- **CyberGrid**: Dynamic perspective canvas grid with horizon vanishing points.
- **SakuraPetals**: Ambient floating cherry blossom petals drifting with fluid physics.
- **Lenis Smooth Scroll**: Unified momentum wheel scrolling synchronized with GSAP tickers.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 19, Vite 8, JavaScript (ES6+ Modules) |
| **Motion & Physics** | GSAP 3.15, ScrollTrigger, Lenis Smooth Scroll, Framer Motion |
| **Styling & Design System** | Vanilla CSS3 (Custom Properties, Flexbox/Grid, View Transitions API) |
| **Canvas & Graphics** | HTML5 2D Canvas real-time video processing, TsParticles |
| **Typography** | Shippori Mincho, Zen Kaku Gothic New, Cinzel, Noto Serif JP, Space Mono, Liu Jian Mao Cao |
| **Services & Notifications** | EmailJS, React Hot Toast |

---

## 📁 Project Architecture

```text
aariyas-bevin-portfolio/
├── public/
│   ├── favicon.svg             # Japanese Monozukuri seal favicon
│   └── loading.mp4             # Preloader character animation source
├── src/
│   ├── components/
│   │   ├── Cursor/             # Minimalist monochrome custom cursor
│   │   ├── CyberGrid/          # Perspective retro-cyber grid background
│   │   ├── Footer/             # Japanese editorial footer with credits & links
│   │   ├── Marquee/            # Infinite running typography strip
│   │   ├── Navbar/             # Glassmorphic header with navigation & theme switch
│   │   ├── Preloader/          # Real-time transparent canvas chess preloader
│   │   ├── SakuraPetals/       # Floating cherry blossom particles
│   │   └── ThemeToggle/        # Celestial Japanese HUD theme toggle button
│   ├── hooks/
│   │   ├── useFadeUp.js        # Intersection Observer scroll trigger hook
│   │   └── useTheme.js         # View Transitions API radial theme manager
│   ├── sections/
│   │   ├── Hero/               # Cinematic introduction with animated badges & kanji
│   │   ├── About/              # Fixed profile card & editorial outline-to-fill text
│   │   ├── Skills/             # Categorized tech stacks & editorial statement reveal
│   │   ├── Projects/           # Filterable AI & full-stack showcase cards
│   │   ├── Divider/            # Atmospheric visual interlude
│   │   └── Contact/            # Interactive form with EmailJS & toast feedback
│   ├── styles/
│   │   ├── variables.css       # Complete dark/light Japanese color tokens
│   │   └── globals.css         # Typography, reset, view transitions, & utilities
│   ├── App.jsx                 # Root orchestration (Lenis + GSAP + components)
│   └── main.jsx                # DOM mount
├── index.html                  # HTML5 entry with fonts, preloaders & theme script
└── package.json                # Project dependencies and build scripts
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mr-Prince2/aariyas-bevin-portfolio.git
   cd aariyas-bevin-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build production bundle:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📬 Contact & Socials

- **Developer:** Aariyas Bevin
- **Focus:** AI & Data Science Engineering / Animated Web Development
- **GitHub:** [@Mr-Prince2](https://github.com/Mr-Prince2)
- **LinkedIn:** [Aariyas Bevin](https://linkedin.com/in/aariyas-bevin)

---

<p align="center">
  <sub>ものづくり (Monozukuri) — Crafting digital experiences with intention, precision, and soul.</sub>
</p>
