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
    <div className="min-h-screen bg-[#020617] text-white selection:bg-accent-sport/30">
      
      {/* Immersive Header */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-slate-950">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
           <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-500 opacity-20 blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
           <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            World Football
          </span>
          <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter text-white mb-6">
            Compétitions <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Officielles</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-xl border-l-2 border-green-500 pl-6">
            L'intégralité des championnats majeurs. Scores en direct, classements et statistiques détaillées.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <main className="max-w-7xl mx-auto px-6 py-20 -mt-20 relative z-20">
        
        {/* Error State */}
        {error && (
          <div className="glass border border-red-500/20 rounded-2xl p-8 text-center text-red-500 mb-12">
            <p>Erreur lors du chargement des données.</p>
          </div>
        )}

         {/* Empty State */}
        {!error && (!competitions || competitions.length === 0) && (
          <div className="glass border border-dashed border-white/10 rounded-2xl p-20 text-center">
            <span className="text-6xl mb-6 block grayscale opacity-50">🏆</span>
            <h3 className="text-2xl font-bold text-white mb-3">Aucune compétition</h3>
            <p className="text-slate-500">Synchronisation des données en attente...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitions && competitions.map((competition: Competition, index) => (
            <Link 
              key={competition.id} 
              href={`/competitions/${competition.id}`}
              className="group relative block"
            >
              <div className={`
                absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                bg-linear-to-r ${index % 2 === 0 ? 'from-green-500/20 to-emerald-500/20' : 'from-blue-500/20 to-cyan-500/20'}
                blur-xl -z-10
              `} />
              
              <article className="h-full glass bg-[#0f172a]/60 border border-white/5 rounded-3xl p-8 hover:bg-[#0f172a]/80 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-300">
                    {competition.logo_url ? (
                      <img src={competition.logo_url} alt={competition.name} className="w-10 h-10 object-contain" />
                    ) : (
                      '⚽'
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-500 border border-white/5 rounded px-2 py-1">
                    {competition.current_season || '2025/26'}
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                    {competition.name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-green-500 transition-colors" />
                    {competition.country || 'International'}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                   <span className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">
                    Voir le classement
                   </span>
                   <svg className="w-5 h-5 text-slate-600 group-hover:text-green-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                   </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>

      </main>
    </div>
  )
}
