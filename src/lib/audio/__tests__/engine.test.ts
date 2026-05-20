import { describe, it, expect } from 'vitest'
import { getLayerGains, updateRPM, getPlaybackRate, IDLE_RPM, MAX_RPM } from '../engine'

describe('getLayerGains', () => {
  it('returns full idle gain at idle RPM', () => {
    const gains = getLayerGains(800)
    expect(gains.idle).toBe(1.0)
    expect(gains.low).toBe(0)
    expect(gains.mid).toBe(0)
    expect(gains.high).toBe(0)
  })

  it('crossfades idle and low between 1500–3000 RPM', () => {
    const gains = getLayerGains(2000)
    expect(gains.idle).toBeGreaterThan(0)
    expect(gains.idle).toBeLessThan(1)
    expect(gains.low).toBeGreaterThan(0)
    expect(gains.low).toBeLessThan(1)
  })

  it('returns full low gain at 2500 RPM', () => {
    const gains = getLayerGains(2500)
    expect(gains.low).toBe(1.0)
  })

  it('crossfades low and mid at 3500 RPM', () => {
    const gains = getLayerGains(3500)
    expect(gains.low).toBeGreaterThan(0)
    expect(gains.mid).toBeGreaterThan(0)
  })

  it('returns full high gain at redline', () => {
    const gains = getLayerGains(9000)
    expect(gains.high).toBe(1.0)
    expect(gains.mid).toBeLessThan(1)
  })

  it('never has gain values outside [0, 1]', () => {
    for (let rpm = 0; rpm <= 9000; rpm += 500) {
      const gains = getLayerGains(rpm)
      Object.values(gains).forEach(gain => {
        expect(gain).toBeGreaterThanOrEqual(0)
        expect(gain).toBeLessThanOrEqual(1)
      })
    }
  })
})

describe('updateRPM', () => {
  it('never exceeds MAX_RPM when accelerating', () => {
    const rpm = updateRPM(9000, true)
    expect(rpm).toBe(MAX_RPM)
  })

  it('never drops below IDLE_RPM when decelerating', () => {
    const rpm = updateRPM(800, false)
    expect(rpm).toBe(IDLE_RPM)
  })

  it('rises when accelerating', () => {
    const rpm = updateRPM(1000, true)
    expect(rpm).toBeGreaterThan(1000)
  })

  it('falls when not accelerating', () => {
    const rpm = updateRPM(5000, false)
    expect(rpm).toBeLessThan(5000)
  })

  it('accelerates slower near redline (asymptotic)', () => {
    const lowAccel = updateRPM(1000, true) - 1000
    const highAccel = updateRPM(8000, true) - 8000
    expect(highAccel).toBeLessThan(lowAccel)
  })

  it('decelerates with inertia', () => {
    const step1 = updateRPM(5000, false)
    const step2 = updateRPM(step1, false)
    const step3 = updateRPM(step2, false)

    // Should approach IDLE_RPM asymptotically
    expect(step1).toBeGreaterThan(IDLE_RPM)
    expect(step2).toBeGreaterThan(IDLE_RPM)
    expect(step3).toBeGreaterThan(IDLE_RPM)
    expect(step1).toBeGreaterThan(step2)
    expect(step2).toBeGreaterThan(step3)
  })
})

describe('getPlaybackRate', () => {
  it('returns base rate at 0 RPM', () => {
    const rate = getPlaybackRate(0)
    expect(rate).toBeCloseTo(1.0, 2)
  })

  it('increases pitch with RPM', () => {
    const rate1000 = getPlaybackRate(1000)
    const rate5000 = getPlaybackRate(5000)
    const rate9000 = getPlaybackRate(9000)

    expect(rate1000).toBeLessThan(rate5000)
    expect(rate5000).toBeLessThan(rate9000)
  })

  it('reaches max pitch at redline', () => {
    const rate = getPlaybackRate(MAX_RPM)
    expect(rate).toBeCloseTo(1.3, 2)
  })

  it('never exceeds 1.3x pitch', () => {
    for (let rpm = 0; rpm <= 9000; rpm += 1000) {
      const rate = getPlaybackRate(rpm)
      expect(rate).toBeLessThanOrEqual(1.3)
    }
  })
})
