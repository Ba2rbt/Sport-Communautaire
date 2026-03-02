'use client'

import Link from 'next/link'
import type { MVPRanking } from '@/types/mvp'
import { positionLabels } from '@/types/mvp'
import { getPlayerSlug, getTeamSlug } from '@/lib/utils'
import PlayerAvatar from '@/components/ui/PlayerAvatar'
import TeamLogo from '@/components/ui/TeamLogo'

interface MVPPlayerCardProps {
  player: MVPRanking
  showVoteButton?: boolean
  onVote?: (playerId: string) => void
  isVoting?: boolean
  hasVoted?: boolean
}

function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3) {
    const colors = {
      1: 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-yellow-400/30',
      2: 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-gray-400/30',
      3: 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-amber-500/30',
    }
    return (
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-lg ${colors[rank as keyof typeof colors]}`}
      >
        {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
      </div>
    )
  }

  return (
    <div className="w-10 h-10 rounded-full bg-secondary border border-editorial flex items-center justify-center font-bold text-primary">
      {rank}
    </div>
  )
}

export default function MVPPlayerCard({
  player,
  showVoteButton = false,
  onVote,
  isVoting = false,
  hasVoted = false,
}: MVPPlayerCardProps) {
  const position = positionLabels[player.position]
  const playerSlug = getPlayerSlug(player.playerName)
  const teamSlug = getTeamSlug(player.teamName)

  return (
    <div
      className={`
      flex items-center gap-4 p-4 bg-white border rounded-xl transition-all duration-300
      ${player.rank <= 3 ? 'border-accent-mvp/30 shadow-md' : 'border-editorial hover:shadow-md'}
      ${player.rank === 1 ? 'ring-2 ring-yellow-400/50' : ''}
    `}
    >
      {/* Rank */}
      <RankBadge rank={player.rank} />

      {/* Photo - Clickable */}
      <Link href={`/player/${playerSlug}`} className="relative flex-shrink-0 group/photo">
        <PlayerAvatar
          photoUrl={player.photoUrl}
          name={player.playerName}
          jerseyNumber={player.jerseyNumber}
          size="lg"
          shape="circle"
          className="border-2 border-editorial group-hover/photo:scale-105 group-hover/photo:border-accent-sport transition-all bg-gradient-to-br from-primary to-accent-sport"
        />
        {/* Jersey Number */}
        {player.jerseyNumber && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
            {player.jerseyNumber}
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {/* Player Name - Clickable */}
          <Link href={`/player/${playerSlug}`}>
            <h3 className="font-editorial font-bold text-primary truncate hover:text-accent-sport transition-colors">
              {player.playerName}
            </h3>
          </Link>
          {player.rank <= 3 && (
            <span className="flex-shrink-0 text-accent-mvp">{player.rank === 1 ? '👑' : '⭐'}</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          {player.teamLogoUrl && (
            <TeamLogo logoUrl={player.teamLogoUrl} name={player.teamName} size="xs" />
          )}
          {/* Team Name - Clickable */}
          <Link href={`/team/${teamSlug}`}>
            <span className="text-muted truncate hover:text-accent-sport transition-colors">
              {player.teamName}
            </span>
          </Link>
          <span
            className={`px-2 py-0.5 text-xs font-semibold rounded-full ${position?.color || 'bg-muted text-white'}`}
          >
            {position?.label || player.position}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex-shrink-0 text-right">
        <p className="font-black text-accent-mvp text-xl">{player.totalVotes.toLocaleString()}</p>
        <p className="text-muted text-xs">votes</p>
      </div>

      {/* Percentage Bar */}
      <div className="flex-shrink-0 w-20 hidden md:block">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted">%</span>
          <span className="text-xs font-semibold text-accent-sport">{player.votePercentage}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              player.rank === 1
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                : player.rank === 2
                  ? 'bg-gradient-to-r from-gray-300 to-gray-500'
                  : player.rank === 3
                    ? 'bg-gradient-to-r from-amber-500 to-amber-700'
                    : 'bg-accent-sport'
            }`}
            style={{ width: `${Math.min(player.votePercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Vote Button */}
      {showVoteButton && onVote && (
        <button
          onClick={() => onVote(player.playerId)}
          disabled={isVoting}
          className={`
            flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition-all
            ${
              hasVoted
                ? 'bg-accent-mvp text-white'
                : 'bg-secondary text-primary hover:bg-accent-mvp hover:text-white'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isVoting ? '...' : hasVoted ? '✓ Voté' : 'Voter'}
        </button>
      )}
    </div>
  )
}
