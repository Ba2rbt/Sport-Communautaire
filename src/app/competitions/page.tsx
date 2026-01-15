import Link from 'next/link'
import type { Competition } from '@/types/competition'

// Mock data for competitions list
const mockCompetitions: Competition[] = [
  {
    id: 'ligue-1',
    name: 'Ligue 1 Uber Eats',
    shortName: 'L1',
    logo: '🇫🇷',
    country: 'France',
    description: 'Le championnat de France de football',
    season: '2025-2026',
    startDate: '2025-08-09',
    endDate: '2026-05-23',
    totalTeams: 18,
    totalMatches: 306,
    totalGoals: 547,
    isActive: true,
  },
  {
    id: 'premier-league',
    name: 'Premier League',
    shortName: 'PL',
    logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    country: 'Angleterre',
    description: 'Le championnat anglais de football',
    season: '2025-2026',
    startDate: '2025-08-16',
    endDate: '2026-05-24',
    totalTeams: 20,
    totalMatches: 380,
    totalGoals: 612,
    isActive: true,
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    shortName: 'LL',
    logo: '🇪🇸',
    country: 'Espagne',
    description: 'Le championnat espagnol de football',
    season: '2025-2026',
    startDate: '2025-08-18',
    endDate: '2026-05-31',
    totalTeams: 20,
    totalMatches: 380,
    totalGoals: 589,
    isActive: true,
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    shortName: 'SA',
    logo: '🇮🇹',
    country: 'Italie',
    description: 'Le championnat italien de football',
    season: '2025-2026',
    startDate: '2025-08-17',
    endDate: '2026-05-25',
    totalTeams: 20,
    totalMatches: 380,
    totalGoals: 534,
    isActive: true,
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    shortName: 'BL',
    logo: '🇩🇪',
    country: 'Allemagne',
    description: 'Le championnat allemand de football',
    season: '2025-2026',
    startDate: '2025-08-23',
    endDate: '2026-05-17',
    totalTeams: 18,
    totalMatches: 306,
    totalGoals: 498,
    isActive: true,
  },
  {
    id: 'champions-league',
    name: 'UEFA Champions League',
    shortName: 'UCL',
    logo: '⭐',
    country: 'Europe',
    description: 'La plus prestigieuse compétition européenne',
    season: '2025-2026',
    startDate: '2025-09-17',
    endDate: '2026-05-30',
    totalTeams: 36,
    totalMatches: 189,
    totalGoals: 312,
    isActive: true,
  },
]

function CompetitionCard({ competition }: { competition: Competition }) {
  return (
    <Link 
      href={`/competitions/${competition.id}`}
      className="block bg-white border border-editorial rounded-lg overflow-hidden hover-lift"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{competition.logo}</span>
          <div>
            <h3 className="font-editorial text-xl font-bold text-primary">
              {competition.name}
            </h3>
            <p className="text-sm text-muted">{competition.country} • {competition.season}</p>
          </div>
        </div>
        <p className="text-muted text-sm mb-4 line-clamp-2">
          {competition.description}
        </p>
        <div className="flex items-center gap-4 text-sm">
          <span className="px-3 py-1 bg-secondary rounded-full text-muted">
            {competition.totalTeams} équipes
          </span>
          <span className="px-3 py-1 bg-accent-live/10 text-accent-live rounded-full font-medium">
            {competition.totalGoals} buts
          </span>
        </div>
      </div>
    </Link>
  )
}

export const metadata = {
  title: 'Compétitions | SportUnion',
  description: 'Suivez toutes les compétitions de football : Ligue 1, Premier League, La Liga, Serie A, Bundesliga et Champions League.',
}

export default function CompetitionsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-editorial text-5xl font-bold text-primary mb-4">
          Compétitions
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Suivez les classements, calendriers et statistiques de toutes les grandes compétitions de football.
        </p>
      </div>

      {/* Featured */}
      <section>
        <h2 className="font-editorial text-2xl font-bold text-primary mb-6">
          Championnats majeurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCompetitions.slice(0, 5).map((competition) => (
            <CompetitionCard key={competition.id} competition={competition} />
          ))}
        </div>
      </section>

      {/* European */}
      <section>
        <h2 className="font-editorial text-2xl font-bold text-primary mb-6">
          Coupes européennes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCompetitions.slice(5).map((competition) => (
            <CompetitionCard key={competition.id} competition={competition} />
          ))}
        </div>
      </section>
    </div>
  )
}
