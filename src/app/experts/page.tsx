import { Tag } from '@/components/ui'

interface Expert {
  id: string
  name: string
  title: string
  avatar: string
  category: string
  bio: string
  articlesCount: number
}

const mockExperts: Expert[] = [
  {
    id: 'exp-1',
    name: 'Jean-Michel Larqué',
    title: 'Consultant Football',
    avatar: '👨‍💼',
    category: 'Football',
    bio: 'Ancien joueur professionnel, expert en analyse tactique avec plus de 30 ans d\'expérience.',
    articlesCount: 127,
  },
  {
    id: 'exp-2',
    name: 'Marie Portolano',
    title: 'Journaliste Sport',
    avatar: '👩‍💼',
    category: 'Multi-sport',
    bio: 'Journaliste reconnue, spécialisée dans les interviews et reportages exclusifs.',
    articlesCount: 89,
  },
  {
    id: 'exp-3',
    name: 'Christophe Dugarry',
    title: 'Analyste Technique',
    avatar: '🧑‍💼',
    category: 'Football',
    bio: 'Champion du monde 1998, analyse les performances des équipes de Ligue 1.',
    articlesCount: 156,
  },
  {
    id: 'exp-4',
    name: 'Nathalie Iannetta',
    title: 'Experte Tennis',
    avatar: '👩‍🦰',
    category: 'Tennis',
    bio: 'Ancienne joueuse WTA, couvre les grands tournois du circuit.',
    articlesCount: 72,
  },
  {
    id: 'exp-5',
    name: 'Tony Parker',
    title: 'Consultant Basketball',
    avatar: '🏀',
    category: 'Basketball',
    bio: 'Légende NBA, partage son expertise sur le basketball européen et américain.',
    articlesCount: 45,
  },
  {
    id: 'exp-6',
    name: 'Fabien Galthié',
    title: 'Expert Rugby',
    avatar: '🏉',
    category: 'Rugby',
    bio: 'Sélectionneur du XV de France, analyse les matchs du Tournoi des 6 Nations.',
    articlesCount: 63,
  },
]

function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <div className="bg-white border border-editorial rounded-lg overflow-hidden hover-lift">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-sport to-accent-mvp flex items-center justify-center text-3xl">
            {expert.avatar}
          </div>
          <div>
            <h3 className="font-editorial text-xl font-bold text-primary">
              {expert.name}
            </h3>
            <p className="text-sm text-muted">{expert.title}</p>
          </div>
        </div>
        <Tag variant="category" className="mb-3">{expert.category}</Tag>
        <p className="text-muted text-sm mb-4 line-clamp-2">
          {expert.bio}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">
            {expert.articlesCount} analyses
          </span>
          <span className="text-accent-sport text-sm font-medium hover:underline cursor-pointer">
            Voir le profil →
          </span>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Experts | SportUnion',
  description: 'Découvrez nos experts et consultants sport : analyses, prédictions et décryptages exclusifs.',
}

export default function ExpertsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-editorial text-5xl font-bold text-primary mb-4">
          Nos Experts
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Des analyses approfondies par les meilleurs spécialistes du sport français.
        </p>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockExperts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center py-12 bg-white border border-editorial rounded-lg">
        <h2 className="font-editorial text-2xl font-bold text-primary mb-4">
          Vous êtes expert sport ?
        </h2>
        <p className="text-muted mb-6">
          Rejoignez notre équipe de consultants et partagez vos analyses.
        </p>
        <a 
          href="/experts/create" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-sport text-white font-semibold rounded-full hover:bg-accent-sport/90 transition-colors"
        >
          Devenir expert
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}
