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

  // Verify auth (optional for viewing, needed for posting)
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Community Header */}
      <div className="relative overflow-hidden py-16 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-blue-500 font-mono text-xs uppercase tracking-widest">Live Feed</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-4">
                Zone des <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Supporters</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl">
                Débats, rumeurs, analyses. Rejoignez la conversation avec des milliers de passionnés.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nouveau Sujet
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-6">
             {/* Filters Bar */}
             <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {['Tout', '🔥 Tendances', '⚽ Matchs', '📊 Tactique', '🔁 Mercato'].map((filter, i) => (
                <button 
                  key={filter} 
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    i === 0 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Threads List */}
            <div className="space-y-4">
               {/* Client Component for Interactivity */}
               <CommunityClient initialThreads={mockThreads} user={user} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Trending Tags Widget */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-xl">📈</span> Sujets Brûlants
              </h3>
              <div className="space-y-3">
                {[
                  { tag: '#PSGOM', count: '12.5k posts' },
                  { tag: '#Mercato', count: '8.2k posts' },
                  { tag: '#Ligue1', count: '5.1k posts' },
                  { tag: '#Mbappe', count: '3.4k posts' },
                ].map((item, i) => (
                  <div key={item.tag} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-slate-300 group-hover:text-blue-400 transition-colors">{i+1}. {item.tag}</span>
                    <span className="text-slate-500 text-sm">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Users Widget */}
            <div className="glass rounded-2xl p-6 border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
              <h3 className="font-bold text-lg mb-4">Topributeurs</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((u) => (
                  <div key={u} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10" />
                    <div>
                      <p className="font-bold text-sm">User_{u}</p>
                      <p className="text-xs text-slate-500">145 contributions</p>
                    </div>
                    {u === 1 && <span className="ml-auto text-yellow-500 text-xs font-bold">👑 #1</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Event Teaser */}
            <div className="relative rounded-2xl overflow-hidden p-6 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90" />
              <div className="relative z-10">
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Prochain Live</p>
                <h3 className="text-xl font-bold text-white mb-4">Debrief du Dimanche</h3>
                <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
