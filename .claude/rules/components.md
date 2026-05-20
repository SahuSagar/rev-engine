# Components Rules

## Structure

```
src/components/
  ui/                   # Reusable primitives — no business logic
    Button.tsx
    Card.tsx
    Badge.tsx
    Skeleton.tsx
  cars/                 # Car-specific display components
    CarCard.tsx
    CarGrid.tsx
    CarHero.tsx
    EngineDetails.tsx
    SpecTable.tsx
  audio/                # Sound simulator components
    AudioEngine.tsx
    Tachometer.tsx
    AccelerateButton.tsx
    SoundControls.tsx
```

---

## Rules

- One component per file — always
- Named exports for all components (default export for pages only)
- Every component has a typed props interface above it
- Max 150 lines per component — extract if longer
- Always handle loading, error, and empty states

```typescript
// ✅ Correct structure
interface CarCardProps {
  car: CarSpec
  onClick: (slug: string) => void
}

export function CarCard({ car, onClick }: CarCardProps) {
  return (...)
}
```

---

## Custom Hooks

Extract logic over 20 lines into a custom hook in `src/hooks/`.

```
src/hooks/
  useAudioEngine.ts     # Web Audio API logic
  useRPM.ts             # RPM rise/fall animation loop
  useTachometer.ts      # Needle angle calculation
```

```typescript
// ✅ Good — logic in hook, component stays clean
export function AccelerateButton() {
  const { startEngine, isLoaded } = useAudioEngine(car.audio)
  const { rpm, startAccelerating, stopAccelerating } = useRPM()

  return (
    <button
      onMouseDown={startAccelerating}
      onMouseUp={stopAccelerating}
    >
      HOLD TO REV
    </button>
  )
}

// ❌ Bad — logic inside component
export function AccelerateButton() {
  const [rpm, setRpm] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>()

  const handleMouseDown = () => {
    intervalRef.current = setInterval(() => {
      setRpm(prev => Math.min(prev + (9000 - prev) * 0.08, 9000))
      // ...40 more lines of audio logic
    }, 16)
  }
}
```

---

## Tachometer Component

The tachometer is the visual centerpiece. Build it precisely.

```
Needle sweeps: 0° to 270° (maps to 0–9000 RPM)
Needle motion: Framer Motion useSpring (stiffness: 80, damping: 20)
RPM zones:
  Green  → 0–5000 RPM
  Amber  → 5000–7500 RPM
  Red    → 7500–9000 RPM
Redline flash: pulse animation above 8500 RPM
Digital readout: RPM number displayed below gauge
```

```typescript
// Needle angle calculation
function rpmToAngle(rpm: number, maxRPM: number): number {
  const SWEEP = 270  // degrees
  return (rpm / maxRPM) * SWEEP - 135  // -135° to +135°
}
```

---

## AccelerateButton Component

```
Interaction:
  Desktop → onMouseDown to hold, onMouseUp / onMouseLeave to release
  Mobile  → onTouchStart to hold, onTouchEnd to release

Visual states:
  Default    → dark button, subtle border
  Held       → Ferrari red glow, slight scale up (1.05)
  Disabled   → greyed out (engine not started)

Label:
  Default    → "HOLD TO REV"
  Held       → "REVVING..."
```

---

## Loading States

Every component that fetches or loads async data needs a skeleton.

```typescript
// ✅ Always provide skeleton
export function CarCard({ car }: CarCardProps) { ... }

export function CarCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white/5">
      <div className="h-64 rounded-t-2xl bg-white/10" />
      <div className="p-6 space-y-3">
        <div className="h-4 w-3/4 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
      </div>
    </div>
  )
}
```

---

## Do Not

- ❌ Never use `React.FC` — just type props directly
- ❌ Never use index as key in lists — use `car.slug` or stable ID
- ❌ Never put audio logic in UI components — use hooks
- ❌ Never use inline styles — Tailwind only
- ❌ Never nest components inside components (defining one inside another)