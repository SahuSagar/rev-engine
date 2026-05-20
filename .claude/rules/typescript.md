# TypeScript Rules

## Config

Always use `strict: true` in `tsconfig.json`. No exceptions.

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## Types vs Interfaces

- Use `interface` for object shapes and component props
- Use `type` for unions, primitives, and utility types

```typescript
// ✅ Good
interface CarSpec {
  slug: string
  name: string
  engine: EngineSpec
}

type Perspective = 'exterior' | 'interior'
type RPM = number

// ❌ Bad
type CarSpec = {
  slug: string
  name: string
}
```

---

## No `any` — Ever

```typescript
// ✅ Good
function getCarBySlug(slug: string): CarSpec | undefined {
  return cars.find(c => c.slug === slug)
}

// ❌ Bad
function getCarBySlug(slug: any): any {
  return cars.find((c: any) => c.slug === slug)
}
```

If you genuinely don't know the type, use `unknown` and narrow it.

---

## Static Data

Use `as const` for all static car data arrays and config objects.

```typescript
// ✅ Good
const RPM_ZONES = {
  idle: { min: 600, max: 900 },
  low: { min: 1000, max: 3000 },
  mid: { min: 3000, max: 6000 },
  high: { min: 6000, max: 9000 },
} as const

// ❌ Bad
const RPM_ZONES = {
  idle: { min: 600, max: 900 },
}
```

---

## Props

Always define a named interface for component props — never inline.

```typescript
// ✅ Good
interface CarCardProps {
  car: CarSpec
  onClick: (slug: string) => void
}

export function CarCard({ car, onClick }: CarCardProps) { ... }

// ❌ Bad
export function CarCard({ car, onClick }: { car: CarSpec; onClick: (slug: string) => void }) { ... }
```

---

## Enums

Avoid TypeScript enums — use `as const` objects instead.

```typescript
// ✅ Good
const ENGINE_STATE = {
  OFF: 'off',
  IDLE: 'idle',
  RUNNING: 'running',
} as const

type EngineState = typeof ENGINE_STATE[keyof typeof ENGINE_STATE]

// ❌ Bad
enum EngineState {
  OFF = 'off',
  IDLE = 'idle',
  RUNNING = 'running',
}
```

---

## Null Handling

Always handle null/undefined explicitly — never assume data exists.

```typescript
// ✅ Good
const car = getCarBySlug(slug)
if (!car) return notFound()

// ❌ Bad
const car = getCarBySlug(slug)
return <CarDetail car={car!} />
```