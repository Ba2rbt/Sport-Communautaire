'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import MatchCardLarge, { type MatchData } from './MatchCardLarge'
import { MatchGridSkeleton } from './ui/Skeleton'

interface MatchesGridProps {
  initialMatches: MatchData[]
  initialHasMore: boolean
  pageSize?: number
}

// Mock function to simulate fetching more matches
// In production, this would call a server action or API route
async function fetchMoreMatches(page: number, pageSize: number): Promise<{ matches: MatchData[], hasMore: boolean }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))

  // Mock more matches
  const mockMatches: MatchData[] = Array.from({ length: pageSize }, (_, i) => ({
    id: `match-${page}-${i}`,
    homeTeam: {
      name: ['Inter Milan', 'Atlético Madrid', 'Tottenham', 'Napoli', 'Ajax'][i % 5],
      shortName: ['INT', 'ATM', 'TOT', 'NAP', 'AJX'][i % 5],
      logo: ['⚫', '🔴', '⚪', '🔵', '🔴'][i % 5],
    },
    awayTeam: {
      name: ['Roma', 'Sevilla', 'Arsenal', 'Lazio', 'PSV'][i % 5],
      shortName: ['ROM', 'SEV', 'ARS', 'LAZ', 'PSV'][i % 5],
      logo: ['🟡', '⚪', '🔴', '🩵', '🔴'][i % 5],
    },
    homeScore: page > 2 ? Math.floor(Math.random() * 4) : null,
    awayScore: page > 2 ? Math.floor(Math.random() * 3) : null,
    date: `${15 + page + i} Jan`,
    time: ['15:00', '18:30', '20:45', '21:00'][i % 4],
    league: ['Serie A', 'La Liga', 'Premier League', 'Serie A', 'Eredivisie'][i % 5],
    venue: 'Stade Municipal',
    status: page > 2 ? 'finished' : 'upcoming',
    round: `Journée ${page + i + 10}`,
  }))

  return {
    matches: mockMatches,
    hasMore: page < 5, // Stop after 5 pages for demo
  }
}

export default function MatchesGrid({ initialMatches, initialHasMore, pageSize = 6 }: MatchesGridProps) {
  const [matches, setMatches] = useState<MatchData[]>(initialMatches)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const { matches: newMatches, hasMore: more } = await fetchMoreMatches(page + 1, pageSize)
      setMatches(prev => [...prev, ...newMatches])
      setHasMore(more)
      setPage(prev => prev + 1)
    } catch (error) {
      console.error('Failed to load more matches:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, hasMore, page, pageSize])

  // Setup Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { rootMargin: '200px' }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, isLoading, loadMore])

  return (
    <div>
      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {matches.map((match) => (
          <MatchCardLarge key={match.id} match={match} />
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="mt-8">
          <MatchGridSkeleton count={3} />
        </div>
      )}

      {/* Load More Trigger */}
      {hasMore && !isLoading && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-8">
          <div className="flex items-center gap-3 text-muted">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm">Chargement...</span>
          </div>
        </div>
      )}

      {/* End of List */}
      {!hasMore && matches.length > 0 && (
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary rounded-full">
            <svg className="w-5 h-5 text-accent-sport" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-primary">
              Tous les matches ont été chargés
            </span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {matches.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-editorial text-xl font-bold text-primary mb-2">
            Aucun match trouvé
          </h3>
          <p className="text-muted">
            Essayez de modifier vos filtres pour voir plus de résultats.
          </p>
        </div>
      )}
    </div>
  )
}
