'use client'

type MatchResult = 'W' | 'D' | 'L'
type PerformanceLevel = 'excellent' | 'good' | 'average' | 'poor'

interface MatchPerformance {
  id: string
  opponent: string
  opponentLogo?: string
  result: MatchResult
  score: string
  goals: number
  assists: number
  rating: number
  date: string
  competition: string
  isHome: boolean
}

interface PlayerFormWidgetProps {
  playerName: string
  playerPhoto?: string
  recentMatches: MatchPerformance[]
  currentStreak?: {
    type: 'goals' | 'assists' | 'wins' | 'clean_sheets'
    count: number
  }
}

export default function PlayerFormWidget({ 
  playerName, 
  playerPhoto,
  recentMatches, 
  currentStreak 
}: PlayerFormWidgetProps) {
  const totalGoals = recentMatches.reduce((sum, m) => sum + m.goals, 0)
  const totalAssists = recentMatches.reduce((sum, m) => sum + m.assists, 0)
  const avgRating = recentMatches.length > 0 
    ? (recentMatches.reduce((sum, m) => sum + m.rating, 0) / recentMatches.length).toFixed(1)
    : '0.0'
  
  const wins = recentMatches.filter(m => m.result === 'W').length
  const draws = recentMatches.filter(m => m.result === 'D').length
  const losses = recentMatches.filter(m => m.result === 'L').length

  const getPerformanceLevel = (rating: number): PerformanceLevel => {
    if (rating >= 8) return 'excellent'
    if (rating >= 7) return 'good'
    if (rating >= 6) return 'average'
    return 'poor'
  }

  const getResultColor = (result: MatchResult) => {
    switch (result) {
      case 'W': return 'bg-accent-live text-white'
      case 'D': return 'bg-yellow-400 text-primary'
      case 'L': return 'bg-red-500 text-white'
    }
  }

  const getPerformanceColor = (level: PerformanceLevel) => {
    switch (level) {
      case 'excellent': return 'from-accent-live to-accent-live/70'
      case 'good': return 'from-accent-sport to-accent-sport/70'
      case 'average': return 'from-yellow-400 to-yellow-400/70'
      case 'poor': return 'from-red-500 to-red-500/70'
    }
  }

  return (
    <div className="bg-white border border-editorial rounded-2xl overflow-hidden hover-lift animate-fade-in">
      {/* Header */}
      <div className="px-5 py-4 border-b border-editorial bg-gradient-to-r from-secondary to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
              {playerPhoto ? (
                <img src={playerPhoto} alt={playerName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl">⚡</span>
              )}
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-primary">Forme récente</h3>
              <p className="text-xs text-muted">{playerName} • 5 derniers matchs</p>
            </div>
          </div>
          
          {/* Current streak badge */}
          {currentStreak && currentStreak.count > 0 && (
            <div className="px-3 py-1.5 bg-accent-mvp/10 rounded-full">
              <span className="text-xs font-bold text-accent-mvp">
                🔥 {currentStreak.count} {currentStreak.type === 'goals' ? 'matchs consécutifs avec but' : 
                  currentStreak.type === 'assists' ? 'matchs avec passe D.' :
                  currentStreak.type === 'wins' ? 'victoires' : 'clean sheets'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Form indicators */}
      <div className="px-5 py-4 border-b border-editorial">
        <div className="flex items-center justify-center gap-2 mb-4">
          {recentMatches.slice(0, 5).map((match, idx) => (
            <div 
              key={match.id}
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                ${getResultColor(match.result)}
                animate-fade-in
              `}
              style={{ animationDelay: `${idx * 100}ms` }}
              title={`${match.isHome ? 'vs' : '@'} ${match.opponent} (${match.score})`}
            >
              {match.result}
            </div>
          ))}
        </div>
        
        {/* Win/Draw/Loss summary */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-accent-live" />
            <span className="text-muted">{wins} V</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-yellow-400" />
            <span className="text-muted">{draws} N</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-500" />
            <span className="text-muted">{losses} D</span>
          </span>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 divide-x divide-editorial border-b border-editorial">
        <div className="p-4 text-center">
          <p className="font-editorial text-2xl font-bold text-accent-live">{totalGoals}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider">Buts</p>
        </div>
        <div className="p-4 text-center">
          <p className="font-editorial text-2xl font-bold text-accent-sport">{totalAssists}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider">Passes D.</p>
        </div>
        <div className="p-4 text-center">
          <p className="font-editorial text-2xl font-bold text-accent-mvp">{avgRating}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider">Note moy.</p>
        </div>
      </div>

      {/* Match list */}
      <div className="divide-y divide-editorial max-h-[300px] overflow-y-auto scrollbar-thin">
        {recentMatches.map((match, idx) => {
          const performance = getPerformanceLevel(match.rating)
          
          return (
            <div 
              key={match.id}
              className="px-5 py-3 hover:bg-secondary/50 transition-colors animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Performance bar */}
                <div className="w-1 h-12 rounded-full overflow-hidden bg-secondary">
                  <div 
                    className={`w-full bg-gradient-to-b ${getPerformanceColor(performance)} transition-all duration-300`}
                    style={{ height: `${match.rating * 10}%` }}
                  />
                </div>

                {/* Match info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`
                      w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center
                      ${getResultColor(match.result)}
                    `}>
                      {match.result}
                    </span>
                    <span className="text-sm font-medium text-primary truncate">
                      {match.isHome ? 'vs' : '@'} {match.opponent}
                    </span>
                    <span className="text-sm font-bold text-primary">{match.score}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted">{match.date}</span>
                    <span className="text-xs text-muted">• {match.competition}</span>
                  </div>
                </div>

                {/* Performance */}
                <div className="flex items-center gap-3">
                  {match.goals > 0 && (
                    <span className="flex items-center gap-1 text-xs font-medium text-accent-live">
                      ⚽ {match.goals}
                    </span>
                  )}
                  {match.assists > 0 && (
                    <span className="flex items-center gap-1 text-xs font-medium text-accent-sport">
                      👟 {match.assists}
                    </span>
                  )}
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                    bg-gradient-to-br ${getPerformanceColor(performance)} text-white
                  `}>
                    {match.rating.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
