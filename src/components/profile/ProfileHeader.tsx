'use client'

import { useState } from 'react'
import type { UserProfile, UserStats } from '@/types/profile'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ProfileHeaderProps {
  profile: UserProfile
  stats: UserStats
  isOwnProfile: boolean
  onEdit?: () => void
}

export default function ProfileHeader({ profile, stats, isOwnProfile, onEdit }: ProfileHeaderProps) {
  const initials = (profile.fullName || profile.email)
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const memberSince = format(new Date(stats.memberSince), 'MMMM yyyy', { locale: fr })

  return (
    <div className="bg-gradient-to-br from-primary via-primary to-accent-sport rounded-2xl p-8 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.fullName || 'Avatar'}
              className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-xl"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/20 flex items-center justify-center shadow-xl">
              <span className="text-4xl font-bold">{initials}</span>
            </div>
          )}
          
          {/* Role Badge */}
          {profile.role !== 'user' && (
            <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold ${
              profile.role === 'expert' ? 'bg-accent-mvp' : 'bg-accent-live'
            }`}>
              {profile.role === 'expert' ? '✨ Expert' : '👑 Admin'}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-editorial text-3xl md:text-4xl font-bold mb-2">
            {profile.fullName || 'Membre SportUnion'}
          </h1>
          
          <p className="text-white/70 text-sm mb-4">
            Membre depuis {memberSince}
            {profile.location && ` · 📍 ${profile.location}`}
          </p>

          {profile.bio && (
            <p className="text-white/90 leading-relaxed max-w-xl mb-4">
              {profile.bio}
            </p>
          )}

          {profile.favoriteTeam && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <span>❤️</span>
              <span className="font-medium">{profile.favoriteTeam}</span>
            </div>
          )}
        </div>

        {/* Edit Button */}
        {isOwnProfile && onEdit && (
          <button
            onClick={onEdit}
            className="absolute top-4 right-4 md:relative md:top-0 md:right-0 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            title="Modifier le profil"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="relative grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-8 border-t border-white/20">
        <div className="text-center">
          <p className="text-3xl font-black">{stats.totalMvpVotes}</p>
          <p className="text-white/60 text-sm">Votes MVP</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-black">{stats.totalFavorites}</p>
          <p className="text-white/60 text-sm">Favoris</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-black">{stats.totalPosts}</p>
          <p className="text-white/60 text-sm">Messages</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-black">{stats.totalThreads}</p>
          <p className="text-white/60 text-sm">Discussions</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-black">{stats.totalComments}</p>
          <p className="text-white/60 text-sm">Commentaires</p>
        </div>
      </div>
    </div>
  )
}
