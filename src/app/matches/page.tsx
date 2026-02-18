import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import MatchesFilters from '@/components/MatchesFilters'
import MatchesGrid from '@/components/MatchesGrid'
import { MatchGridSkeleton, SidebarSkeleton } from '@/components/ui/Skeleton'
import { BadgeLive } from '@/components/ui'
import type { MatchData } from '@/components/MatchCardLarge'

// Transform Supabase data to MatchData format
function transformMatch(match: any): MatchData {
  const matchDate = new Date(`${match.date}T${match.time || '00:00'}`)
  
  return {
    id: match.id,
    homeTeam: { 
      name: match.team1, 
      shortName: match.team1.substring(0, 3).toUpperCase(), 
      logo: '⚽' 
    },
    awayTeam: { 
      name: match.team2, 
      shortName: match.team2.substring(0, 3).toUpperCase(), 
      logo: '⚽' 
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
  const { data: matches, error } = await supabase
    .from('matches')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true })
    .limit(50)

  // Transform to MatchData format
  const matchesData: MatchData[] = matches?.map(transformMatch) || []

  // Count by status
  const liveMatchesCount = matchesData.filter(m => m.status === 'live').length
  const upcomingCount = matchesData.filter(m => m.status === 'upcoming').length
  const finishedCount = matchesData.filter(m => m.status === 'finished').length

  return (
    <div className="min-h-screen bg-secondary">
      {/* Page Header */}
      <header className="bg-white border-b border-editorial">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-accent-sport">
                  Calendrier
                </span>
                {liveMatchesCount > 0 && (
                  <BadgeLive size="sm" />
                )}
              </div>
              <h1 className="font-editorial text-4xl md:text-5xl font-bold text-primary">
                Matches
              </h1>
              <p className="text-muted mt-2">
                Suivez tous les matches en direct et à venir
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="font-editorial text-2xl font-bold text-accent-live">{liveMatchesCount}</p>
                <p className="text-xs text-muted uppercase tracking-wider">En direct</p>
              </div>
              <div className="w-px h-10 bg-editorial" />
              <div className="text-center">
                <p className="font-editorial text-2xl font-bold text-primary">{upcomingCount}</p>
                <p className="text-xs text-muted uppercase tracking-wider">À venir</p>
              </div>
              <div className="w-px h-10 bg-editorial" />
              <div className="text-center">
                <p className="font-editorial text-2xl font-bold text-primary">{finishedCount}</p>
                <p className="text-xs text-muted uppercase tracking-wider">Terminés</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <Suspense fallback={<SidebarSkeleton />}>
                <MatchesFilters />
              </Suspense>
            </div>
          </aside>

          {/* Matches Grid */}
          <div className="flex-1 min-w-0">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted">
                <span className="font-semibold text-primary">{matchesData.length}</span> matches affichés
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">Trier par:</span>
                <select className="text-sm font-medium text-primary bg-transparent border-none cursor-pointer focus:outline-none">
                  <option>Date</option>
                  <option>Compétition</option>
                  <option>Statut</option>
                </select>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600">Erreur lors du chargement des matches</p>
                <p className="text-red-400 text-sm mt-1">{error.message}</p>
              </div>
            )}

            {/* Empty State */}
            {!error && matchesData.length === 0 && (
              <div className="bg-white border border-editorial rounded-lg p-12 text-center">
                <span className="text-6xl mb-4 block">⚽</span>
                <h3 className="font-editorial text-2xl font-bold text-primary mb-2">
                  Aucun match disponible
                </h3>
                <p className="text-muted">
                  Les matches seront synchronisés automatiquement.
                </p>
              </div>
            )}

            {/* Grid with Infinite Scroll */}
            {matchesData.length > 0 && (
              <Suspense fallback={<MatchGridSkeleton count={6} />}>
                <MatchesGrid 
                  initialMatches={matchesData} 
                  initialHasMore={matchesData.length >= 50}
                  pageSize={6}
                />
              </Suspense>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
