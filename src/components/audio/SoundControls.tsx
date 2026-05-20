'use client'

import { cn } from '@/lib/utils/cn'

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
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-ferrari-card p-6">
      {/* Engine Toggle Button */}
      <button
        onClick={onEngineToggle}
        className={cn(
          'w-full px-6 py-3 rounded-lg font-semibold transition-all duration-150',
          'focus-visible:ring-2 focus-visible:ring-ferrari-red',
          isEngineOn
            ? 'bg-ferrari-red text-white hover:brightness-110'
            : 'border border-white/20 text-white hover:bg-white/5'
        )}
      >
        {isEngineOn ? '⏹ STOP ENGINE' : '▶ START ENGINE'}
      </button>

      {/* Volume Control */}
      <div className="space-y-3">
        <label className="block text-sm text-white/60">Volume</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={e => onVolumeChange(Number(e.target.value))}
            className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-ferrari-red"
          />
          <span className="min-w-8 text-right text-sm text-white/60">{volume}%</span>
        </div>
      </div>
    </div>
  )
}
