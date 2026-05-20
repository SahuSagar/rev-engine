# PRD.md — RevEngine
## Product Requirements Document

**Version**: 1.0
**Status**: MVP
**Last Updated**: May 2026

---

## 1. Product Overview

### What is RevEngine?

RevEngine is a web-based car engine sound simulator for automotive enthusiasts.
Users browse a gallery of iconic supercars, click into a car's detail page, and
experience a near real-life engine sound simulation — complete with an accelerate
button that drives RPM from idle to redline.

### The Core Promise

> "Hear the soul of the world's greatest engines — right in your browser."

### Why It Exists

Most car sound websites are cheap. They loop a single audio clip and call it done.
RevEngine is different — it uses the Web Audio API to crossfade multiple engine
recordings across the full RPM range, making the experience feel alive and real.
When you hold the accelerate button and hear a Ferrari 458 scream to 9,000 RPM,
it should feel like you are standing next to the car.

---

## 2. Target Audience

**Primary**: Car enthusiasts aged 18–45 who love supercars but will never own one.
They watch YouTube dyno videos, follow supercar channels, and debate engine sounds.

**Secondary**: Automotive content creators, students learning about engine mechanics,
casual users curious about what different engines sound and feel like.

---

## 3. MVP Scope

### One car. Done perfectly.

**Ferrari 458 Italia** is the MVP car. Every feature is built around this car first.
More cars are added after the MVP is validated.

### MVP Features

| # | Feature | Priority |
|---|---|---|
| 1 | Car gallery homepage | Must have |
| 2 | Car detail page with full specs | Must have |
| 3 | Engine information section | Must have |
| 4 | Idle engine sound on page load | Must have |
| 5 | Accelerate button (hold to rev) | Must have |
| 6 | Tachometer with RPM needle | Must have |
| 7 | Audio crossfade across RPM layers | Must have |
| 8 | Mobile touch support | Must have |
| 9 | Volume control | Should have |
| 10 | Engine start / stop toggle | Should have |

### Out of Scope for MVP

- Multiple cars (comes in Phase 2)
- User accounts or saved preferences
- Exhaust tuning simulator
- Rev battle mode (two cars)
- Interior vs exterior perspective toggle
- Sound frequency visualizer
- Backend / database / CMS
- Social sharing features

---

## 4. User Flows

### Flow 1 — Homepage to Sound Simulator

```
User lands on homepage
  → Sees dark, cinematic car gallery
  → Ferrari 458 Italia card with stunning photo
  → Clicks card
    → Navigates to /cars/ferrari-458-italia
      → Hero image loads
      → Engine begins idling automatically (800 RPM)
      → Tachometer needle rests at idle
      → User reads car specs and engine details
      → User clicks "Start Engine" (if not auto-started)
        → Startup sound plays (one-shot)
        → Engine settles into idle loop
      → User holds "HOLD TO REV" button
        → RPM climbs 800 → 3000 → 6000 → 9000
        → Audio layers crossfade in real time
        → Tachometer needle sweeps dramatically
        → Above 8500 RPM — redline zone pulses red
      → User releases button
        → RPM falls naturally with inertia
        → Engine settles back to idle
```

### Flow 2 — Mobile User

```
User opens site on phone
  → Single column car grid
  → Taps Ferrari 458 card
    → Detail page loads
    → Engine idles
    → Taps and HOLDS accelerate button with thumb
      → Engine revs up
      → Tachometer animates
    → Releases — engine decelerates
```

---

## 5. Feature Specifications

### 5.1 Homepage — Car Gallery

**Layout**
- Dark background (`#0A0A0A`)
- Responsive grid: 1 col mobile / 2 col tablet / 3 col desktop
- Site name "RevEngine" top left
- Tagline: "Hear the soul of the world's greatest engines"

**Car Card**
- Full-bleed car photo (aspect ratio 4:3)
- On hover: subtle lift animation (translateY -4px)
- Car name, year range
- Engine type badge (e.g. "4.5L V8 NA")
- Power stat (e.g. "562 bhp")
- Country of origin flag/label
- Click → navigates to car detail page

**States**
- Loading: skeleton card with pulse animation
- Empty: "More cars coming soon" message

---

### 5.2 Car Detail Page

**URL**: `/cars/[slug]` e.g. `/cars/ferrari-458-italia`

**Layout (Desktop)**
```
[  Hero Image — full width                          ]
[  Car Name + Year                  Tachometer      ]
[  Specs Table                      Accelerate Btn  ]
[  Engine Details Section                           ]
[  "Why It Sounds" Section                          ]
```

**Layout (Mobile)**
```
[ Hero Image ]
[ Car Name + Year ]
[ Tachometer ]
[ Accelerate Button ]
[ Specs Table ]
[ Engine Details ]
[ Why It Sounds ]
```

---

### 5.3 Car Specs Section

Display these fields for Ferrari 458 Italia:

| Label | Value |
|---|---|
| Engine | Ferrari F136 FB |
| Configuration | 4.5L Naturally Aspirated V8 |
| Power | 562 bhp @ 9,000 RPM |
| Torque | 540 Nm @ 6,000 RPM |
| Redline | 9,000 RPM |
| 0–100 km/h | 3.4 seconds |
| Top Speed | 325 km/h (202 mph) |
| Transmission | 7-speed dual-clutch |
| Weight | 1,380 kg |
| Years | 2009–2015 |
| Origin | Maranello, Italy |
| Price | $229,825 USD |

---

### 5.4 Engine Information Section

**Purpose**: Educate the user on why this engine sounds the way it does.
This is what separates RevEngine from just another audio player.

**Content for Ferrari 458**:
- Engine code and technical overview
- What a flat-plane crankshaft is and why it matters
- Why 9,000 RPM creates that specific sound character
- How the triple exhaust contributes to the note
- Comparison: flat-plane vs cross-plane V8 sound character

**Format**: Rich text section with a heading, body paragraphs, and a
"Sound Character" highlight card showing key sound traits.

---

### 5.5 Sound Simulator

#### Tachometer
- SVG-based circular gauge
- Sweep range: 0° to 270° (maps to 0–9,000 RPM)
- Zone arcs:
  - Green: 0–5,000 RPM
  - Amber: 5,000–7,500 RPM
  - Red: 7,500–9,000 RPM
- Needle: Framer Motion spring animation (`stiffness: 80, damping: 20`)
- Digital RPM readout below gauge (monospace font)
- Redline pulse effect: red zone pulses above 8,500 RPM
- "FERRARI 458 ITALIA" label inside gauge

#### Accelerate Button
- Label: "HOLD TO REV"
- Interaction: hold mouse / touch to accelerate, release to decelerate
- Visual states:
  - Default: dark background, white text, subtle border
  - Held: Ferrari red glow, scale 1.05, label changes to "REVVING..."
  - Disabled: greyed out (when engine is off)
- Works on both mouse (desktop) and touch (mobile)

#### Engine Start / Stop
- Toggle button: "START ENGINE" / "STOP ENGINE"
- On start: plays startup.mp3 (one-shot), then begins idle loop
- On stop: engine fades out over 1 second

#### Volume Control
- Slider: 0% to 100%
- Default: 80%
- Persisted in Zustand store (not localStorage for MVP)

---

### 5.6 Audio Engine — Technical Spec

#### 4 Audio Layers (all looping)

| Layer | File | RPM Range | Character |
|---|---|---|---|
| Idle | `idle.mp3` | 600–900 | Low burble |
| Low Rev | `low-rev.mp3` | 1,000–3,000 | Throaty growl |
| Mid Rev | `mid-rev.mp3` | 3,000–6,000 | Aggressive wail |
| High Rev | `high-rev.mp3` | 6,000–9,000 | Screaming shriek |

Plus one-shot:

| Startup | `startup.mp3` | Engine ignition | Cranking sound |

#### RPM Physics

```
Rise (holding button):
  rpm = rpm + (MAX_RPM - rpm) × 0.08
  Fast initial climb, slows as it approaches 9,000 RPM

Fall (button released):
  rpm = rpm × 0.94
  Natural inertia deceleration, floors at IDLE_RPM (800)

Update rate: 60fps via requestAnimationFrame
```

#### Crossfade Logic

All four layers play simultaneously at all times.
Only their gain (volume) changes based on RPM.
Transitions use `linearRampToValueAtTime` (smooth, no clicks or pops).

#### Audio Files

Source: Pixabay (royalty-free, no attribution required)
Fallback: Freesound.org CC0 licensed files
Format: MP3, 44.1kHz, max 500KB per file
Location: `/public/sounds/ferrari-458/`

---

## 6. Design Specification

### Visual Identity

| Property | Value |
|---|---|
| Theme | Dark (always) |
| Background | `#0A0A0A` |
| Card surface | `#111111` |
| Primary accent | Ferrari Red `#DC2626` |
| Secondary accent | Amber `#FCD34D` |
| Text primary | `#FFFFFF` |
| Text muted | `rgba(255,255,255,0.6)` |
| Border | `rgba(255,255,255,0.1)` |

### Typography

| Use | Style |
|---|---|
| Car name | `text-5xl font-bold tracking-tight` |
| Section heading | `text-2xl font-semibold` |
| Body | `text-base leading-relaxed` |
| Labels | `text-sm text-white/60` |
| RPM readout | `font-mono text-4xl font-bold` |

### Motion

- Page entrance: fade + slide up (400ms ease-out)
- Card hover: spring lift (-4px, 300ms)
- Tachometer needle: spring (stiffness 80, damping 20)
- Button held: scale 1.05 (150ms)
- All transitions: GPU-accelerated (transform + opacity only)

---

## 7. Image Resources

All images from Unsplash — free, no attribution required.

| Use | Unsplash URL |
|---|---|
| Hero / main | `https://unsplash.com/photos/whuGe0sAGyQ` |
| Side view | `https://unsplash.com/photos/uPrFF1Qat2s` |
| Dramatic (black bg) | `https://unsplash.com/photos/6ZpqZIJTqpI` |
| Yellow variant | `https://unsplash.com/photos/ATLsyGPLqyk` |
| Red parked | `https://unsplash.com/photos/dxJ80oNvnhE` |
| Road shot | `https://unsplash.com/photos/TCXGFN4kW9I` |

CDN format for `next/image`:
```
https://images.unsplash.com/photo-[ID]?w=1920&q=80&auto=format&fit=crop
```

---

## 8. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | File-based routing, next/image, Vercel-native |
| Language | TypeScript (strict) | Type safety across all car and audio data |
| Styling | Tailwind CSS v4 | Fast, consistent, dark theme tokens |
| Animations | Framer Motion | Tachometer spring, card hover, page transitions |
| State | Zustand | RPM state, engine on/off, volume — shared globally |
| Audio | Web Audio API | Native browser, full control over crossfade + pitch |
| Hosting | Vercel | Zero-config, CDN, auto-deploy from GitHub |

---

## 9. File Structure

```
rev-engine/
  CLAUDE.md
  PRD.md
  .claude/
    rules/
      audio-engine.md
      components.md
      git.md
      nextjs.md
      testing.md
      tooling.md
      typescript.md
      ui-design.md
    TASKS.md
  src/
    app/
      layout.tsx
      page.tsx
      not-found.tsx
      cars/
        [slug]/
          page.tsx
          loading.tsx
          not-found.tsx
    components/
      ui/
        Button.tsx
        Card.tsx
        Badge.tsx
        Skeleton.tsx
      cars/
        CarCard.tsx
        CarCardSkeleton.tsx
        CarGrid.tsx
        CarHero.tsx
        EngineDetails.tsx
        SpecTable.tsx
      audio/
        AudioEngine.tsx
        Tachometer.tsx
        AccelerateButton.tsx
        SoundControls.tsx
    hooks/
      useAudioEngine.ts
      useRPM.ts
      useTachometer.ts
    lib/
      audio/
        engine.ts
        types.ts
      data/
        cars.ts
      utils/
        cn.ts
    store/
      audioStore.ts
    types/
      car.ts
  public/
    sounds/
      ferrari-458/
        startup.mp3
        idle.mp3
        low-rev.mp3
        mid-rev.mp3
        high-rev.mp3
    images/
      ferrari-458/
        hero.jpg
        side.jpg
        engine.jpg
```

---

## 10. Success Metrics (MVP)

| Metric | Target |
|---|---|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| Audio loads within | 2 seconds on 4G |
| Works on | Chrome, Safari, Firefox, Edge |
| Works on | iOS Safari, Android Chrome |
| No crashes | 0 unhandled audio errors |
| Core experience | Idle → accelerate → redline works end-to-end |

---

## 11. Known Constraints

- **AudioContext autoplay policy**: Browsers block audio until first user gesture.
  Engine cannot auto-play on page load — user must tap "Start Engine" first.

- **iOS Safari**: Web Audio API behaves differently on iOS.
  AudioContext must be created and resumed inside a touch event handler.

- **Audio file size**: All 5 files combined must stay under 2.5MB for fast mobile load.

- **No backend**: All car data is static TypeScript — no database, no API for MVP.

---

## 12. Phases After MVP

| Phase | What |
|---|---|
| Phase 2 | Add 3 more cars (Hellcat, Porsche 911 GT3, BMW M3) |
| Phase 3 | Exhaust tuning (stock vs sport vs straight pipe sounds) |
| Phase 4 | Rev battle mode — two cars side by side |
| Phase 5 | Interior vs exterior perspective toggle |
| Phase 6 | Sound frequency visualizer (AnalyserNode) |
| Phase 7 | Mobile haptics (Vibration API) |
| Phase 8 | PWA — offline support |