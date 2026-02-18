'use client'

import { useState } from 'react'

type FormResult = 'W' | 'D' | 'L'

interface TeamStats {
  position: number
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
  form: FormResult[]
}

interface TopPlayer {
  id: string
  name: string
  photo?: string
  position: string
  number: number
  stats: {
    goals?: number
    assists?: number
    rating: number
  }
}

interface NextMatch {
  opponent: string
  opponentLogo?: string
  date: string
  time: string
  competition: string
  isHome: boolean
}

interface TeamDetailCardProps {
  team: {
    id: string
    name: string
    shortName: string
    logo?: string
    stadium?: string
    city?: string
    founded?: number
    manager?: string
  }
  stats: TeamStats
  topPlayers: TopPlayer[]
  nextMatch?: NextMatch
  seasonStats?: {
    cleanSheets: number
    avgPossession: number
    avgGoalsScored: number
    avgGoalsConceded: number
  }
}

export default function TeamDetailCard({
  team,
  stats,
  topPlayers,
  nextMatch,
  seasonStats
}: TeamDetailCardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'players' | 'stats'>('overview')

  const goalDifference = stats.goalsFor - stats.goalsAgainst
  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0

  const getFormColor = (result: FormResult) => {
    switch (result) {
      case 'W': return 'bg-accent-live text-white'
      case 'D': return 'bg-yellow-400 text-primary'
      case 'L': return 'bg-red-500 text-white'
    }
  }

  const getPositionStyle = (position: number) => {
    if (position === 1) return 'bg-yellow-400 text-primary'
    if (position <= 3) return 'bg-accent-live text-white'
    if (position <= 5) return 'bg-accent-sport text-white'
    if (position >= 16) return 'bg-red-500 text-white'
    return 'bg-secondary text-primary'
  }

  return (
    <div className="bg-white border border-editorial rounded-2xl overflow-hidden hover-lift animate-fade-in">
      {/* Header with team info */}
      <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-6 text-white overflow-hidden">
        {/* Stadium pattern background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="20" y="35" width="60" height="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative flex items-center gap-5">
          {/* Team logo */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            {team.logo ? (
              <img src={team.logo} alt={team.name} className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
            ) : (
              <span className="text-4xl sm:text-5xl">🏟️</span>
            )}
          </div>

          {/* Team info */}
          <div className="flex-1 min-w-0">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold truncate">
              {team.name}
            </h2>
            <div className="flex items-center gap-3 mt-2 text-white/70 text-sm">
              {team.city && <span>📍 {team.city}</span>}
              {team.founded && <span>• Fondé en {team.founded}</span>}
            </div>
            {team.manager && (
              <p className="text-white/60 text-sm mt-1">
                👤 {team.manager}
              </p>
            )}
          </div>

          {/* Position badge */}
          <div className="text-center">
            <div className={`
              w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center 
              font-editorial text-2xl sm:text-3xl font-black shadow-lg
              ${getPositionStyle(stats.position)}
            `}>
              {stats.position}
            </div>
            <p className="text-[10px] text-white/60 mt-1.5 uppercase tracking-wider">Position</p>
          </div>
        </div>

        {/* Form indicator */}
        <div className="mt-6 flex items-center gap-3">
          <span className="text-xs text-white/60 uppercase tracking-wider">Forme :</span>
          <div className="flex items-center gap-1.5">
            {stats.form.slice(0, 5).map((result, idx) => (
              <div 
                key={idx}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${getFormColor(result)}`}
              >
                {result}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 divide-x divide-editorial border-b border-editorial">
        {[
          { label: 'Points', value: stats.points, highlight: true },
          { label: 'V-N-D', value: `${stats.won}-${stats.drawn}-${stats.lost}` },
          { label: 'Buts', value: `${stats.goalsFor}:${stats.goalsAgainst}` },
          { label: 'Diff.', value: goalDifference > 0 ? `+${goalDifference}` : goalDifference, color: goalDifference > 0 ? 'text-accent-live' : goalDifference < 0 ? 'text-red-500' : '' },
        ].map((stat) => (
          <div key={stat.label} className="p-3 sm:p-4 text-center">
            <p className={`font-editorial text-xl sm:text-2xl font-bold ${stat.color || (stat.highlight ? 'text-accent-sport' : 'text-primary')}`}>
              {stat.value}
            </p>
            <p className="text-[9px] sm:text-[10px] text-muted uppercase tracking-wider mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-editorial">
        {(['overview', 'players', 'stats'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-1 py-3 text-xs font-medium uppercase tracking-wider transition-all
              ${activeTab === tab 
                ? 'text-accent-sport border-b-2 border-accent-sport bg-accent-sport/5' 
                : 'text-muted hover:text-primary hover:bg-secondary/50'}
            `}
          >
            {tab === 'overview' ? '📊 Aperçu' : tab === 'players' ? '👥 Joueurs' : '📈 Stats'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5">
        {activeTab === 'overview' && (
          <div className="space-y-5">
            {/* Next match */}
            {nextMatch && (
              <div className="p-4 bg-gradient-to-r from-secondary to-transparent rounded-xl">
                <p className="text-xs text-muted uppercase tracking-wider mb-3">Prochain match</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-editorial flex items-center justify-center">
                    {nextMatch.opponentLogo ? (
                      <img src={nextMatch.opponentLogo} alt={nextMatch.opponent} className="w-8 h-8 object-contain" />
                    ) : (
                      <span className="text-2xl">⚽</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary">
                      {nextMatch.isHome ? 'vs' : '@'} {nextMatch.opponent}
                    </p>
                    <p className="text-xs text-muted">{nextMatch.competition}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{nextMatch.date}</p>
                    <p className="text-xs text-muted">{nextMatch.time}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-secondary/50 rounded-xl">
                <p className="text-2xl font-bold text-primary">{winRate}%</p>
                <p className="text-xs text-muted">Victoires</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-xl">
                <p className="text-2xl font-bold text-primary">{stats.played}</p>
                <p className="text-xs text-muted">Matchs joués</p>
              </div>
            </div>

            {/* Stadium info */}
            {team.stadium && (
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                <span className="text-xl">🏟️</span>
                <div>
                  <p className="text-sm font-medium text-primary">{team.stadium}</p>
                  <p className="text-xs text-muted">Stade</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'players' && (
          <div className="space-y-3">
            {topPlayers.map((player, idx) => (
              <div 
                key={player.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
                    {player.photo ? (
                      <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">👤</span>
                    )}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary text-white rounded text-[10px] font-bold flex items-center justify-center">
                    {player.number}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-primary truncate">{player.name}</p>
                  <p className="text-xs text-muted">{player.position}</p>
                </div>
                <div className="flex items-center gap-3">
                  {player.stats.goals !== undefined && player.stats.goals > 0 && (
                    <span className="text-xs font-medium text-accent-live">⚽ {player.stats.goals}</span>
                  )}
                  {player.stats.assists !== undefined && player.stats.assists > 0 && (
                    <span className="text-xs font-medium text-accent-sport">👟 {player.stats.assists}</span>
                  )}
                  <div className={`
                    w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs
                    ${player.stats.rating >= 7.5 ? 'bg-accent-live text-white' : 
                      player.stats.rating >= 7 ? 'bg-yellow-400 text-primary' : 
                      'bg-secondary text-primary'}
                  `}>
                    {player.stats.rating.toFixed(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && seasonStats && (
          <div className="space-y-4">
            <StatBarItem label="Taux de victoire" value={winRate} max={100} color="accent-live" />
            <StatBarItem label="Possession moyenne" value={seasonStats.avgPossession} max={100} color="accent-sport" />
            <StatBarItem label="Clean sheets" value={seasonStats.cleanSheets} max={stats.played} color="accent-mvp" showRaw />
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-accent-live/10 rounded-xl text-center">
                <p className="font-editorial text-2xl font-bold text-accent-live">
                  {seasonStats.avgGoalsScored.toFixed(1)}
                </p>
                <p className="text-xs text-muted">Buts marqués / match</p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl text-center">
                <p className="font-editorial text-2xl font-bold text-red-500">
                  {seasonStats.avgGoalsConceded.toFixed(1)}
                </p>
                <p className="text-xs text-muted">Buts encaissés / match</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatBarItem({ 
  label, 
  value, 
  max, 
  color,
  showRaw = false
}: { 
  label: string
  value: number
  max: number
  color: string
  showRaw?: boolean
}) {
  const percentage = max > 0 ? (value / max) * 100 : 0
  const colorMap: Record<string, string> = {
    'accent-live': '#00b140',
    'accent-sport': '#0066cc',
    'accent-mvp': '#ff6200',
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <span className="font-bold text-primary">
          {showRaw ? `${value}/${max}` : `${Math.round(value)}%`}
        </span>
      </div>
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: colorMap[color] || color
          }}
        />
      </div>
    </div>
  )
}
