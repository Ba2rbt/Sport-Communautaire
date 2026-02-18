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
  const leagues = competitions?.map(c => c.name) || ['Ligue 1', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga']

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

      {/* League Tags Filter */}
      <section className="bg-white border-b border-editorial">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
              Compétitions :
            </span>
            {leagues.map((league, index) => (
              <TagLigue key={league} league={league} isActive={index === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Section: Matches à venir */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-sport mb-2 block">
              Calendrier
            </span>
            <h2 className="font-editorial text-3xl md:text-4xl font-bold text-primary">
              Matches à venir
            </h2>
          </div>
          <Link href="/matches">
            <SecondaryButton
              size="sm"
              rightIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              Voir tout
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
          <div className="bg-white border border-editorial rounded-lg p-12 text-center">
            <span className="text-5xl mb-4 block">⚽</span>
            <h3 className="font-editorial text-xl font-bold text-primary mb-2">
              Matches en cours de synchronisation
            </h3>
            <p className="text-muted text-sm">
              Les données seront disponibles sous peu.
            </p>
          </div>
        )}
      </section>

      {/* Section: Top MVP */}
      <section className="bg-gradient-to-b from-secondary via-white to-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-accent-mvp mb-2 block">
                Performances
              </span>
              <h2 className="font-editorial text-3xl md:text-4xl font-bold text-primary">
                Top MVP de la semaine
              </h2>
            </div>
            <Link href="/mvp">
              <SecondaryButton
                size="sm"
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Classement complet
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
      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-accent-sport mb-2 block">
                Édito
              </span>
              <h2 className="font-editorial text-3xl md:text-4xl font-bold text-primary">
                Analyses d&apos;experts
              </h2>
            </div>
            <Link href="/experts">
              <SecondaryButton
                size="sm"
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Toutes les analyses
              </SecondaryButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertAnalyses.map((analysis) => (
              <ExpertCard key={analysis.id} analysis={analysis} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-primary text-secondary overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-sport/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-live/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-sport mb-4 block">
            Rejoignez-nous
          </span>
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Rejoignez la communauté
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-10">
            Partagez votre passion, débattez avec d&apos;autres fans et accédez à du contenu exclusif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <PrimaryButton size="lg">
                Créer un compte
              </PrimaryButton>
            </Link>
            <Link href="/community">
              <SecondaryButton size="lg" className="border-white/30 text-white hover:bg-white/10">
                Découvrir la communauté
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
