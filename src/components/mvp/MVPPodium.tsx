'use client'

import Link from 'next/link'
import type { MVPRanking } from '@/types/mvp'
import { positionLabels } from '@/types/mvp'
import { getPlayerSlug, getTeamSlug } from '@/lib/utils'
import PlayerAvatar from '@/components/ui/PlayerAvatar'

interface MVPPodiumProps {
  topThree: MVPRanking[]
  competitionName: string
}

function TrophyIcon({ rank }: { rank: number }) {
  const colors = {
    1: 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]',
    2: 'text-gray-300 drop-shadow-[0_0_10px_rgba(156,163,175,0.4)]',
    3: 'text-amber-600 drop-shadow-[0_0_10px_rgba(217,119,6,0.4)]',
  }

  return (
    <svg
      className={`w-12 h-12 ${colors[rank as keyof typeof colors] || 'text-muted'}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  )
}

function PodiumPlayer({ player, isCenter }: { player: MVPRanking; isCenter: boolean }) {
  const position = positionLabels[player.position]
  const podiumHeights = { 1: 'h-48', 2: 'h-36', 3: 'h-28' }
  const podiumColors = {
    1: 'bg-gradient-to-t from-yellow-500 to-yellow-300',
    2: 'bg-gradient-to-t from-gray-400 to-gray-200',
    3: 'bg-gradient-to-t from-amber-700 to-amber-500',
  }

  const playerSlug = getPlayerSlug(player.playerName)
  const teamSlug = getTeamSlug(player.teamName)

  return (
    <div
      className={`flex flex-col items-center ${isCenter ? 'order-2' : player.rank === 2 ? 'order-1' : 'order-3'}`}
    >
      {/* Trophy Badge */}
      <div className="mb-4">
        <TrophyIcon rank={player.rank} />
      </div>

      {/* Player Photo - Clickable */}
      <Link
        href={`/player/${playerSlug}`}
        className={`relative mb-4 ${isCenter ? 'w-32 h-32' : 'w-24 h-24'} group/photo`}
      >
        <div
          className={`absolute inset-0 rounded-full ${podiumColors[player.rank as keyof typeof podiumColors]} opacity-30 blur-xl group-hover/photo:opacity-50 transition-opacity`}
        />
        <PlayerAvatar
          photoUrl={player.photoUrl}
          name={player.playerName}
          jerseyNumber={player.jerseyNumber}
          size={isCenter ? 'hero' : 'xl'}
          shape="circle"
          className={`relative border-4 ${
            player.rank === 1
              ? 'border-yellow-400'
              : player.rank === 2
                ? 'border-gray-300'
                : 'border-amber-600'
          } shadow-xl group-hover/photo:scale-105 transition-transform bg-gradient-to-br from-primary to-accent-mvp`}
        />

        {/* Rank Badge */}
        <div
          className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg ${
            player.rank === 1 ? 'bg-yellow-500' : player.rank === 2 ? 'bg-gray-400' : 'bg-amber-600'
          }`}
        >
          {player.rank}
        </div>
      </Link>

      {/* Player Info */}
      <div className="text-center mb-4">
        {/* Player Name - Clickable */}
        <Link href={`/player/${playerSlug}`}>
          <h3
            className={`font-editorial font-bold text-primary hover:text-accent-sport transition-colors ${isCenter ? 'text-2xl' : 'text-lg'}`}
          >
            {player.playerName}
          </h3>
        </Link>

        {/* Team Name - Clickable */}
        <Link href={`/team/${teamSlug}`}>
          <p className="text-muted text-sm hover:text-accent-sport transition-colors">
            {player.teamName}
          </p>
        </Link>

        <span
          className={`inline-block mt-2 px-2 py-0.5 text-xs font-semibold rounded-full ${position?.color || 'bg-muted text-white'}`}
        >
          {position?.label || player.position}
        </span>
      </div>

      {/* Votes */}
      <div className={`text-center mb-4 ${isCenter ? '' : 'hidden md:block'}`}>
        <p className={`font-black text-accent-mvp ${isCenter ? 'text-4xl' : 'text-2xl'}`}>
          {player.totalVotes.toLocaleString()}
        </p>
        <p className="text-muted text-sm">votes</p>
        <p className="text-accent-sport font-semibold text-lg">{player.votePercentage}%</p>
      </div>

      {/* Podium Block */}
      <div
        className={`w-full max-w-[140px] ${podiumHeights[player.rank as keyof typeof podiumHeights]} ${podiumColors[player.rank as keyof typeof podiumColors]} rounded-t-lg flex items-end justify-center pb-4 shadow-lg`}
      >
        <span className="text-white font-black text-4xl opacity-50">{player.rank}</span>
      </div>
    </div>
  )
}

export default function MVPPodium({ topThree, competitionName }: MVPPodiumProps) {
  if (topThree.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted">Aucun vote enregistré pour cette compétition.</p>
      </div>
    )
  }

  // Ensure we have exactly 3 positions (fill with null if needed)
  const podiumPlayers = [
    topThree[1] || null, // 2nd place (left)
    topThree[0] || null, // 1st place (center)
    topThree[2] || null, // 3rd place (right)
  ].filter(Boolean) as MVPRanking[]

  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-mvp/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-mvp/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-accent-mvp font-semibold tracking-widest uppercase text-sm mb-2">
          🏆 Saison MVP
        </p>
        <h2 className="font-editorial text-4xl md:text-5xl font-black text-primary mb-3">
          Le Podium
        </h2>
        <p className="text-muted text-lg">{competitionName}</p>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 md:gap-8 px-4">
        {podiumPlayers.map((player) => (
          <PodiumPlayer key={player.playerId} player={player} isCenter={player.rank === 1} />
        ))}
      </div>
    </section>
  )
}
