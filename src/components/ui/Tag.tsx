import Link from 'next/link'
import { type ReactNode } from 'react'

type TagVariant = 'sport' | 'default' | 'outline' | 'muted'

interface TagProps {
  children: ReactNode
  variant?: TagVariant
  href?: string
  onClick?: () => void
  isActive?: boolean
  className?: string
}

const variantStyles: Record<TagVariant, { base: string; active: string }> = {
  sport: {
    base: 'bg-accent-sport/10 text-accent-sport hover:bg-accent-sport hover:text-white',
    active: 'bg-accent-sport text-white',
  },
  default: {
    base: 'bg-primary/5 text-primary hover:bg-primary hover:text-white',
    active: 'bg-primary text-white',
  },
  outline: {
    base: 'bg-transparent border border-editorial text-muted hover:border-accent-sport hover:text-accent-sport',
    active: 'border-accent-sport text-accent-sport bg-accent-sport/5',
  },
  muted: {
    base: 'bg-muted/10 text-muted hover:bg-muted/20',
    active: 'bg-muted/30 text-primary',
  },
}

export function Tag({ children, variant = 'default', href, onClick, isActive, className = '' }: TagProps) {
  const styles = variantStyles[variant]
  
  const tagClassName = `
    inline-flex items-center
    px-3 py-1.5
    text-xs font-semibold tracking-widest uppercase
    rounded-full
    transition-all duration-200
    cursor-pointer
    ${isActive ? styles.active : styles.base}
    ${className}
  `

  if (href) {
    return (
      <Link href={href} className={tagClassName}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={tagClassName}>
      {children}
    </button>
  )
}

interface TagLigueProps {
  league: string
  href?: string
  isActive?: boolean
  className?: string
}

export function TagLigue({ league, href, isActive, className = '' }: TagLigueProps) {
  const content = (
    <span
      className={`
        inline-flex items-center gap-2
        px-4 py-2
        text-xs font-bold tracking-widest uppercase
        rounded-full
        transition-all duration-200
        ${isActive 
          ? 'bg-accent-sport text-white shadow-lg shadow-accent-sport/25' 
          : 'bg-accent-sport/10 text-accent-sport hover:bg-accent-sport hover:text-white'
        }
        ${className}
      `}
    >
      {/* League icon */}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {league}
    </span>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}

export default Tag
