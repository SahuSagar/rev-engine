import type { CarSpec } from '@/types/car'

export const cars: CarSpec[] = []

export function getAllCars(): CarSpec[] {
  return cars
}

export function getCarBySlug(slug: string): CarSpec | undefined {
  return cars.find(c => c.slug === slug)
}
