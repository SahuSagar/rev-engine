# Testing Rules

## Stack

- **Vitest** — unit and integration tests
- **React Testing Library** — component tests
- **Playwright** — end-to-end tests

---

## What to Test

### Always test:
- RPM physics calculations (`updateRPM`, `getLayerGains`)
- Audio crossfade logic (correct gain per RPM value)
- Car data utilities (`getCarBySlug`, `getAllCars`)
- TypeScript utility functions in `src/lib/`

### Test when complex:
- Tachometer angle calculation
- React components with meaningful interaction logic

### Skip unit tests for:
- Static display components (just rendering data)
- Tailwind class strings
- Next.js page files (covered by E2E)

---

## Unit Test Structure

```typescript
// src/lib/audio/__tests__/engine.test.ts
import { describe, it, expect } from 'vitest'
import { getLayerGains, updateRPM } from '../engine'

describe('getLayerGains', () => {
  it('returns full idle gain at idle RPM', () => {
    const gains = getLayerGains(800)
    expect(gains.idle).toBe(1.0)
    expect(gains.low).toBe(0)
    expect(gains.mid).toBe(0)
    expect(gains.high).toBe(0)
  })

  it('crossfades idle and low between 1000–1500 RPM', () => {
    const gains = getLayerGains(1500)
    expect(gains.idle).toBeGreaterThan(0)
    expect(gains.low).toBeGreaterThan(0)
  })

  it('returns full high gain at redline', () => {
    const gains = getLayerGains(9000)
    expect(gains.high).toBe(1.0)
  })
})

describe('updateRPM', () => {
  it('never exceeds MAX_RPM when accelerating', () => {
    const rpm = updateRPM(9000, true)
    expect(rpm).toBe(9000)
  })

  it('never drops below IDLE_RPM when decelerating', () => {
    const rpm = updateRPM(800, false)
    expect(rpm).toBe(800)
  })

  it('rises when accelerating', () => {
    const rpm = updateRPM(1000, true)
    expect(rpm).toBeGreaterThan(1000)
  })

  it('falls when not accelerating', () => {
    const rpm = updateRPM(5000, false)
    expect(rpm).toBeLessThan(5000)
  })
})
```

---

## E2E Tests (Playwright)

```typescript
// e2e/car-detail.spec.ts
import { test, expect } from '@playwright/test'

test('homepage shows Ferrari 458 card', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Ferrari 458 Italia')).toBeVisible()
})

test('clicking car navigates to detail page', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="car-card-ferrari-458-italia"]')
  await expect(page).toHaveURL('/cars/ferrari-458-italia')
})

test('car detail page shows engine specs', async ({ page }) => {
  await page.goto('/cars/ferrari-458-italia')
  await expect(page.getByText('Ferrari F136 FB')).toBeVisible()
  await expect(page.getByText('9,000 RPM')).toBeVisible()
})

test('accelerate button is present on car page', async ({ page }) => {
  await page.goto('/cars/ferrari-458-italia')
  await expect(page.getByTestId('accelerate-button')).toBeVisible()
})
```

---

## Test File Location

Co-locate unit tests with source files:
```
src/lib/audio/engine.ts
src/lib/audio/__tests__/engine.test.ts

src/lib/data/cars.ts
src/lib/data/__tests__/cars.test.ts
```

E2E tests in project root:
```
e2e/
  homepage.spec.ts
  car-detail.spec.ts
```

---

## Running Tests

```bash
npm run test          # Vitest unit tests (watch mode)
npm run test:run      # Vitest single run (CI)
npm run test:e2e      # Playwright E2E
npm run test:coverage # Coverage report
```