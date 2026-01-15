'use client'

import { useState } from 'react'
import type { CompetitionMatch } from '@/types/competition'
import { BadgeLive } from '@/components/ui'
import Link from 'next/link'

interface MatchCalendarProps {
  matches: CompetitionMatch[]
  competitionId: string
}

function MatchCard({ match }: { match: CompetitionMatch }) {
  const isLive = match.status === 'live'
  const isFinished = match.status === 'finished'
  const isUpcoming = match.status === 'upcoming'

  return (
    <Link 
      href={`/match/${match.id}`}
      className="block flex-shrink-0 w-72 bg-white border border-editorial rounded-lg overflow-hidden hover-lift"
    >
      {/* Header */}
      <div className="px-4 py-2 bg-secondary/30 border-b border-editorial flex items-center justify-between">
        <span className="text-xs text-muted font-medium">{match.round}</span>
        {isLive && <BadgeLive size="sm" />}
        {isFinished && (
          <span className="text-xs font-medium text-muted">Terminé</span>
        )}
        {isUpcoming && (
          <span className="text-xs font-medium text-accent-sport">{match.time}</span>
        )}
      </div>

      {/* Teams */}
      <div className="p-4">
        {/* Home Team */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center text-xl">
              {match.homeTeam.logo}
            </span>
            <span className="font-medium text-primary">{match.homeTeam.shortName}</span>
          </div>
          <span className={`
            text-xl font-bold
            ${isLive ? 'text-accent-live' : 'text-primary'}
          `}>
            {match.homeScore ?? '-'}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center text-xl">
              {match.awayTeam.logo}
            </span>
            <span className="font-medium text-primary">{match.awayTeam.shortName}</span>
          </div>
          <span className={`
            text-xl font-bold
            ${isLive ? 'text-accent-live' : 'text-primary'}
          `}>
            {match.awayScore ?? '-'}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-secondary/20 border-t border-editorial">
        <span className="text-xs text-muted">{match.date}</span>
      </div>
    </Link>
  )
}

export default function MatchCalendar({ matches, competitionId }: MatchCalendarProps) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'finished'>('all')

  const filteredMatches = matches.filter(match => {
    if (filter === 'all') return true
    if (filter === 'upcoming') return match.status === 'upcoming' || match.status === 'live'
    if (filter === 'finished') return match.status === 'finished'
    return true
  })

  // Group matches by round
  const matchesByRound = filteredMatches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = []
    }
    acc[match.round].push(match)
    return acc
  }, {} as Record<string, CompetitionMatch[]>)

  return (
    <div className="bg-white border border-editorial rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-editorial flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="font-editorial text-xl font-bold text-primary">
          Calendrier
        </h2>
        
        {/* Filters */}
        <div className="flex items-center gap-2">
          {(['all', 'upcoming', 'finished'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-4 py-1.5 text-sm font-medium rounded-full transition-colors
                ${filter === f 
                  ? 'bg-accent-sport text-white' 
                  : 'bg-secondary text-muted hover:bg-secondary/80'
                }
              `}
            >
              {f === 'all' ? 'Tous' : f === 'upcoming' ? 'À venir' : 'Terminés'}
            </button>
          ))}
        </div>
      </div>

      {/* Match Groups */}
      <div className="divide-y divide-editorial">
        {Object.entries(matchesByRound).map(([round, roundMatches]) => (
          <div key={round} className="p-6">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
              {round}
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin scrollbar-thumb-muted/20">
              {roundMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}

        {Object.keys(matchesByRound).length === 0 && (
          <div className="p-12 text-center">
            <svg className="w-12 h-12 mx-auto text-muted/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-muted">Aucun match trouvé</p>
          </div>
        )}
      </div>
    </div>
  )
}
