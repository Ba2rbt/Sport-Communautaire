export interface ExpertAuthor {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
  title?: string
  bio?: string
}

export interface ExpertArticle {
  id: string
  author: ExpertAuthor
  title: string
  slug: string
  excerpt?: string
  contentMd: string
  coverImage?: string
  category: ArticleCategory
  readTime: number
  isPublished: boolean
  isFeatured: boolean
  viewsCount: number
  createdAt: string
  updatedAt: string
}

export type ArticleCategory = 
  | 'analysis'
  | 'tactics'
  | 'preview'
  | 'review'
  | 'interview'
  | 'opinion'
  | 'history'

export const categoryLabels: Record<ArticleCategory, { label: string; color: string }> = {
  analysis: { label: 'Analyse', color: 'bg-accent-sport text-white' },
  tactics: { label: 'Tactiques', color: 'bg-primary text-white' },
  preview: { label: 'Avant-match', color: 'bg-accent-live text-white' },
  review: { label: 'Débrief', color: 'bg-accent-mvp text-white' },
  interview: { label: 'Interview', color: 'bg-purple-600 text-white' },
  opinion: { label: 'Opinion', color: 'bg-yellow-600 text-white' },
  history: { label: 'Histoire', color: 'bg-stone-600 text-white' },
}
