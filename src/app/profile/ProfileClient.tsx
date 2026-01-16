'use client'

import { useState } from 'react'
import { ProfileHeader, FavoritesList, VoteHistory, ProfileEditModal } from '@/components/profile'
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
  const [stats, setStats] = useState(initialStats)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleProfileSave = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile)
    setStats(prev => ({
      ...prev,
      fullName: updatedProfile.fullName,
      avatarUrl: updatedProfile.avatarUrl,
    }))
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header with stats */}
      <ProfileHeader 
        profile={profile}
        stats={stats}
        isOwnProfile={true}
        onEdit={() => setIsEditModalOpen(true)}
      />

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Favorites */}
        <FavoritesList 
          userId={userId}
          initialFavorites={initialFavorites}
          isOwnProfile={true}
        />

        {/* Vote History */}
        <VoteHistory votes={initialVoteHistory} />
      </div>

      {/* Activity Section */}
      <section className="bg-white border border-editorial rounded-xl p-6">
        <h2 className="font-editorial text-2xl font-bold text-primary mb-6">
          Activité récente
        </h2>
        <div className="space-y-4">
          {[
            { type: 'vote', text: 'A voté pour Kylian Mbappé comme MVP', time: 'il y a 2 heures', icon: '🗳️' },
            { type: 'comment', text: 'A commenté le match PSG - OM', time: 'il y a 1 jour', icon: '💬' },
            { type: 'thread', text: 'A créé une discussion sur le mercato', time: 'il y a 3 jours', icon: '📝' },
            { type: 'favorite', text: 'A ajouté Real Madrid aux favoris', time: 'il y a 5 jours', icon: '❤️' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-4 p-3 hover:bg-secondary/50 rounded-lg transition-colors">
              <span className="text-2xl">{activity.icon}</span>
              <div className="flex-1">
                <p className="text-primary">{activity.text}</p>
                <p className="text-xs text-muted">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="font-editorial text-xl font-bold text-red-600 mb-4">
          Zone de danger
        </h2>
        <p className="text-red-600/80 text-sm mb-4">
          Ces actions sont irréversibles. Procédez avec précaution.
        </p>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
            Supprimer mes données
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            Supprimer mon compte
          </button>
        </div>
      </section>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <ProfileEditModal
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleProfileSave}
        />
      )}
    </div>
  )
}
