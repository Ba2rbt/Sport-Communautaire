import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { TeamLogo } from '@/components/ui'
import type { MatchData } from '@/components/MatchCardLarge'

// Transform Supabase data to MatchData format
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformMatch(match: any): MatchData {
  const matchDate = new Date(`${match.date}T${match.time || '00:00'}`)

  return {
    id: match.id,
    homeTeam: {
      name: match.team1,
      shortName: match.team1.substring(0, 3).toUpperCase(),
      logo: '⚽',
    },
    awayTeam: {
      name: match.team2,
      shortName: match.team2.substring(0, 3).toUpperCase(),
      logo: '⚽',
    },
    homeScore: match.score1 || 0,
    awayScore: match.score2 || 0,
    date: matchDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
    time: match.time?.substring(0, 5) || '00:00',
    league: match.league,
    venue: match.stadium || '',
    status: match.status as 'live' | 'upcoming' | 'finished',
    minute: match.status === 'live' ? 45 : undefined,
    round: '',
  }
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function MatchesPage() {
  const supabase = await createClient()

  // Fetch matches from Supabase
  const { data: matches } = await supabase
    .from('matches')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true })
    .limit(50)

  // Transform to MatchData format
  const matchesData: MatchData[] = matches?.map(transformMatch) || []

  // Group matches by date
  const matchesByDate = matchesData.reduce(
    (acc, match) => {
      const date = match.date
      if (!acc[date]) acc[date] = []
      acc[date].push(match)
      return acc
    },
    {} as Record<string, MatchData[]>
  )

  // Count by status
  const liveMatchesCount = matchesData.filter((m) => m.status === 'live').length

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header with Date Picker style */}
      <div className="sticky top-0 z-30 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold font-sans flex items-center gap-3">
              Match Center
              {liveMatchesCount > 0 && (
                <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-xs rounded animate-pulse border border-red-500/50">
                  LIVE
                </span>
              )}
            </h1>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Date Scroller */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide mask-fade-right">
            {[...Array(7)].map((_, i) => {
              const d = new Date()
              d.setDate(d.getDate() + i)
              const isToday = i === 0
              return (
                <button
                  key={i}
                  className={`
                    flex flex-col items-center justify-center min-w-[70px] h-16 rounded-xl border transition-all
                    ${
                      isToday
                        ? 'bg-accent-sport text-[#020617] border-accent-sport font-bold'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'
                    }
                  `}
                >
                  <span className="text-xs uppercase">
                    {d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')}
                  </span>
                  <span className="text-lg">{d.getDate()}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {Object.entries(matchesByDate).map(([date, dayMatches]) => (
          <div key={date} className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-lg font-bold text-white">{date}</h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="space-y-4">
              {dayMatches.map((match) => (
                <Link href={`/match/${match.id}`} key={match.id} className="block group">
                  <div className="relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-300">
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div className="relative p-6 flex items-center gap-6">
                      <div className="w-16 flex flex-col items-center gap-1 border-r border-white/5 pr-6">
                        <span
                          className={`text-sm font-bold ${match.status === 'live' ? 'text-red-500' : 'text-slate-400'}`}
                        >
                          {match.status === 'live' ? `${match.minute}'` : match.time}
                        </span>
                        {match.status === 'live' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        )}
                      </div>

                      <div className="flex-1 grid grid-cols-[1fr,auto,1fr] gap-8 items-center">
                        {/* Home */}
                        <div className="flex items-center justify-end gap-3 text-right">
                          <span className="font-bold text-white text-lg">
                            {match.homeTeam.name}
                          </span>
                          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-sm">
                            <TeamLogo
                              logo={match.homeTeam.logo}
                              name={match.homeTeam.name}
                              size="md"
                            />
                          </div>
                        </div>

                        {/* Score */}
                        <div className="px-4 py-2 bg-[#020617] rounded-lg border border-white/10 font-mono text-xl text-white font-bold w-[80px] text-center">
                          {match.status === 'upcoming'
                            ? 'VS'
                            : `${match.homeScore} - ${match.awayScore}`}
                        </div>

                        {/* Away */}
                        <div className="flex items-center justify-start gap-3">
                          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-sm">
                            <TeamLogo
                              logo={match.awayTeam.logo}
                              name={match.awayTeam.name}
                              size="md"
                            />
                          </div>
                          <span className="font-bold text-white text-lg">
                            {match.awayTeam.name}
                          </span>
                        </div>
                      </div>

                      <div className="hidden md:block w-32 text-right">
                        <span className="text-xs text-slate-500 font-mono border border-white/10 px-2 py-1 rounded">
                          {match.league}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
