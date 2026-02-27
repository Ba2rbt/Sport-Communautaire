import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import HeroMatch from '@/components/HeroMatch'
import MatchCard from '@/components/MatchCard'
import MVPCard from '@/components/MVPCard'
import ExpertCard from '@/components/ExpertCard'
import StatsSection from '@/components/StatsSection'
import { PrimaryButton, SecondaryButton, TagLigue } from '@/components/ui'
import type { Match, MVP, Analysis } from '@/types'

// Transform Supabase match to homepage Match format
function transformToHomeMatch(match: any): Match {
  const matchDate = new Date(`${match.date}T${match.time || '00:00'}`)
  const formattedDate = matchDate.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'short' 
  })

  return {
    id: match.id,
    homeTeam: { 
      name: match.team1, 
      shortName: match.team1.substring(0, 3).toUpperCase(), 
      logo: '⚽' 
    },
    awayTeam: { 
      name: match.team2, 
      shortName: match.team2.substring(0, 3).toUpperCase(), 
      logo: '⚽' 
    },
    homeScore: match.score1 || 0,
    awayScore: match.score2 || 0,
    date: formattedDate,
    time: match.time?.substring(0, 5) || '00:00',
    competition: match.league,
    venue: match.stadium || '',
    isLive: match.status === 'live',
    status: match.status as 'live' | 'upcoming' | 'finished',
  }
}

// Mock Data - Top MVP (sera connecté plus tard)
const topMVPs: MVP[] = [
  {
    id: '1',
    name: 'Kylian Mbappé',
    team: 'Real Madrid CF',
    position: 'Attaquant',
    stats: '18 buts • 8 passes décisives',
    image: '⚡',
    rating: 9.2,
  },
  {
    id: '2',
    name: 'Erling Haaland',
    team: 'Manchester City',
    position: 'Attaquant',
    stats: '22 buts • 5 passes décisives',
    image: '🎯',
    rating: 9.1,
  },
  {
    id: '3',
    name: 'Jude Bellingham',
    team: 'Real Madrid CF',
    position: 'Milieu',
    stats: '12 buts • 10 passes décisives',
    image: '🌟',
    rating: 8.9,
  },
  {
    id: '4',
    name: 'Vinícius Júnior',
    team: 'Real Madrid CF',
    position: 'Ailier',
    stats: '14 buts • 11 passes décisives',
    image: '💫',
    rating: 8.8,
  },
]

// Mock Data - Analyses experts (sera connecté plus tard)
const expertAnalyses: Analysis[] = [
  {
    id: '1',
    title: 'Le Classique : Analyse tactique du match PSG-OM',
    excerpt: 'Décryptage complet des systèmes de jeu et des choix tactiques qui ont fait la différence dans ce derby historique.',
    expert: {
      id: '1',
      name: 'Pierre Ménès',
      title: 'Analyste Football',
      image: '👤',
    },
    category: 'Tactique',
    readTime: '8 min',
    image: '⚽',
    date: '13 Jan 2026',
  },
  {
    id: '2',
    title: 'Mercato : Les transferts qui vont marquer cette saison',
    excerpt: 'Notre expert fait le point sur les mouvements les plus impactants et les surprises à venir sur le marché des transferts.',
    expert: {
      id: '2',
      name: 'Julien Laurens',
      title: 'Expert Mercato',
      image: '👤',
    },
    category: 'Mercato',
    readTime: '6 min',
    image: '📝',
    date: '12 Jan 2026',
  },
  {
    id: '3',
    title: 'Champions League : Pronostics des 8èmes de finale',
    excerpt: 'Analyse approfondie des affiches des huitièmes de finale et nos prédictions pour chaque confrontation.',
    expert: {
      id: '3',
      name: 'Habib Beye',
      title: 'Consultant Sport',
      image: '👤',
    },
    category: 'Champions League',
    readTime: '10 min',
    image: '🏆',
    date: '11 Jan 2026',
  },
]

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const supabase = await createClient()

  // Fetch live match for hero (or most recent)
  const { data: liveMatches } = await supabase
    .from('matches')
    .select('*')
    .eq('status', 'live')
    .limit(1)

  // Fetch upcoming matches
  const { data: upcomingMatchesData } = await supabase
    .from('matches')
    .select('*')
    .in('status', ['upcoming', 'live'])
    .order('date', { ascending: true })
    .order('time', { ascending: true })
    .limit(6)

  // Fetch competitions for tags
  const { data: competitions } = await supabase
    .from('competitions')
    .select('name')
    .limit(5)

  // Transform data
  const heroMatch = liveMatches?.[0] 
    ? transformToHomeMatch(liveMatches[0])
    : upcomingMatchesData?.[0] 
      ? transformToHomeMatch(upcomingMatchesData[0])
      : null

  const upcomingMatches = upcomingMatchesData?.map(transformToHomeMatch) || []
  const leagues = competitions?.map((c: any) => c.name) || ['Ligue 1', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga']

  // Fallback hero match if no data
  const displayHeroMatch = heroMatch || {
    id: 'placeholder',
    homeTeam: { name: 'Équipe A', shortName: 'EQA', logo: '⚽' },
    awayTeam: { name: 'Équipe B', shortName: 'EQB', logo: '⚽' },
    homeScore: 0,
    awayScore: 0,
    date: 'Bientôt',
    time: '--:--',
    competition: 'Synchronisation en cours...',
    venue: '',
    isLive: false,
    status: 'upcoming' as const,
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero - Match du jour (Full Width) */}
      <HeroMatch match={displayHeroMatch} />

      {/* League Tags Filter - Sticky Glass Bar */}
      <section className="sticky top-[80px] z-40 py-4 glass border-y border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide mask-fade-right">
            <span className="text-xs font-bold text-accent-sport uppercase tracking-widest whitespace-nowrap px-2">
              Compétitions
            </span>
            <div className="h-6 w-px bg-white/10 mx-2" />
            {leagues.map((league, index) => (
              <TagLigue 
                key={league} 
                league={league} 
                isActive={index === 0} 
                className="hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section: Matches à venir */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="flex items-end justify-between mb-10 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-sport" />
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
                Calendrier
              </span>
            </div>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight">
              Matches à venir
            </h2>
          </div>
          <Link href="/matches">
            <SecondaryButton
              size="sm"
              className="hidden sm:flex"
              rightIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              TOUT VOIR
            </SecondaryButton>
          </Link>
        </div>

        {upcomingMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center border border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center text-4xl shadow-inner border border-white/5">
              ⚽
            </div>
            <h3 className="font-sans text-xl font-bold text-white mb-2">
              Matches en cours de synchronisation
            </h3>
            <p className="text-slate-400 text-sm">
              Les données seront disponibles sous peu.
            </p>
          </div>
        )}
      </section>

      {/* Section: Top MVP */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-mvp/5 to-transparent pointer-events-none" />
        <div className="absolute -left-40 top-1/4 w-80 h-80 bg-accent-mvp/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-mvp" />
                <span className="text-xs font-bold tracking-widest uppercase text-accent-mvp">
                  Performances
                </span>
              </div>
              <h2 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight">
                Top MVP de la semaine
              </h2>
            </div>
            <Link href="/mvp">
              <SecondaryButton
                size="sm"
                className="hidden sm:flex"
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                CLASSEMENT
              </SecondaryButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topMVPs.map((mvp, index) => (
              <MVPCard key={mvp.id} mvp={mvp} rank={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Section: Stats Table */}
      <StatsSection />

      {/* Section: Analyses experts */}
      <section className="relative py-24 bg-[#020617]/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 text-blue-500 shadow-[0_0_10px_currentColor]" />
                <span className="text-xs font-bold tracking-widest uppercase text-blue-500">
                  Édito & Analyses
                </span>
              </div>
              <h2 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight">
                Le coin des experts
              </h2>
            </div>
            <Link href="/experts">
              <SecondaryButton
                size="sm"
                className="hidden sm:flex"
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                TOUS LES ARTICLES
              </SecondaryButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertAnalyses.map((analysis) => (
              <ExpertCard key={analysis.id} analysis={analysis} />
            ))}
            
            {/* Carte "Devenir Expert" */}
            <Link href="/experts/create" className="group relative overflow-hidden rounded-2xl glass border border-white/5 p-8 flex flex-col justify-center items-center text-center transition-all duration-500 hover:border-accent-sport/30">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-sport/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-16 rounded-full bg-accent-sport/10 flex items-center justify-center mb-6 group-hover:bg-accent-sport/20 transition-colors duration-300">
                <svg className="w-8 h-8 text-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-sport transition-colors">
                Devenir Expert
              </h3>
              <p className="text-slate-400 text-sm mb-6 max-w-xs">
                Partagez vos analyses tactiques et rejoignez la communauté des experts vérifiés.
              </p>
              
              <span className="inline-flex items-center text-accent-sport text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                Postuler
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#020617]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.1),_transparent_70%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-accent-sport/10 text-accent-sport text-xs font-bold uppercase tracking-widest mb-6 border border-accent-sport/20">
            Communauté
          </span>
          <h2 className="font-sans text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Vivez le football <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-sport to-accent-live">autrement</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Rejoignez des milliers de passionnés, participez aux débats en direct et analysez les performances comme jamais auparavant.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-sport to-accent-live rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <button className="relative px-8 py-4 bg-black rounded-full leading-none flex items-center divide-x divide-slate-600">
                  <span className="flex items-center space-x-5">
                    <span className="pr-6 text-white font-bold tracking-wider">CRÉER UN COMPTE</span>
                  </span>
                  <span className="pl-6 text-accent-sport group-hover:text-white transition duration-200">
                    &rarr;
                  </span>
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
