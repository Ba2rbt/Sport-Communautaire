'use client'

import { useState } from 'react'
import type { MVPRanking, PlayerPosition } from '@/types/mvp'
import { positionLabels } from '@/types/mvp'
import MVPPlayerCard from './MVPPlayerCard'

interface MVPLeaderboardProps {
  rankings: MVPRanking[]
  showVoteButton?: boolean
  onVote?: (playerId: string) => void
  votedPlayerId?: string | null
}

type FilterPosition = PlayerPosition | 'ALL'

export default function MVPLeaderboard({ 
  rankings, 
  showVoteButton = false, 
  onVote,
  votedPlayerId 
}: MVPLeaderboardProps) {
  const [positionFilter, setPositionFilter] = useState<FilterPosition>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRankings = rankings.filter((player) => {
    const matchesPosition = positionFilter === 'ALL' || player.position === positionFilter
    const matchesSearch = player.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         player.teamName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPosition && matchesSearch
  })

  // Skip top 3 if we're showing all (they're in podium)
  const displayedRankings = positionFilter === 'ALL' && !searchQuery 
    ? filteredRankings.slice(3) 
    : filteredRankings

  return (
    <section className="bg-white border border-editorial rounded-xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="font-editorial text-2xl font-bold text-primary">
          Classement complet
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-48 border border-editorial rounded-lg text-sm focus:border-accent-sport focus:ring-1 focus:ring-accent-sport outline-none"
            />
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Position Filter */}
          <div className="flex gap-1 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setPositionFilter('ALL')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                positionFilter === 'ALL' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-muted hover:text-primary'
              }`}
            >
              Tous
            </button>
            {(Object.keys(positionLabels) as PlayerPosition[]).map((pos) => (
              <button
                key={pos}
                onClick={() => setPositionFilter(pos)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  positionFilter === pos 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-muted hover:text-primary'
                }`}
              >
                {positionLabels[pos].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-secondary/50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-black text-primary">{rankings.length}</p>
          <p className="text-xs text-muted">Joueurs nominés</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-accent-mvp">
            {rankings.reduce((sum, p) => sum + p.totalVotes, 0).toLocaleString()}
          </p>
          <p className="text-xs text-muted">Votes totaux</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-accent-sport">
            {rankings.reduce((sum, p) => sum + p.uniqueVoters, 0).toLocaleString()}
          </p>
          <p className="text-xs text-muted">Votants</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-accent-live">
            {rankings[0]?.totalVotes.toLocaleString() || 0}
          </p>
          <p className="text-xs text-muted">Leader votes</p>
        </div>
      </div>

      {/* Rankings List */}
      {displayedRankings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted">
            {searchQuery 
              ? 'Aucun joueur trouvé pour cette recherche.' 
              : 'Aucun joueur dans cette catégorie.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedRankings.map((player) => (
            <MVPPlayerCard 
              key={player.playerId} 
              player={player}
              showVoteButton={showVoteButton}
              onVote={onVote}
              hasVoted={votedPlayerId === player.playerId}
            />
          ))}
        </div>
      )}

      {/* Load More hint */}
      {displayedRankings.length >= 20 && (
        <div className="text-center mt-6">
          <p className="text-sm text-muted">
            Affichage des {displayedRankings.length} premiers joueurs
          </p>
        </div>
      )}
    </section>
  )
}
