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
    <div className={`bg-white border border-editorial rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-editorial bg-secondary/30">
          {subtitle && (
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-sport block mb-1">
              {subtitle}
            </span>
          )}
          {title && (
            <h3 className="font-editorial text-xl font-bold text-primary">{title}</h3>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-editorial bg-secondary/20">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`
                    px-4 py-3
                    text-xs font-semibold tracking-wider uppercase text-muted
                    ${alignClasses[col.align || 'left']}
                  `}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-editorial">
            {data.map((item, index) => {
              const isHighlighted = index < highlightFirst

              return (
                <tr
                  key={index}
                  onClick={() => onRowClick?.(item, index)}
                  className={`
                    transition-colors
                    ${onRowClick ? 'cursor-pointer hover:bg-accent-sport/5' : ''}
                    ${isHighlighted ? 'bg-accent-mvp/5' : ''}
                  `}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`
                        px-4 py-4
                        text-sm text-primary
                        ${alignClasses[col.align || 'left']}
                        ${isHighlighted && index === 0 ? 'font-semibold' : ''}
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
        <div className="px-6 py-12 text-center">
          <p className="text-muted">Aucune donnée disponible</p>
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
        w-7 h-7 rounded-full
        text-sm font-bold
        ${rank === 1 
          ? 'bg-accent-mvp text-white' 
          : rank === 2 
          ? 'bg-gray-400 text-white' 
          : rank === 3 
          ? 'bg-amber-600 text-white' 
          : isTop3 
          ? 'bg-primary/10 text-primary' 
          : 'text-muted'
        }
      `}
    >
      {rank}
    </span>
  )
}

// Composant pour afficher un joueur avec avatar
export function PlayerCell({ name, team, avatar }: { name: string; team: string; avatar?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-lg flex-shrink-0">
        {avatar || name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-primary">{name}</p>
        <p className="text-xs text-muted">{team}</p>
      </div>
    </div>
  )
}

// Composant pour afficher une stat avec évolution
export function StatCell({ value, change }: { value: number | string; change?: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold">{value}</span>
      {change !== undefined && (
        <span
          className={`
            text-xs font-medium
            ${change > 0 ? 'text-accent-live' : change < 0 ? 'text-red-500' : 'text-muted'}
          `}
        >
          {change > 0 ? '+' : ''}{change}
        </span>
      )}
    </div>
  )
}

export default TableStats
