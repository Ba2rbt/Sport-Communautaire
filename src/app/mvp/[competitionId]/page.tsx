import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MVPPodium, MVPLeaderboard } from '@/components/mvp'
import type { MVPRanking } from '@/types/mvp'

// Mock data for competitions
const mockCompetitions: Record<string, { name: string; logo: string; season: string }> = {
  'ligue-1': { name: 'Ligue 1', logo: '🇫🇷', season: '2024-25' },
  'premier-league': { name: 'Premier League', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', season: '2024-25' },
  'la-liga': { name: 'La Liga', logo: '🇪🇸', season: '2024-25' },
  'serie-a': { name: 'Serie A', logo: '🇮🇹', season: '2024-25' },
  'bundesliga': { name: 'Bundesliga', logo: '🇩🇪', season: '2024-25' },
}

// Mock MVP rankings
const mockRankings: MVPRanking[] = [
  {
    playerId: 'p1',
    playerName: 'Kylian Mbappé',
    teamName: 'Real Madrid',
    teamLogoUrl: '',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mbappe',
    position: 'FWD',
    nationality: 'France',
    jerseyNumber: 9,
    competitionId: 'ligue-1',
    totalVotes: 12847,
    uniqueVoters: 8432,
    matchesVoted: 34,
    votePercentage: 28.4,
    rank: 1,
  },
  {
    playerId: 'p2',
    playerName: 'Ousmane Dembélé',
    teamName: 'PSG',
    teamLogoUrl: '',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dembele',
    position: 'FWD',
    nationality: 'France',
    jerseyNumber: 10,
    competitionId: 'ligue-1',
    totalVotes: 9234,
    uniqueVoters: 6120,
    matchesVoted: 32,
    votePercentage: 20.4,
    rank: 2,
  },
  {
    playerId: 'p3',
    playerName: 'Jonathan David',
    teamName: 'Lille OSC',
    teamLogoUrl: '',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    position: 'FWD',
    nationality: 'Canada',
    jerseyNumber: 9,
    competitionId: 'ligue-1',
    totalVotes: 7621,
    uniqueVoters: 5230,
    matchesVoted: 33,
    votePercentage: 16.8,
    rank: 3,
  },
  {
    playerId: 'p4',
    playerName: 'Brice Samba',
    teamName: 'RC Lens',
    teamLogoUrl: '',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samba',
    position: 'GK',
    nationality: 'France',
    jerseyNumber: 1,
    competitionId: 'ligue-1',
    totalVotes: 5432,
    uniqueVoters: 3890,
    matchesVoted: 34,
    votePercentage: 12.0,
    rank: 4,
  },
  {
    playerId: 'p5',
    playerName: 'Florian Wirtz',
    teamName: 'Bayer Leverkusen',
    teamLogoUrl: '',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wirtz',
    position: 'MID',
    nationality: 'Allemagne',
    jerseyNumber: 10,
    competitionId: 'ligue-1',
    totalVotes: 4321,
    uniqueVoters: 3100,
    matchesVoted: 30,
    votePercentage: 9.5,
    rank: 5,
  },
  {
    playerId: 'p6',
    playerName: 'William Saliba',
    teamName: 'Arsenal',
    teamLogoUrl: '',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saliba',
    position: 'DEF',
    nationality: 'France',
    jerseyNumber: 2,
    competitionId: 'ligue-1',
    totalVotes: 3876,
    uniqueVoters: 2780,
    matchesVoted: 31,
    votePercentage: 8.6,
    rank: 6,
  },
  {
    playerId: 'p7',
    playerName: 'Khéphren Thuram',
    teamName: 'Juventus',
    teamLogoUrl: '',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thuram',
    position: 'MID',
    nationality: 'France',
    jerseyNumber: 8,
    competitionId: 'ligue-1',
    totalVotes: 2543,
    uniqueVoters: 1920,
    matchesVoted: 28,
    votePercentage: 5.6,
    rank: 7,
  },
  {
    playerId: 'p8',
    playerName: 'Elye Wahi',
    teamName: 'RC Lens',
    teamLogoUrl: '',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wahi',
    position: 'FWD',
    nationality: 'France',
    jerseyNumber: 27,
    competitionId: 'ligue-1',
    totalVotes: 2134,
    uniqueVoters: 1650,
    matchesVoted: 29,
    votePercentage: 4.7,
    rank: 8,
  },
  {
    playerId: 'p9',
    playerName: 'Nuno Mendes',
    teamName: 'PSG',
    teamLogoUrl: '',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nuno',
    position: 'DEF',
    nationality: 'Portugal',
    jerseyNumber: 25,
    competitionId: 'ligue-1',
    totalVotes: 1876,
    uniqueVoters: 1420,
    matchesVoted: 26,
    votePercentage: 4.1,
    rank: 9,
  },
  {
    playerId: 'p10',
    playerName: 'Dimitri Payet',
    teamName: 'OM',
    teamLogoUrl: '',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Payet',
    position: 'MID',
    nationality: 'France',
    jerseyNumber: 10,
    competitionId: 'ligue-1',
    totalVotes: 1543,
    uniqueVoters: 1200,
    matchesVoted: 25,
    votePercentage: 3.4,
    rank: 10,
  },
]

export async function generateMetadata({ params }: { params: Promise<{ competitionId: string }> }) {
  const { competitionId } = await params
  const competition = mockCompetitions[competitionId]

  if (!competition) {
    return { title: 'Compétition non trouvée | SportUnion' }
  }

  return {
    title: `MVP ${competition.name} ${competition.season} | SportUnion`,
    description: `Classement des meilleurs joueurs de la saison ${competition.season} de ${competition.name}. Votez pour votre MVP !`,
  }
}

export default async function MVPPage({ params }: { params: Promise<{ competitionId: string }> }) {
  const { competitionId } = await params
  const competition = mockCompetitions[competitionId]

  if (!competition) {
    notFound()
  }

  // In production: fetch from Supabase view
  // const supabase = await createClient()
  // const { data: rankings } = await supabase.from('mvp_leaderboard').select('*').eq('competition_id', competitionId).order('total_votes', { ascending: false })

  const topThree = mockRankings.slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <header className="text-center">
        <nav className="mb-6">
          <Link href="/mvp" className="text-accent-sport text-sm hover:underline">
            ← Toutes les compétitions
          </Link>
        </nav>
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary rounded-full mb-4">
          <span className="text-3xl">{competition.logo}</span>
          <span className="font-editorial text-2xl font-bold text-primary">{competition.name}</span>
          <span className="px-2 py-0.5 bg-accent-sport text-white text-xs font-semibold rounded-full">
            {competition.season}
          </span>
        </div>
        <h1 className="font-editorial text-5xl md:text-6xl font-black text-primary mb-4">
          MVP de la Saison
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          Découvrez le classement des meilleurs joueurs élus par la communauté SportUnion.
        </p>
      </header>

      {/* Podium */}
      <MVPPodium topThree={topThree} competitionName={`${competition.name} ${competition.season}`} />

      {/* Full Leaderboard */}
      <MVPLeaderboard rankings={mockRankings} />

      {/* How it works */}
      <section className="bg-gradient-to-br from-primary to-accent-sport text-white rounded-2xl p-8 md:p-12">
        <h2 className="font-editorial text-3xl font-bold mb-6 text-center">
          Comment fonctionne le MVP ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚽</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Après chaque match</h3>
            <p className="text-white/70 text-sm">
              Votez pour le joueur qui vous a le plus impressionné sur chaque rencontre.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Cumul des votes</h3>
            <p className="text-white/70 text-sm">
              Les votes de tous les matchs sont agrégés tout au long de la saison.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏆</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Récompense finale</h3>
            <p className="text-white/70 text-sm">
              Le joueur avec le plus de votes remporte le titre de MVP de la saison.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
