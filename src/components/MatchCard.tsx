'use client'

import Link from 'next/link'
import type { Match } from '@/types'
import { BadgeLive } from './ui'
import { TeamLink } from './ui/TeamLink'

interface MatchCardProps {
  match: Match
  index?: number
}

export default function MatchCard({ match, index = 0 }: MatchCardProps) {
  return (
    <div 
      className="
        group bg-white border border-editorial rounded-xl p-5 sm:p-6 
        hover-card
        animate-fade-in
      "
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-accent-sport tracking-widest uppercase truncate max-w-[60%]">
          {match.competition}
        </span>
        {match.isLive && <BadgeLive size="sm" />}
        {match.status === 'finished' && (
          <span className="text-xs font-medium text-muted bg-secondary px-2 py-1 rounded-full">
            Terminé
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="space-y-3">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <TeamLink teamName={match.homeTeam.name} className="flex items-center gap-3 min-w-0 flex-1 group/team">
            <span className="
              w-10 h-10 sm:w-12 sm:h-12 
              bg-gradient-to-br from-secondary to-secondary/50 
              rounded-xl flex items-center justify-center text-xl 
              shadow-sm group-hover/team:scale-105 transition-transform
            ">
              {match.homeTeam.logo}
            </span>
            <span className="font-semibold text-primary truncate text-sm sm:text-base group-hover/team:text-accent-sport transition-colors">
              {match.homeTeam.name}
            </span>
          </TeamLink>
          {match.status !== 'upcoming' && (
            <span className="font-editorial text-2xl sm:text-3xl font-bold text-primary min-w-[2rem] text-right">
              {match.homeScore}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 px-2">
          <div className="flex-1 h-px bg-editorial/50" />
          <span className="text-xs text-muted font-medium">VS</span>
          <div className="flex-1 h-px bg-editorial/50" />
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <TeamLink teamName={match.awayTeam.name} className="flex items-center gap-3 min-w-0 flex-1 group/team">
            <span className="
              w-10 h-10 sm:w-12 sm:h-12 
              bg-gradient-to-br from-secondary to-secondary/50 
              rounded-xl flex items-center justify-center text-xl 
              shadow-sm group-hover/team:scale-105 transition-transform
            ">
              {match.awayTeam.logo}
            </span>
            <span className="font-semibold text-primary truncate text-sm sm:text-base group-hover/team:text-accent-sport transition-colors">
              {match.awayTeam.name}
            </span>
          </TeamLink>
          {match.status !== 'upcoming' && (
            <span className="font-editorial text-2xl sm:text-3xl font-bold text-primary min-w-[2rem] text-right">
              {match.awayScore}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-editorial flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{match.date}</span>
          <span className="text-editorial hidden sm:inline">•</span>
          <span className="hidden sm:inline">{match.time}</span>
        </div>
        
        {/* Link to match */}
        <Link 
          href={`/match/${match.id}`}
          className="
            w-8 h-8 rounded-full bg-accent-sport/10 
            flex items-center justify-center 
            hover:bg-accent-sport hover:shadow-lg hover:shadow-accent-sport/25
            transition-all duration-300
          "
        >
          <svg
            className="w-4 h-4 text-accent-sport hover:text-white transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
