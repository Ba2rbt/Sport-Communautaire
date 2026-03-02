'use client'

import TeamLogo from '@/components/ui/TeamLogo'

interface TeamStats {
  name: string
  logo: string
  logoUrl?: string
  possession: number
  shots: number
  shotsOnTarget: number
  corners: number
  fouls: number
  yellowCards: number
  redCards: number
  offsides: number
  passes: number
  passAccuracy: number
}

interface MatchStatsProps {
  homeTeam: TeamStats
  awayTeam: TeamStats
}

interface StatRowProps {
  label: string
  homeValue: number | string
  awayValue: number | string
  isPercentage?: boolean
  highlight?: boolean
}

function StatRow({ label, homeValue, awayValue, isPercentage, highlight }: StatRowProps) {
  const homeNum = typeof homeValue === 'number' ? homeValue : parseFloat(homeValue) || 0
  const awayNum = typeof awayValue === 'number' ? awayValue : parseFloat(awayValue) || 0
  const total = homeNum + awayNum
  const homePercent = total > 0 ? (homeNum / total) * 100 : 50
  const awayPercent = total > 0 ? (awayNum / total) * 100 : 50

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-2">
        <span
          className={`font-semibold ${highlight && homeNum > awayNum ? 'text-accent-live' : 'text-primary'}`}
        >
          {homeValue}
          {isPercentage ? '%' : ''}
        </span>
        <span className="text-sm text-muted uppercase tracking-wider">{label}</span>
        <span
          className={`font-semibold ${highlight && awayNum > homeNum ? 'text-accent-live' : 'text-primary'}`}
        >
          {awayValue}
          {isPercentage ? '%' : ''}
        </span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-secondary">
        <div
          className="bg-accent-sport transition-all duration-500"
          style={{ width: `${homePercent}%` }}
        />
        <div
          className="bg-accent-mvp transition-all duration-500"
          style={{ width: `${awayPercent}%` }}
        />
      </div>
    </div>
  )
}

export default function MatchStats({ homeTeam, awayTeam }: MatchStatsProps) {
  return (
    <section className="bg-white border border-editorial rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-editorial bg-secondary/30">
        <h2 className="font-editorial text-xl font-bold text-primary text-center">
          Statistiques du match
        </h2>
      </div>

      {/* Team Headers */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-editorial">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 bg-accent-sport/10 rounded-full flex items-center justify-center">
            <TeamLogo
              logoUrl={homeTeam.logoUrl}
              logo={homeTeam.logo}
              name={homeTeam.name}
              size="sm"
            />
          </span>
          <span className="font-semibold text-primary">{homeTeam.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-primary">{awayTeam.name}</span>
          <span className="w-10 h-10 bg-accent-mvp/10 rounded-full flex items-center justify-center">
            <TeamLogo
              logoUrl={awayTeam.logoUrl}
              logo={awayTeam.logo}
              name={awayTeam.name}
              size="sm"
            />
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 divide-y divide-editorial">
        <StatRow
          label="Possession"
          homeValue={homeTeam.possession}
          awayValue={awayTeam.possession}
          isPercentage
          highlight
        />
        <StatRow label="Tirs" homeValue={homeTeam.shots} awayValue={awayTeam.shots} highlight />
        <StatRow
          label="Tirs cadrés"
          homeValue={homeTeam.shotsOnTarget}
          awayValue={awayTeam.shotsOnTarget}
          highlight
        />
        <StatRow label="Corners" homeValue={homeTeam.corners} awayValue={awayTeam.corners} />
        <StatRow label="Fautes" homeValue={homeTeam.fouls} awayValue={awayTeam.fouls} />
        <StatRow label="Hors-jeu" homeValue={homeTeam.offsides} awayValue={awayTeam.offsides} />
        <StatRow label="Passes" homeValue={homeTeam.passes} awayValue={awayTeam.passes} />
        <StatRow
          label="Précision passes"
          homeValue={homeTeam.passAccuracy}
          awayValue={awayTeam.passAccuracy}
          isPercentage
        />
      </div>

      {/* Cards Summary */}
      <div className="px-6 py-4 border-t border-editorial bg-secondary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-4 h-5 bg-yellow-400 rounded-sm" />
              <span className="font-semibold">{homeTeam.yellowCards}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-5 bg-red-500 rounded-sm" />
              <span className="font-semibold">{homeTeam.redCards}</span>
            </div>
          </div>
          <span className="text-sm text-muted uppercase tracking-wider">Cartons</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="font-semibold">{awayTeam.yellowCards}</span>
              <div className="w-4 h-5 bg-yellow-400 rounded-sm" />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{awayTeam.redCards}</span>
              <div className="w-4 h-5 bg-red-500 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
