# UI Design Rules

## Design Principles

- **Dark theme** — car enthusiasm lives in the dark. Default dark, always.
- **Let content breathe** — generous spacing, minimal UI chrome
- **Car photos are the hero** — UI frames them, never competes
- **Sound is the product** — tachometer and accelerate button are primary UI
- **Smooth everything** — no abrupt transitions, no layout shifts

---

## Color Tokens

Define in `tailwind.config.ts` — never hardcode hex values in components.

```typescript
// tailwind.config.ts
colors: {
  ferrari: {
    red: '#DC2626',      // Primary accent — buttons, highlights, redline
    yellow: '#FCD34D',   // Secondary accent — badges, tags
    dark: '#0A0A0A',     // Page background
    card: '#111111',     // Card background
    border: '#1F1F1F',   // Subtle borders
  }
}
```

Usage in components:
```
bg-ferrari-dark        → page background
bg-ferrari-card        → card surfaces
border-ferrari-border  → card borders
text-ferrari-red       → accent text, highlights
bg-ferrari-red         → primary buttons
```

---

## Typography Scale

```
Page title (car name):   text-5xl font-bold tracking-tight
Section heading:         text-2xl font-semibold
Card title:              text-xl font-semibold
Body text:               text-base font-normal leading-relaxed
Caption / label:         text-sm text-white/60
RPM digital readout:     font-mono text-4xl font-bold
```

---

## Spacing System

Use Tailwind spacing consistently — no arbitrary values.

```
Page padding:     px-6 md:px-12 lg:px-24
Section gap:      space-y-16 or gap-16
Card padding:     p-6
Card gap:         gap-6 md:gap-8
Component gap:    space-y-4 or gap-4
```

---

## Cards

```
Background:   bg-ferrari-card
Border:       border border-white/10
Radius:       rounded-2xl
Hover:        hover:border-white/20 transition-colors duration-200
Shadow:       none (dark theme — shadows are invisible)
```

```typescript
// Standard card pattern
<div className="rounded-2xl border border-white/10 bg-ferrari-card p-6
                hover:border-white/20 transition-colors duration-200">
  {children}
</div>
```

---

## Buttons

```
Primary (Accelerate):
  bg-ferrari-red text-white font-semibold
  px-8 py-4 rounded-xl
  hover: brightness-110
  active: scale-95
  held state: ring-4 ring-ferrari-red/40 scale-105

Secondary:
  border border-white/20 text-white
  px-6 py-3 rounded-lg
  hover: bg-white/5

All buttons:
  transition-all duration-150
  focus-visible:ring-2 focus-visible:ring-ferrari-red
  cursor-pointer
  select-none
```

---

## Tachometer Design

```
Outer ring:     border-2 border-white/20 rounded-full
Background:     dark radial — bg-ferrari-card
Size:           w-64 h-64 (mobile), w-80 h-80 (desktop)
Needle:         thin line, white, Framer Motion spring
Zone arcs (SVG):
  Green  0–5000:    stroke #22C55E  opacity 0.6
  Amber  5000–7500: stroke #F59E0B  opacity 0.6
  Red    7500–9000: stroke #DC2626  opacity 0.8
Redline pulse:  animate-pulse on red zone above 8500 RPM
Digital readout: font-mono below gauge, white
RPM label:      "RPM" text-white/40 text-sm
```

---

## Animations

Use Framer Motion for all animations. No raw CSS animations except for simple pulses.

```typescript
// Page entrance
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: 'easeOut' }}

// Car card hover
whileHover={{ y: -4 }}
transition={{ type: 'spring', stiffness: 300 }}

// Tachometer needle
const needleSpring = useSpring(angle, {
  stiffness: 80,
  damping: 20,
  mass: 0.5,
})

// Accelerate button held state
whileTap={{ scale: 0.97 }}
```

---

## Images

```
Car hero:        aspect-video object-cover rounded-2xl
Card thumbnail:  aspect-[4/3] object-cover rounded-t-2xl
All images:      always use next/image
Loading state:   blur placeholder via blurDataURL
Alt text:        always descriptive — "${car.name} ${angle} view"
```

---

## Responsive

Mobile-first. Test every component at 375px, 768px, 1280px.

```
Homepage grid:
  1 column  → mobile
  2 columns → md (768px+)
  3 columns → lg (1280px+)

Car detail layout:
  Stacked    → mobile
  Side-by-side → lg (hero + specs)

Tachometer:
  Centered, full-width on mobile
  Right side on desktop
```

---

## Do Not

- ❌ Never use light backgrounds — dark theme only
- ❌ Never use more than 2 accent colors per view
- ❌ Never animate layout properties (width, height) — use transform/opacity only
- ❌ Never use font sizes below `text-sm` (14px)
- ❌ Never skip focus states — accessibility matters
- ❌ Never use `!important`