'use client'

const SWEEP = 270

export function useTachometer(rpm: number, maxRPM: number) {
  const angle = (rpm / maxRPM) * SWEEP - 135
  return { angle }
}
