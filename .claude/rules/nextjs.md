# Next.js Rules

## App Router Structure

```
src/app/
  page.tsx                  # Homepage — car gallery
  layout.tsx                # Root layout — fonts, metadata, providers
  not-found.tsx             # Global 404 page
  cars/
    [slug]/
      page.tsx              # Car detail + sound simulator
      loading.tsx           # Skeleton while car data loads
      not-found.tsx         # Car not found page
```

---

## Server vs Client Components

- Components are **Server Components by default** — never add `'use client'` unless required
- Add `'use client'` only when the component uses: browser APIs, useState, useEffect, event handlers, Framer Motion, Zustand, Web Audio API

```typescript
// ✅ Server Component — car specs, images, static content
export function EngineDetails({ engine }: { engine: EngineSpec }) {
  return <div>{engine.type}</div>
}

// ✅ Client Component — audio, animation, interaction
'use client'
export function AccelerateButton() {
  const [isHeld, setIsHeld] = useState(false)
  ...
}
```

---

## Pages Are Thin

Pages import components — they never contain logic or JSX beyond layout.

```typescript
// ✅ Good
export default function CarPage({ params }: { params: { slug: string } }) {
  const car = getCarBySlug(params.slug)
  if (!car) notFound()
  return <CarDetailView car={car} />
}

// ❌ Bad — logic and JSX inside page
export default function CarPage({ params }) {
  const [rpm, setRpm] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <div>
      <h1>Ferrari 458</h1>
      <button onClick={() => setIsPlaying(true)}>...</button>
      ...80 more lines
    </div>
  )
}
```

---

## Images — Always `next/image`

Never use raw `<img>` tags. Always `next/image` with explicit dimensions.

```typescript
// ✅ Good
import Image from 'next/image'

<Image
  src={car.images.hero}
  alt={`${car.name} hero shot`}
  width={1920}
  height={1080}
  priority        // add for above-the-fold images
  className="object-cover"
/>

// ❌ Bad
<img src={car.images.hero} alt="car" />
```

---

## Links — Always `next/link`

```typescript
// ✅ Good
import Link from 'next/link'
<Link href={`/cars/${car.slug}`}>View car</Link>

// ❌ Bad
<a href={`/cars/${car.slug}`}>View car</a>
```

---

## Lazy Loading Audio Engine

The audio engine must NEVER load on the homepage. Use `dynamic()`.

```typescript
// ✅ Good — loads only on car detail page
import dynamic from 'next/dynamic'

const AudioEngine = dynamic(
  () => import('@/components/audio/AudioEngine'),
  { ssr: false }
)

// ❌ Bad — audio engine loads everywhere
import AudioEngine from '@/components/audio/AudioEngine'
```

---

## Metadata

Every page exports metadata for SEO.

```typescript
// app/cars/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = getCarBySlug(params.slug)
  return {
    title: `${car?.name} — RevEngine`,
    description: `Hear the ${car?.name} engine sound simulator. ${car?.engine.soundCharacter}`,
  }
}
```

---

## Data Fetching

Car data is static for MVP — no API calls, no database. Import directly from `cars.ts`.

```typescript
// src/lib/data/cars.ts
export function getCarBySlug(slug: string): CarSpec | undefined {
  return cars.find(c => c.slug === slug)
}

export function getAllCars(): CarSpec[] {
  return cars
}
```