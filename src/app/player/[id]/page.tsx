import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PlayerStatsCard, PlayerFormWidget, GoalsScoredWidget } from '@/components/stats'

// Mock data - En production, fetcher depuis Supabase
const mockPlayers: Record<string, any> = {
  'mbappe': {
    player: {
      id: 'mbappe',
      name: 'Kylian Mbappé',
      photo: undefined,
      position: 'Attaquant',
      number: 7,
      team: { id: 'real-madrid', name: 'Real Madrid CF', logo: '⚪' },
      nationality: 'France 🇫🇷',
      age: 26,
      height: '1.78m',
    },
    stats: {
      goals: 18, assists: 8, matches: 22, minutes: 1890,
      shotsOnTarget: 42, shotsTotal: 78, passAccuracy: 84,
      duelsWon: 89, duelsTotal: 156, yellowCards: 2, redCards: 0, rating: 8.4,
    },
    recentMatches: [
      { id: '1', opponent: 'FC Barcelona', result: 'W' as const, score: '3-1', goals: 2, assists: 1, rating: 9.2, date: '14 Jan', competition: 'La Liga', isHome: true },
      { id: '2', opponent: 'Atletico Madrid', result: 'D' as const, score: '1-1', goals: 1, assists: 0, rating: 7.8, date: '10 Jan', competition: 'La Liga', isHome: false },
      { id: '3', opponent: 'Valencia CF', result: 'W' as const, score: '4-0', goals: 1, assists: 2, rating: 8.9, date: '6 Jan', competition: 'La Liga', isHome: true },
      { id: '4', opponent: 'Real Sociedad', result: 'W' as const, score: '2-1', goals: 0, assists: 1, rating: 7.5, date: '2 Jan', competition: 'La Liga', isHome: false },
      { id: '5', opponent: 'Sevilla FC', result: 'L' as const, score: '0-2', goals: 0, assists: 0, rating: 6.2, date: '28 Dec', competition: 'La Liga', isHome: true },
    ],
    monthlyData: [
      { month: 'Août', goals: 2, assists: 1, matches: 3 },
      { month: 'Sept', goals: 4, assists: 2, matches: 5 },
      { month: 'Oct', goals: 3, assists: 1, matches: 4 },
      { month: 'Nov', goals: 3, assists: 2, matches: 4 },
      { month: 'Déc', goals: 4, assists: 1, matches: 4 },
      { month: 'Jan', goals: 2, assists: 1, matches: 2 },
    ],
    recentGoals: [
      { id: 'g1', minute: 23, type: 'goal' as const, opponent: 'FC Barcelona', date: '14 Jan', competition: 'La Liga', isWinningGoal: true },
      { id: 'g2', minute: 67, type: 'penalty' as const, opponent: 'FC Barcelona', date: '14 Jan', competition: 'La Liga' },
      { id: 'g3', minute: 45, type: 'header' as const, opponent: 'Atletico Madrid', date: '10 Jan', competition: 'La Liga' },
    ],
    streak: { type: 'goals' as const, count: 3 },
  },
  'barcola': {
    player: {
      id: 'barcola',
      name: 'Bradley Barcola',
      photo: undefined,
      position: 'Ailier Gauche',
      number: 29,
      team: { id: 'psg', name: 'Paris Saint-Germain', logo: '🔵' },
      nationality: 'France 🇫🇷',
      age: 22,
      height: '1.86m',
    },
    stats: {
      goals: 12, assists: 5, matches: 20, minutes: 1650,
      shotsOnTarget: 28, shotsTotal: 52, passAccuracy: 79,
      duelsWon: 67, duelsTotal: 134, yellowCards: 1, redCards: 0, rating: 7.6,
    },
    recentMatches: [
      { id: '1', opponent: 'AS Monaco', result: 'W' as const, score: '4-2', goals: 2, assists: 0, rating: 8.5, date: '15 Jan', competition: 'Ligue 1', isHome: true },
      { id: '2', opponent: 'OL Lyon', result: 'W' as const, score: '3-1', goals: 1, assists: 1, rating: 8.1, date: '12 Jan', competition: 'Ligue 1', isHome: false },
      { id: '3', opponent: 'RC Lens', result: 'D' as const, score: '1-1', goals: 0, assists: 1, rating: 7.2, date: '8 Jan', competition: 'Ligue 1', isHome: true },
      { id: '4', opponent: 'LOSC Lille', result: 'W' as const, score: '2-0', goals: 1, assists: 0, rating: 7.8, date: '4 Jan', competition: 'Ligue 1', isHome: false },
      { id: '5', opponent: 'Stade Rennais', result: 'W' as const, score: '3-0', goals: 1, assists: 1, rating: 8.0, date: '30 Dec', competition: 'Ligue 1', isHome: true },
    ],
    monthlyData: [
      { month: 'Août', goals: 1, assists: 0, matches: 3 },
      { month: 'Sept', goals: 2, assists: 1, matches: 4 },
      { month: 'Oct', goals: 3, assists: 2, matches: 5 },
      { month: 'Nov', goals: 2, assists: 1, matches: 4 },
      { month: 'Déc', goals: 2, assists: 1, matches: 3 },
      { month: 'Jan', goals: 2, assists: 0, matches: 1 },
    ],
    recentGoals: [
      { id: 'g1', minute: 12, type: 'goal' as const, opponent: 'AS Monaco', date: '15 Jan', competition: 'Ligue 1' },
      { id: 'g2', minute: 78, type: 'goal' as const, opponent: 'AS Monaco', date: '15 Jan', competition: 'Ligue 1', isWinningGoal: true },
    ],
    streak: { type: 'goals' as const, count: 4 },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = mockPlayers[id]
  
  if (!data) {
    return { title: 'Joueur non trouvé | SportUnion' }
  }
  
  return {
    title: `${data.player.name} - Stats & Profil | SportUnion`,
    description: `Statistiques complètes de ${data.player.name}: ${data.stats.goals} buts, ${data.stats.assists} passes décisives cette saison.`,
  }
}

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = mockPlayers[id]
  
  if (!data) {
    notFound()
  }

  const { player, stats, recentMatches, monthlyData, recentGoals, streak } = data

  return (
    <div className="min-h-screen bg-secondary">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-editorial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted hover:text-accent-sport transition-colors">
              Accueil
            </Link>
            <span className="text-muted">/</span>
            <Link href={`/team/${player.team.id}`} className="text-muted hover:text-accent-sport transition-colors">
              {player.team.name}
            </Link>
            <span className="text-muted">/</span>
            <span className="text-primary font-medium">{player.name}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Player Stats Card */}
            <PlayerStatsCard 
              player={player}
              stats={stats}
              season="2024-25"
            />

            {/* Goals Widget */}
            <GoalsScoredWidget
              playerName={player.name}
              totalGoals={stats.goals}
              totalAssists={stats.assists}
              monthlyData={monthlyData}
              recentGoals={recentGoals}
              comparison={{
                lastSeason: 44,
                samePointLastSeason: stats.goals - 3,
              }}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sm:space-y-8">
            {/* Form Widget */}
            <PlayerFormWidget
              playerName={player.name}
              playerPhoto={player.photo}
              recentMatches={recentMatches}
              currentStreak={streak}
            />

            {/* Quick links */}
            <div className="bg-white border border-editorial rounded-2xl p-5">
              <h3 className="font-editorial text-lg font-bold text-primary mb-4">
                Liens rapides
              </h3>
              <div className="space-y-2">
                <Link 
                  href={`/team/${player.team.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
                >
                  <span className="text-2xl">{player.team.logo}</span>
                  <div>
                    <p className="font-medium text-primary">{player.team.name}</p>
                    <p className="text-xs text-muted">Voir l&apos;équipe</p>
                  </div>
                </Link>
                <Link 
                  href="/matches"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
                >
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-medium text-primary">Calendrier</p>
                    <p className="text-xs text-muted">Prochains matchs</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
