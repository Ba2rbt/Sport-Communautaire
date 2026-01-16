import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 text-center">
      <div className="w-24 h-24 bg-accent-mvp/10 rounded-full flex items-center justify-center mb-8">
        <span className="text-5xl">🏆</span>
      </div>
      <h1 className="font-editorial text-5xl font-bold text-primary mb-4">
        Compétition non trouvée
      </h1>
      <p className="text-muted text-lg mb-8 max-w-md">
        La compétition que vous recherchez n'existe pas ou n'a pas encore de classement MVP.
      </p>
      <Link
        href="/mvp"
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent-mvp text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Voir toutes les compétitions
      </Link>
    </div>
  )
}
