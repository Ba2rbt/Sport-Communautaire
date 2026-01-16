export interface Player {
  id: string
  name: string
  teamName: string
  teamLogoUrl?: string
  photoUrl?: string
  position: PlayerPosition
  nationality?: string
  jerseyNumber?: number
}

export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'FWD'

export const positionLabels: Record<PlayerPosition, { label: string; color: string }> = {
  GK: { label: 'Gardien', color: 'bg-yellow-500 text-white' },
  DEF: { label: 'Défenseur', color: 'bg-blue-500 text-white' },
  MID: { label: 'Milieu', color: 'bg-green-500 text-white' },
  FWD: { label: 'Attaquant', color: 'bg-red-500 text-white' },
}

export interface MVPRanking {
  playerId: string
  playerName: string
  teamName: string
  teamLogoUrl?: string
  photoUrl?: string
  position: PlayerPosition
  nationality?: string
  jerseyNumber?: number
  competitionId: string
  totalVotes: number
  uniqueVoters: number
  matchesVoted: number
  votePercentage: number
  rank: number
}

export interface SeasonMVPVote {
  id: string
  competitionId: string
  matchId?: string
  playerId: string
  userId: string
  createdAt: string
}
