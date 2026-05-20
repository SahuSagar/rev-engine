'use client'

import { useEffect, useRef, useState } from 'react'
import { updateRPM } from '@/lib/audio/engine'

export function useRPM() {
  const [rpm, setRpm] = useState(800)
  const [isAccelerating, setIsAccelerating] = useState(false)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = () => {
      setRpm(currentRPM => updateRPM(currentRPM, isAccelerating))
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isAccelerating])

  const startAccelerating = () => setIsAccelerating(true)
  const stopAccelerating = () => setIsAccelerating(false)

  return {
    rpm,
    isAccelerating,
    startAccelerating,
    stopAccelerating,
  }
}
