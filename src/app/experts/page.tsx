import Link from 'next/link'
import { ArticleCard } from '@/components/expert'
import type { ExpertArticle } from '@/types/expert'

// Mock data for demo
const mockArticles: ExpertArticle[] = [
  {
    id: 'art-1',
    author: { 
      id: 'exp-1', 
      email: 'jean@expert.com', 
      fullName: 'Jean-Michel Larqué',
      title: 'Consultant Football',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
    },
    title: 'Analyse tactique : Comment le Real Madrid a neutralisé le pressing de Manchester City',
    slug: 'analyse-tactique-real-madrid-manchester-city',
    excerpt: 'Décryptage complet du plan de jeu d\'Ancelotti qui a permis aux Merengues de s\'imposer face aux Citizens en demi-finale retour de la Ligue des Champions.',
    contentMd: '',
    coverImage: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
    category: 'analysis',
    readTime: 12,
    isPublished: true,
    isFeatured: true,
    viewsCount: 15420,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: 'art-2',
    author: { 
      id: 'exp-2', 
      email: 'pierre@expert.com', 
      fullName: 'Pierre Ménès',
      title: 'Éditorialiste Sport',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre',
    },
    title: 'Le PSG doit-il changer de stratégie mercato ? Mon analyse.',
    slug: 'psg-strategie-mercato-analyse',
    excerpt: 'Après plusieurs échecs en Ligue des Champions, il est temps de repenser l\'approche parisienne sur le marché des transferts.',
    contentMd: '',
    coverImage: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800',
    category: 'opinion',
    readTime: 8,
    isPublished: true,
    isFeatured: false,
    viewsCount: 8930,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'art-3',
    author: { 
      id: 'exp-3', 
      email: 'marie@expert.com', 
      fullName: 'Marie Portolano',
      title: 'Journaliste Sport',
    },
    title: 'Interview exclusive : Kylian Mbappé se confie sur son avenir',
    slug: 'interview-exclusive-mbappe-avenir',
    excerpt: 'L\'attaquant français évoque ses ambitions, sa relation avec le PSG et ses rêves de Ballon d\'Or dans cet entretien exclusif.',
    contentMd: '',
    coverImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    category: 'interview',
    readTime: 15,
    isPublished: true,
    isFeatured: false,
    viewsCount: 23450,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: 'art-4',
    author: { 
      id: 'exp-1', 
      email: 'jean@expert.com', 
      fullName: 'Jean-Michel Larqué',
      title: 'Consultant Football',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
    },
    title: 'Preview Classico : Les clés tactiques du match PSG-OM',
    slug: 'preview-classico-psg-om-tactique',
    excerpt: 'Analyse des forces en présence et des scénarios possibles pour le choc de la 11ème journée de Ligue 1.',
    contentMd: '',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    category: 'preview',
    readTime: 10,
    isPublished: true,
    isFeatured: false,
    viewsCount: 12100,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: 'art-5',
    author: { 
      id: 'exp-4', 
      email: 'christophe@expert.com', 
      fullName: 'Christophe Dugarry',
      title: 'Champion du Monde 1998',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christophe',
    },
    title: 'Retour sur France 98 : Comment Aimé Jacquet a construit son équipe',
    slug: 'france-98-aime-jacquet-equipe',
    excerpt: 'Vingt-cinq ans après, je reviens sur les choix du sélectionneur qui nous ont menés au titre mondial.',
    contentMd: '',
    coverImage: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
    category: 'history',
    readTime: 18,
    isPublished: true,
    isFeatured: false,
    viewsCount: 9870,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
  },
  {
    id: 'art-6',
    author: { 
      id: 'exp-2', 
      email: 'pierre@expert.com', 
      fullName: 'Pierre Ménès',
      title: 'Éditorialiste Sport',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre',
    },
    title: 'Débrief Ligue des Champions : Les surprises de la phase de groupes',
    slug: 'debrief-ldc-phase-groupes-surprises',
    excerpt: 'Retour sur les résultats inattendus et les tendances qui se dessinent pour la suite de la compétition.',
    contentMd: '',
    coverImage: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    category: 'review',
    readTime: 9,
    isPublished: true,
    isFeatured: false,
    viewsCount: 7650,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
  },
]

export const metadata = {
  title: 'Analyses Experts | SportUnion',
  description: 'Les meilleures analyses sportives par nos experts : tactiques, interviews, débriefs et opinions exclusives.',
}

export default function ExpertsPage() {
  const featuredArticle = mockArticles.find(a => a.isFeatured)
  const regularArticles = mockArticles.filter(a => !a.isFeatured)
  const latestArticles = regularArticles.slice(0, 3)
  const moreArticles = regularArticles.slice(3)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Magazine Header */}
      <header className="text-center mb-12">
        <p className="text-accent-sport font-semibold tracking-widest uppercase text-sm mb-2">
          SportUnion Magazine
        </p>
        <h1 className="font-editorial text-5xl md:text-7xl font-black text-primary mb-4">
          Experts
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Analyses approfondies, interviews exclusives et regards d'experts sur l'actualité sportive.
        </p>
        <div className="w-24 h-1 bg-primary mx-auto mt-6" />
      </header>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="mb-16">
          <ArticleCard article={featuredArticle} variant="featured" />
        </section>
      )}

      {/* Latest Articles */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-editorial text-3xl font-bold text-primary">
            Dernières analyses
          </h2>
          <Link 
            href="/experts/all" 
            className="text-accent-sport font-medium hover:underline"
          >
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* More Articles Grid */}
      {moreArticles.length > 0 && (
        <section className="mb-16">
          <h2 className="font-editorial text-3xl font-bold text-primary mb-8">
            À lire aussi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {moreArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* CTA for experts */}
      <section className="bg-primary text-white rounded-2xl p-8 md:p-12 text-center">
        <h2 className="font-editorial text-3xl font-bold mb-4">
          Vous êtes expert sport ?
        </h2>
        <p className="text-white/70 mb-8 max-w-xl mx-auto">
          Rejoignez notre équipe de consultants et partagez vos analyses avec notre communauté de passionnés.
        </p>
        <Link
          href="/experts/create"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-secondary transition-colors"
        >
          Devenir contributeur
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </section>
    </div>
  )
}
