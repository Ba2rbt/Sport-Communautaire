import type { Match } from '@/types'
import { BadgeLive } from './ui'

interface MatchCardProps {
  match: Match
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <article className="group bg-white border border-editorial rounded-lg p-6 hover-lift cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-accent-sport tracking-widest uppercase">
          {match.competition}
        </span>
        {match.isLive && <BadgeLive size="sm" />}
      </div>

      {/* Teams */}
      <div className="space-y-3">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-xl shadow-sm">
              {match.homeTeam.logo}
            </span>
            <span className="font-semibold text-primary">
              {match.homeTeam.name}
            </span>
          </div>
          {match.status !== 'upcoming' && (
            <span className="font-editorial text-2xl font-bold text-primary">
              {match.homeScore}
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-xl shadow-sm">
              {match.awayTeam.logo}
            </span>
            <span className="font-semibold text-primary">
              {match.awayTeam.name}
            </span>
          </div>
          {match.status !== 'upcoming' && (
            <span className="font-editorial text-2xl font-bold text-primary">
              {match.awayScore}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-editorial flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{match.date}</span>
          <span className="text-editorial">•</span>
          <span>{match.time}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-accent-sport/10 flex items-center justify-center group-hover:bg-accent-sport transition-colors">
          <svg
            className="w-4 h-4 text-accent-sport group-hover:text-white group-hover:translate-x-0.5 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </article>
  )
}
