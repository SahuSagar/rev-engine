interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary'
}

export function Button({ children, onClick, disabled, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  )
}
