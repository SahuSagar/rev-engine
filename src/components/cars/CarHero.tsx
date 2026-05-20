import type { CarSpec } from '@/types/car'

interface CarHeroProps {
  car: CarSpec
}

export function CarHero({ car }: CarHeroProps) {
  return (
    <div>
      <h1>{car.name}</h1>
    </div>
  )
}
