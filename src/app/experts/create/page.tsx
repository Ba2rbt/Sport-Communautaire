import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ArticleEditor from './ArticleEditor'

export const metadata = {
  title: 'Rédiger un article | SportUnion Experts',
  description: 'Partagez votre expertise avec la communauté SportUnion.',
}

export default async function CreateArticlePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect if not logged in
  if (!user) {
    redirect('/login?redirect=/experts/create')
  }

  // Check if user is an expert (mock check - in production, check profiles.role)
  // For demo purposes, we'll allow all authenticated users
  // In production: const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  // if (profile?.role !== 'expert') redirect('/experts')

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center mb-12">
        <p className="text-accent-sport font-semibold tracking-widest uppercase text-sm mb-2">
          Espace Expert
        </p>
        <h1 className="font-editorial text-4xl md:text-5xl font-black text-primary mb-4">
          Rédiger un article
        </h1>
        <p className="text-muted max-w-xl mx-auto">
          Partagez votre analyse, votre expertise et vos insights avec notre communauté de passionnés.
        </p>
      </header>

      {/* Editor */}
      <ArticleEditor userId={user.id} />
    </div>
  )
}
