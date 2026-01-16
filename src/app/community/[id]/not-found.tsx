import Link from 'next/link'
import { SecondaryButton } from '@/components/ui'

export default function ThreadNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="mb-8">
        <span className="text-8xl">💬</span>
      </div>
      <h1 className="font-editorial text-4xl md:text-5xl font-bold text-primary mb-4">
        Discussion non trouvée
      </h1>
      <p className="text-muted text-lg max-w-md mb-8">
        Cette discussion n&apos;existe pas ou a été supprimée.
      </p>
      <Link href="/community">
        <SecondaryButton>
          ← Retour à la communauté
        </SecondaryButton>
      </Link>
    </div>
  )
}
