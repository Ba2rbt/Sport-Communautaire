'use client'

import { type ReactNode } from 'react'

interface Column<T> {
  key: keyof T | string
  header: string
  align?: 'left' | 'center' | 'right'
  render?: (item: T, index: number) => ReactNode
  width?: string
}

interface TableStatsProps<T> {
  data: T[]
  columns: Column<T>[]
  title?: string
  subtitle?: string
  highlightFirst?: number
  onRowClick?: (item: T, index: number) => void
  className?: string
}

export function TableStats<T extends Record<string, unknown>>({
  data,
  columns,
  title,
  subtitle,
  highlightFirst = 0,
  onRowClick,
  className = '',
}: TableStatsProps<T>) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div
      className={`glass bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl ${className}`}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="px-8 py-6 border-b border-white/10 bg-white/[0.02] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {subtitle && (
            <span className="text-xs font-bold tracking-widest uppercase text-accent-sport block mb-2">
              {subtitle}
            </span>
          )}
          {title && (
            <h3 className="font-sans text-2xl font-bold text-white tracking-tight">{title}</h3>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`
                    px-6 py-4
                    text-xs font-bold tracking-widest uppercase text-slate-400
                    ${alignClasses[col.align || 'left']}
                  `}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((item, index) => {
              const isHighlighted = index < highlightFirst

              return (
                <tr
                  key={index}
                  onClick={() => onRowClick?.(item, index)}
                  className={`
                    transition-all duration-300 group
                    ${onRowClick ? 'cursor-pointer hover:bg-white/[0.04]' : 'hover:bg-white/[0.02]'}
                    ${isHighlighted ? 'bg-accent-mvp/[0.02]' : ''}
                  `}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`
                        px-6 py-5
                        text-sm text-slate-200
                        ${alignClasses[col.align || 'left']}
                        ${isHighlighted && index === 0 ? 'font-bold text-white' : ''}
                      `}
                    >
                      {col.render
                        ? col.render(item, index)
                        : String(item[col.key as keyof T] ?? '')}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {data.length === 0 && (
        <div className="px-8 py-16 text-center">
          <p className="text-slate-400 font-medium">Aucune donnée disponible</p>
        </div>
      )}
    </div>
  )
}

// Composant pour afficher le rang avec style
export function RankCell({ rank }: { rank: number }) {
  const isTop3 = rank <= 3

  return (
    <span
      className={`
        inline-flex items-center justify-center
        w-8 h-8 rounded-full
        text-sm font-bold shadow-lg
        ${
          rank === 1
            ? 'bg-gradient-to-br from-accent-mvp to-orange-600 text-white shadow-accent-mvp/30'
            : rank === 2
              ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-slate-900 shadow-slate-400/20'
              : rank === 3
                ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-amber-700/20'
                : isTop3
                  ? 'bg-white/10 text-white'
                  : 'bg-white/5 text-slate-400 border border-white/10'
        }
      `}
    >
      {rank}
    </span>
  )
}

// Composant pour afficher un joueur avec avatar
export function PlayerCell({
  name,
  team,
  avatar,
}: {
  name: string
  team: string
  avatar?: string
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-xl flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
        {avatar || name.charAt(0)}
      </div>
      <div>
        <p className="font-bold text-white text-base group-hover:text-accent-glow transition-colors">
          {name}
        </p>
        <p className="text-xs font-medium text-slate-400 mt-0.5">{team}</p>
      </div>
    </div>
  )
}

// Composant pour afficher une stat avec évolution
export function StatCell({ value, change }: { value: number | string; change?: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-bold text-white text-base">{value}</span>
      {change !== undefined && (
        <span
          className={`
            text-xs font-bold px-1.5 py-0.5 rounded-md
            ${change > 0 ? 'bg-accent-live/20 text-accent-live' : change < 0 ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-slate-400'}
          `}
        >
          {change > 0 ? '+' : ''}
          {change}
        </span>
      )}
    </div>
  )
}

export default TableStats
