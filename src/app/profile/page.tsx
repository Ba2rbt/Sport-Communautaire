import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProfileClient from './ProfileClient'
import type { UserProfile, UserStats, UserFavorite, MVPVoteHistory } from '@/types/profile'

export const metadata = {
  title: 'Mon Profil | SportUnion',
  description: 'Gérez votre profil, vos favoris et consultez votre historique de votes.',
}

// Mock data generator (kept from original)
function getMockData(userId: string) {
  const profile: UserProfile = {
    id: userId,
    email: 'demo@sportunion.fr',
    fullName: 'Jean Dupont',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
    bio: 'Passionné de football depuis toujours. Supporter du PSG et amateur de belles analyses tactiques.',
    location: 'Paris, France',
    favoriteTeam: 'Paris Saint-Germain',
    role: 'user',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-20T15:30:00Z',
  }

  const stats: UserStats = {
    userId,
    fullName: profile.fullName,
    avatarUrl: profile.avatarUrl,
    memberSince: profile.createdAt,
    totalMvpVotes: 47,
    totalFavorites: 12,
    totalPosts: 156,
    totalThreads: 8,
    totalComments: 234,
  }

  const favorites: UserFavorite[] = [
    { id: '1', userId, favoriteType: 'team', favoriteId: 'psg', favoriteName: 'Paris Saint-Germain', favoriteLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=PSG', createdAt: '2024-02-10T12:00:00Z' },
    { id: '2', userId, favoriteType: 'team', favoriteId: 'real', favoriteName: 'Real Madrid', favoriteLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Real', createdAt: '2024-03-15T09:00:00Z' },
    { id: '3', userId, favoriteType: 'player', favoriteId: 'mbappe', favoriteName: 'Kylian Mbappé', favoriteLogo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mbappe', createdAt: '2024-01-20T14:00:00Z' },
    { id: '4', userId, favoriteType: 'player', favoriteId: 'bellingham', favoriteName: 'Jude Bellingham', favoriteLogo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bellingham', createdAt: '2024-04-05T11:00:00Z' },
    { id: '5', userId, favoriteType: 'competition', favoriteId: 'ligue-1', favoriteName: 'Ligue 1', favoriteLogo: null, createdAt: '2024-01-15T10:00:00Z' },
    { id: '6', userId, favoriteType: 'competition', favoriteId: 'ucl', favoriteName: 'Ligue des Champions', favoriteLogo: null, createdAt: '2024-01-15T10:00:00Z' },
  ]

  const voteHistory: MVPVoteHistory[] = [
    { id: 'v1', competitionId: 'ligue-1', competitionName: 'Ligue 1', matchId: 'm1', playerId: 'mbappe', playerName: 'Kylian Mbappé', playerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mbappe', teamName: 'Real Madrid', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
    { id: 'v2', competitionId: 'ligue-1', competitionName: 'Ligue 1', matchId: 'm2', playerId: 'dembele', playerName: 'Ousmane Dembélé', playerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dembele', teamName: 'PSG', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() },
    { id: 'v3', competitionId: 'premier-league', competitionName: 'Premier League', matchId: 'm3', playerId: 'saliba', playerName: 'William Saliba', playerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saliba', teamName: 'Arsenal', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
    { id: 'v4', competitionId: 'la-liga', competitionName: 'La Liga', matchId: 'm4', playerId: 'bellingham', playerName: 'Jude Bellingham', playerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bellingham', teamName: 'Real Madrid', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() },
    { id: 'v5', competitionId: 'ligue-1', competitionName: 'Ligue 1', matchId: 'm5', playerId: 'david', playerName: 'Jonathan David', playerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', teamName: 'Lille OSC', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString() },
    { id: 'v6', competitionId: 'bundesliga', competitionName: 'Bundesliga', matchId: 'm6', playerId: 'wirtz', playerName: 'Florian Wirtz', playerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wirtz', teamName: 'Bayer Leverkusen', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString() },
  ]

  return { profile, stats, favorites, voteHistory }
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect if not logged in
  if (!user) {
    redirect('/login?redirect=/profile')
  }

  // In production, fetch from Supabase:
  // const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  // const { data: stats } = await supabase.from('user_stats').select('*').eq('user_id', user.id).single()
  // const { data: favorites } = await supabase.from('user_favorites').select('*').eq('user_id', user.id)
  // const { data: votes } = await supabase.from('season_mvp_votes').select('*, player:players(*)').eq('user_id', user.id).order('created_at', { ascending: false })

  const { profile, stats, favorites, voteHistory } = getMockData(user.id)

  // Override with real user data
  const realProfile: UserProfile = {
    ...profile,
    id: user.id,
    email: user.email || profile.email,
    fullName: user.user_metadata?.full_name || profile.fullName,
    avatarUrl: user.user_metadata?.avatar_url || profile.avatarUrl,
  }

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-12 px-6">
      <ProfileClient 
        initialProfile={realProfile}
        initialStats={stats}
        initialFavorites={favorites}
        initialVoteHistory={voteHistory}
        userId={user.id}
      />
    </div>
  )
}