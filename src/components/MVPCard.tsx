import type { MVP } from '@/types'
import { BadgeMVP } from './ui'

interface MVPCardProps {
  mvp: MVP
  rank: number
}

export default function MVPCard({ mvp, rank }: MVPCardProps) {
  return (
    <article className="group relative bg-white border border-editorial rounded-lg overflow-hidden hover-lift cursor-pointer">
      {/* Rank Badge - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`
          flex items-center justify-center w-10 h-10 rounded-full font-bold text-base shadow-lg
          ${rank === 1 
            ? 'bg-accent-mvp text-white shadow-accent-mvp/40' 
            : rank === 2 
            ? 'bg-gray-400 text-white' 
            : rank === 3 
            ? 'bg-amber-600 text-white' 
            : 'bg-primary/10 text-primary'
          }
        `}>
          {rank}
        </span>
      </div>

      {/* Image Area */}
      <div className="relative h-52 bg-gradient-to-br from-primary/5 via-accent-sport/5 to-accent-mvp/10 flex items-center justify-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-mvp/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-sport/20 rounded-full blur-2xl" />
        </div>
        
        {/* Avatar */}
        <span className="relative text-7xl transition-transform duration-500 group-hover:scale-110">
          {mvp.image}
        </span>
        
        {/* MVP Badge - Bottom Right */}
        <div className="absolute bottom-3 right-3">
          <BadgeMVP rating={mvp.rating} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-editorial text-xl font-bold text-primary group-hover:text-accent-sport transition-colors">
            {mvp.name}
          </h3>
          <p className="text-sm text-muted mt-1">{mvp.team}</p>
        </div>

        <p className="text-xs text-accent-sport font-semibold uppercase tracking-widest mb-4">
          {mvp.position}
        </p>
        
        {/* Stats */}
        <div className="pt-4 border-t border-editorial">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent-live" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <p className="text-sm font-medium text-primary">{mvp.stats}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
