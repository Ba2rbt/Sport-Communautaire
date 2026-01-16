'use client'

interface LikeButtonProps {
  count: number
  isLiked: boolean
  onClick?: () => void
  size?: 'sm' | 'md'
  disabled?: boolean
}

export default function LikeButton({ count, isLiked, onClick, size = 'md', disabled }: LikeButtonProps) {
  const sizeClasses = size === 'sm' 
    ? 'text-sm gap-1' 
    : 'text-base gap-1.5'

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center ${sizeClasses}
        ${isLiked 
          ? 'text-accent-mvp' 
          : 'text-muted hover:text-accent-mvp'
        }
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
      `}
      title={isLiked ? 'Retirer le like' : 'Liker'}
    >
      <svg 
        className={`${iconSize} transition-transform ${isLiked ? 'scale-110' : ''}`} 
        fill={isLiked ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
      <span className="font-medium">{count}</span>
    </button>
  )
}
