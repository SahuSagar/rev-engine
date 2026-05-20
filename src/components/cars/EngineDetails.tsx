import type { EngineSpec } from '@/types/car'

interface EngineDetailsProps {
  engine: EngineSpec
}

export function EngineDetails({ engine }: EngineDetailsProps) {
  return (
    <div>
      <h2>{engine.type}</h2>
    </div>
  )
}
