export interface UserProfile {
  id: string
  email: string
  fullName: string | null
  avatarUrl: string | null
  bio: string | null
  location: string | null
  favoriteTeam: string | null
  role: 'user' | 'expert' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface UserStats {
  userId: string
  fullName: string | null
  avatarUrl: string | null
  memberSince: string
  totalMvpVotes: number
  totalFavorites: number
  totalPosts: number
  totalThreads: number
  totalComments: number
}

export interface UserFavorite {
  id: string
  userId: string
  favoriteType: 'team' | 'player' | 'competition'
  favoriteId: string
  favoriteName: string
  favoriteLogo: string | null
  createdAt: string
}

export interface MVPVoteHistory {
  id: string
  competitionId: string
  competitionName: string
  matchId: string | null
  playerId: string
  playerName: string
  playerPhoto: string | null
  teamName: string
  createdAt: string
}

export interface ProfileFormData {
  fullName: string
  avatarUrl: string
  bio: string
  location: string
  favoriteTeam: string
}
