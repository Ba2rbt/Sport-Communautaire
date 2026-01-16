'use client'

import type { ThreadPost } from '@/types/community'
import LikeButton from './LikeButton'

interface PostCardProps {
  post: ThreadPost
  isFirstPost?: boolean
  onLike?: (postId: string) => void
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function AuthorAvatar({ author, size = 'md' }: { author: ThreadPost['author']; size?: 'sm' | 'md' }) {
  const initials = (author.fullName || author.email)
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-12 h-12 text-sm'

  return author.avatarUrl ? (
    <img 
      src={author.avatarUrl} 
      alt={author.fullName || author.email}
      className={`${sizeClass} rounded-full object-cover`}
    />
  ) : (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-accent-sport to-accent-mvp flex items-center justify-center text-white font-semibold`}>
      {initials}
    </div>
  )
}

export default function PostCard({ post, isFirstPost, onLike }: PostCardProps) {
  return (
    <article className={`
      relative bg-white border border-editorial rounded-lg overflow-hidden
      ${isFirstPost ? 'ring-2 ring-accent-sport/20' : ''}
    `}>
      {/* Solution badge */}
      {post.isSolution && (
        <div className="absolute top-0 right-0 bg-accent-live text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
          ✓ Solution
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <AuthorAvatar author={post.author} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-primary">
                {post.author.fullName || post.author.email.split('@')[0]}
              </span>
              {isFirstPost && (
                <span className="px-2 py-0.5 bg-accent-sport/10 text-accent-sport text-xs font-medium rounded-full">
                  Auteur
                </span>
              )}
            </div>
            <time className="text-xs text-muted">
              {formatDate(post.createdAt)}
            </time>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none text-primary">
          <p className="whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-editorial flex items-center justify-between">
          <LikeButton
            count={post.likesCount}
            isLiked={post.isLikedByUser}
            onClick={() => onLike?.(post.id)}
            size="sm"
          />

          <div className="flex items-center gap-2">
            <button className="text-sm text-muted hover:text-primary transition-colors">
              Citer
            </button>
            <button className="text-sm text-muted hover:text-primary transition-colors">
              Signaler
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
