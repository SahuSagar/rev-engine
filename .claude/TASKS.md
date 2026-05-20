# TASKS.md

## Working Rules

- Complete ONE phase at a time — stop after each phase
- Do NOT start next phase until user gives approval
- After each phase: run tests, verify output, then commit + push to GitHub
- Commit message format: "feat: complete phase X — [phase name]"

## Current Status: ✅ Phase 1 — Project Setup (COMPLETE)

---

## Phase 1 — Project Setup
> Goal: Skeleton running locally with all tools configured

- [x] Init Next.js 15 project with TypeScript, Tailwind, App Router
- [x] Install dependencies: framer-motion, zustand, clsx, tailwind-merge
- [x] Configure `tailwind.config.ts` with Ferrari color tokens
- [x] Set up path alias `@/*` in tsconfig
- [x] Create `cn()` utility at `src/lib/utils/cn.ts`
- [x] Create base folder structure (`components/`, `lib/`, `hooks/`, `store/`, `types/`)
- [x] Add `.env.example`
- [x] Verify `npm run dev` runs without errors
- [x] Create comprehensive `.gitignore`
- [x] Commit and push to GitHub: https://github.com/SahuSagar/rev-engine

---

## Phase 2 — Data Layer
> Goal: All Ferrari 458 data typed and accessible

- [ ] Define TypeScript interfaces in `src/types/car.ts`
  - `CarSpec`, `EngineSpec`, `AudioConfig`, `CarImages`, `AudioGains`
- [ ] Create `src/lib/data/cars.ts` with Ferrari 458 Italia full data object
- [ ] Add utility functions: `getCarBySlug()`, `getAllCars()`
- [ ] Verify TypeScript strict mode passes with no errors

---

## Next Phase: 🚧 Phase 2 — Data Layer (AWAITING APPROVAL)

---

## Phase 3 — Homepage (Car Gallery)
> Goal: Beautiful homepage showing Ferrari 458 card

- [ ] Build `CarCard` component with:
  - Hero image (next/image, Unsplash URL)
  - Car name, year, origin badge
  - Engine type and power stat
  - Hover animation (Framer Motion)
- [ ] Build `CarCardSkeleton` loading state
- [ ] Build `CarGrid` component (responsive 1/2/3 column grid)
- [ ] Build homepage `page.tsx` using CarGrid
- [ ] Build `app/layout.tsx` with dark background, metadata
- [ ] Add page entrance animation
- [ ] Verify responsive layout at 375px, 768px, 1280px

---

## Phase 4 — Car Detail Page
> Goal: Full Ferrari 458 detail page with specs and engine info

- [ ] Build `CarHero` component (large hero image + name overlay)
- [ ] Build `SpecTable` component (car specs grid)
- [ ] Build `EngineDetails` component:
  - Engine code, type, displacement
  - Power, torque, redline
  - "Why it sounds" section with bullet points
- [ ] Build car detail `page.tsx` layout
- [ ] Add `generateMetadata` for SEO
- [ ] Add `loading.tsx` skeleton
- [ ] Add `not-found.tsx` for invalid slugs
- [ ] Verify navigation from homepage → detail page

---

## Phase 5 — Audio Engine
> Goal: Working engine sound that responds to RPM

- [ ] Download 5 audio files from Pixabay/Freesound
  - `startup.mp3`, `idle.mp3`, `low-rev.mp3`, `mid-rev.mp3`, `high-rev.mp3`
  - Place in `/public/sounds/ferrari-458/`
- [ ] Create `EngineAudio` class at `src/lib/audio/engine.ts`
  - AudioContext singleton
  - `preloadAudio()` — loads all 5 files
  - `getLayerGains(rpm)` — crossfade calculator
  - `updateRPM(rpm, isAccelerating)` — RPM physics
  - `getPlaybackRate(rpm)` — pitch variation
- [ ] Create Zustand `audioStore` at `src/store/audioStore.ts`
- [ ] Create `useAudioEngine` hook at `src/hooks/useAudioEngine.ts`
- [ ] Create `useRPM` hook at `src/hooks/useRPM.ts`
- [ ] Verify audio plays correctly in Chrome and Safari

---

## Phase 6 — Sound Simulator UI
> Goal: Tachometer + Accelerate button working with real audio

- [ ] Build `Tachometer` component:
  - SVG gauge with zone arcs (green/amber/red)
  - Framer Motion needle with spring physics
  - Digital RPM readout
  - Redline pulse effect above 8500 RPM
- [ ] Build `AccelerateButton` component:
  - Hold to accelerate interaction (mouse + touch)
  - Ferrari red glow on held state
  - "HOLD TO REV" / "REVVING..." label
  - Disabled state when engine not started
- [ ] Build `SoundControls` component:
  - Volume slider
  - Exterior/Interior perspective toggle
  - Engine on/off button
- [ ] Build `AudioEngine` wrapper component (lazy loaded)
- [ ] Wire everything together on car detail page
- [ ] Verify full interaction: start → idle → accelerate → redline → release

---

## Phase 7 — Polish & Performance
> Goal: Lighthouse 90+, smooth experience

- [ ] Optimize all images (WebP, correct sizing)
- [ ] Verify audio files are under 500KB each
- [ ] Add blur placeholders to all `next/image` components
- [ ] Add mobile touch support for AccelerateButton
- [ ] Add `aria-label` to all interactive elements
- [ ] Run Lighthouse audit — fix any issues under 90
- [ ] Add error boundary for audio failures
- [ ] Add "audio not supported" fallback UI

---

## Phase 8 — Deploy
> Goal: Live on Vercel

- [ ] Push to GitHub repository
- [ ] Connect to Vercel
- [ ] Set environment variables on Vercel
- [ ] Verify production build passes: `npm run build`
- [ ] Test live URL on mobile and desktop
- [ ] Share URL 🚀

---

## Backlog (Post-MVP)

- [ ] Add second car (Dodge Challenger Hellcat)
- [ ] Add third car (Porsche 911 GT3)
- [ ] Exhaust tuning simulator (stock vs sport exhaust vs straight pipe)
- [ ] Rev battle mode — two cars side by side
- [ ] Interior vs exterior sound perspective
- [ ] Sound frequency visualizer (Web Audio AnalyserNode)
- [ ] Mobile haptic feedback (Vibration API)
- [ ] PWA — offline support