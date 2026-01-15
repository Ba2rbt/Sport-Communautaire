import { Suspense } from 'react'
import MatchesFilters from '@/components/MatchesFilters'
import MatchesGrid from '@/components/MatchesGrid'
import { MatchGridSkeleton, SidebarSkeleton } from '@/components/ui/Skeleton'
import { BadgeLive } from '@/components/ui'
import type { MatchData } from '@/components/MatchCardLarge'

// Mock initial matches data
// In production, this would fetch from Supabase
const mockMatches: MatchData[] = [
  {
    id: '1',
    homeTeam: { name: 'Paris Saint-Germain', shortName: 'PSG', logo: '🔵' },
    awayTeam: { name: 'Olympique de Marseille', shortName: 'OM', logo: '⚪' },
    homeScore: 2,
    awayScore: 1,
    date: '13 Jan',
    time: '21:00',
    league: 'Ligue 1',
    venue: 'Parc des Princes',
    status: 'live',
    minute: 67,
    round: 'Journée 18',
  },
  {
    id: '2',
    homeTeam: { name: 'FC Barcelona', shortName: 'FCB', logo: '🔴' },
    awayTeam: { name: 'Real Madrid', shortName: 'RMA', logo: '⚪' },
    date: '15 Jan',
    time: '21:00',
    league: 'La Liga',
    venue: 'Camp Nou',
    status: 'upcoming',
    round: 'Journée 20',
  },
  {
    id: '3',
    homeTeam: { name: 'Manchester City', shortName: 'MCI', logo: '🩵' },
    awayTeam: { name: 'Liverpool FC', shortName: 'LIV', logo: '🔴' },
    date: '16 Jan',
    time: '18:30',
    league: 'Premier League',
    venue: 'Etihad Stadium',
    status: 'upcoming',
    round: 'Journée 22',
  },
  {
    id: '4',
    homeTeam: { name: 'Juventus', shortName: 'JUV', logo: '⚫' },
    awayTeam: { name: 'AC Milan', shortName: 'ACM', logo: '🔴' },
    homeScore: 1,
    awayScore: 1,
    date: '12 Jan',
    time: '20:45',
    league: 'Serie A',
    venue: 'Allianz Stadium',
    status: 'finished',
    round: 'Journée 19',
  },
  {
    id: '5',
    homeTeam: { name: 'Bayern Munich', shortName: 'BAY', logo: '🔴' },
    awayTeam: { name: 'Borussia Dortmund', shortName: 'BVB', logo: '🟡' },
    homeScore: 3,
    awayScore: 2,
    date: '12 Jan',
    time: '18:30',
    league: 'Bundesliga',
    venue: 'Allianz Arena',
    status: 'finished',
    round: 'Journée 17',
  },
  {
    id: '6',
    homeTeam: { name: 'OL Lyon', shortName: 'OL', logo: '🔵' },
    awayTeam: { name: 'AS Monaco', shortName: 'ASM', logo: '🔴' },
    date: '18 Jan',
    time: '17:00',
    league: 'Ligue 1',
    venue: 'Groupama Stadium',
    status: 'upcoming',
    round: 'Journée 18',
  },
]

// Count live matches
const liveMatchesCount = mockMatches.filter(m => m.status === 'live').length

export default function MatchesPage() {
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
                <p className="font-editorial text-2xl font-bold text-primary">24</p>
                <p className="text-xs text-muted uppercase tracking-wider">À venir</p>
              </div>
              <div className="w-px h-10 bg-editorial" />
              <div className="text-center">
                <p className="font-editorial text-2xl font-bold text-primary">156</p>
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
                <span className="font-semibold text-primary">{mockMatches.length}</span> matches affichés
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

            {/* Grid with Infinite Scroll */}
            <Suspense fallback={<MatchGridSkeleton count={6} />}>
              <MatchesGrid 
                initialMatches={mockMatches} 
                initialHasMore={true}
                pageSize={6}
              />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
