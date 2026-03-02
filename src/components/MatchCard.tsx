'use client'

import Link from 'next/link'
import type { Match } from '@/types'
import { BadgeLive, TeamLogo } from './ui'
import { TeamLink } from './ui/TeamLink'

interface MatchCardProps {
  match: Match
  index?: number
}

export default function MatchCard({ match, index = 0 }: MatchCardProps) {
  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        glass bg-gradient-to-br from-white/[0.08] to-white/[0.02]
        border border-white/10 hover:border-accent-live/30
        transition-all duration-300 hover:shadow-2xl hover:shadow-accent-live/10
        animate-fade-in
      "
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background Glow Effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-live/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content Container */}
      <div className="relative p-5 sm:p-6 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-accent-live rounded-full" />
            <span className="text-xs font-bold text-accent-live tracking-widest uppercase truncate max-w-[150px]">
              {match.competition}
            </span>
          </div>
          {match.isLive ? (
            <BadgeLive
              size="sm"
              className="bg-red-500/20 text-red-500 border border-red-500/20 shadow-lg shadow-red-500/10"
            />
          ) : (
            <div className="px-2 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                {match.status === 'finished' ? 'Terminé' : match.time}
              </span>
            </div>
          )}
        </div>

        {/* Teams Grid */}
        <div className="space-y-4">
          {/* Home Team */}
          <div className="flex items-center justify-between group/team p-2 rounded-lg hover:bg-white/5 transition-colors -mx-2">
            <TeamLink
              teamName={match.homeTeam.name}
              className="flex items-center gap-4 min-w-0 flex-1"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-white/5 group-hover/team:border-white/10 transition-colors">
                  <TeamLogo
                    logoUrl={match.homeTeam.logoUrl}
                    logo={match.homeTeam.logo}
                    name={match.homeTeam.name}
                    size="xl"
                  />
                </div>
              </div>
              <span className="font-bold text-lg text-slate-100 truncate group-hover/team:text-accent-live transition-colors">
                {match.homeTeam.name}
              </span>
            </TeamLink>
            {match.status !== 'upcoming' && (
              <span
                className={`text-2xl font-bold font-mono min-w-[2rem] text-right ${(match.homeScore ?? 0) > (match.awayScore ?? 0) ? 'text-accent-live' : 'text-slate-400'}`}
              >
                {match.homeScore ?? 0}
              </span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between group/team p-2 rounded-lg hover:bg-white/5 transition-colors -mx-2">
            <TeamLink
              teamName={match.awayTeam.name}
              className="flex items-center gap-4 min-w-0 flex-1"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-white/5 group-hover/team:border-white/10 transition-colors">
                  <TeamLogo
                    logoUrl={match.awayTeam.logoUrl}
                    logo={match.awayTeam.logo}
                    name={match.awayTeam.name}
                    size="xl"
                  />
                </div>
              </div>
              <span className="font-bold text-lg text-slate-100 truncate group-hover/team:text-accent-live transition-colors">
                {match.awayTeam.name}
              </span>
            </TeamLink>
            {match.status !== 'upcoming' && (
              <span
                className={`text-2xl font-bold font-mono min-w-[2rem] text-right ${(match.awayScore ?? 0) > (match.homeScore ?? 0) ? 'text-accent-live' : 'text-slate-400'}`}
              >
                {match.awayScore ?? 0}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{match.date}</span>
            {match.venue && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="truncate max-w-[120px]">{match.venue}</span>
              </>
            )}
          </div>

          <Link
            href={`/match/${match.id}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-accent-live/20 text-xs font-bold text-accent-live border border-white/5 hover:border-accent-live/30 transition-all group-hover:translate-x-1"
          >
            DÉTAILS
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
