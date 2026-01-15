import type { CompetitionKPI } from '@/types/competition'

interface KPICardsProps {
  kpi: CompetitionKPI
}

interface KPICardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  subValue?: string
  color?: 'sport' | 'live' | 'mvp' | 'default'
}

function KPICard({ icon, label, value, subValue, color = 'default' }: KPICardProps) {
  const colorStyles = {
    sport: 'bg-accent-sport/10 text-accent-sport',
    live: 'bg-accent-live/10 text-accent-live',
    mvp: 'bg-accent-mvp/10 text-accent-mvp',
    default: 'bg-secondary text-primary',
  }

  const iconBgStyles = {
    sport: 'bg-accent-sport',
    live: 'bg-accent-live',
    mvp: 'bg-accent-mvp',
    default: 'bg-primary',
  }

  return (
    <div className="bg-white border border-editorial rounded-lg p-6 hover-lift">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBgStyles[color]} flex items-center justify-center text-white`}>
          {icon}
        </div>
        {subValue && (
          <span className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${colorStyles[color]}
          `}>
            {subValue}
          </span>
        )}
      </div>
      <p className="text-sm text-muted font-medium mb-1">{label}</p>
      <p className="font-editorial text-3xl font-bold text-primary">{value}</p>
    </div>
  )
}

export default function KPICards({ kpi }: KPICardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Goals */}
      <KPICard
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
        label="Buts totaux"
        value={kpi.totalGoals}
        color="live"
      />

      {/* Average Goals */}
      <KPICard
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
        label="Buts par match"
        value={kpi.avgGoalsPerMatch.toFixed(2)}
        subValue="Moyenne"
        color="sport"
      />

      {/* Matches Played */}
      <KPICard
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
        label="Matchs joués"
        value={`${kpi.matchesPlayed}/${kpi.totalMatches}`}
        subValue={`${Math.round((kpi.matchesPlayed / kpi.totalMatches) * 100)}%`}
        color="default"
      />

      {/* Top Scorer */}
      {kpi.topScorer ? (
        <KPICard
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          }
          label={`Meilleur buteur • ${kpi.topScorer.team}`}
          value={kpi.topScorer.name}
          subValue={`${kpi.topScorer.goals} buts`}
          color="mvp"
        />
      ) : (
        <KPICard
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          }
          label="Meilleur buteur"
          value="—"
          color="mvp"
        />
      )}
    </div>
  )
}
