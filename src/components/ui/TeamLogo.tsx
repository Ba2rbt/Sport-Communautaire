import Image from 'next/image'

interface TeamLogoProps {
  /** URL d'un vrai logo d'équipe */
  logoUrl?: string | null
  /** Emoji de fallback (ex: ⚽, 🔵) */
  logo?: string
  /** Nom de l'équipe (pour alt et initiales) */
  name: string
  /** Taille prédéfinie */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  /** Classes CSS supplémentaires */
  className?: string
}

const sizeMap = {
  xs: 'w-5 h-5 text-xs',
  sm: 'w-6 h-6 text-sm',
  md: 'w-8 h-8 text-base',
  lg: 'w-10 h-10 text-xl',
  xl: 'w-12 h-12 text-2xl',
  hero: 'w-20 h-20 text-5xl',
}

const pixelMap: Record<string, number> = {
  xs: 20,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
  hero: 80,
}

export default function TeamLogo({
  logoUrl,
  logo,
  name,
  size = 'md',
  className = '',
}: TeamLogoProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()

  const px = pixelMap[size] || 32

  return (
    <div
      className={`
        relative flex-shrink-0 overflow-hidden rounded-full
        ${sizeMap[size]}
        flex items-center justify-center
        ${className}
      `}
    >
      {logoUrl ? (
        <Image src={logoUrl} alt={name} fill className="object-contain" sizes={`${px}px`} />
      ) : logo ? (
        <span className="drop-shadow-lg select-none">{logo}</span>
      ) : (
        <span className="font-bold text-white/70 text-[0.6em] select-none">{initials}</span>
      )}
    </div>
  )
}
