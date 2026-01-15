import { BadgeLive, TagLigue } from './ui'

export interface MatchData {
  id: string
  homeTeam: {
    name: string
    shortName: string
    logo: string
  }
  awayTeam: {
    name: string
    shortName: string
    logo: string
  }
  homeScore?: number | null
  awayScore?: number | null
  date: string
  time: string
  league: string
  venue: string
  status: 'upcoming' | 'live' | 'finished' | 'postponed'
  minute?: number | null
  round?: string | null
}

interface MatchCardLargeProps {
  match: MatchData
}

export default function MatchCardLarge({ match }: MatchCardLargeProps) {
  const isLive = match.status === 'live'
  const isFinished = match.status === 'finished'
  const isUpcoming = match.status === 'upcoming'

  return (
    <article className="group bg-white border border-editorial rounded-lg overflow-hidden hover-lift cursor-pointer transition-all duration-300">
      {/* Header with League */}
      <div className="px-5 py-3 border-b border-editorial bg-secondary/30 flex items-center justify-between">
        <TagLigue league={match.league} className="text-xs" />
        {isLive && <BadgeLive size="sm" />}
        {isFinished && (
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">
            Terminé
          </span>
        )}
        {match.status === 'postponed' && (
          <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
            Reporté
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Teams Grid */}
        <div className="space-y-4">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-3xl flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                {match.homeTeam.logo}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-primary text-lg truncate group-hover:text-accent-sport transition-colors">
                  {match.homeTeam.name}
                </h3>
                <span className="text-xs text-muted uppercase tracking-wider">
                  {match.homeTeam.shortName}
                </span>
              </div>
            </div>
            {/* Score */}
            {!isUpcoming && (
              <div className={`
                font-editorial text-4xl font-black min-w-[3rem] text-center
                ${isLive ? 'text-accent-live' : 'text-primary'}
              `}>
                {match.homeScore ?? '-'}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 px-2">
            <div className="flex-1 h-px bg-editorial" />
            <span className="text-xs text-muted font-medium">VS</span>
            <div className="flex-1 h-px bg-editorial" />
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-3xl flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                {match.awayTeam.logo}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-primary text-lg truncate group-hover:text-accent-sport transition-colors">
                  {match.awayTeam.name}
                </h3>
                <span className="text-xs text-muted uppercase tracking-wider">
                  {match.awayTeam.shortName}
                </span>
              </div>
            </div>
            {/* Score */}
            {!isUpcoming && (
              <div className={`
                font-editorial text-4xl font-black min-w-[3rem] text-center
                ${isLive ? 'text-accent-live' : 'text-primary'}
              `}>
                {match.awayScore ?? '-'}
              </div>
            )}
          </div>
        </div>

        {/* Live Minute */}
        {isLive && match.minute && (
          <div className="mt-4 flex justify-center">
            <span className="flex items-center gap-2 px-4 py-2 bg-accent-live/10 rounded-full">
              <span className="w-2 h-2 bg-accent-live rounded-full animate-pulse-live" />
              <span className="text-accent-live font-bold text-sm">
                {match.minute}&apos;
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-editorial bg-secondary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{match.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{match.time}</span>
            </div>
          </div>
          {match.round && (
            <span className="text-xs text-muted">{match.round}</span>
          )}
          <div className="w-8 h-8 rounded-full bg-accent-sport/10 flex items-center justify-center group-hover:bg-accent-sport transition-colors">
            <svg
              className="w-4 h-4 text-accent-sport group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  )
}
