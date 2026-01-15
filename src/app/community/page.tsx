import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CommunityPage() {
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
            Espace communauté
          </span>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold text-primary">
            Community
          </h1>
          <p className="text-muted mt-4 max-w-2xl">
            Bienvenue dans l&apos;espace communauté SportUnion. Échangez avec d&apos;autres passionnés de sport.
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white border border-editorial rounded-lg p-12 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-accent-sport/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="font-editorial text-2xl font-bold text-primary mb-3">
            Bientôt disponible
          </h2>
          <p className="text-muted mb-6">
            L&apos;espace communauté est en cours de développement. Vous pourrez bientôt créer des discussions, 
            rejoindre des groupes et interagir avec d&apos;autres fans.
          </p>
          <div className="flex items-center justify-center gap-2 text-accent-sport text-sm font-medium">
            <svg className="w-5 h-5 animate-pulse-live" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            En développement
          </div>
        </div>
      </div>
    </div>
  )
}
