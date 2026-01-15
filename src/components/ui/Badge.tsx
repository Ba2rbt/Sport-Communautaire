import { type ReactNode } from 'react'

type BadgeVariant = 'default' | 'mvp' | 'live' | 'sport' | 'muted'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-primary/10 text-primary',
  mvp: 'bg-accent-mvp text-white',
  live: 'bg-accent-live text-white',
  sport: 'bg-accent-sport text-white',
  muted: 'bg-muted/20 text-muted',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
}

export function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-semibold tracking-wider uppercase rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}

interface BadgeMVPProps {
  rank?: number
  rating?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function BadgeMVP({ rank, rating, size = 'md', className = '' }: BadgeMVPProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {rank && (
        <span className={`
          flex items-center justify-center rounded-full bg-accent-mvp text-white font-bold shadow-lg shadow-accent-mvp/30
          ${size === 'sm' ? 'w-6 h-6 text-xs' : size === 'lg' ? 'w-10 h-10 text-base' : 'w-8 h-8 text-sm'}
        `}>
          {rank}
        </span>
      )}
      <span className={`
        inline-flex items-center gap-1.5 bg-accent-mvp/10 text-accent-mvp font-bold rounded-full
        ${sizeStyles[size]}
      `}>
        {/* Trophy Icon */}
        <svg 
          className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-1.17a3 3 0 01-5.66 0H8.83a3 3 0 01-5.66 0H2a2 2 0 110-4h1.17A3 3 0 015 5zm5-1a1 1 0 100 2 1 1 0 000-2zm-4 6a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2zm-4 4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
        </svg>
        MVP
        {rating && (
          <span className="ml-1 font-bold">{rating.toFixed(1)}</span>
        )}
      </span>
    </div>
  )
}

interface BadgeLiveProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function BadgeLive({ size = 'md', className = '' }: BadgeLiveProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        bg-accent-live text-white font-bold rounded-full
        ${sizeStyles[size]}
        ${className}
      `}
    >
      <span className={`
        rounded-full bg-white animate-pulse-live
        ${size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-2 h-2'}
      `} />
      LIVE
    </span>
  )
}

export default Badge
