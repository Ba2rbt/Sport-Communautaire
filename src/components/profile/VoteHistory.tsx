'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { MVPVoteHistory } from '@/types/profile'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface VoteHistoryProps {
  votes: MVPVoteHistory[]
}

export default function VoteHistory({ votes }: VoteHistoryProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedVotes = showAll ? votes : votes.slice(0, 5)

  if (votes.length === 0) {
    return (
      <div className="bg-white border border-editorial rounded-xl p-6">
        <h2 className="font-editorial text-2xl font-bold text-primary mb-6">
          Historique des votes MVP
        </h2>
        <div className="text-center py-8">
          <span className="text-4xl mb-4 block">🗳️</span>
          <p className="text-muted mb-4">Aucun vote MVP enregistré.</p>
          <Link
            href="/mvp"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-mvp text-white rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            Découvrir les MVP
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-editorial rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-editorial text-2xl font-bold text-primary">
          Historique des votes MVP
        </h2>
        <span className="px-3 py-1 bg-accent-mvp/10 text-accent-mvp text-sm font-semibold rounded-full">
          {votes.length} votes
        </span>
      </div>

      <div className="space-y-3">
        {displayedVotes.map((vote) => (
          <div
            key={vote.id}
            className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
          >
            {/* Player Photo */}
            {vote.playerPhoto ? (
              <img
                src={vote.playerPhoto}
                alt={vote.playerName}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-accent-mvp flex items-center justify-center text-white font-bold">
                {vote.playerName[0]}
              </div>
            )}

            {/* Vote Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-primary">
                {vote.playerName}
              </p>
              <p className="text-sm text-muted">
                {vote.teamName} · {vote.competitionName}
              </p>
            </div>

            {/* Time */}
            <div className="text-right">
              <p className="text-xs text-muted">
                {formatDistanceToNow(new Date(vote.createdAt), { addSuffix: true, locale: fr })}
              </p>
            </div>

            {/* Link to MVP page */}
            <Link
              href={`/mvp/${vote.competitionId}`}
              className="p-2 text-muted hover:text-accent-mvp transition-colors"
              title="Voir le classement"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ))}
      </div>

      {votes.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-3 text-center text-accent-sport font-medium hover:bg-secondary rounded-lg transition-colors"
        >
          {showAll ? 'Voir moins' : `Voir tout (${votes.length})`}
        </button>
      )}
    </div>
  )
}
