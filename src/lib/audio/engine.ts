import type { AudioGains } from '@/types/car'

const IDLE_RPM = 800
const MAX_RPM = 9000
const RISE_FACTOR = 0.08
const FALL_FACTOR = 0.06

export function getLayerGains(rpm: number): AudioGains {
  return {
    idle:
      rpm < 1500 ? 1.0 : Math.max(0, 1 - (rpm - 1500) / 1500),

    low:
      rpm < 1000
        ? 0
        : rpm < 2500
          ? (rpm - 1000) / 1500
          : rpm < 4000
            ? 1.0
            : Math.max(0, 1 - (rpm - 4000) / 1500),

    mid:
      rpm < 3000
        ? 0
        : rpm < 4500
          ? (rpm - 3000) / 1500
          : rpm < 6500
            ? 1.0
            : Math.max(0, 1 - (rpm - 6500) / 1500),

    high:
      rpm < 5000 ? 0 : Math.min(1, (rpm - 5000) / 2000),
  }
}

export function updateRPM(currentRPM: number, isAccelerating: boolean): number {
  if (isAccelerating) {
    return Math.min(currentRPM + (MAX_RPM - currentRPM) * RISE_FACTOR, MAX_RPM)
  }
  return Math.max(currentRPM * (1 - FALL_FACTOR), IDLE_RPM)
}

export function getPlaybackRate(rpm: number): number {
  const base = 1.0
  const range = 0.3
  return base + (rpm / MAX_RPM) * range
}
