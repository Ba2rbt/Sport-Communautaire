import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-sport mb-2 block">
            Espace membre
          </span>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold text-primary">
            Mon profil
          </h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-editorial rounded-lg p-8 max-w-2xl">
          {/* Avatar & Name */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-editorial">
            <div className="w-20 h-20 bg-accent-sport text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {(user.user_metadata?.full_name || user.email || 'U')
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div>
              <h2 className="font-editorial text-2xl font-bold text-primary">
                {user.user_metadata?.full_name || 'Membre SportUnion'}
              </h2>
              <p className="text-muted">{user.email}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-muted mb-2">
                Email
              </label>
              <p className="text-primary">{user.email}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-muted mb-2">
                Nom complet
              </label>
              <p className="text-primary">
                {user.user_metadata?.full_name || 'Non renseigné'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-muted mb-2">
                Membre depuis
              </label>
              <p className="text-primary">
                {new Date(user.created_at).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-8 border-t border-editorial">
            <button className="px-6 py-3 bg-accent-sport hover:bg-accent-sport/90 text-white font-semibold rounded-lg transition-colors">
              Modifier le profil
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
