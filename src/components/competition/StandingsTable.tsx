'use client'

import Link from 'next/link'
import type { Standing, FormResult } from '@/types/competition'
import { getTeamSlug } from '@/lib/utils'

interface StandingsTableProps {
  standings: Standing[]
  highlightPositions?: {
    champions: number[]
    championsLeague: number[]
    europaLeague: number[]
    relegation: number[]
  }
}

function FormBadge({ result }: { result: FormResult }) {
  const styles = {
    W: 'bg-accent-live text-white',
    D: 'bg-muted/30 text-muted',
    L: 'bg-red-500 text-white',
  }

  const labels = {
    W: 'V',
    D: 'N',
    L: 'D',
  }

  return (
    <span className={`
      w-6 h-6 flex items-center justify-center
      text-xs font-bold rounded
      ${styles[result]}
    `}>
      {labels[result]}
    </span>
  )
}

function PositionBadge({ position, highlights }: { 
  position: number
  highlights?: StandingsTableProps['highlightPositions']
}) {
  let bgColor = 'bg-secondary'
  
  if (highlights) {
    if (highlights.champions.includes(position)) {
      bgColor = 'bg-yellow-400 text-primary'
    } else if (highlights.championsLeague.includes(position)) {
      bgColor = 'bg-accent-sport text-white'
    } else if (highlights.europaLeague.includes(position)) {
      bgColor = 'bg-accent-mvp text-white'
    } else if (highlights.relegation.includes(position)) {
      bgColor = 'bg-red-500 text-white'
    }
  }

  return (
    <span className={`
      w-8 h-8 flex items-center justify-center
      font-bold text-sm rounded-lg
      ${bgColor}
    `}>
      {position}
    </span>
  )
}

export default function StandingsTable({ standings, highlightPositions }: StandingsTableProps) {
  return (
    <div className="bg-white border border-editorial rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-editorial bg-secondary/30">
        <h2 className="font-editorial text-xl font-bold text-primary">
          Classement
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-editorial bg-secondary/20">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider w-12">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                Équipe
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider w-12">
                MJ
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider w-12 hidden sm:table-cell">
                V
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider w-12 hidden sm:table-cell">
                N
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider w-12 hidden sm:table-cell">
                D
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider w-16 hidden md:table-cell">
                BP
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider w-16 hidden md:table-cell">
                BC
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider w-16 hidden lg:table-cell">
                DB
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider w-12">
                Pts
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider hidden sm:table-cell">
                Forme
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-editorial">
            {standings.map((row) => {
              const teamSlug = getTeamSlug(row.team.name)
              
              return (
                <tr 
                  key={row.id} 
                  className="hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <PositionBadge 
                      position={row.position} 
                      highlights={highlightPositions}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Link 
                      href={`/team/${teamSlug}`}
                      className="flex items-center gap-3 group/team"
                    >
                      <span className="w-8 h-8 flex items-center justify-center text-xl group-hover/team:scale-110 transition-transform">
                        {row.team.logo}
                      </span>
                      <div>
                        <span className="font-semibold text-primary block group-hover/team:text-accent-sport transition-colors">
                          {row.team.name}
                        </span>
                        <span className="text-xs text-muted sm:hidden">
                          {row.won}V {row.drawn}N {row.lost}D
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center text-primary font-medium">
                    {row.played}
                  </td>
                  <td className="px-4 py-3 text-center text-primary hidden sm:table-cell">
                    {row.won}
                  </td>
                  <td className="px-4 py-3 text-center text-primary hidden sm:table-cell">
                    {row.drawn}
                  </td>
                  <td className="px-4 py-3 text-center text-primary hidden sm:table-cell">
                    {row.lost}
                  </td>
                  <td className="px-4 py-3 text-center text-primary hidden md:table-cell">
                    {row.goalsFor}
                  </td>
                  <td className="px-4 py-3 text-center text-primary hidden md:table-cell">
                    {row.goalsAgainst}
                  </td>
                  <td className="px-4 py-3 text-center font-semibold hidden lg:table-cell">
                    <span className={row.goalDifference > 0 ? 'text-accent-live' : row.goalDifference < 0 ? 'text-red-500' : 'text-muted'}>
                      {row.goalDifference > 0 ? '+' : ''}{row.goalDifference}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-lg text-primary">
                      {row.points}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      {row.form.slice(0, 5).map((result, i) => (
                        <FormBadge key={i} result={result} />
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      {highlightPositions && (
        <div className="px-6 py-4 border-t border-editorial bg-secondary/20">
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-yellow-400" />
              <span className="text-muted">Champion</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-accent-sport" />
              <span className="text-muted">Ligue des Champions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-accent-mvp" />
              <span className="text-muted">Europa League</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-red-500" />
              <span className="text-muted">Relégation</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
