'use client'

import type { CarSpec } from '@/types/car'

interface CarCardProps {
  car: CarSpec
  onClick: (slug: string) => void
}

export function CarCard({ car, onClick }: CarCardProps) {
  return (
    <div onClick={() => onClick(car.slug)}>
      {car.name}
    </div>
  )
}
