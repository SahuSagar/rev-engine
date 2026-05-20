# Tooling Rules

## Project Init

```bash
npx create-next-app@latest rev-engine \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --src-dir \
  --import-alias "@/*"
```

---

## Dependencies

```bash
# Core
npm install framer-motion zustand

# Dev
npm install -D vitest @vitest/coverage-v8
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
npm install -D clsx tailwind-merge
```

---

## Utility: `cn()`

Always use `cn()` for conditional Tailwind classes — never string concatenation.

```typescript
// src/lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Usage:
```typescript
// ✅ Good
<div className={cn(
  'rounded-2xl border p-6',
  isActive && 'border-ferrari-red',
  className
)}>

// ❌ Bad
<div className={`rounded-2xl border p-6 ${isActive ? 'border-ferrari-red' : ''}`}>
```

---

## Scripts in `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

---

## Path Aliases

Always use `@/` alias — never relative paths that go up more than one level.

```typescript
// ✅ Good
import { CarCard } from '@/components/cars/CarCard'
import { getCarBySlug } from '@/lib/data/cars'
import { cn } from '@/lib/utils/cn'

// ❌ Bad
import { CarCard } from '../../../components/cars/CarCard'
```

---

## Environment Variables

```bash
# .env.local (never committed)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# .env.example (committed — template only)
NEXT_PUBLIC_SITE_URL=
```

All public env vars must be prefixed with `NEXT_PUBLIC_`.

---

## VSCode Settings

Add to `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

---

## Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| First Contentful Paint | < 1.5s |
| Audio load time | < 2s on 4G |
| Bundle size (JS) | < 200KB gzipped |

Audio files budget:
```
Each .mp3 file:  max 500KB
Total audio:     max 2.5MB per car
Images:          WebP, max 200KB per image
```