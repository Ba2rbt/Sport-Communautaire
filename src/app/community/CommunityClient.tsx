'use client'

import { useState } from 'react'
import type { Thread, ThreadCategory } from '@/types/community'
import { categoryLabels } from '@/types/community'
import { ThreadCard } from '@/components/community'
import { PrimaryButton } from '@/components/ui'
import type { User } from '@supabase/supabase-js'

interface CommunityClientProps {
  threads: Thread[]
  user: User
}

export default function CommunityClient({ threads, user }: CommunityClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<ThreadCategory | 'all'>('all')
  const [showNewThreadModal, setShowNewThreadModal] = useState(false)

  // Filter threads
  const filteredThreads = threads.filter(thread => {
    if (selectedCategory === 'all') return true
    return thread.category === selectedCategory
  })

  // Sort: pinned first, then by date
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const handleLike = (threadId: string) => {
    // In production, call Supabase
    console.log('Like thread:', threadId)
  }

  const categories = Object.entries(categoryLabels) as [ThreadCategory, typeof categoryLabels[ThreadCategory]][]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-editorial text-4xl font-bold text-primary mb-2">
            Communauté
          </h1>
          <p className="text-muted">
            Bienvenue {user.user_metadata?.full_name || user.email?.split('@')[0]} !
          </p>
        </div>
        <PrimaryButton onClick={() => setShowNewThreadModal(true)}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouveau sujet
        </PrimaryButton>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary text-white'
              : 'bg-secondary text-muted hover:bg-secondary/80'
          }`}
        >
          Tous
        </button>
        {categories.map(([key, { label, icon }]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              selectedCategory === key
                ? 'bg-primary text-white'
                : 'bg-secondary text-muted hover:bg-secondary/80'
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="mb-6 p-4 bg-white border border-editorial rounded-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="font-bold text-primary">{threads.length}</span>
            <span className="text-muted ml-1">sujets</span>
          </div>
          <div>
            <span className="font-bold text-primary">{threads.reduce((acc, t) => acc + t.repliesCount, 0)}</span>
            <span className="text-muted ml-1">réponses</span>
          </div>
        </div>
        <div className="text-sm text-muted">
          Trié par activité récente
        </div>
      </div>

      {/* Threads Grid */}
      <div className="space-y-4">
        {sortedThreads.length > 0 ? (
          sortedThreads.map((thread) => (
            <ThreadCard 
              key={thread.id} 
              thread={thread} 
              onLike={handleLike}
            />
          ))
        ) : (
          <div className="text-center py-16 bg-white border border-editorial rounded-lg">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-muted">Aucun sujet dans cette catégorie.</p>
          </div>
        )}
      </div>

      {/* New Thread Modal */}
      {showNewThreadModal && (
        <NewThreadModal 
          onClose={() => setShowNewThreadModal(false)}
          categories={categories}
        />
      )}
    </div>
  )
}

// Simple Modal Component
function NewThreadModal({ 
  onClose, 
  categories 
}: { 
  onClose: () => void
  categories: [ThreadCategory, { label: string; icon: string }][]
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<ThreadCategory>('general')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    // In production, call Supabase
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-editorial px-6 py-4 flex items-center justify-between">
          <h2 className="font-editorial text-2xl font-bold text-primary">
            Nouveau sujet
          </h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Catégorie
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(([key, { label, icon }]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    category === key
                      ? 'bg-accent-sport text-white'
                      : 'bg-secondary text-muted hover:bg-secondary/80'
                  }`}
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Titre
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Un titre accrocheur..."
              maxLength={200}
              className="w-full px-4 py-3 border border-editorial rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-sport/50 focus:border-accent-sport transition-all"
              required
            />
            <p className="text-xs text-muted mt-1">{title.length}/200</p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Contenu (optionnel)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Développez votre sujet..."
              rows={6}
              maxLength={5000}
              className="w-full px-4 py-3 border border-editorial rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-sport/50 focus:border-accent-sport transition-all resize-none"
            />
            <p className="text-xs text-muted mt-1">{content.length}/5000</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-editorial">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-muted font-medium rounded-full hover:bg-secondary transition-colors"
            >
              Annuler
            </button>
            <PrimaryButton type="submit" disabled={isSubmitting || !title.trim()}>
              {isSubmitting ? 'Publication...' : 'Publier'}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  )
}
