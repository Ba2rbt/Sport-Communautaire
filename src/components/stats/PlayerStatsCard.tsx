'use client'

import { useState } from 'react'

interface PlayerStats {
  goals: number
  assists: number
  matches: number
  minutes: number
  shotsOnTarget: number
  shotsTotal: number
  passAccuracy: number
  duelsWon: number
  duelsTotal: number
  yellowCards: number
  redCards: number
  rating: number
}

interface PlayerStatsCardProps {
  player: {
    id: string
    name: string
    photo?: string
    position: string
    number: number
    team: {
      name: string
      logo?: string
    }
    nationality?: string
    age?: number
    height?: string
  }
  stats: PlayerStats
  season?: string
}

export default function PlayerStatsCard({ player, stats, season = '2024-25' }: PlayerStatsCardProps) {
  const [activeTab, setActiveTab] = useState<'attack' | 'defense' | 'general'>('attack')

  const shootingAccuracy = stats.shotsTotal > 0 
    ? Math.round((stats.shotsOnTarget / stats.shotsTotal) * 100) 
    : 0

  const duelsWonPercent = stats.duelsTotal > 0 
    ? Math.round((stats.duelsWon / stats.duelsTotal) * 100) 
    : 0

  const goalsPerMatch = stats.matches > 0 
    ? (stats.goals / stats.matches).toFixed(2) 
    : '0.00'

  const minutesPerGoal = stats.goals > 0 
    ? Math.round(stats.minutes / stats.goals) 
    : 0

  return (
    <div className="bg-white border border-editorial rounded-2xl overflow-hidden hover-lift animate-fade-in">
      {/* Header with player info */}
      <div className="relative bg-gradient-to-br from-primary via-primary/95 to-accent-sport/80 p-6 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="player-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#player-pattern)" />
          </svg>
        </div>

        <div className="relative flex items-start gap-4">
          {/* Player photo */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
              {player.photo ? (
                <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">⚽</span>
              )}
            </div>
            {/* Jersey number */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-live text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-lg">
              {player.number}
            </div>
          </div>

          {/* Player info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-editorial text-xl sm:text-2xl font-bold truncate">
              {player.name}
            </h3>
            <p className="text-white/70 text-sm mt-1">{player.position}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-lg">{player.team.logo || '🏟️'}</span>
              <span className="text-sm text-white/80">{player.team.name}</span>
            </div>
          </div>

          {/* Rating badge */}
          <div className="text-center">
            <div className={`
              w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl
              ${stats.rating >= 8 ? 'bg-accent-live text-white' : 
                stats.rating >= 7 ? 'bg-yellow-400 text-primary' : 
                'bg-white/20 text-white'}
            `}>
              {stats.rating.toFixed(1)}
            </div>
            <p className="text-[10px] text-white/60 mt-1 uppercase tracking-wider">Note</p>
          </div>
        </div>

        {/* Season tag */}
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-medium tracking-wider">
            {season}
          </span>
        </div>
      </div>

      {/* Main stats row */}
      <div className="grid grid-cols-4 divide-x divide-editorial border-b border-editorial">
        {[
          { label: 'Buts', value: stats.goals, highlight: true },
          { label: 'Passes D.', value: stats.assists },
          { label: 'Matchs', value: stats.matches },
          { label: 'Minutes', value: stats.minutes },
        ].map((stat) => (
          <div key={stat.label} className="p-4 text-center">
            <p className={`font-editorial text-2xl sm:text-3xl font-bold ${stat.highlight ? 'text-accent-live' : 'text-primary'}`}>
              {stat.value}
            </p>
            <p className="text-[10px] sm:text-xs text-muted uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-editorial">
        {(['attack', 'defense', 'general'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-1 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all
              ${activeTab === tab 
                ? 'text-accent-sport border-b-2 border-accent-sport bg-accent-sport/5' 
                : 'text-muted hover:text-primary hover:bg-secondary/50'}
            `}
          >
            {tab === 'attack' ? '⚡ Attaque' : tab === 'defense' ? '🛡️ Défense' : '📊 Général'}
          </button>
        ))}
      </div>

      {/* Stats content */}
      <div className="p-5 space-y-4">
        {activeTab === 'attack' && (
          <>
            <StatRow label="Buts / Match" value={goalsPerMatch} />
            <StatRow label="Minutes / But" value={minutesPerGoal > 0 ? `${minutesPerGoal}'` : '-'} />
            <StatBar label="Précision tirs" value={shootingAccuracy} color="accent-live" />
            <StatRow label="Tirs cadrés" value={`${stats.shotsOnTarget} / ${stats.shotsTotal}`} />
          </>
        )}
        {activeTab === 'defense' && (
          <>
            <StatBar label="Duels gagnés" value={duelsWonPercent} color="accent-sport" />
            <StatRow label="Duels" value={`${stats.duelsWon} / ${stats.duelsTotal}`} />
            <StatRow label="Cartons jaunes" value={stats.yellowCards} icon="🟨" />
            <StatRow label="Cartons rouges" value={stats.redCards} icon="🟥" />
          </>
        )}
        {activeTab === 'general' && (
          <>
            <StatBar label="Passes réussies" value={stats.passAccuracy} color="accent-mvp" />
            <StatRow label="Nationalité" value={player.nationality || '-'} />
            <StatRow label="Âge" value={player.age ? `${player.age} ans` : '-'} />
            <StatRow label="Taille" value={player.height || '-'} />
          </>
        )}
      </div>
    </div>
  )
}

// Helper components
function StatRow({ label, value, icon }: { label: string; value: string | number; icon?: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {label}
      </span>
      <span className="font-semibold text-primary">{value}</span>
    </div>
  )
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <span className="font-bold text-primary">{value}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className={`h-full bg-${color} rounded-full transition-all duration-500`}
          style={{ width: `${value}%`, backgroundColor: color === 'accent-live' ? '#00b140' : color === 'accent-sport' ? '#0066cc' : '#ff6200' }}
        />
      </div>
    </div>
  )
}
