import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { CompetitionHero, StandingsTable, MatchCalendar, KPICards } from '@/components/competition'
import type { Competition, Standing, CompetitionMatch, CompetitionKPI, FormResult } from '@/types/competition'
import { notFound } from 'next/navigation'
import { getTeamSlug } from '@/lib/utils'

// Transform Supabase competition data
function transformCompetition(comp: any): Competition {
  return {
    id: comp.id,
    name: comp.name,
    shortName: comp.name.substring(0, 3).toUpperCase(),
    logo: comp.logo_url || '🏆',
    country: comp.country || 'International',
    description: comp.description || `Suivez tous les matchs de ${comp.name}`,
    season: comp.current_season || '2024-2025',
    startDate: '2024-08-09',
    endDate: '2025-05-23',
    totalTeams: 18,
    totalMatches: 306,
    totalGoals: 0,
    isActive: true,
  }
}

// Transform Supabase match data for competition
function transformMatch(match: any): CompetitionMatch {
  const matchDate = new Date(`${match.date}T${match.time || '00:00'}`)
  
  return {
    id: match.id,
    homeTeam: { 
      id: `team-${match.team1}`,
      name: match.team1, 
      shortName: match.team1.substring(0, 3).toUpperCase(), 
      logo: '⚽' 
    },
    awayTeam: { 
      id: `team-${match.team2}`,
      name: match.team2, 
      shortName: match.team2.substring(0, 3).toUpperCase(), 
      logo: '⚽' 
    },
    homeScore: match.score1,
    awayScore: match.score2,
    status: match.status as 'live' | 'upcoming' | 'finished',
    date: matchDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: match.time?.substring(0, 5) || '00:00',
    round: 'Journée',
  }
}

// Generate mock standings (in production, would come from API)
function generateStandings(matches: any[]): Standing[] {
  const teamStats = new Map<string, any>()

  // Calculate stats from matches
  matches.forEach(match => {
    if (match.status !== 'finished') return

    const home = match.team1
    const away = match.team2
    const homeScore = match.score1 || 0
    const awayScore = match.score2 || 0

    // Initialize teams if needed
    if (!teamStats.has(home)) {
      teamStats.set(home, { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0 })
    }
    if (!teamStats.has(away)) {
      teamStats.set(away, { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0 })
    }

    const homeStats = teamStats.get(home)
    const awayStats = teamStats.get(away)

    homeStats.played++
    awayStats.played++
    homeStats.goalsFor += homeScore
    homeStats.goalsAgainst += awayScore
    awayStats.goalsFor += awayScore
    awayStats.goalsAgainst += homeScore

    if (homeScore > awayScore) {
      homeStats.won++
      awayStats.lost++
    } else if (homeScore < awayScore) {
      homeStats.lost++
      awayStats.won++
    } else {
      homeStats.drawn++
      awayStats.drawn++
    }
  })

  // Convert to standings array
  const standings: Standing[] = Array.from(teamStats.entries()).map(([teamName, stats], index) => ({
    id: `standing-${index}`,
    position: 0,
    team: {
      id: `team-${teamName}`,
      name: teamName,
      shortName: teamName.substring(0, 3).toUpperCase(),
      logo: '⚽',
    },
    played: stats.played,
    won: stats.won,
    drawn: stats.drawn,
    lost: stats.lost,
    goalsFor: stats.goalsFor,
    goalsAgainst: stats.goalsAgainst,
    goalDifference: stats.goalsFor - stats.goalsAgainst,
    points: stats.won * 3 + stats.drawn,
    form: ['D', 'D', 'D', 'D', 'D'] as FormResult[],
  }))

  // Sort by points, then goal difference
  standings.sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference)

  // Update positions
  standings.forEach((s, i) => { s.position = i + 1 })

  return standings
}

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: competition } = await supabase
    .from('competitions')
    .select('*')
    .eq('id', id)
    .single()

  if (!competition) {
    return { title: 'Compétition non trouvée - SportUnion' }
  }

  return {
    title: `${competition.name} ${competition.current_season || ''} | SportUnion`,
    description: `Classement, matches et statistiques de ${competition.name}`,
  }
}

export default async function CompetitionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  // Fetch competition
  const { data: competitionData, error: compError } = await supabase
    .from('competitions')
    .select('*')
    .eq('id', id)
    .single()

  if (compError || !competitionData) {
    notFound()
  }

  const competition = transformCompetition(competitionData)

  // Fetch matches for this competition
  const { data: matchesData } = await supabase
    .from('matches')
    .select('*')
    .eq('league', competitionData.name)
    .order('date', { ascending: true })
    .order('time', { ascending: true })
    .limit(100)

  const matches = matchesData?.map(transformMatch) || []
  const standings = generateStandings(matchesData || [])

  // Calculate KPIs
  const finishedMatches = matchesData?.filter(m => m.status === 'finished') || []
  const totalGoals = finishedMatches.reduce((sum, m) => sum + (m.score1 || 0) + (m.score2 || 0), 0)
  
  const kpi: CompetitionKPI = {
    totalGoals,
    avgGoalsPerMatch: finishedMatches.length > 0 ? totalGoals / finishedMatches.length : 0,
    totalMatches: matchesData?.length || 0,
    matchesPlayed: finishedMatches.length,
    topScorer: {
      name: 'À déterminer',
      team: '-',
      goals: 0,
    },
  }

  const highlightPositions = {
    champions: [1],
    championsLeague: [2, 3],
    europaLeague: [4, 5],
    relegation: standings.length > 3 ? [standings.length - 2, standings.length - 1, standings.length] : [],
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
            {standings.length > 0 ? (
              <StandingsTable 
                standings={standings} 
                highlightPositions={highlightPositions}
              />
            ) : (
              <div className="bg-white border border-editorial rounded-lg p-12 text-center">
                <span className="text-5xl mb-4 block">📊</span>
                <h3 className="font-editorial text-xl font-bold text-primary mb-2">
                  Classement en cours de calcul
                </h3>
                <p className="text-muted text-sm">
                  Les données seront disponibles après les premiers matchs.
                </p>
              </div>
            )}
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
                  <span className="text-muted">Pays</span>
                  <span className="font-semibold text-primary">{competition.country}</span>
                </div>
                <div className="px-6 py-4 flex justify-between">
                  <span className="text-muted">Matchs récupérés</span>
                  <span className="font-semibold text-primary">{matches.length}</span>
                </div>
                <div className="px-6 py-4 flex justify-between">
                  <span className="text-muted">Matchs joués</span>
                  <span className="font-semibold text-primary">{kpi.matchesPlayed}</span>
                </div>
                <div className="px-6 py-4 flex justify-between">
                  <span className="text-muted">Buts marqués</span>
                  <span className="font-semibold text-accent-live">{kpi.totalGoals}</span>
                </div>
              </div>
            </div>

            {/* Top Scorers Preview */}
            <div className="bg-white border border-editorial rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-editorial flex items-center justify-between">
                <h3 className="font-editorial text-lg font-bold text-primary">
                  Équipes en tête
                </h3>
              </div>
              <div className="divide-y divide-editorial">
                {standings.slice(0, 3).map((standing) => {
                  const teamSlug = getTeamSlug(standing.team.name)
                  return (
                    <Link 
                      key={standing.id} 
                      href={`/team/${teamSlug}`}
                      className="px-6 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`
                          w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold
                          ${standing.position === 1 ? 'bg-yellow-400 text-primary' : 'bg-secondary text-muted'}
                        `}>
                          {standing.position}
                        </span>
                        <div>
                          <p className="font-medium text-primary text-sm group-hover:text-accent-sport transition-colors">
                            {standing.team.name}
                          </p>
                          <p className="text-xs text-muted">{standing.played} matchs</p>
                        </div>
                      </div>
                      <span className="font-bold text-accent-sport">{standing.points} pts</span>
                    </Link>
                  )
                })}
                {standings.length === 0 && (
                  <div className="px-6 py-4 text-center text-muted text-sm">
                    Aucune équipe classée pour le moment
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Calendar */}
        {matches.length > 0 && (
          <MatchCalendar matches={matches} competitionId={id} />
        )}
      </div>
    </div>
  )
}
