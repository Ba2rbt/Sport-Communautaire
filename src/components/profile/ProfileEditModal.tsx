'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { UserProfile, ProfileFormData } from '@/types/profile'

interface ProfileEditModalProps {
  profile: UserProfile
  onClose: () => void
  onSave: (updatedProfile: UserProfile) => void
}

export default function ProfileEditModal({ profile, onClose, onSave }: ProfileEditModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: profile.fullName || '',
    avatarUrl: profile.avatarUrl || '',
    bio: profile.bio || '',
    location: profile.location || '',
    favoriteTeam: profile.favoriteTeam || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createClient()

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName || null,
          avatar_url: formData.avatarUrl || null,
          bio: formData.bio || null,
          location: formData.location || null,
          favorite_team: formData.favoriteTeam || null,
        })
        .eq('id', profile.id)
        .select()
        .single()

      if (updateError) throw updateError

      onSave({
        ...profile,
        fullName: formData.fullName || null,
        avatarUrl: formData.avatarUrl || null,
        bio: formData.bio || null,
        location: formData.location || null,
        favoriteTeam: formData.favoriteTeam || null,
      })
      
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-editorial px-6 py-4 flex items-center justify-between">
          <h2 className="font-editorial text-2xl font-bold text-primary">
            Modifier le profil
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-muted hover:text-primary hover:bg-secondary rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Avatar Preview */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-editorial"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-accent-sport flex items-center justify-center text-white text-2xl font-bold">
                  {(formData.fullName || profile.email)[0].toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary mb-1">
                URL de l'avatar
              </label>
              <input
                type="url"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-editorial rounded-lg focus:border-accent-sport focus:ring-1 focus:ring-accent-sport outline-none text-sm"
              />
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Nom complet
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Votre nom"
              className="w-full px-4 py-3 border border-editorial rounded-lg focus:border-accent-sport focus:ring-1 focus:ring-accent-sport outline-none"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Parlez-nous de vous..."
              rows={3}
              maxLength={200}
              className="w-full px-4 py-3 border border-editorial rounded-lg focus:border-accent-sport focus:ring-1 focus:ring-accent-sport outline-none resize-none"
            />
            <p className="text-xs text-muted mt-1 text-right">{formData.bio.length}/200</p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Localisation
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">📍</span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Paris, France"
                className="w-full pl-10 pr-4 py-3 border border-editorial rounded-lg focus:border-accent-sport focus:ring-1 focus:ring-accent-sport outline-none"
              />
            </div>
          </div>

          {/* Favorite Team */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Équipe favorite
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">❤️</span>
              <input
                type="text"
                name="favoriteTeam"
                value={formData.favoriteTeam}
                onChange={handleChange}
                placeholder="PSG, OM, Lyon..."
                className="w-full pl-10 pr-4 py-3 border border-editorial rounded-lg focus:border-accent-sport focus:ring-1 focus:ring-accent-sport outline-none"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-secondary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-accent-sport text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
