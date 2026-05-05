# CIPHER — Dance Studio Website

A cinematic, scroll-driven React website for a dance studio with full GSAP ScrollTrigger + Framer Motion animations.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
dance-studio/
├── index.html                        # Entry HTML + Google Fonts
├── package.json                      # Dependencies
├── vite.config.js                    # Vite config
├── tailwind.config.js                # Tailwind + custom tokens
├── postcss.config.js                 # PostCSS
├── public/
│   └── favicon.svg                   # Custom SVG favicon
└── src/
    ├── App.jsx                       # Root component - scene orchestration
    ├── main.jsx                      # React entry point
    ├── index.css                     # Global styles + CSS variables
    ├── animations/
    │   └── gsapConfig.js             # GSAP + ScrollTrigger registration
    ├── components/
    │   ├── Cursor.jsx                # Custom neon cursor
    │   ├── DancerSVG.jsx             # SVG dancer silhouettes (4 poses)
    │   ├── Navbar.jsx                # Fixed navbar w/ mobile menu
    │   ├── ParticleField.jsx         # Canvas particle system
    │   └── ScrollProgress.jsx        # Framer Motion scroll bar
    ├── hooks/
    │   ├── useCustomCursor.js        # Cursor animation logic
    │   └── useScrollProgress.js      # Scroll % hook
    └── sections/
        ├── SceneHero.jsx             # Scene 1: Fullscreen hero + zoom
        ├── SceneEnergyBuild.jsx      # Scene 2: Parallax dancer layers
        ├── ScenePerformanceDrop.jsx  # Scene 3: Word reveal + zoom burst
        ├── SceneStudioShowcase.jsx   # Scene 4: Studio with neon aesthetic
        └── SceneCTA.jsx              # Scene 5: Join + pricing + glow CTA
```

## 🎬 Scene Breakdown

| Scene | Effect |
|-------|--------|
| Hero | GSAP scrub zoom 1→1.25, blur on scroll, char-by-char title reveal |
| Energy Build | 3-layer parallax (bg/mid/fg at different scrub speeds), floating dancers |
| Performance Drop | Word reveal with clip overflow, zoom burst background |
| Studio Showcase | Cinematic brightness transition, SVG studio room with neon lights |
| CTA | Scale reveal title, animated glow button, pricing cards |

## 🛠 Tech Stack

- **React 18** + Vite 5
- **Framer Motion 11** — component-level animations, scroll progress
- **GSAP 3** + ScrollTrigger — scroll-driven camera moves
- **Tailwind CSS 3** — utility styling + custom tokens
- **Canvas API** — particle field (no deps)

## ✨ Features

- ✅ Custom neon cursor + follower
- ✅ Scroll progress gradient bar
- ✅ GSAP ScrollTrigger parallax (3 layers)
- ✅ Cinematic zoom-in on hero scroll
- ✅ Character-by-character title reveal
- ✅ Animated word drop (MOVE / EXPRESS / DOMINATE)
- ✅ Canvas particle system (60 neon particles)
- ✅ SVG dancer silhouettes (4 poses)
- ✅ Animated studio room with perspective grid
- ✅ Glowing CTA button with shimmer
- ✅ Mobile responsive + hamburger menu
- ✅ Dark neon theme (purple / blue / pink)
- ✅ Custom scrollbar
- ✅ Ambient floating animations
- ✅ Noise texture overlay
