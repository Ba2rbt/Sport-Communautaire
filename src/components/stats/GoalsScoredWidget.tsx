'use client'

import { useState } from 'react'

interface GoalData {
  month: string
  goals: number
  assists: number
  matches: number
}

interface GoalDetail {
  id: string
  minute: number
  type: 'goal' | 'penalty' | 'free_kick' | 'header'
  opponent: string
  date: string
  competition: string
  isWinningGoal?: boolean
}

interface GoalsScoredWidgetProps {
  playerName: string
  totalGoals: number
  totalAssists: number
  monthlyData: GoalData[]
  recentGoals?: GoalDetail[]
  comparison?: {
    lastSeason: number
    samePointLastSeason: number
  }
}

export default function GoalsScoredWidget({
  playerName,
  totalGoals,
  totalAssists,
  monthlyData,
  recentGoals = [],
  comparison
}: GoalsScoredWidgetProps) {
  const [showGoals, setShowGoals] = useState(true)
  const [showAssists, setShowAssists] = useState(true)

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.goals, d.assists))) || 1
  const totalContributions = totalGoals + totalAssists

  const getGoalTypeIcon = (type: GoalDetail['type']) => {
    switch (type) {
      case 'penalty': return '⚽️'
      case 'free_kick': return '🎯'
      case 'header': return '🗣️'
      default: return '⚽'
    }
  }

  const getGoalTypeLabel = (type: GoalDetail['type']) => {
    switch (type) {
      case 'penalty': return 'Penalty'
      case 'free_kick': return 'Coup franc'
      case 'header': return 'Tête'
      default: return 'But'
    }
  }

  return (
    <div className="bg-white border border-editorial rounded-2xl overflow-hidden hover-lift animate-fade-in">
      {/* Header */}
      <div className="px-5 py-4 border-b border-editorial">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-editorial text-lg font-bold text-primary">Statistiques de buts</h3>
            <p className="text-xs text-muted mt-0.5">{playerName} • Saison 2024-25</p>
          </div>
          
          {/* Toggle buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGoals(!showGoals)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${showGoals ? 'bg-accent-live text-white' : 'bg-secondary text-muted'}
              `}
            >
              ⚽ Buts
            </button>
            <button
              onClick={() => setShowAssists(!showAssists)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${showAssists ? 'bg-accent-sport text-white' : 'bg-secondary text-muted'}
              `}
            >
              👟 Passes D.
            </button>
          </div>
        </div>
      </div>

      {/* Big numbers */}
      <div className="grid grid-cols-3 divide-x divide-editorial">
        <div className="p-5 text-center">
          <p className="font-editorial text-4xl sm:text-5xl font-black text-accent-live">
            {totalGoals}
          </p>
          <p className="text-xs text-muted uppercase tracking-wider mt-1">Buts</p>
        </div>
        <div className="p-5 text-center">
          <p className="font-editorial text-4xl sm:text-5xl font-black text-accent-sport">
            {totalAssists}
          </p>
          <p className="text-xs text-muted uppercase tracking-wider mt-1">Passes D.</p>
        </div>
        <div className="p-5 text-center">
          <p className="font-editorial text-4xl sm:text-5xl font-black text-accent-mvp">
            {totalContributions}
          </p>
          <p className="text-xs text-muted uppercase tracking-wider mt-1">G+A</p>
        </div>
      </div>

      {/* Chart */}
      <div className="px-5 py-6 border-t border-editorial">
        <div className="flex items-end justify-between gap-2 h-32">
          {monthlyData.map((data, idx) => (
            <div 
              key={data.month}
              className="flex-1 flex flex-col items-center gap-1 animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Bars */}
              <div className="w-full flex items-end justify-center gap-0.5 h-24">
                {showGoals && (
                  <div 
                    className="w-3 bg-gradient-to-t from-accent-live to-accent-live/70 rounded-t transition-all duration-500"
                    style={{ height: `${(data.goals / maxValue) * 100}%`, minHeight: data.goals > 0 ? '8px' : '0' }}
                    title={`${data.goals} buts`}
                  />
                )}
                {showAssists && (
                  <div 
                    className="w-3 bg-gradient-to-t from-accent-sport to-accent-sport/70 rounded-t transition-all duration-500"
                    style={{ height: `${(data.assists / maxValue) * 100}%`, minHeight: data.assists > 0 ? '8px' : '0' }}
                    title={`${data.assists} passes D.`}
                  />
                )}
              </div>
              {/* Label */}
              <span className="text-[10px] text-muted font-medium">{data.month}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted">
          {showGoals && (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-accent-live" />
              Buts
            </span>
          )}
          {showAssists && (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-accent-sport" />
              Passes D.
            </span>
          )}
        </div>
      </div>

      {/* Comparison with last season */}
      {comparison && (
        <div className="px-5 py-4 border-t border-editorial bg-secondary/30">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">vs même période saison dernière</span>
            <div className="flex items-center gap-2">
              <span className={`
                text-sm font-bold
                ${totalGoals > comparison.samePointLastSeason ? 'text-accent-live' : 
                  totalGoals < comparison.samePointLastSeason ? 'text-red-500' : 'text-muted'}
              `}>
                {totalGoals > comparison.samePointLastSeason ? '+' : ''}
                {totalGoals - comparison.samePointLastSeason}
              </span>
              <span className="text-xs text-muted">
                ({comparison.samePointLastSeason} l&apos;an dernier)
              </span>
            </div>
          </div>
          <div className="mt-2">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-mvp rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalGoals / comparison.lastSeason) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-muted">
              <span>{totalGoals} cette saison</span>
              <span>{comparison.lastSeason} total saison dernière</span>
            </div>
          </div>
        </div>
      )}

      {/* Recent goals list */}
      {recentGoals.length > 0 && (
        <div className="border-t border-editorial">
          <div className="px-5 py-3 bg-secondary/50">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Derniers buts
            </span>
          </div>
          <div className="divide-y divide-editorial max-h-[200px] overflow-y-auto scrollbar-thin">
            {recentGoals.map((goal, idx) => (
              <div 
                key={goal.id}
                className="px-5 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent-live/10 flex items-center justify-center">
                  <span className="text-lg">{getGoalTypeIcon(goal.type)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary">vs {goal.opponent}</span>
                    {goal.isWinningGoal && (
                      <span className="px-1.5 py-0.5 bg-accent-mvp/10 text-accent-mvp text-[10px] font-bold rounded">
                        DÉCISIF
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-muted">
                    <span>{goal.minute}&apos;</span>
                    <span>•</span>
                    <span>{getGoalTypeLabel(goal.type)}</span>
                    <span>•</span>
                    <span>{goal.competition}</span>
                  </div>
                </div>
                <span className="text-xs text-muted">{goal.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
