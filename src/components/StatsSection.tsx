'use client'

import { TableStats, RankCell, PlayerCell, StatCell } from './ui'

// Mock Data - Stats Table
const topScorers = [
  { rank: 1, name: 'Erling Haaland', team: 'Manchester City', avatar: '🎯', goals: 22, assists: 5, matches: 18 },
  { rank: 2, name: 'Kylian Mbappé', team: 'Real Madrid', avatar: '⚡', goals: 18, assists: 8, matches: 17 },
  { rank: 3, name: 'Harry Kane', team: 'Bayern Munich', avatar: '🦁', goals: 17, assists: 7, matches: 18 },
  { rank: 4, name: 'Viktor Gyökeres', team: 'Sporting CP', avatar: '🇸🇪', goals: 16, assists: 4, matches: 16 },
  { rank: 5, name: 'Mohamed Salah', team: 'Liverpool', avatar: '👑', goals: 15, assists: 10, matches: 18 },
]

export default function StatsSection() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table */}
          <div className="lg:col-span-2">
            <TableStats
              title="Meilleurs buteurs"
              subtitle="Classement"
              data={topScorers}
              highlightFirst={3}
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
                    <PlayerCell name={item.name} team={item.team} avatar={item.avatar} />
                  ),
                },
                {
                  key: 'goals',
                  header: 'Buts',
                  align: 'center',
                  render: (item) => (
                    <span className="font-bold text-accent-live">{item.goals}</span>
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
                },
              ]}
            />
          </div>

          {/* Quick Stats Card */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary to-primary/90 text-white rounded-lg p-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-accent-live mb-2 block">
                Cette semaine
              </span>
              <h3 className="font-editorial text-2xl font-bold mb-6">Stats clés</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-white/70">Matches joués</span>
                  <span className="font-bold text-xl">47</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-white/70">Buts marqués</span>
                  <span className="font-bold text-xl">128</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-white/70">Cartons rouges</span>
                  <span className="font-bold text-xl">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Moyenne buts/match</span>
                  <span className="font-bold text-xl text-accent-live">2.72</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-editorial rounded-lg p-6">
              <h4 className="font-semibold text-primary mb-4">Prochains gros matchs</h4>
              <div className="space-y-3">
                {[
                  { home: '🔴 FCB', away: 'RMA ⚪', time: '21:00' },
                  { home: '🩵 MCI', away: 'LIV 🔴', time: '18:30' },
                ].map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-sm p-3 bg-secondary/50 rounded-lg">
                    <span className="font-medium">{m.home}</span>
                    <span className="text-muted">vs</span>
                    <span className="font-medium">{m.away}</span>
                    <span className="text-accent-sport font-semibold">{m.time}</span>
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
