import Link from 'next/link'
import type { Thread, ThreadCategory } from '@/types/community'
import { categoryLabels } from '@/types/community'
import LikeButton from './LikeButton'

interface ThreadCardProps {
  thread: Thread
  onLike?: (threadId: string) => void
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "À l'instant"
  if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`
  if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)}h`
  if (diffInSeconds < 604800) return `Il y a ${Math.floor(diffInSeconds / 86400)}j`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function AuthorAvatar({ author }: { author: Thread['author'] }) {
  const initials = (author.fullName || author.email)
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return author.avatarUrl ? (
    <img 
      src={author.avatarUrl} 
      alt={author.fullName || author.email}
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-sport to-accent-mvp flex items-center justify-center text-white font-semibold text-sm">
      {initials}
    </div>
  )
}

export default function ThreadCard({ thread, onLike }: ThreadCardProps) {
  const category = categoryLabels[thread.category as ThreadCategory] || categoryLabels.general

  return (
    <article className="bg-white border border-editorial rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <AuthorAvatar author={thread.author} />
            <div>
              <span className="font-medium text-primary text-sm">
                {thread.author.fullName || thread.author.email.split('@')[0]}
              </span>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>{formatTimeAgo(thread.createdAt)}</span>
                {thread.isPinned && (
                  <span className="flex items-center gap-1 text-accent-mvp">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2V5zm2 0v2h6V5H7z" />
                    </svg>
                    Épinglé
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${category.color}`}>
            {category.icon} {category.label}
          </span>
        </div>

        {/* Title */}
        <Link href={`/community/${thread.id}`} className="block group">
          <h2 className="font-editorial text-xl font-bold text-primary group-hover:text-accent-sport transition-colors mb-2 line-clamp-2">
            {thread.title}
          </h2>
        </Link>

        {/* Preview */}
        {thread.content && (
          <p className="text-muted text-sm line-clamp-2 mb-4">
            {thread.content}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-editorial">
          <div className="flex items-center gap-4 text-sm text-muted">
            {/* Replies */}
            <Link 
              href={`/community/${thread.id}`}
              className="flex items-center gap-1.5 hover:text-accent-sport transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{thread.repliesCount} réponse{thread.repliesCount !== 1 ? 's' : ''}</span>
            </Link>

            {/* Views */}
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{thread.viewsCount}</span>
            </div>
          </div>

          {/* Like */}
          <LikeButton
            count={thread.likesCount}
            isLiked={thread.isLikedByUser}
            onClick={() => onLike?.(thread.id)}
            size="sm"
          />
        </div>

        {/* Last reply */}
        {thread.lastReplyAuthor && thread.lastReplyAt && (
          <div className="mt-3 pt-3 border-t border-editorial flex items-center gap-2 text-xs text-muted">
            <span>Dernière réponse par</span>
            <span className="font-medium text-primary">
              {thread.lastReplyAuthor.fullName || thread.lastReplyAuthor.email.split('@')[0]}
            </span>
            <span>•</span>
            <span>{formatTimeAgo(thread.lastReplyAt)}</span>
          </div>
        )}
      </div>
    </article>
  )
}
