'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { PrimaryButton } from '@/components/ui'

interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  createdAt: string
}

interface MatchDiscussionProps {
  matchId: string
  user: User | null
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "À l'instant"
  if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`
  if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)}h`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function CommentItem({ comment }: { comment: Comment }) {
  const initials = comment.userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex gap-4 py-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {comment.userAvatar ? (
          <img 
            src={comment.userAvatar} 
            alt={comment.userName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-sport to-accent-mvp flex items-center justify-center text-white font-semibold text-sm">
            {initials}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-primary">{comment.userName}</span>
          <span className="text-xs text-muted">{formatTimeAgo(comment.createdAt)}</span>
        </div>
        <p className="text-primary/90 leading-relaxed">{comment.content}</p>
      </div>
    </div>
  )
}

export default function MatchDiscussion({ matchId, user }: MatchDiscussionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const commentsEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // Fetch initial comments
  useEffect(() => {
    // Mock comments for demo
    const mockComments: Comment[] = [
      {
        id: '1',
        userId: 'u1',
        userName: 'Jean Dupont',
        content: 'Quel début de match incroyable ! L\'équipe à domicile domine clairement.',
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      },
      {
        id: '2',
        userId: 'u2',
        userName: 'Marie Martin',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
        content: 'Le gardien fait un match exceptionnel, déjà 3 arrêts décisifs !',
        createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString()
      },
      {
        id: '3',
        userId: 'u3',
        userName: 'Pierre Durand',
        content: 'Ce penalty était discutable selon moi... L\'arbitre aurait dû utiliser la VAR.',
        createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString()
      },
      {
        id: '4',
        userId: 'u4',
        userName: 'Sophie Bernard',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
        content: 'Allez les Bleus ! 💪🔵',
        createdAt: new Date(Date.now() - 1000 * 60).toISOString()
      }
    ]
    setComments(mockComments)
  }, [matchId])

  // Subscribe to realtime comments
  useEffect(() => {
    const channel = supabase
      .channel(`match_comments_${matchId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'match_comments',
          filter: `match_id=eq.${matchId}`
        },
        (payload) => {
          // In production, properly format the new comment
          console.log('New comment:', payload)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [matchId, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user || !newComment.trim()) return

    setIsSubmitting(true)

    try {
      // Simulate posting - in production, insert into Supabase
      const newCommentObj: Comment = {
        id: `new-${Date.now()}`,
        userId: user.id,
        userName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Utilisateur',
        userAvatar: user.user_metadata?.avatar_url,
        content: newComment.trim(),
        createdAt: new Date().toISOString()
      }
      
      setComments(prev => [...prev, newCommentObj])
      setNewComment('')
      
      // Scroll to bottom
      setTimeout(() => {
        commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (error) {
      console.error('Failed to post comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-white border border-editorial rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-editorial">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-sport/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h2 className="font-editorial text-xl font-bold text-primary">Discussion</h2>
              <p className="text-sm text-muted">{comments.length} commentaires</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="w-2 h-2 bg-accent-live rounded-full animate-pulse-live" />
            <span>Live</span>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="max-h-[400px] overflow-y-auto px-6 divide-y divide-editorial">
        {isLoading ? (
          <div className="py-8 flex justify-center">
            <div className="w-8 h-8 border-2 border-accent-sport/30 border-t-accent-sport rounded-full animate-spin" />
          </div>
        ) : comments.length === 0 ? (
          <div className="py-12 text-center">
            <svg className="w-12 h-12 mx-auto text-muted/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-muted">Soyez le premier à commenter !</p>
          </div>
        ) : (
          <>
            {comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
            <div ref={commentsEndRef} />
          </>
        )}
      </div>

      {/* Comment Form */}
      <div className="px-6 py-4 border-t border-editorial bg-secondary/20">
        {user ? (
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-shrink-0">
              {user.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-accent-sport flex items-center justify-center text-white font-semibold">
                  {user.email?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajoutez votre commentaire..."
                maxLength={1000}
                className="flex-1 px-4 py-2 border border-editorial rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-accent-sport/50 focus:border-accent-sport transition-all"
                disabled={isSubmitting}
              />
              <PrimaryButton 
                type="submit" 
                disabled={isSubmitting || !newComment.trim()}
                className="!px-6 !py-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </PrimaryButton>
            </div>
          </form>
        ) : (
          <div className="text-center py-2">
            <p className="text-muted">
              <a href={`/login?redirectTo=/match/${matchId}`} className="text-accent-sport hover:underline font-medium">
                Connectez-vous
              </a>
              {' '}pour participer à la discussion
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
