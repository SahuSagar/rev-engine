'use client'

export function useAudioEngine() {
  return {
    startEngine: () => {},
    stopEngine: () => {},
    isLoaded: false,
    isSupported: typeof AudioContext !== 'undefined',
    error: null as string | null,
  }
}
