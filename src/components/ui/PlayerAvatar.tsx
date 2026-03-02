import Image from 'next/image'

interface PlayerAvatarProps {
  /** URL d'une vraie photo du joueur */
  photoUrl?: string | null
  /** Emoji de fallback (ex: ⚡, 🎯) */
  emoji?: string
  /** Nom complet du joueur (pour alt et initiales) */
  name: string
  /** Numéro de maillot (affiché en overlay si fourni) */
  jerseyNumber?: number | null
  /** Taille prédéfinie */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  /** Forme du conteneur */
  shape?: 'circle' | 'rounded'
  /** Classes CSS supplémentaires */
  className?: string
}

const sizeMap = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-xl',
  xl: 'w-16 h-16 text-2xl',
  hero: 'w-24 h-24 text-5xl',
}

const pixelMap: Record<string, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  hero: 96,
}

export default function PlayerAvatar({
  photoUrl,
  emoji,
  name,
  jerseyNumber,
  size = 'md',
  shape = 'circle',
  className = '',
}: PlayerAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-xl'
  const px = pixelMap[size] || 40

  return (
    <div
      className={`
        relative flex-shrink-0 overflow-hidden
        ${sizeMap[size]} ${shapeClass}
        bg-white/5 border border-white/10 shadow-inner
        flex items-center justify-center
        ${className}
      `}
    >
      {photoUrl ? (
        <Image src={photoUrl} alt={name} fill className="object-cover" sizes={`${px}px`} />
      ) : emoji ? (
        <span className="drop-shadow-lg select-none">{emoji}</span>
      ) : (
        <span className="font-bold text-white/70 select-none">{initials}</span>
      )}
      {jerseyNumber != null && (
        <span className="absolute -bottom-0.5 -right-0.5 bg-white/20 backdrop-blur-sm text-[0.5em] font-bold text-white rounded-full w-[1.4em] h-[1.4em] flex items-center justify-center border border-white/10">
          {jerseyNumber}
        </span>
      )}
    </div>
  )
}
