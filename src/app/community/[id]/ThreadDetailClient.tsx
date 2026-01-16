'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Thread, ThreadPost } from '@/types/community'
import { PostCard, ReplyForm, LikeButton } from '@/components/community'
import type { User } from '@supabase/supabase-js'

interface ThreadDetailClientProps {
  thread: Thread
  posts: ThreadPost[]
  user: User | null
  category: { label: string; icon: string; color: string }
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

export default function ThreadDetailClient({ thread, posts, user, category }: ThreadDetailClientProps) {
  const [localPosts, setLocalPosts] = useState(posts)
  const [isLiked, setIsLiked] = useState(thread.isLikedByUser)
  const [likesCount, setLikesCount] = useState(thread.likesCount)

  const handleThreadLike = () => {
    if (!user) return
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
    // In production, call Supabase
  }

  const handlePostLike = (postId: string) => {
    if (!user) return
    setLocalPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLikedByUser: !post.isLikedByUser,
          likesCount: post.isLikedByUser ? post.likesCount - 1 : post.likesCount + 1,
        }
      }
      return post
    }))
    // In production, call Supabase
  }

  const handleReply = async (content: string) => {
    if (!user) return

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    const newPost: ThreadPost = {
      id: `post-${Date.now()}`,
      threadId: thread.id,
      author: {
        id: user.id,
        email: user.email || '',
        fullName: user.user_metadata?.full_name,
        avatarUrl: user.user_metadata?.avatar_url,
      },
      content,
      isSolution: false,
      likesCount: 0,
      isLikedByUser: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setLocalPosts(prev => [...prev, newPost])
  }

  const authorInitials = (thread.author.fullName || thread.author.email)
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link href="/community" className="hover:text-accent-sport transition-colors">
          Communauté
        </Link>
        <span>›</span>
        <span className={`px-2 py-0.5 rounded-full text-xs ${category.color}`}>
          {category.icon} {category.label}
        </span>
      </nav>

      {/* Thread Header */}
      <article className="bg-white border border-editorial rounded-lg overflow-hidden mb-8">
        {/* Pinned/Locked badges */}
        {(thread.isPinned || thread.isLocked) && (
          <div className="px-6 py-2 bg-secondary/50 border-b border-editorial flex items-center gap-4 text-xs">
            {thread.isPinned && (
              <span className="flex items-center gap-1 text-accent-mvp font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2V5zm2 0v2h6V5H7z" />
                </svg>
                Sujet épinglé
              </span>
            )}
            {thread.isLocked && (
              <span className="flex items-center gap-1 text-muted font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Verrouillé
              </span>
            )}
          </div>
        )}

        <div className="p-6">
          {/* Title */}
          <h1 className="font-editorial text-3xl font-bold text-primary mb-4">
            {thread.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-4 mb-6">
            {thread.author.avatarUrl ? (
              <img 
                src={thread.author.avatarUrl} 
                alt={thread.author.fullName || thread.author.email}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-sport to-accent-mvp flex items-center justify-center text-white font-semibold">
                {authorInitials}
              </div>
            )}
            <div>
              <div className="font-semibold text-primary">
                {thread.author.fullName || thread.author.email.split('@')[0]}
              </div>
              <time className="text-sm text-muted">
                {formatDate(thread.createdAt)}
              </time>
            </div>
          </div>

          {/* Content */}
          {thread.content && (
            <div className="prose prose-lg max-w-none text-primary mb-6">
              <p className="whitespace-pre-wrap leading-relaxed">
                {thread.content}
              </p>
            </div>
          )}

          {/* Stats & Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-editorial">
            <div className="flex items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{thread.viewsCount} vues</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{localPosts.length} réponse{localPosts.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            <LikeButton
              count={likesCount}
              isLiked={isLiked}
              onClick={handleThreadLike}
              disabled={!user}
            />
          </div>
        </div>
      </article>

      {/* Replies Section */}
      <section>
        <h2 className="font-editorial text-xl font-bold text-primary mb-6">
          {localPosts.length} Réponse{localPosts.length !== 1 ? 's' : ''}
        </h2>

        {/* Posts */}
        <div className="space-y-4 mb-8">
          {localPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              isFirstPost={post.author.id === thread.author.id}
              onLike={handlePostLike}
            />
          ))}
        </div>

        {/* Reply Form */}
        <ReplyForm
          threadId={thread.id}
          user={user}
          onSubmit={handleReply}
          isLocked={thread.isLocked}
        />
      </section>

      {/* Back to community */}
      <div className="mt-8 text-center">
        <Link 
          href="/community"
          className="inline-flex items-center gap-2 text-muted hover:text-accent-sport transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à la communauté
        </Link>
      </div>
    </div>
  )
}
