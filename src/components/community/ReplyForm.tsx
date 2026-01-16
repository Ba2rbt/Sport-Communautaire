'use client'

import { useState } from 'react'
import { PrimaryButton } from '@/components/ui'
import type { User } from '@supabase/supabase-js'

interface ReplyFormProps {
  threadId: string
  user: User | null
  onSubmit: (content: string) => Promise<void>
  isLocked?: boolean
}

export default function ReplyForm({ threadId, user, onSubmit, isLocked }: ReplyFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !user) return

    setIsSubmitting(true)
    setError(null)

    try {
      await onSubmit(content.trim())
      setContent('')
    } catch (err) {
      setError('Erreur lors de l\'envoi. Réessayez.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLocked) {
    return (
      <div className="bg-secondary/50 border border-editorial rounded-lg p-6 text-center">
        <svg className="w-8 h-8 mx-auto text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-muted">Ce fil de discussion est verrouillé.</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-secondary/50 border border-editorial rounded-lg p-6 text-center">
        <p className="text-muted mb-4">Connectez-vous pour participer à la discussion.</p>
        <a 
          href={`/login?redirectTo=/community/${threadId}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent-sport text-white font-semibold rounded-full hover:bg-accent-sport/90 transition-colors"
        >
          Se connecter
        </a>
      </div>
    )
  }

  const userInitial = user.email?.[0]?.toUpperCase() || 'U'

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-editorial rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user.user_metadata?.avatar_url ? (
              <img 
                src={user.user_metadata.avatar_url} 
                alt="Your avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-accent-sport flex items-center justify-center text-white font-semibold">
                {userInitial}
              </div>
            )}
          </div>

          {/* Textarea */}
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Écrivez votre réponse..."
              rows={4}
              maxLength={5000}
              className="w-full px-4 py-3 border border-editorial rounded-lg bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-sport/50 focus:border-accent-sport transition-all resize-none"
              disabled={isSubmitting}
            />
            
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-secondary/30 border-t border-editorial flex items-center justify-between">
        <span className="text-xs text-muted">
          {content.length}/5000 caractères
        </span>
        <PrimaryButton
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="!px-6 !py-2"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Envoi...
            </span>
          ) : (
            'Répondre'
          )}
        </PrimaryButton>
      </div>
    </form>
  )
}
