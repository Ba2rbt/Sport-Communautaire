import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArticleCard, ArticleContent } from '@/components/expert'
import type { ExpertArticle, ArticleCategory } from '@/types/expert'
import { categoryLabels } from '@/types/expert'

// Mock article content
const mockArticleContent = `
## Introduction

Le match retour entre le Real Madrid et Manchester City restera dans les annales comme un chef-d'œuvre tactique de Carlo Ancelotti. Menés 1-0 à l'aller, les Merengues devaient impérativement trouver la faille face à l'une des meilleures équipes du monde.

## Le plan de jeu d'Ancelotti

### Neutraliser le pressing haut

La première clé du match a été la gestion du pressing de City. Ancelotti a fait le choix audacieux de :

- Utiliser Camavinga en position de relayeur gauche
- Demander à Kroos de descendre très bas pour créer une supériorité numérique
- Jouer long sur Vinicius dès que possible

> "On savait qu'ils allaient presser haut. Notre objectif était de les attirer puis de les éliminer en une passe." — Carlo Ancelotti

### La gestion des espaces

Le Real a excellé dans l'exploitation des espaces laissés par City :

1. **Les appels de Vinicius** : 23 courses en profondeur
2. **Le replacement de Bellingham** : alternance entre le 10 et le faux 9
3. **Les montées de Carvajal** : surcharge du côté droit

## Les statistiques clés

| Statistique | Real Madrid | Man City |
|-------------|-------------|----------|
| Possession | 38% | 62% |
| xG | 2.4 | 1.8 |
| Passes réussies | 312 | 687 |
| Tirs cadrés | 7 | 4 |

## Analyse vidéo

Le premier but madrilène illustre parfaitement cette approche. Sur une relance de Courtois, Camavinga attire Walker puis décale vers Vinicius qui prend la profondeur...

## Conclusion

Cette victoire démontre une fois de plus qu'en football, **la possession n'est pas tout**. Le Real Madrid a su être efficace dans ce qu'il sait faire de mieux : défendre ensemble et frapper vite.

Ce match entrera dans l'histoire comme un exemple de pragmatisme tactique au plus haut niveau.

---

*Qu'en pensez-vous ? Partagez votre avis dans les commentaires.*
`

// Mock data getter
function getMockArticle(slug: string): ExpertArticle | null {
  const articles: Record<string, ExpertArticle> = {
    'analyse-tactique-real-madrid-manchester-city': {
      id: 'art-1',
      author: { 
        id: 'exp-1', 
        email: 'jean@expert.com', 
        fullName: 'Jean-Michel Larqué',
        title: 'Consultant Football',
        bio: 'Ancien footballeur professionnel et consultant TV depuis plus de 30 ans. Spécialiste de l\'analyse tactique et des grandes compétitions européennes.',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
      },
      title: 'Analyse tactique : Comment le Real Madrid a neutralisé le pressing de Manchester City',
      slug: 'analyse-tactique-real-madrid-manchester-city',
      excerpt: 'Décryptage complet du plan de jeu d\'Ancelotti qui a permis aux Merengues de s\'imposer face aux Citizens en demi-finale retour de la Ligue des Champions.',
      contentMd: mockArticleContent,
      coverImage: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200',
      category: 'analysis',
      readTime: 12,
      isPublished: true,
      isFeatured: true,
      viewsCount: 15420,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    },
  }
  
  return articles[slug] || articles['analyse-tactique-real-madrid-manchester-city']
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
  })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getMockArticle(slug)

  if (!article) {
    return { title: 'Article non trouvé | SportUnion' }
  }

  return {
    title: `${article.title} | SportUnion Experts`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getMockArticle(slug)

  if (!article) {
    notFound()
  }

  const category = categoryLabels[article.category] || categoryLabels.analysis

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted">
        <Link href="/experts" className="hover:text-accent-sport transition-colors">
          Experts
        </Link>
        <span>›</span>
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${category.color}`}>
          {category.label}
        </span>
      </nav>

      {/* Article Header */}
      <header className="mb-12">
        {/* Title */}
        <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-tight mb-6">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-xl text-muted leading-relaxed mb-8">
            {article.excerpt}
          </p>
        )}

        {/* Author & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-editorial">
          <div className="flex items-center gap-4">
            {article.author.avatarUrl ? (
              <img 
                src={article.author.avatarUrl} 
                alt={article.author.fullName}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent-sport flex items-center justify-center text-white font-bold text-lg">
                {article.author.fullName.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div>
              <p className="font-semibold text-primary text-lg">{article.author.fullName}</p>
              <p className="text-muted text-sm">{article.author.title}</p>
            </div>
          </div>
          <div className="text-sm text-muted sm:text-right">
            <p>{formatDate(article.createdAt)}</p>
            <p>{article.readTime} min de lecture · {article.viewsCount.toLocaleString()} vues</p>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <figure className="mb-12">
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-auto rounded-xl shadow-xl"
          />
          <figcaption className="text-center text-sm text-muted mt-3">
            Photo d'illustration
          </figcaption>
        </figure>
      )}

      {/* Article Content */}
      <div className="mb-16">
        <ArticleContent content={article.contentMd} />
      </div>

      {/* Author Bio */}
      {article.author.bio && (
        <aside className="bg-secondary/50 border border-editorial rounded-xl p-8 mb-12">
          <h3 className="font-editorial text-xl font-bold text-primary mb-4">
            À propos de l'auteur
          </h3>
          <div className="flex items-start gap-4">
            {article.author.avatarUrl ? (
              <img 
                src={article.author.avatarUrl} 
                alt={article.author.fullName}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent-sport flex items-center justify-center text-white font-bold text-xl">
                {article.author.fullName.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div>
              <p className="font-semibold text-primary">{article.author.fullName}</p>
              <p className="text-accent-sport text-sm mb-2">{article.author.title}</p>
              <p className="text-muted text-sm leading-relaxed">{article.author.bio}</p>
            </div>
          </div>
        </aside>
      )}

      {/* Share */}
      <div className="flex items-center justify-between py-6 border-t border-b border-editorial mb-12">
        <span className="text-muted text-sm">Partager cet article</span>
        <div className="flex gap-3">
          {[
            { name: 'Twitter', icon: '𝕏' },
            { name: 'Facebook', icon: 'f' },
            { name: 'LinkedIn', icon: 'in' },
            { name: 'Copier', icon: '🔗' },
          ].map((social) => (
            <button
              key={social.name}
              className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
              title={social.name}
            >
              {social.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Back */}
      <div className="text-center">
        <Link 
          href="/experts"
          className="inline-flex items-center gap-2 text-muted hover:text-accent-sport transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux analyses
        </Link>
      </div>
    </div>
  )
}
