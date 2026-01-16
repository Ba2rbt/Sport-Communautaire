import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CommunityClient from './CommunityClient'
import type { Thread, ThreadCategory } from '@/types/community'

// Mock data for demo
const mockThreads: Thread[] = [
  {
    id: 'thread-1',
    title: '🔥 Pronostics pour le Classico PSG-OM ce weekend !',
    content: 'Le match de l\'année approche ! Qui selon vous va l\'emporter ? Je mise sur un 2-1 pour le PSG avec un doublé de Mbappé.',
    author: { id: 'u1', email: 'jean@example.com', fullName: 'Jean Dupont' },
    category: 'matchday',
    isPinned: true,
    isLocked: false,
    viewsCount: 1250,
    repliesCount: 47,
    likesCount: 89,
    isLikedByUser: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    lastReplyAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    lastReplyAuthor: { id: 'u2', email: 'marie@example.com', fullName: 'Marie Martin' },
  },
  {
    id: 'thread-2',
    title: 'Analyse tactique : pourquoi le 4-3-3 de Luis Enrique fonctionne',
    content: 'Décortiquons ensemble le système de jeu du PSG cette saison. Points forts, points faibles et alternatives possibles.',
    author: { id: 'u3', email: 'pierre@example.com', fullName: 'Pierre Expert', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre' },
    category: 'tactics',
    isPinned: false,
    isLocked: false,
    viewsCount: 856,
    repliesCount: 23,
    likesCount: 67,
    isLikedByUser: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: 'thread-3',
    title: 'Rumeur mercato : Un attaquant de Premier League vers l\'OM ?',
    content: 'Selon plusieurs sources anglaises, l\'OM serait sur les traces d\'un attaquant évoluant actuellement en Premier League...',
    author: { id: 'u4', email: 'sophie@example.com', fullName: 'Sophie Bernard' },
    category: 'transfers',
    isPinned: false,
    isLocked: false,
    viewsCount: 2340,
    repliesCount: 89,
    likesCount: 45,
    isLikedByUser: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    lastReplyAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    lastReplyAuthor: { id: 'u5', email: 'luc@example.com', fullName: 'Luc Mercato' },
  },
  {
    id: 'thread-4',
    title: 'Quel est votre plus beau souvenir de supporter ?',
    content: 'Pour moi c\'est forcément la finale 2006 en Allemagne. Une ambiance incroyable malgré la défaite...',
    author: { id: 'u6', email: 'thomas@example.com', fullName: 'Thomas Nostalgie' },
    category: 'general',
    isPinned: false,
    isLocked: false,
    viewsCount: 567,
    repliesCount: 34,
    likesCount: 78,
    isLikedByUser: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'thread-5',
    title: 'Comment fonctionne le système de points en Ligue 1 ?',
    content: 'Question de débutant : je ne comprends pas comment les points sont attribués et le classement établi.',
    author: { id: 'u7', email: 'newbie@example.com', fullName: 'Nouveau Fan' },
    category: 'help',
    isPinned: false,
    isLocked: false,
    viewsCount: 123,
    repliesCount: 8,
    likesCount: 12,
    isLikedByUser: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: 'thread-6',
    title: 'Vos jeux vidéo de foot préférés ?',
    content: 'FC 25, eFootball ou autre chose ? Personnellement je reste fidèle à Football Manager depuis des années.',
    author: { id: 'u8', email: 'gamer@example.com', fullName: 'GameFan' },
    category: 'offtopic',
    isPinned: false,
    isLocked: false,
    viewsCount: 234,
    repliesCount: 19,
    likesCount: 23,
    isLikedByUser: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
]

export const metadata = {
  title: 'Communauté | SportUnion',
  description: 'Rejoignez la discussion avec d\'autres fans de sport. Partagez vos analyses, pronostics et opinions.',
}

export default async function CommunityPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if not authenticated
  if (!user) {
    redirect('/login?redirectTo=/community')
  }

  return <CommunityClient threads={mockThreads} user={user} />
}
