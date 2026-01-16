import Link from 'next/link'

const competitions = [
  { id: 'ligue-1', name: 'Ligue 1', logo: '🇫🇷', country: 'France', season: '2024-25', totalVotes: 45230 },
  { id: 'premier-league', name: 'Premier League', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'Angleterre', season: '2024-25', totalVotes: 78450 },
  { id: 'la-liga', name: 'La Liga', logo: '🇪🇸', country: 'Espagne', season: '2024-25', totalVotes: 56780 },
  { id: 'serie-a', name: 'Serie A', logo: '🇮🇹', country: 'Italie', season: '2024-25', totalVotes: 34560 },
  { id: 'bundesliga', name: 'Bundesliga', logo: '🇩🇪', country: 'Allemagne', season: '2024-25', totalVotes: 29870 },
]

export const metadata = {
  title: 'MVP Saison | SportUnion',
  description: 'Classement des meilleurs joueurs de chaque compétition. Votez pour votre MVP de la saison !',
}

export default function MVPIndexPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-mvp/10 rounded-full mb-4">
          <span className="text-xl">🏆</span>
          <span className="text-accent-mvp font-semibold text-sm uppercase tracking-wider">Classement Saison</span>
        </div>
        <h1 className="font-editorial text-5xl md:text-7xl font-black text-primary mb-4">
          MVP Saison
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          Découvrez et votez pour les meilleurs joueurs de chaque compétition européenne.
        </p>
      </header>

      {/* Competitions Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {competitions.map((comp) => (
          <Link
            key={comp.id}
            href={`/mvp/${comp.id}`}
            className="group relative overflow-hidden bg-white border border-editorial rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-mvp/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              {/* Logo & Name */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{comp.logo}</span>
                <div>
                  <h2 className="font-editorial text-2xl font-bold text-primary group-hover:text-accent-mvp transition-colors">
                    {comp.name}
                  </h2>
                  <p className="text-muted text-sm">{comp.country}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-editorial">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">Saison</p>
                  <p className="font-semibold text-primary">{comp.season}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted uppercase tracking-wider">Votes</p>
                  <p className="font-bold text-accent-mvp">{comp.totalVotes.toLocaleString()}</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-secondary rounded-full flex items-center justify-center group-hover:bg-accent-mvp group-hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-accent-mvp to-orange-600 text-white rounded-2xl p-8 md:p-12 text-center">
        <h2 className="font-editorial text-3xl font-bold mb-4">
          Votre voix compte !
        </h2>
        <p className="text-white/80 mb-6 max-w-xl mx-auto">
          Après chaque match, votez pour le joueur qui mérite selon vous d'être élu MVP de la saison.
        </p>
        <Link
          href="/matches"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-accent-mvp font-bold rounded-full hover:bg-secondary transition-colors"
        >
          Voir les matchs
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </section>
    </div>
  )
}
