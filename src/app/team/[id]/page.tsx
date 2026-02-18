import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TeamDetailCard } from '@/components/stats'

// Mock data - En production, fetcher depuis Supabase
const mockTeams: Record<string, any> = {
  'psg': {
    team: {
      id: 'psg',
      name: 'Paris Saint-Germain',
      shortName: 'PSG',
      logo: '🔵',
      stadium: 'Parc des Princes',
      city: 'Paris',
      founded: 1970,
      manager: 'Luis Enrique',
    },
    stats: {
      position: 1,
      played: 18,
      won: 13,
      drawn: 3,
      lost: 2,
      goalsFor: 45,
      goalsAgainst: 18,
      points: 42,
      form: ['W', 'W', 'D', 'W', 'L'] as const,
    },
    topPlayers: [
      { id: 'barcola', name: 'Bradley Barcola', position: 'Ailier Gauche', number: 29, stats: { goals: 12, assists: 5, rating: 7.6 } },
      { id: 'dembele', name: 'Ousmane Dembélé', position: 'Ailier Droit', number: 10, stats: { goals: 8, assists: 10, rating: 7.8 } },
      { id: 'ramos', name: 'Gonçalo Ramos', position: 'Attaquant', number: 9, stats: { goals: 6, assists: 3, rating: 7.2 } },
      { id: 'vitinha', name: 'Vitinha', position: 'Milieu', number: 17, stats: { goals: 3, assists: 7, rating: 7.5 } },
      { id: 'hakimi', name: 'Achraf Hakimi', position: 'Défenseur', number: 2, stats: { goals: 2, assists: 6, rating: 7.4 } },
    ],
    nextMatch: {
      opponent: 'Olympique de Marseille',
      opponentLogo: '⚪',
      date: '26 Jan',
      time: '20:45',
      competition: 'Ligue 1',
      isHome: false,
    },
    seasonStats: {
      cleanSheets: 8,
      avgPossession: 62,
      avgGoalsScored: 2.5,
      avgGoalsConceded: 1.0,
    },
    recentMatches: [
      { id: '1', opponent: 'AS Monaco', result: 'W', score: '4-2', date: '15 Jan', competition: 'Ligue 1', isHome: true },
      { id: '2', opponent: 'OL Lyon', result: 'W', score: '3-1', date: '12 Jan', competition: 'Ligue 1', isHome: false },
      { id: '3', opponent: 'RC Lens', result: 'D', score: '1-1', date: '8 Jan', competition: 'Ligue 1', isHome: true },
      { id: '4', opponent: 'LOSC Lille', result: 'W', score: '2-0', date: '4 Jan', competition: 'Ligue 1', isHome: false },
      { id: '5', opponent: 'Stade Rennais', result: 'L', score: '1-2', date: '30 Dec', competition: 'Ligue 1', isHome: true },
    ],
    competition: { id: 'ligue-1', name: 'Ligue 1', logo: '🇫🇷' },
  },
  'real-madrid': {
    team: {
      id: 'real-madrid',
      name: 'Real Madrid CF',
      shortName: 'RMA',
      logo: '⚪',
      stadium: 'Santiago Bernabéu',
      city: 'Madrid',
      founded: 1902,
      manager: 'Carlo Ancelotti',
    },
    stats: {
      position: 2,
      played: 19,
      won: 12,
      drawn: 4,
      lost: 3,
      goalsFor: 42,
      goalsAgainst: 20,
      points: 40,
      form: ['W', 'D', 'W', 'W', 'L'] as const,
    },
    topPlayers: [
      { id: 'mbappe', name: 'Kylian Mbappé', position: 'Attaquant', number: 7, stats: { goals: 18, assists: 8, rating: 8.4 } },
      { id: 'vinicius', name: 'Vinícius Júnior', position: 'Ailier Gauche', number: 7, stats: { goals: 10, assists: 9, rating: 8.1 } },
      { id: 'bellingham', name: 'Jude Bellingham', position: 'Milieu', number: 5, stats: { goals: 8, assists: 6, rating: 8.0 } },
      { id: 'rodrygo', name: 'Rodrygo', position: 'Ailier Droit', number: 11, stats: { goals: 5, assists: 4, rating: 7.4 } },
    ],
    nextMatch: {
      opponent: 'Atletico Madrid',
      opponentLogo: '🔴',
      date: '28 Jan',
      time: '21:00',
      competition: 'La Liga',
      isHome: true,
    },
    seasonStats: {
      cleanSheets: 6,
      avgPossession: 58,
      avgGoalsScored: 2.2,
      avgGoalsConceded: 1.05,
    },
    recentMatches: [
      { id: '1', opponent: 'FC Barcelona', result: 'W', score: '3-1', date: '14 Jan', competition: 'La Liga', isHome: true },
      { id: '2', opponent: 'Atletico Madrid', result: 'D', score: '1-1', date: '10 Jan', competition: 'La Liga', isHome: false },
      { id: '3', opponent: 'Valencia CF', result: 'W', score: '4-0', date: '6 Jan', competition: 'La Liga', isHome: true },
      { id: '4', opponent: 'Real Sociedad', result: 'W', score: '2-1', date: '2 Jan', competition: 'La Liga', isHome: false },
      { id: '5', opponent: 'Sevilla FC', result: 'L', score: '0-2', date: '28 Dec', competition: 'La Liga', isHome: true },
    ],
    competition: { id: 'la-liga', name: 'La Liga', logo: '🇪🇸' },
  },
  'om': {
    team: {
      id: 'om',
      name: 'Olympique de Marseille',
      shortName: 'OM',
      logo: '⚪',
      stadium: 'Orange Vélodrome',
      city: 'Marseille',
      founded: 1899,
      manager: 'Roberto De Zerbi',
    },
    stats: {
      position: 3,
      played: 18,
      won: 10,
      drawn: 5,
      lost: 3,
      goalsFor: 38,
      goalsAgainst: 22,
      points: 35,
      form: ['W', 'D', 'W', 'L', 'W'] as const,
    },
    topPlayers: [
      { id: 'greenwood', name: 'Mason Greenwood', position: 'Ailier', number: 10, stats: { goals: 10, assists: 4, rating: 7.4 } },
      { id: 'henrique', name: 'Luis Henrique', position: 'Ailier', number: 11, stats: { goals: 6, assists: 6, rating: 7.2 } },
      { id: 'hojbjerg', name: 'Pierre-Emile Højbjerg', position: 'Milieu', number: 23, stats: { goals: 2, assists: 5, rating: 7.3 } },
    ],
    nextMatch: {
      opponent: 'Paris Saint-Germain',
      opponentLogo: '🔵',
      date: '26 Jan',
      time: '20:45',
      competition: 'Ligue 1',
      isHome: true,
    },
    seasonStats: {
      cleanSheets: 5,
      avgPossession: 54,
      avgGoalsScored: 2.1,
      avgGoalsConceded: 1.2,
    },
    recentMatches: [
      { id: '1', opponent: 'OGC Nice', result: 'W', score: '2-0', date: '15 Jan', competition: 'Ligue 1', isHome: true },
      { id: '2', opponent: 'Toulouse FC', result: 'D', score: '2-2', date: '11 Jan', competition: 'Ligue 1', isHome: false },
      { id: '3', opponent: 'Stade Brestois', result: 'W', score: '3-1', date: '7 Jan', competition: 'Ligue 1', isHome: true },
    ],
    competition: { id: 'ligue-1', name: 'Ligue 1', logo: '🇫🇷' },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = mockTeams[id]
  
  if (!data) {
    return { title: 'Équipe non trouvée | SportUnion' }
  }
  
  return {
    title: `${data.team.name} - Stats & Effectif | SportUnion`,
    description: `Statistiques complètes de ${data.team.name}: ${data.stats.position}e au classement, ${data.stats.points} points.`,
  }
}

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = mockTeams[id]
  
  if (!data) {
    notFound()
  }

  const { team, stats, topPlayers, nextMatch, seasonStats, recentMatches, competition } = data

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
            <Link href={`/competitions/${competition.id}`} className="text-muted hover:text-accent-sport transition-colors">
              {competition.name}
            </Link>
            <span className="text-muted">/</span>
            <span className="text-primary font-medium">{team.name}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main column - Team card */}
          <div className="lg:col-span-2">
            <TeamDetailCard
              team={team}
              stats={stats}
              topPlayers={topPlayers}
              nextMatch={nextMatch}
              seasonStats={seasonStats}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sm:space-y-8">
            {/* Recent matches */}
            <div className="bg-white border border-editorial rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-editorial bg-gradient-to-r from-secondary to-transparent">
                <h3 className="font-editorial text-lg font-bold text-primary">
                  Derniers résultats
                </h3>
              </div>
              <div className="divide-y divide-editorial">
                {recentMatches.slice(0, 5).map((match: any, idx: number) => (
                  <div 
                    key={match.id}
                    className="px-5 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <span className={`
                      w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
                      ${match.result === 'W' ? 'bg-accent-live text-white' : 
                        match.result === 'D' ? 'bg-yellow-400 text-primary' : 
                        'bg-red-500 text-white'}
                    `}>
                      {match.result}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary truncate">
                        {match.isHome ? 'vs' : '@'} {match.opponent}
                      </p>
                      <p className="text-xs text-muted">{match.competition}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{match.score}</p>
                      <p className="text-xs text-muted">{match.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                href="/matches"
                className="block px-5 py-3 text-center text-sm font-medium text-accent-sport hover:bg-accent-sport/5 transition-colors border-t border-editorial"
              >
                Voir tous les matchs →
              </Link>
            </div>

            {/* Squad list */}
            <div className="bg-white border border-editorial rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-editorial bg-gradient-to-r from-secondary to-transparent">
                <h3 className="font-editorial text-lg font-bold text-primary">
                  Effectif
                </h3>
              </div>
              <div className="divide-y divide-editorial max-h-[400px] overflow-y-auto scrollbar-thin">
                {topPlayers.map((player: any, idx: number) => (
                  <Link
                    key={player.id}
                    href={`/player/${player.id}`}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        <span className="text-lg">👤</span>
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary text-white rounded text-[10px] font-bold flex items-center justify-center">
                        {player.number}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-primary truncate">{player.name}</p>
                      <p className="text-xs text-muted">{player.position}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {player.stats.goals > 0 && (
                        <span className="text-xs text-accent-live font-medium">⚽{player.stats.goals}</span>
                      )}
                      <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Competition link */}
            <Link 
              href={`/competitions/${competition.id}`}
              className="flex items-center gap-4 p-5 bg-white border border-editorial rounded-2xl hover:bg-secondary/50 transition-colors"
            >
              <span className="text-3xl">{competition.logo}</span>
              <div className="flex-1">
                <p className="font-semibold text-primary">{competition.name}</p>
                <p className="text-xs text-muted">Voir le classement complet</p>
              </div>
              <svg className="w-5 h-5 text-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
