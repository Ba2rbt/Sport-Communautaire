'use client'

import { TableStats, RankCell, PlayerCell, StatCell } from './ui'

// Mock Data - Stats Table
const topScorers = [
  {
    rank: 1,
    name: 'Erling Haaland',
    team: 'Manchester City',
    avatar: '🎯',
    imageUrl:
      'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=150&auto=format&fit=crop', // Placeholder
    goals: 22,
    assists: 5,
    matches: 18,
  },
  {
    rank: 2,
    name: 'Kylian Mbappé',
    team: 'Real Madrid',
    avatar: '⚡',
    imageUrl:
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=150&auto=format&fit=crop', // Placeholder
    goals: 18,
    assists: 8,
    matches: 17,
  },
  {
    rank: 3,
    name: 'Harry Kane',
    team: 'Bayern Munich',
    avatar: '🦁',
    imageUrl:
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=150&auto=format&fit=crop', // Placeholder
    goals: 17,
    assists: 7,
    matches: 18,
  },
  {
    rank: 4,
    name: 'Viktor Gyökeres',
    team: 'Sporting CP',
    avatar: '🇸🇪',
    goals: 16,
    assists: 4,
    matches: 16,
  },
  {
    rank: 5,
    name: 'Mohamed Salah',
    team: 'Liverpool',
    avatar: '👑',
    goals: 15,
    assists: 10,
    matches: 18,
  },
]

export default function StatsSection() {
  return (
    <section className="relative bg-[#020617] overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-sport/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-live/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table */}
          <div className="lg:col-span-2">
            <TableStats
              title="Meilleurs buteurs"
              subtitle="Classement"
              data={topScorers}
              highlightFirst={3}
              className="h-full"
              columns={[
                {
                  key: 'rank',
                  header: '#',
                  width: '60px',
                  align: 'center',
                  render: (item) => <RankCell rank={item.rank} />,
                },
                {
                  key: 'name',
                  header: 'Joueur',
                  render: (item) => (
                    <PlayerCell
                      name={item.name}
                      team={item.team}
                      avatar={item.avatar}
                      imageUrl={item.imageUrl}
                    />
                  ),
                },
                {
                  key: 'goals',
                  header: 'Buts',
                  align: 'center',
                  render: (item) => (
                    <span className="font-bold text-accent-glow text-lg drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                      {item.goals}
                    </span>
                  ),
                },
                {
                  key: 'assists',
                  header: 'Passes',
                  align: 'center',
                  render: (item) => <StatCell value={item.assists} />,
                },
                {
                  key: 'matches',
                  header: 'MJ',
                  align: 'center',
                  render: (item) => (
                    <span className="text-slate-300 font-medium">{item.matches}</span>
                  ),
                },
              ]}
            />
          </div>

          {/* Quick Stats Card */}
          <div className="space-y-6">
            {/* Stats Clés */}
            <div className="glass rounded-2xl p-8 relative overflow-hidden group">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-live/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-8 bg-accent-live rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-accent-live block mb-1">
                      Cette semaine
                    </span>
                    <h3 className="font-sans text-2xl font-bold text-white tracking-tight">
                      Stats clés
                    </h3>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-5 border-b border-white/10 group/stat">
                    <span className="text-slate-400 font-medium group-hover/stat:text-slate-200 transition-colors">
                      Matches joués
                    </span>
                    <span className="font-bold text-2xl text-white">47</span>
                  </div>
                  <div className="flex items-center justify-between pb-5 border-b border-white/10 group/stat">
                    <span className="text-slate-400 font-medium group-hover/stat:text-slate-200 transition-colors">
                      Buts marqués
                    </span>
                    <span className="font-bold text-2xl text-white">128</span>
                  </div>
                  <div className="flex items-center justify-between pb-5 border-b border-white/10 group/stat">
                    <span className="text-slate-400 font-medium group-hover/stat:text-slate-200 transition-colors">
                      Cartons rouges
                    </span>
                    <span className="font-bold text-2xl text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]">
                      5
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 group/stat">
                    <span className="text-slate-400 font-medium group-hover/stat:text-slate-200 transition-colors">
                      Moyenne buts/match
                    </span>
                    <span className="font-bold text-3xl text-accent-glow drop-shadow-[0_0_12px_rgba(74,222,128,0.6)]">
                      2.72
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prochains gros matchs */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-white tracking-tight">Prochains chocs</h4>
                <span className="text-xs font-semibold bg-white/10 text-white px-2 py-1 rounded-md">
                  À venir
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { home: '🔴 FCB', away: 'RMA ⚪', time: '21:00', date: 'Ce soir' },
                  { home: '🩵 MCI', away: 'LIV 🔴', time: '18:30', date: 'Demain' },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3 text-sm font-bold text-white">
                        <span>{m.home}</span>
                        <span className="text-slate-500 text-xs font-medium">vs</span>
                        <span>{m.away}</span>
                      </div>
                      <span className="text-xs text-slate-400">{m.date}</span>
                    </div>
                    <div className="bg-accent-sport/20 text-accent-sport border border-accent-sport/30 px-3 py-1.5 rounded-lg text-sm font-bold shadow-[0_0_10px_rgba(59,130,246,0.2)] group-hover:bg-accent-sport group-hover:text-white transition-all">
                      {m.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
