'use client'

import { useState } from 'react'

export function useRPM() {
  const [rpm, setRpm] = useState(800)

  return {
    rpm,
    setRpm,
    startAccelerating: () => {},
    stopAccelerating: () => {},
  }
}
