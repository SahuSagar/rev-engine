'use client'

interface TachometerProps {
  rpm: number
  maxRPM: number
}

export function Tachometer({ rpm, maxRPM }: TachometerProps) {
  return (
    <div>
      <span>{rpm}</span>
      <span>/ {maxRPM} RPM</span>
    </div>
  )
}
