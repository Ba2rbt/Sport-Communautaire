import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CreateAnalysisPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-sport mb-2 block">
            Espace expert
          </span>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold text-primary">
            Créer une analyse
          </h1>
          <p className="text-muted mt-4 max-w-2xl">
            Partagez votre expertise sportive avec la communauté SportUnion.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-editorial rounded-lg p-8 max-w-3xl">
          <form className="space-y-8">
            {/* Title */}
            <div>
              <label 
                htmlFor="title" 
                className="block text-sm font-medium text-primary mb-2"
              >
                Titre de l&apos;analyse
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="w-full px-4 py-3 border border-editorial rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-sport focus:border-transparent transition-all text-primary placeholder:text-muted/50"
                placeholder="Ex: Analyse tactique du derby PSG-OM"
              />
            </div>

            {/* Category */}
            <div>
              <label 
                htmlFor="category" 
                className="block text-sm font-medium text-primary mb-2"
              >
                Catégorie
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-4 py-3 border border-editorial rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-sport focus:border-transparent transition-all text-primary bg-white"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="tactique">Tactique</option>
                <option value="mercato">Mercato</option>
                <option value="champions-league">Champions League</option>
                <option value="ligue-1">Ligue 1</option>
                <option value="premier-league">Premier League</option>
                <option value="la-liga">La Liga</option>
              </select>
            </div>

            {/* Excerpt */}
            <div>
              <label 
                htmlFor="excerpt" 
                className="block text-sm font-medium text-primary mb-2"
              >
                Résumé
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                required
                className="w-full px-4 py-3 border border-editorial rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-sport focus:border-transparent transition-all text-primary placeholder:text-muted/50 resize-none"
                placeholder="Décrivez brièvement votre analyse..."
              />
            </div>

            {/* Content */}
            <div>
              <label 
                htmlFor="content" 
                className="block text-sm font-medium text-primary mb-2"
              >
                Contenu de l&apos;analyse
              </label>
              <textarea
                id="content"
                name="content"
                rows={12}
                required
                className="w-full px-4 py-3 border border-editorial rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-sport focus:border-transparent transition-all text-primary placeholder:text-muted/50 resize-none"
                placeholder="Rédigez votre analyse complète..."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                className="px-8 py-4 bg-accent-sport hover:bg-accent-sport/90 text-white font-semibold rounded-lg transition-colors"
              >
                Publier l&apos;analyse
              </button>
              <button
                type="button"
                className="px-8 py-4 bg-transparent border border-editorial hover:bg-secondary text-primary font-semibold rounded-lg transition-colors"
              >
                Enregistrer le brouillon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
