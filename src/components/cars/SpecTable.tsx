import type { CarSpec } from '@/types/car'

interface SpecTableProps {
  car: CarSpec
}

export function SpecTable({ car }: SpecTableProps) {
  return (
    <table>
      <tbody>
        <tr>
          <td>Engine</td>
          <td>{car.engine.code}</td>
        </tr>
      </tbody>
    </table>
  )
}
