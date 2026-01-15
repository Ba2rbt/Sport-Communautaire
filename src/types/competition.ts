export interface Competition {
  id: string
  name: string
  shortName: string
  logo: string
  country: string
  description: string
  season: string
  startDate: string
  endDate: string
  totalTeams: number
  totalMatches: number
  totalGoals: number
  isActive: boolean
}

export type FormResult = 'W' | 'D' | 'L' // Win, Draw, Loss

export interface Standing {
  id: string
  position: number
  team: {
    id: string
    name: string
    shortName: string
    logo: string
  }
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form: FormResult[]
}

export interface CompetitionMatch {
  id: string
  homeTeam: {
    name: string
    shortName: string
    logo: string
  }
  awayTeam: {
    name: string
    shortName: string
    logo: string
  }
  homeScore: number | null
  awayScore: number | null
  status: 'upcoming' | 'live' | 'finished'
  date: string
  time: string
  round: string
}

export interface CompetitionKPI {
  totalGoals: number
  avgGoalsPerMatch: number
  totalMatches: number
  matchesPlayed: number
  topScorer: {
    name: string
    team: string
    goals: number
  } | null
}
