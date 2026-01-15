import HeroMatch from '@/components/HeroMatch'
import MatchCard from '@/components/MatchCard'
import MVPCard from '@/components/MVPCard'
import ExpertCard from '@/components/ExpertCard'
import StatsSection from '@/components/StatsSection'
import { PrimaryButton, SecondaryButton, TagLigue } from '@/components/ui'
import type { Match, MVP, Analysis } from '@/types'

// Mock Data - Match du jour
const featuredMatch: Match = {
  id: '1',
  homeTeam: {
    name: 'Paris Saint-Germain',
    shortName: 'PSG',
    logo: '🔵',
  },
  awayTeam: {
    name: 'Olympique de Marseille',
    shortName: 'OM',
    logo: '⚪',
  },
  homeScore: 2,
  awayScore: 1,
  date: '13 Janvier 2026',
  time: '21:00',
  competition: 'Ligue 1 • Journée 18',
  venue: 'Parc des Princes, Paris',
  isLive: true,
  status: 'live',
}

// Mock Data - Matches à venir
const upcomingMatches: Match[] = [
  {
    id: '2',
    homeTeam: { name: 'FC Barcelona', shortName: 'FCB', logo: '🔴' },
    awayTeam: { name: 'Real Madrid', shortName: 'RMA', logo: '⚪' },
    date: '15 Jan',
    time: '21:00',
    competition: 'La Liga',
    venue: 'Camp Nou',
    isLive: false,
    status: 'upcoming',
  },
  {
    id: '3',
    homeTeam: { name: 'Manchester City', shortName: 'MCI', logo: '🩵' },
    awayTeam: { name: 'Liverpool FC', shortName: 'LIV', logo: '🔴' },
    date: '16 Jan',
    time: '18:30',
    competition: 'Premier League',
    venue: 'Etihad Stadium',
    isLive: false,
    status: 'upcoming',
  },
  {
    id: '4',
    homeTeam: { name: 'Juventus', shortName: 'JUV', logo: '⚫' },
    awayTeam: { name: 'AC Milan', shortName: 'ACM', logo: '🔴' },
    date: '17 Jan',
    time: '20:45',
    competition: 'Serie A',
    venue: 'Allianz Stadium',
    isLive: false,
    status: 'upcoming',
  },
  {
    id: '5',
    homeTeam: { name: 'Bayern Munich', shortName: 'BAY', logo: '🔴' },
    awayTeam: { name: 'Borussia Dortmund', shortName: 'BVB', logo: '🟡' },
    homeScore: 3,
    awayScore: 2,
    date: '12 Jan',
    time: '18:30',
    competition: 'Bundesliga',
    venue: 'Allianz Arena',
    isLive: false,
    status: 'finished',
  },
  {
    id: '6',
    homeTeam: { name: 'OL Lyon', shortName: 'OL', logo: '🔵' },
    awayTeam: { name: 'AS Monaco', shortName: 'ASM', logo: '🔴' },
    date: '18 Jan',
    time: '17:00',
    competition: 'Ligue 1',
    venue: 'Groupama Stadium',
    isLive: false,
    status: 'upcoming',
  },
]

// Mock Data - Top MVP
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

// Mock Data - Analyses experts
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

// Leagues for filter tags
const leagues = ['Ligue 1', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga']

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero - Match du jour (Full Width) */}
      <HeroMatch match={featuredMatch} />

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
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
            <PrimaryButton size="lg">
              Créer un compte
            </PrimaryButton>
            <SecondaryButton size="lg" className="border-white/30 text-white hover:bg-white/10">
              En savoir plus
            </SecondaryButton>
          </div>
        </div>
      </section>
    </div>
  )
}
