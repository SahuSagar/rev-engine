'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface AccelerateButtonProps {
  onAccelerateStart: () => void
  onAccelerateEnd: () => void
  disabled?: boolean
  isRevving?: boolean
}

export function AccelerateButton({
  onAccelerateStart,
  onAccelerateEnd,
  disabled,
  isRevving,
}: AccelerateButtonProps) {
  return (
    <motion.button
      onMouseDown={onAccelerateStart}
      onMouseUp={onAccelerateEnd}
      onMouseLeave={onAccelerateEnd}
      onTouchStart={onAccelerateStart}
      onTouchEnd={onAccelerateEnd}
      disabled={disabled}
      data-testid="accelerate-button"
      aria-label={isRevving ? "Engine revving" : "Hold to accelerate engine"}
      aria-pressed={isRevving}
      whileTap={{ scale: 0.97 }}
      animate={isRevving ? { scale: 1.05 } : { scale: 1 }}
      className={cn(
        'px-8 py-4 rounded-xl font-semibold text-white transition-all duration-150',
        'focus-visible:ring-2 focus-visible:ring-ferrari-red',
        'cursor-pointer select-none',
        isRevving
          ? 'bg-ferrari-red shadow-lg shadow-ferrari-red/40 ring-4 ring-ferrari-red/40'
          : 'bg-ferrari-red hover:brightness-110',
        disabled && 'opacity-50 cursor-not-allowed hover:brightness-100'
      )}
    >
      {isRevving ? 'REVVING...' : 'HOLD TO REV'}
    </motion.button>
  )
}
