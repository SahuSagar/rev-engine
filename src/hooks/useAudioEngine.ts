'use client'

import { useEffect, useRef, useState } from 'react'
import { EngineAudio } from '@/lib/audio/engine'

interface UseAudioEngineProps {
  carSlug: string
  rpm: number
  isEngineOn: boolean
  volume: number
  onError?: (error: string) => void
}

export function useAudioEngine({
  carSlug,
  rpm,
  isEngineOn,
  volume,
  onError,
}: UseAudioEngineProps) {
  const engineRef = useRef<EngineAudio | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isSupported = typeof AudioContext !== 'undefined'

  useEffect(() => {
    if (!isSupported) {
      const msg = 'Web Audio API not supported'
      setError(msg)
      onError?.(msg)
      return
    }

    const init = async () => {
      try {
        engineRef.current = new EngineAudio()
        await engineRef.current.preloadAudio(carSlug)
        setIsLoaded(true)
      } catch (err) {
        const msg = `Failed to load audio: ${err instanceof Error ? err.message : 'Unknown error'}`
        setError(msg)
        onError?.(msg)
      }
    }

    init()

    return () => {
      engineRef.current?.cleanup()
    }
  }, [carSlug, isSupported, onError])

  useEffect(() => {
    if (!isLoaded || !engineRef.current) return

    if (isEngineOn) {
      engineRef.current.startEngine(volume)
    } else {
      engineRef.current.stopEngine()
    }
  }, [isEngineOn, isLoaded, volume])

  useEffect(() => {
    if (!isEngineOn || !engineRef.current || !isLoaded) return
    engineRef.current.updateAudio(rpm, volume)
  }, [rpm, isEngineOn, isLoaded, volume])

  return {
    isLoaded,
    isSupported,
    error,
  }
}
