'use client'

import { useState } from 'react'
import { useRPM } from '@/hooks/useRPM'
import { useAudioEngine } from '@/hooks/useAudioEngine'
import { Tachometer } from './Tachometer'
import { AccelerateButton } from './AccelerateButton'
import { SoundControls } from './SoundControls'

interface AudioEngineProps {
  carSlug: string
}

const MAX_RPM = 9000

export function AudioEngine({ carSlug }: AudioEngineProps) {
  const [isEngineOn, setIsEngineOn] = useState(false)
  const [volume, setVolume] = useState(80)
  const { rpm, isAccelerating, startAccelerating, stopAccelerating } = useRPM()
  const { isLoaded, error } = useAudioEngine({
    carSlug,
    rpm,
    isEngineOn,
    volume,
  })

  if (error) {
    return (
      <div className="text-center text-ferrari-red">
        <p>Audio not supported in your browser</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-12">
      <Tachometer rpm={rpm} maxRPM={MAX_RPM} />

      <AccelerateButton
        onAccelerateStart={startAccelerating}
        onAccelerateEnd={stopAccelerating}
        disabled={!isEngineOn || !isLoaded}
        isRevving={isAccelerating && isEngineOn}
      />

      <SoundControls
        volume={volume}
        onVolumeChange={setVolume}
        isEngineOn={isEngineOn}
        onEngineToggle={() => setIsEngineOn(!isEngineOn)}
      />
    </div>
  )
}
