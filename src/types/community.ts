export interface ThreadAuthor {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
}

export interface Thread {
  id: string
  title: string
  content?: string
  author: ThreadAuthor
  category: string
  isPinned: boolean
  isLocked: boolean
  viewsCount: number
  repliesCount: number
  likesCount: number
  isLikedByUser: boolean
  createdAt: string
  updatedAt: string
  lastReplyAt?: string
  lastReplyAuthor?: ThreadAuthor
}

export interface ThreadPost {
  id: string
  threadId: string
  author: ThreadAuthor
  content: string
  isSolution: boolean
  likesCount: number
  isLikedByUser: boolean
  createdAt: string
  updatedAt: string
}

export type ThreadCategory = 
  | 'general'
  | 'matchday'
  | 'transfers'
  | 'tactics'
  | 'offtopic'
  | 'help'

export const categoryLabels: Record<ThreadCategory, { label: string; icon: string; color: string }> = {
  general: { label: 'Général', icon: '💬', color: 'bg-primary/10 text-primary' },
  matchday: { label: 'Jour de match', icon: '⚽', color: 'bg-accent-live/10 text-accent-live' },
  transfers: { label: 'Transferts', icon: '🔄', color: 'bg-accent-mvp/10 text-accent-mvp' },
  tactics: { label: 'Tactiques', icon: '📋', color: 'bg-accent-sport/10 text-accent-sport' },
  offtopic: { label: 'Hors-sujet', icon: '🎮', color: 'bg-muted/20 text-muted' },
  help: { label: 'Aide', icon: '❓', color: 'bg-yellow-500/10 text-yellow-600' },
}
