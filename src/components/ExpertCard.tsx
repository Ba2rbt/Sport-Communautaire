import type { Analysis } from '@/types'
import { Tag } from './ui'

interface ExpertCardProps {
  analysis: Analysis
}

export default function ExpertCard({ analysis }: ExpertCardProps) {
  return (
    <article className="group bg-white border border-editorial rounded-lg overflow-hidden hover-lift cursor-pointer">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-accent-sport/20 via-primary/5 to-accent-mvp/10 flex items-center justify-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <span className="relative text-6xl transition-transform duration-500 group-hover:scale-110">
          {analysis.image}
        </span>
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <Tag variant="sport">{analysis.category}</Tag>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-editorial text-lg font-bold text-primary leading-tight mb-3 group-hover:text-accent-sport transition-colors line-clamp-2">
          {analysis.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted leading-relaxed mb-5 line-clamp-2">
          {analysis.excerpt}
        </p>

        {/* Expert Info */}
        <div className="flex items-center justify-between pt-4 border-t border-editorial">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-sport to-accent-sport/70 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-accent-sport/20">
              {analysis.expert.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">{analysis.expert.name}</p>
              <p className="text-xs text-muted">{analysis.expert.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">{analysis.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
