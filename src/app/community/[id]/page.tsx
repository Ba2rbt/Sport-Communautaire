import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ThreadDetailClient from './ThreadDetailClient'
import type { Thread, ThreadPost, ThreadCategory } from '@/types/community'
import { categoryLabels } from '@/types/community'

// Mock data for demo
function getMockThread(id: string): Thread | null {
  const threads: Record<string, Thread> = {
    'thread-1': {
      id: 'thread-1',
      title: '🔥 Pronostics pour le Classico PSG-OM ce weekend !',
      content: 'Le match de l\'année approche ! Qui selon vous va l\'emporter ?\n\nJe mise sur un 2-1 pour le PSG avec un doublé de Mbappé. L\'OM a eu des difficultés défensives ces dernières semaines et le PSG est en grande forme à domicile.\n\nQu\'en pensez-vous ?',
      author: { id: 'u1', email: 'jean@example.com', fullName: 'Jean Dupont' },
      category: 'matchday',
      isPinned: true,
      isLocked: false,
      viewsCount: 1250,
      repliesCount: 4,
      likesCount: 89,
      isLikedByUser: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  }
  return threads[id] || threads['thread-1']
}

function getMockPosts(threadId: string): ThreadPost[] {
  return [
    {
      id: 'post-1',
      threadId,
      author: { id: 'u2', email: 'marie@example.com', fullName: 'Marie Martin', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie' },
      content: 'Je pense que l\'OM a ses chances ! La défense du PSG n\'est pas si imperméable que ça cette saison. Je mise sur un 2-2.',
      isSolution: false,
      likesCount: 23,
      isLikedByUser: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    },
    {
      id: 'post-2',
      threadId,
      author: { id: 'u3', email: 'pierre@example.com', fullName: 'Pierre Expert', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre' },
      content: 'Analyse tactique :\n\n- Le PSG va probablement jouer en 4-3-3 avec Mbappé en pointe\n- L\'OM devrait privilégier les contre-attaques\n- Les milieux seront décisifs\n\nMon prono : 3-1 PSG',
      isSolution: false,
      likesCount: 45,
      isLikedByUser: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: 'post-3',
      threadId,
      author: { id: 'u4', email: 'sophie@example.com', fullName: 'Sophie Bernard' },
      content: 'Je suis supporter de l\'OM donc forcément je vais dire 2-0 pour nous 😄💙\n\nAllez l\'OM !',
      isSolution: false,
      likesCount: 12,
      isLikedByUser: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: 'post-4',
      threadId,
      author: { id: 'u1', email: 'jean@example.com', fullName: 'Jean Dupont' },
      content: '@Sophie - On verra bien ! 😉 En tout cas ça promet un beau spectacle. Vivement dimanche !',
      isSolution: false,
      likesCount: 8,
      isLikedByUser: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const thread = getMockThread(id)

  if (!thread) {
    return { title: 'Discussion non trouvée | SportUnion' }
  }

  return {
    title: `${thread.title} | Communauté SportUnion`,
    description: thread.content?.substring(0, 160) || 'Rejoignez la discussion sur SportUnion.',
  }
}

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const thread = getMockThread(id)
  if (!thread) {
    notFound()
  }

  const posts = getMockPosts(id)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const category = categoryLabels[thread.category as ThreadCategory] || categoryLabels.general

  return (
    <ThreadDetailClient 
      thread={thread} 
      posts={posts} 
      user={user}
      category={category}
    />
  )
}
