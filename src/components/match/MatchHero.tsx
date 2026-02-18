import Link from 'next/link'
import { BadgeLive, TagLigue } from '@/components/ui'
import { getTeamSlug } from '@/lib/utils'

interface Team {
  name: string
  shortName: string
  logo: string
}

interface MatchHeroProps {
  homeTeam: Team
  awayTeam: Team
  homeScore?: number | null
  awayScore?: number | null
  status: 'upcoming' | 'live' | 'finished' | 'postponed'
  minute?: number | null
  league: string
  date: string
  time: string
  venue: string
  round?: string | null
}

export default function MatchHero({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  minute,
  league,
  date,
  time,
  venue,
  round,
}: MatchHeroProps) {
  const isLive = status === 'live'
  const isFinished = status === 'finished'
  const isUpcoming = status === 'upcoming'

  const homeSlug = getTeamSlug(homeTeam.name)
  const awaySlug = getTeamSlug(awayTeam.name)

  return (
    <section className="relative w-full overflow-hidden bg-primary text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent-sport/20" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="match-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#match-grid)" />
        </svg>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-sport/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-live/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Status Badge */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <TagLigue league={league} />
          {isLive && <BadgeLive size="lg" />}
          {isFinished && (
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-bold rounded-full border border-white/20">
              TERMINÉ
            </span>
          )}
          {status === 'postponed' && (
            <span className="px-4 py-1.5 bg-red-500/20 text-red-300 text-sm font-bold rounded-full border border-red-500/30">
              REPORTÉ
            </span>
          )}
        </div>

        {/* Match Display */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
          {/* Home Team - Clickable */}
          <Link 
            href={`/team/${homeSlug}`}
            className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right group/home"
          >
            <div className="relative mb-4">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-6xl md:text-7xl border border-white/20 shadow-2xl group-hover/home:scale-105 group-hover/home:border-accent-sport/50 transition-all duration-300">
                {homeTeam.logo}
              </div>
              {isLive && (
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-accent-live rounded-full animate-pulse-live" />
              )}
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl font-bold mb-1 group-hover/home:text-accent-sport transition-colors">
              {homeTeam.name}
            </h2>
            <span className="text-white/60 text-sm tracking-widest uppercase">
              {homeTeam.shortName} • Domicile
            </span>
          </Link>

          {/* Score */}
          <div className="flex flex-col items-center py-6 lg:py-0 lg:px-12 lg:min-w-[280px]">
            {isUpcoming ? (
              <div className="text-center">
                <p className="font-editorial text-6xl md:text-8xl font-black tracking-tight">
                  {time}
                </p>
                <p className="text-white/60 text-lg mt-2">{date}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-6 md:gap-10">
                  <span className={`
                    font-editorial text-7xl md:text-9xl font-black leading-none
                    ${isLive ? 'text-accent-live' : 'text-white'}
                  `}>
                    {homeScore ?? 0}
                  </span>
                  <span className="text-4xl text-white/30 font-thin">—</span>
                  <span className={`
                    font-editorial text-7xl md:text-9xl font-black leading-none
                    ${isLive ? 'text-accent-live' : 'text-white'}
                  `}>
                    {awayScore ?? 0}
                  </span>
                </div>
                
                {isLive && minute && (
                  <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-accent-live/20 rounded-full border border-accent-live/30">
                    <span className="w-2 h-2 bg-accent-live rounded-full animate-pulse-live" />
                    <span className="text-accent-live font-bold">{minute}&apos;</span>
                  </div>
                )}
                
                {isFinished && (
                  <p className="text-white/60 text-sm mt-4">Score final</p>
                )}
              </>
            )}
          </div>

          {/* Away Team - Clickable */}
          <Link 
            href={`/team/${awaySlug}`}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left group/away"
          >
            <div className="relative mb-4">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-6xl md:text-7xl border border-white/20 shadow-2xl group-hover/away:scale-105 group-hover/away:border-accent-live/50 transition-all duration-300">
                {awayTeam.logo}
              </div>
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl font-bold mb-1 group-hover/away:text-accent-live transition-colors">
              {awayTeam.name}
            </h2>
            <span className="text-white/60 text-sm tracking-widest uppercase">
              {awayTeam.shortName} • Extérieur
            </span>
          </Link>
        </div>

        {/* Byline Meta */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date} • {time}</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{venue}</span>
          </div>
          {round && (
            <>
              <span className="hidden sm:inline">•</span>
              <span>{round}</span>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
