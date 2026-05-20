'use client'

interface SoundControlsProps {
  volume: number
  onVolumeChange: (volume: number) => void
  isEngineOn: boolean
  onEngineToggle: () => void
}

export function SoundControls({
  volume,
  onVolumeChange,
  isEngineOn,
  onEngineToggle,
}: SoundControlsProps) {
  return (
    <div>
      <button onClick={onEngineToggle}>
        {isEngineOn ? 'STOP ENGINE' : 'START ENGINE'}
      </button>
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={e => onVolumeChange(Number(e.target.value))}
      />
    </div>
  )
}
