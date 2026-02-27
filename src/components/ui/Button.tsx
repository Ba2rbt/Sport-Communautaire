import { forwardRef, type ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'live'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-accent-live to-emerald-600 hover:to-emerald-500 text-white shadow-lg shadow-accent-live/20 hover:shadow-accent-live/40 border-0',
  secondary: 'bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20 shadow-sm',
  outline: 'bg-transparent border border-white/20 text-white hover:border-accent-live hover:text-accent-live',
  ghost: 'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white',
  live: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/30 animate-pulse-slow',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
}

export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`
        ${variantStyles.live}
        ${sizeStyles[size]}
        inline-flex items-center justify-center gap-2
        font-semibold rounded-full
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-accent-live focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  )
)
PrimaryButton.displayName = 'PrimaryButton'

export const SecondaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`
        ${variantStyles.secondary}
        ${sizeStyles[size]}
        inline-flex items-center justify-center gap-2
        font-semibold rounded-full
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  )
)
SecondaryButton.displayName = 'SecondaryButton'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        inline-flex items-center justify-center gap-2
        font-semibold rounded-full
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  )
)
Button.displayName = 'Button'

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

export default Button
