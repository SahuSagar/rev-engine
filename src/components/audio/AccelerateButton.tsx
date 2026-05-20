'use client'

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
    <button
      onMouseDown={onAccelerateStart}
      onMouseUp={onAccelerateEnd}
      onMouseLeave={onAccelerateEnd}
      onTouchStart={onAccelerateStart}
      onTouchEnd={onAccelerateEnd}
      disabled={disabled}
      data-testid="accelerate-button"
    >
      {isRevving ? 'REVVING...' : 'HOLD TO REV'}
    </button>
  )
}
