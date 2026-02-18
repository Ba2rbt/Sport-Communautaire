import Link from 'next/link'

export default function TeamNotFound() {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="text-8xl mb-6 block">🏟️</span>
        <h1 className="font-editorial text-4xl font-bold text-primary mb-4">
          Équipe non trouvée
        </h1>
        <p className="text-muted mb-8">
          Cette équipe n&apos;existe pas ou n&apos;est plus disponible dans notre base de données.
        </p>
        <Link
          href="/competitions"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-sport text-white rounded-xl font-medium hover:bg-accent-sport/90 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voir les compétitions
        </Link>
      </div>
    </div>
  )
}
