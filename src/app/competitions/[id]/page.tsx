import { createClient } from '@/lib/supabase/server'
import { CompetitionHero, StandingsTable, MatchCalendar, KPICards } from '@/components/competition'
import type { Competition, Standing, CompetitionMatch, CompetitionKPI, FormResult } from '@/types/competition'
import { notFound } from 'next/navigation'

// Mock data generator for demo
function getMockCompetition(id: string): Competition {
  return {
    id,
    name: 'Ligue 1 Uber Eats',
    shortName: 'L1',
    logo: '🇫🇷',
    country: 'France',
    description: 'Le championnat de France de football, également connu sous le nom de Ligue 1, est la compétition de football la plus prestigieuse en France. Créé en 1932, il réunit les 18 meilleures équipes du pays.',
    season: '2025-2026',
    startDate: '2025-08-09',
    endDate: '2026-05-23',
    totalTeams: 18,
    totalMatches: 306,
    totalGoals: 547,
    isActive: true,
  }
}

function getMockStandings(): Standing[] {
  const teams = [
    { name: 'Paris Saint-Germain', shortName: 'PSG', logo: '🔵' },
    { name: 'AS Monaco', shortName: 'ASM', logo: '🔴' },
    { name: 'Olympique de Marseille', shortName: 'OM', logo: '⚪' },
    { name: 'LOSC Lille', shortName: 'LOSC', logo: '🐕' },
    { name: 'OGC Nice', shortName: 'OGCN', logo: '🦅' },
    { name: 'Olympique Lyonnais', shortName: 'OL', logo: '🦁' },
    { name: 'RC Lens', shortName: 'RCL', logo: '🟡' },
    { name: 'Stade Rennais', shortName: 'SRFC', logo: '🔻' },
    { name: 'Stade Brestois', shortName: 'SB29', logo: '🏴' },
    { name: 'Toulouse FC', shortName: 'TFC', logo: '🟣' },
    { name: 'RC Strasbourg', shortName: 'RCSA', logo: '🔷' },
    { name: 'FC Nantes', shortName: 'FCN', logo: '🟢' },
    { name: 'Montpellier HSC', shortName: 'MHSC', logo: '🟠' },
    { name: 'Stade de Reims', shortName: 'SDR', logo: '⬜' },
    { name: 'AJ Auxerre', shortName: 'AJA', logo: '💙' },
    { name: 'Angers SCO', shortName: 'SCO', logo: '⚫' },
    { name: 'AS Saint-Étienne', shortName: 'ASSE', logo: '💚' },
    { name: 'Le Havre AC', shortName: 'HAC', logo: '🌊' },
  ]

  const forms: FormResult[][] = [
    ['W', 'W', 'W', 'D', 'W'],
    ['W', 'D', 'W', 'W', 'L'],
    ['W', 'W', 'D', 'W', 'D'],
    ['D', 'W', 'W', 'D', 'W'],
    ['W', 'L', 'W', 'W', 'D'],
    ['D', 'D', 'W', 'L', 'W'],
    ['W', 'D', 'D', 'W', 'L'],
    ['L', 'W', 'W', 'D', 'D'],
    ['W', 'D', 'L', 'W', 'D'],
    ['D', 'L', 'W', 'D', 'W'],
    ['L', 'D', 'D', 'W', 'W'],
    ['D', 'W', 'L', 'D', 'L'],
    ['L', 'L', 'W', 'D', 'D'],
    ['D', 'D', 'L', 'W', 'L'],
    ['L', 'D', 'L', 'D', 'W'],
    ['L', 'L', 'D', 'L', 'D'],
    ['D', 'L', 'L', 'L', 'D'],
    ['L', 'L', 'L', 'D', 'L'],
  ]

  return teams.map((team, index) => {
    const position = index + 1
    const basePoints = 50 - index * 2.5
    const played = 18
    const won = Math.floor(basePoints / 3)
    const drawn = Math.floor((basePoints % 3) * 2)
    const lost = played - won - drawn
    const goalsFor = Math.floor(35 - index * 1.2)
    const goalsAgainst = Math.floor(15 + index * 1.1)

    return {
      id: `standing-${index}`,
      position,
      team: {
        id: `team-${index}`,
        ...team,
      },
      played,
      won,
      drawn,
      lost,
      goalsFor,
      goalsAgainst,
      goalDifference: goalsFor - goalsAgainst,
      points: won * 3 + drawn,
      form: forms[index],
    }
  })
}

function getMockMatches(): CompetitionMatch[] {
  const matches: CompetitionMatch[] = []
  const teams = [
    { name: 'Paris Saint-Germain', shortName: 'PSG', logo: '🔵' },
    { name: 'AS Monaco', shortName: 'ASM', logo: '🔴' },
    { name: 'Olympique de Marseille', shortName: 'OM', logo: '⚪' },
    { name: 'LOSC Lille', shortName: 'LOSC', logo: '🐕' },
    { name: 'OGC Nice', shortName: 'OGCN', logo: '🦅' },
    { name: 'Olympique Lyonnais', shortName: 'OL', logo: '🦁' },
  ]

  // Generate recent and upcoming matches
  for (let round = 17; round <= 19; round++) {
    for (let i = 0; i < 3; i++) {
      const homeIdx = (i * 2) % teams.length
      const awayIdx = (i * 2 + 1) % teams.length
      const isFinished = round < 18
      const isLive = round === 18 && i === 0
      const isUpcoming = round > 18 || (round === 18 && i > 0)

      matches.push({
        id: `match-${round}-${i}`,
        homeTeam: teams[homeIdx],
        awayTeam: teams[awayIdx],
        homeScore: isUpcoming ? null : Math.floor(Math.random() * 4),
        awayScore: isUpcoming ? null : Math.floor(Math.random() * 3),
        status: isLive ? 'live' : isFinished ? 'finished' : 'upcoming',
        date: round < 18 ? '10 Jan 2026' : round === 18 ? '15 Jan 2026' : '20 Jan 2026',
        time: `${17 + i * 2}:00`,
        round: `Journée ${round}`,
      })
    }
  }

  return matches
}

function getMockKPI(): CompetitionKPI {
  return {
    totalGoals: 547,
    avgGoalsPerMatch: 2.87,
    totalMatches: 306,
    matchesPlayed: 190,
    topScorer: {
      name: 'Kylian Mbappé',
      team: 'PSG',
      goals: 18,
    },
  }
}

// In production, fetch from Supabase
async function getCompetition(id: string): Promise<Competition | null> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return getMockCompetition(id)
}

async function getStandings(competitionId: string): Promise<Standing[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return getMockStandings()
}

async function getMatches(competitionId: string): Promise<CompetitionMatch[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return getMockMatches()
}

async function getKPI(competitionId: string): Promise<CompetitionKPI> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return getMockKPI()
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const competition = await getCompetition(id)

  if (!competition) {
    return { title: 'Compétition non trouvée - SportUnion' }
  }

  return {
    title: `${competition.name} ${competition.season} | SportUnion`,
    description: competition.description,
  }
}

export default async function CompetitionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const [competition, standings, matches, kpi] = await Promise.all([
    getCompetition(id),
    getStandings(id),
    getMatches(id),
    getKPI(id),
  ])

  if (!competition) {
    notFound()
  }

  const highlightPositions = {
    champions: [1],
    championsLeague: [2, 3],
    europaLeague: [4, 5],
    relegation: [16, 17, 18],
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero */}
      <CompetitionHero
        name={competition.name}
        logo={competition.logo}
        country={competition.country}
        description={competition.description}
        season={competition.season}
        totalTeams={competition.totalTeams}
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        {/* KPI Cards */}
        <KPICards kpi={kpi} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Standings - 2 cols */}
          <div className="xl:col-span-2">
            <StandingsTable 
              standings={standings} 
              highlightPositions={highlightPositions}
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white border border-editorial rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-editorial">
                <h3 className="font-editorial text-lg font-bold text-primary">
                  Infos compétition
                </h3>
              </div>
              <div className="divide-y divide-editorial">
                <div className="px-6 py-4 flex justify-between">
                  <span className="text-muted">Saison</span>
                  <span className="font-semibold text-primary">{competition.season}</span>
                </div>
                <div className="px-6 py-4 flex justify-between">
                  <span className="text-muted">Équipes</span>
                  <span className="font-semibold text-primary">{competition.totalTeams}</span>
                </div>
                <div className="px-6 py-4 flex justify-between">
                  <span className="text-muted">Matchs totaux</span>
                  <span className="font-semibold text-primary">{competition.totalMatches}</span>
                </div>
                <div className="px-6 py-4 flex justify-between">
                  <span className="text-muted">Début</span>
                  <span className="font-semibold text-primary">{competition.startDate}</span>
                </div>
                <div className="px-6 py-4 flex justify-between">
                  <span className="text-muted">Fin</span>
                  <span className="font-semibold text-primary">{competition.endDate}</span>
                </div>
              </div>
            </div>

            {/* Top Scorers Preview */}
            <div className="bg-white border border-editorial rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-editorial flex items-center justify-between">
                <h3 className="font-editorial text-lg font-bold text-primary">
                  Meilleurs buteurs
                </h3>
                <span className="text-xs text-accent-sport font-medium">Voir tout →</span>
              </div>
              <div className="divide-y divide-editorial">
                {[
                  { rank: 1, name: 'Kylian Mbappé', team: 'PSG', goals: 18 },
                  { rank: 2, name: 'Jonathan David', team: 'LOSC', goals: 14 },
                  { rank: 3, name: 'Bradley Barcola', team: 'PSG', goals: 12 },
                ].map((player) => (
                  <div key={player.rank} className="px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`
                        w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold
                        ${player.rank === 1 ? 'bg-yellow-400 text-primary' : 'bg-secondary text-muted'}
                      `}>
                        {player.rank}
                      </span>
                      <div>
                        <p className="font-medium text-primary text-sm">{player.name}</p>
                        <p className="text-xs text-muted">{player.team}</p>
                      </div>
                    </div>
                    <span className="font-bold text-accent-live">{player.goals}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Calendar */}
        <MatchCalendar matches={matches} competitionId={id} />
      </div>
    </div>
  )
}
