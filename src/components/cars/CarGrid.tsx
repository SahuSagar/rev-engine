import type { CarSpec } from '@/types/car'
import { CarCard } from './CarCard'

interface CarGridProps {
  cars: CarSpec[]
}

export function CarGrid({ cars }: CarGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {cars.map(car => (
        <CarCard key={car.slug} car={car} />
      ))}
    </div>
  )
}
