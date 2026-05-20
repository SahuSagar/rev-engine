import { create } from 'zustand'

interface AudioState {
  rpm: number
  isAccelerating: boolean
  isEngineOn: boolean
  volume: number
  setRpm: (rpm: number) => void
  setIsAccelerating: (value: boolean) => void
  setIsEngineOn: (value: boolean) => void
  setVolume: (volume: number) => void
}

export const useAudioStore = create<AudioState>(set => ({
  rpm: 800,
  isAccelerating: false,
  isEngineOn: false,
  volume: 80,
  setRpm: rpm => set({ rpm }),
  setIsAccelerating: isAccelerating => set({ isAccelerating }),
  setIsEngineOn: isEngineOn => set({ isEngineOn }),
  setVolume: volume => set({ volume }),
}))
