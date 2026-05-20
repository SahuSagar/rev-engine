import type { CarSpec } from '@/types/car'

interface CarGridProps {
  cars: CarSpec[]
}

export function CarGrid({ cars }: CarGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cars.map(car => (
        <div key={car.slug}>{car.name}</div>
      ))}
    </div>
  )
}
