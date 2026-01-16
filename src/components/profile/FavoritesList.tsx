'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { UserFavorite } from '@/types/profile'

interface FavoritesListProps {
  userId: string
  initialFavorites: UserFavorite[]
  isOwnProfile: boolean
}

const typeLabels = {
  team: { label: 'Équipes', icon: '⚽', color: 'bg-accent-sport' },
  player: { label: 'Joueurs', icon: '👤', color: 'bg-accent-mvp' },
  competition: { label: 'Compétitions', icon: '🏆', color: 'bg-accent-live' },
}

export default function FavoritesList({ userId, initialFavorites, isOwnProfile }: FavoritesListProps) {
  const [favorites, setFavorites] = useState(initialFavorites)
  const [activeTab, setActiveTab] = useState<'team' | 'player' | 'competition'>('team')
  const supabase = createClient()

  useEffect(() => {
    // Realtime subscription
    const channel = supabase
      .channel(`user-${userId}-favorites`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_favorites', filter: `user_id=eq.${userId}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setFavorites(prev => [...prev, payload.new as UserFavorite])
          } else if (payload.eventType === 'DELETE') {
            setFavorites(prev => prev.filter(f => f.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, supabase])

  const handleRemoveFavorite = async (favoriteId: string) => {
    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('id', favoriteId)

    if (error) {
      console.error('Error removing favorite:', error)
    }
  }

  const filteredFavorites = favorites.filter(f => f.favoriteType === activeTab)

  return (
    <div className="bg-white border border-editorial rounded-xl p-6">
      <h2 className="font-editorial text-2xl font-bold text-primary mb-6">
        Favoris
      </h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(Object.keys(typeLabels) as Array<keyof typeof typeLabels>).map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === type
                ? `${typeLabels[type].color} text-white`
                : 'bg-secondary text-muted hover:text-primary'
            }`}
          >
            <span>{typeLabels[type].icon}</span>
            <span>{typeLabels[type].label}</span>
            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
              activeTab === type ? 'bg-white/20' : 'bg-primary/10'
            }`}>
              {favorites.filter(f => f.favoriteType === type).length}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      {filteredFavorites.length === 0 ? (
        <div className="text-center py-8">
          <span className="text-4xl mb-4 block">{typeLabels[activeTab].icon}</span>
          <p className="text-muted">
            {isOwnProfile 
              ? `Vous n'avez pas encore de ${typeLabels[activeTab].label.toLowerCase()} favoris.`
              : `Aucun ${typeLabels[activeTab].label.toLowerCase()} favori.`
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFavorites.map((favorite) => (
            <div
              key={favorite.id}
              className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg group"
            >
              {favorite.favoriteLogo ? (
                <img
                  src={favorite.favoriteLogo}
                  alt={favorite.favoriteName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className={`w-12 h-12 rounded-full ${typeLabels[activeTab].color} flex items-center justify-center text-white font-bold`}>
                  {favorite.favoriteName[0]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-primary truncate">
                  {favorite.favoriteName}
                </p>
                <p className="text-xs text-muted">
                  Ajouté le {new Date(favorite.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
              {isOwnProfile && (
                <button
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-muted hover:text-red-500 transition-all"
                  title="Retirer des favoris"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
