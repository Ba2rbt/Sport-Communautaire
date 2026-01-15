import Link from 'next/link'
import { SecondaryButton } from '@/components/ui'

export default function CompetitionNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="mb-8">
        <span className="text-8xl">🏆</span>
      </div>
      <h1 className="font-editorial text-4xl md:text-5xl font-bold text-primary mb-4">
        Compétition non trouvée
      </h1>
      <p className="text-muted text-lg max-w-md mb-8">
        Désolé, nous n&apos;avons pas trouvé cette compétition. Elle n&apos;existe peut-être plus ou l&apos;URL est incorrecte.
      </p>
      <Link href="/competitions">
        <SecondaryButton>
          ← Toutes les compétitions
        </SecondaryButton>
      </Link>
    </div>
  )
}
