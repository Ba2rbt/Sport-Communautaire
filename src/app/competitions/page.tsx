import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { TagLigue } from '@/components/ui'

export const revalidate = 60

export const metadata = {
  title: 'Compétitions | SportUnion',
  description: 'Suivez tous les championnats de football : Ligue 1, Premier League, La Liga, Serie A, Bundesliga et plus.',
}

interface Competition {
  id: string
  name: string
  logo_url: string | null
  country: string | null
  current_season: string | null
}

export default async function CompetitionsPage() {
  const supabase = await createClient()
  
  const { data: competitions, error } = await supabase
    .from('competitions')
    .select('*')
    .order('name', { ascending: true })

  return (
    <div className="min-h-screen bg-secondary">
      {/* Page Header */}
      <header className="bg-white border-b border-editorial">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-sport mb-2 block">
            Football
          </span>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold text-primary mb-4">
            Compétitions
          </h1>
          <p className="text-muted text-lg max-w-2xl">
            Suivez les classements, calendriers et statistiques de tous les championnats majeurs.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">Erreur lors du chargement des compétitions</p>
            <p className="text-red-400 text-sm mt-1">{error.message}</p>
          </div>
        )}

        {/* Empty State */}
        {!error && (!competitions || competitions.length === 0) && (
          <div className="bg-white border border-editorial rounded-lg p-16 text-center">
            <span className="text-7xl mb-6 block">🏆</span>
            <h3 className="font-editorial text-2xl font-bold text-primary mb-3">
              Aucune compétition disponible
            </h3>
            <p className="text-muted max-w-md mx-auto">
              Les compétitions seront synchronisées automatiquement via le workflow n8n.
              Assurez-vous que le workflow est activé et que les tables Supabase sont créées.
            </p>
          </div>
        )}

        {/* Competitions Grid */}
        {competitions && competitions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions.map((competition: Competition) => (
              <Link 
                key={competition.id} 
                href={`/competitions/${competition.id}`}
                className="group"
              >
                <article className="bg-white border border-editorial rounded-lg overflow-hidden hover-lift transition-all duration-300">
                  {/* Header with Logo */}
                  <div className="bg-gradient-to-br from-primary to-primary/90 p-8 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
                    </div>
                    
                    <div className="relative flex items-center gap-4">
                      {/* Logo */}
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        {competition.logo_url ? (
                          <img 
                            src={competition.logo_url} 
                            alt={competition.name}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <span className="text-3xl">🏆</span>
                        )}
                      </div>
                      
                      {/* Name */}
                      <div>
                        <h2 className="font-editorial text-xl font-bold text-white group-hover:text-accent-sport transition-colors">
                          {competition.name}
                        </h2>
                        {competition.country && (
                          <p className="text-white/70 text-sm mt-1">
                            {competition.country}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <TagLigue league={competition.name} isActive={false} />
                      
                      {competition.current_season && (
                        <span className="text-sm text-muted">
                          Saison {competition.current_season}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm font-medium text-accent-sport group-hover:underline">
                        Voir le classement
                      </span>
                      <svg 
                        className="w-4 h-4 text-accent-sport transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Info Section */}
        <section className="mt-16 bg-white border border-editorial rounded-lg p-8">
          <h2 className="font-editorial text-2xl font-bold text-primary mb-4">
            Compétitions suivies
          </h2>
          <p className="text-muted mb-6">
            SportUnion synchronise automatiquement les données des principales compétitions européennes :
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Ligue 1', country: '🇫🇷' },
              { name: 'Premier League', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
              { name: 'La Liga', country: '🇪🇸' },
              { name: 'Serie A', country: '🇮🇹' },
              { name: 'Bundesliga', country: '🇩🇪' },
              { name: 'National', country: '🇫🇷' },
            ].map((league) => (
              <div 
                key={league.name}
                className="flex items-center gap-2 p-3 bg-secondary rounded-lg"
              >
                <span className="text-xl">{league.country}</span>
                <span className="text-sm font-medium text-primary">{league.name}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
