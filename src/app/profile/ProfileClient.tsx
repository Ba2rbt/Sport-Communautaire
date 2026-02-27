'use client'

import { useState } from 'react'
import type { UserProfile, UserStats, UserFavorite, MVPVoteHistory } from '@/types/profile'

interface ProfileClientProps {
  initialProfile: UserProfile
  initialStats: UserStats
  initialFavorites: UserFavorite[]
  initialVoteHistory: MVPVoteHistory[]
  userId: string
}

export default function ProfileClient({
  initialProfile,
  initialStats,
  initialFavorites,
  initialVoteHistory,
  userId,
}: ProfileClientProps) {
  const [profile, setProfile] = useState(initialProfile)
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings'>('overview')

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      
      {/* Profile Header Card */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0f172a] border border-white/10 shadow-2xl">
        {/* Banner/Cover */}
        <div className="h-48 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            <div className="absolute bottom-4 right-6 flex gap-3">
                <button className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-lg text-white text-sm font-medium hover:bg-black/60 transition-colors border border-white/10">
                    Modifier la couverture
                </button>
            </div>
        </div>

        {/* Profile Info Bar */}
        <div className="px-8 pb-8 flex flex-col md:flex-row items-end -mt-16 gap-6 relative z-10">
            <div className="relative group">
                <div className="w-32 h-32 rounded-2xl bg-slate-800 border-4 border-[#0f172a] shadow-xl overflow-hidden relative">
                     {/* Avatar would go here */}
                     <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white">
                        {(profile.fullName ?? profile.email ?? '?').charAt(0)}
                     </div>
                </div>
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-slate-800 rounded-full"></div>
            </div>
            
            <div className="flex-1 mb-2">
                <h1 className="text-3xl font-bold text-white mb-1">{profile.fullName}</h1>
                <p className="text-slate-400 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-accent-sport rounded-full"></span>
                    Supporter • {profile.location}
                </p>
            </div>

            <div className="flex gap-3 mb-2 w-full md:w-auto">
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="flex-1 md:flex-none px-6 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors shadow-lg shadow-white/5"
                >
                    Modifier le profil
                </button>
                <button className="p-2.5 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors">
                    <span className="sr-only">Settings</span>
                    ⚙️
                </button>
            </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="px-8 border-t border-white/5">
            <nav className="flex gap-8">
                {['overview', 'activity', 'settings'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
                            activeTab === tab 
                            ? 'border-accent-sport text-white' 
                            : 'border-transparent text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        {tab === 'overview' ? 'Vue d\'ensemble' : tab === 'activity' ? 'Activités' : 'Paramètres'}
                    </button>
                ))}
            </nav>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Stats & Info */}
        <div className="space-y-8">
             {/* Stats Card */}
            <div className="bg-[#1e293b]/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-accent-sport">📊</span> Statistiques
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="text-2xl font-bold text-white mb-1">{initialStats.totalMvpVotes}</div>
                        <div className="text-xs text-slate-400 uppercase font-medium">Votes MVP</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="text-2xl font-bold text-white mb-1">{initialStats.totalFavorites}</div>
                        <div className="text-xs text-slate-400 uppercase font-medium">Favoris</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="text-2xl font-bold text-white mb-1">{initialStats.totalPosts}</div>
                        <div className="text-xs text-slate-400 uppercase font-medium">Posts</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="text-2xl font-bold text-white mb-1">{initialStats.totalComments}</div>
                        <div className="text-xs text-slate-400 uppercase font-medium">Commentaires</div>
                    </div>
                </div>
            </div>

            {/* About Card */}
            <div className="bg-[#1e293b]/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white mb-4">À propos</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {profile.bio || "Aucune biographie renseignée."}
                </p>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg">❤️</span>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Club de cœur</p>
                            <p className="font-bold">{profile.favoriteTeam || 'Non défini'}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg">📅</span>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Membre depuis</p>
                            <p className="font-bold">{new Date().toLocaleDateString('fr-FR', {month: 'long', year: 'numeric'})}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Center/Right Column - Content Feed */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Favorites Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Favoris récents</h2>
                    <button className="text-xs font-bold text-accent-sport hover:text-white uppercase tracking-wider transition-colors">Voir tout</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {initialFavorites.slice(0, 4).map((fav) => (
                        <div key={fav.id} className="flex items-center gap-4 p-4 bg-[#1e293b]/50 border border-white/5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                             <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-accent-sport group-hover:text-black transition-colors">
                                 {/* Mock Icon based on type */}
                                 {fav.favoriteType === 'team' ? '🛡️' : fav.favoriteType === 'player' ? '👤' : '🏆'}
                             </div>
                             <div>
                                 <h4 className="font-bold text-white group-hover:text-accent-sport transition-colors">{fav.favoriteName}</h4>
                                 <p className="text-xs text-slate-400 capitalize">{fav.favoriteType}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </section>

             {/* Recent Activity */}
            <section>
                <h2 className="text-xl font-bold text-white mb-4">Historique de votes MVP</h2>
                <div className="bg-[#1e293b]/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                    {initialVoteHistory.map((vote, i) => (
                        <div key={vote.id} className={`p-4 flex items-center gap-4 hover:bg-white/5 transition-colors ${i !== initialVoteHistory.length - 1 ? 'border-b border-white/5' : ''}`}>
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 text-sm font-bold text-slate-400">
                                {(vote.matchId ?? '?').charAt(0)}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-white">
                                    Vous avez voté pour <span className="font-bold text-accent-sport">{vote.playerName}</span>
                                </p>
                                <p className="text-xs text-slate-500">
                                    {vote.competitionName} • {new Date(vote.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-lg border border-green-500/20">
                                +10 XP
                            </div>
                        </div>
                    ))}
                    {initialVoteHistory.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            Aucun vote récent.
                        </div>
                    )}
                </div>
            </section>
        </div>
      </div>
    </div>
  )
}
