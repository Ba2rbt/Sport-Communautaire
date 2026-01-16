import Link from 'next/link'
import type { ExpertArticle, ArticleCategory } from '@/types/expert'
import { categoryLabels } from '@/types/expert'

interface ArticleCardProps {
  article: ExpertArticle
  variant?: 'default' | 'featured' | 'compact'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
  })
}

function AuthorAvatar({ author, size = 'md' }: { author: ExpertArticle['author']; size?: 'sm' | 'md' }) {
  const initials = author.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'

  return author.avatarUrl ? (
    <img 
      src={author.avatarUrl} 
      alt={author.fullName}
      className={`${sizeClass} rounded-full object-cover`}
    />
  ) : (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-primary to-accent-sport flex items-center justify-center text-white font-semibold`}>
      {initials}
    </div>
  )
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const category = categoryLabels[article.category] || categoryLabels.analysis

  if (variant === 'featured') {
    return (
      <Link 
        href={`/experts/${article.slug}`}
        className="group block relative overflow-hidden rounded-xl bg-primary text-white"
      >
        {/* Background Image */}
        {article.coverImage ? (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${article.coverImage})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent-sport/50 to-accent-mvp/30" />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />

        {/* Content */}
        <div className="relative p-8 md:p-12 min-h-[500px] flex flex-col justify-end">
          {/* Category */}
          <span className={`inline-block w-fit px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-4 ${category.color}`}>
            {category.label}
          </span>

          {/* Title */}
          <h2 className="font-editorial text-3xl md:text-5xl font-black leading-tight mb-4 group-hover:text-accent-sport transition-colors">
            {article.title}
          </h2>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-white/80 text-lg leading-relaxed mb-6 line-clamp-3">
              {article.excerpt}
            </p>
          )}

          {/* Author & Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AuthorAvatar author={article.author} />
              <div>
                <p className="font-semibold">{article.author.fullName}</p>
                <p className="text-white/60 text-sm">{article.author.title}</p>
              </div>
            </div>
            <div className="text-white/60 text-sm text-right">
              <p>{formatDate(article.createdAt)}</p>
              <p>{article.readTime} min de lecture</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link 
        href={`/experts/${article.slug}`}
        className="group flex gap-4 py-4 border-b border-editorial last:border-0"
      >
        {/* Thumbnail */}
        {article.coverImage && (
          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${category.color} mb-2`}>
            {category.label}
          </span>
          <h3 className="font-editorial text-lg font-bold text-primary leading-tight group-hover:text-accent-sport transition-colors line-clamp-2 mb-1">
            {article.title}
          </h3>
          <p className="text-xs text-muted">
            {article.author.fullName} · {article.readTime} min
          </p>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link 
      href={`/experts/${article.slug}`}
      className="group block bg-white border border-editorial rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative h-56 overflow-hidden">
        {article.coverImage ? (
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary via-accent-sport/10 to-accent-mvp/10 flex items-center justify-center">
            <span className="text-6xl opacity-30">📰</span>
          </div>
        )}
        
        {/* Category Badge */}
        <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${category.color}`}>
          {category.label}
        </span>

        {/* Featured Badge */}
        {article.isFeatured && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
            ⭐ À la une
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="font-editorial text-2xl font-bold text-primary leading-tight group-hover:text-accent-sport transition-colors mb-3 line-clamp-2">
          {article.title}
        </h2>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-muted leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>
        )}

        {/* Author & Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-editorial">
          <div className="flex items-center gap-3">
            <AuthorAvatar author={article.author} size="sm" />
            <div>
              <p className="font-medium text-primary text-sm">{article.author.fullName}</p>
              <p className="text-muted text-xs">{article.author.title}</p>
            </div>
          </div>
          <div className="text-right text-xs text-muted">
            <p>{formatDate(article.createdAt)}</p>
            <p>{article.readTime} min</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
