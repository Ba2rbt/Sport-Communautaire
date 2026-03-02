import type { Analysis } from '@/types'
import { PlayerAvatar } from './ui'

interface ExpertCardProps {
  analysis: Analysis
}

export default function ExpertCard({ analysis }: ExpertCardProps) {
  return (
    <article className="group relative glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent-blue/10 transition-all duration-300 border border-white/10 hover:border-accent-blue/30 hover:-translate-y-1">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

      {/* Image Area */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent-blue/10 to-transparent">
        <div className="absolute inset-0 flex items-center justify-center text-7xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 drop-shadow-2xl">
          {analysis.image}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Category Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-accent-blue text-xs font-bold tracking-wider uppercase rounded-full">
            {analysis.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Title */}
        <h3 className="font-sans text-xl font-bold text-white leading-tight mb-3 group-hover:text-accent-blue transition-colors line-clamp-2">
          {analysis.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2 font-medium">
          {analysis.excerpt}
        </p>

        {/* Footer: Expert Info */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full p-[1px] bg-gradient-to-br from-accent-blue to-transparent">
              <PlayerAvatar
                photoUrl={analysis.expert.imageUrl}
                emoji={analysis.expert.image}
                name={analysis.expert.name}
                size="md"
                className="w-full h-full"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                {analysis.expert.name}
              </p>
              <p className="text-xs text-accent-blue font-medium uppercase tracking-wide">
                {analysis.expert.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5 text-slate-400 group-hover:text-accent-blue group-hover:border-accent-blue/20 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs font-semibold">{analysis.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
