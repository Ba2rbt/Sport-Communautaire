export interface Team {
  id: string
  name: string
  shortName: string
  logo: string
}

export interface TeamStats {
  name: string
  logo: string
  possession: number
  shots: number
  shotsOnTarget: number
  corners: number
  fouls: number
  yellowCards: number
  redCards: number
  offsides: number
  passes: number
  passAccuracy: number
}

export interface MatchDetails {
  id: string
  homeTeam: Team
  awayTeam: Team
  homeScore: number | null
  awayScore: number | null
  status: 'upcoming' | 'live' | 'finished' | 'postponed'
  minute: number | null
  league: string
  date: string
  time: string
  venue: string
  round: string | null
  homeStats: TeamStats
  awayStats: TeamStats
}
