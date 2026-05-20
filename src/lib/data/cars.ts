import type { CarSpec } from '@/types/car'

export const cars: CarSpec[] = [
  {
    slug: 'ferrari-458-italia',
    name: 'Ferrari 458 Italia',
    year: '2009',
    origin: 'Maranello, Italy',
    price: '$350,000',
    weight: '3,297 lbs',
    topSpeed: '202 mph',
    zeroToHundred: '3.3 seconds',
    transmission: '7-speed dual-clutch',
    engine: {
      code: 'F136 FB',
      type: 'V8 naturally aspirated',
      displacement: '4.5L',
      power: '570 hp @ 9,000 RPM',
      torque: '398 lb-ft @ 6,000 RPM',
      redline: 9000,
      soundCharacter: 'Screaming naturally aspirated masterpiece. Starts with a deep burble at idle, transitions to a throaty growl in low revs, then rises to an aggressive wail that peaks in a high-pitched shriek near redline. Every gear change is percussive and intentional.',
    },
    audio: {
      startup: '/sounds/ferrari-458/startup.mp3',
      idle: '/sounds/ferrari-458/idle.mp3',
      lowRev: '/sounds/ferrari-458/low-rev.mp3',
      midRev: '/sounds/ferrari-458/mid-rev.mp3',
      highRev: '/sounds/ferrari-458/high-rev.mp3',
    },
    images: {
      hero: '/images/ferrari-458/hero.jpg',
      side: '/images/ferrari-458/side.jpg',
      engine: '/images/ferrari-458/front.jpg',
    },
  },
] as const

export function getAllCars(): CarSpec[] {
  return cars
}

export function getCarBySlug(slug: string): CarSpec | undefined {
  return cars.find(c => c.slug === slug)
}
