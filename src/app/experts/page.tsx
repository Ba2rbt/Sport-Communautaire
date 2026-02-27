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
  const featuredArticle = mockArticles[0]
  const otherArticles = mockArticles.slice(1)

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-purple-500/30">
        {/* Magazine Header */}
        <div className="border-b border-white/5 py-8">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <span className="text-sm font-mono text-slate-500 uppercase tracking-widest">Édition Hebdomadaire</span>
                <span className="text-sm font-mono text-slate-500 uppercase tracking-widest">{new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-[10vw] leading-[0.8] font-bold text-white tracking-tighter mb-16 opacity-90">
                INSIGHTS<br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600 ml-20">EXPERT</span>
            </h1>

            {/* Featured Article - Magazine Cover Style */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-end">
                <div className="relative aspect-[4/5] rounded-none overflow-hidden group">
                    <img 
                        src={featuredArticle.coverImage} 
                        alt={featuredArticle.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-50" />
                </div>
                
                <div className="space-y-8 lg:pb-12">
                     <span className="inline-block px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest">
                        À la une
                     </span>
                     <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
                        {featuredArticle.title}
                     </h2>
                     <p className="text-xl text-slate-400 font-serif italic border-l-4 border-purple-500 pl-6">
                        {featuredArticle.excerpt}
                     </p>
                     
                     <div className="flex items-center gap-4 pt-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800">
                             {/* Avatar placeholder */}
                             <div className="w-full h-full flex items-center justify-center bg-purple-900 text-purple-200">
                                {featuredArticle.author.fullName.charAt(0)}
                             </div>
                        </div>
                        <div>
                            <p className="font-bold text-white">{featuredArticle.author.fullName}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">{featuredArticle.author.title}</p>
                        </div>
                     </div>
                </div>
            </div>

            {/* Articles Grid - Minimalist */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 border-t border-white/10 pt-20">
                {otherArticles.map((article) => (
                    <article key={article.id} className="group cursor-pointer">
                        <div className="aspect-video bg-slate-900 mb-6 overflow-hidden relative">
                             <img 
                                src={article.coverImage} 
                                alt={article.title} 
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                             <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">{article.category}</span>
                             <span className="text-xs text-slate-600">•</span>
                             <span className="text-xs text-slate-500">{article.readTime} min de lecture</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-purple-400 transition-colors">
                            {article.title}
                        </h3>
                        <p className="text-slate-500 line-clamp-3">
                            {article.excerpt}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    </div>
  )
}
