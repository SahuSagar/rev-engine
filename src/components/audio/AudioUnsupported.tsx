'use client'

interface AudioUnsupportedProps {
  children?: React.ReactNode
}

export function AudioUnsupported({ children }: AudioUnsupportedProps) {
  const isSupported =
    typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined'

  if (!isSupported) {
    return (
      <div className="rounded-2xl border border-white/10 bg-ferrari-card p-6">
        <h3 className="font-semibold text-white">Audio Not Supported</h3>
        <p className="mt-2 text-sm text-white/70">
          Your browser doesn't support Web Audio API. Please use a modern browser like Chrome, Safari, Firefox, or Edge.
        </p>
      </div>
    )
  }

  return <>{children}</>
}
