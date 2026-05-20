'use client'

import dynamic from 'next/dynamic'

const AudioEngine = dynamic(() => import('./AudioEngine').then(mod => ({ default: mod.AudioEngine })), {
  ssr: false,
})

interface AudioEngineWrapperProps {
  carSlug: string
}

export function AudioEngineWrapper({ carSlug }: AudioEngineWrapperProps) {
  return <AudioEngine carSlug={carSlug} />
}
