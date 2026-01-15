'use client'

import { useState } from 'react'
import { TagLigue } from './ui'

interface FiltersState {
  status: string[]
  leagues: string[]
}

interface MatchesFiltersProps {
  onFiltersChange?: (filters: FiltersState) => void
  className?: string
}

const statusOptions = [
  { id: 'live', label: 'En direct', count: 3 },
  { id: 'upcoming', label: 'À venir', count: 24 },
  { id: 'finished', label: 'Terminés', count: 156 },
]

const leagueOptions = [
  { id: 'ligue-1', label: 'Ligue 1' },
  { id: 'premier-league', label: 'Premier League' },
  { id: 'la-liga', label: 'La Liga' },
  { id: 'serie-a', label: 'Serie A' },
  { id: 'bundesliga', label: 'Bundesliga' },
  { id: 'champions-league', label: 'Champions League' },
]

export default function MatchesFilters({ onFiltersChange, className = '' }: MatchesFiltersProps) {
  const [filters, setFilters] = useState<FiltersState>({
    status: [],
    leagues: [],
  })
  const [expandedSections, setExpandedSections] = useState(['status', 'leagues'])

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    )
  }

  const handleFilterChange = (category: keyof FiltersState, value: string) => {
    setFilters(prev => {
      const current = prev[category]
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      
      const newFilters = { ...prev, [category]: updated }
      onFiltersChange?.(newFilters)
      return newFilters
    })
  }

  const clearFilters = () => {
    const empty = { status: [], leagues: [] }
    setFilters(empty)
    onFiltersChange?.(empty)
  }

  const hasActiveFilters = filters.status.length > 0 || filters.leagues.length > 0

  return (
    <aside className={`bg-white border border-editorial rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-editorial bg-secondary/30">
        <div className="flex items-center justify-between">
          <h2 className="font-editorial text-lg font-bold text-primary">Filtres</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-accent-sport hover:text-accent-sport/80 font-medium transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Status Section */}
      <div className="border-b border-editorial">
        <button
          onClick={() => toggleSection('status')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-secondary/20 transition-colors"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Statut
          </span>
          <svg
            className={`w-5 h-5 text-muted transition-transform ${expandedSections.includes('status') ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSections.includes('status') && (
          <div className="px-5 pb-4 space-y-2">
            {statusOptions.map((option) => {
              const isSelected = filters.status.includes(option.id)
              return (
                <label
                  key={option.id}
                  className="flex items-center gap-3 cursor-pointer group py-1"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleFilterChange('status', option.id)}
                      className="sr-only peer"
                    />
                    <div className={`
                      w-5 h-5 border-2 rounded transition-all
                      ${isSelected 
                        ? 'border-accent-sport bg-accent-sport' 
                        : 'border-editorial group-hover:border-accent-sport'
                      }
                    `}>
                      {isSelected && (
                        <svg className="w-full h-full text-white p-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className={`text-sm transition-colors flex-1 ${isSelected ? 'text-primary font-medium' : 'text-muted group-hover:text-primary'}`}>
                    {option.label}
                  </span>
                  {option.id === 'live' && (
                    <span className="w-2 h-2 bg-accent-live rounded-full animate-pulse-live" />
                  )}
                  <span className="text-xs text-muted">({option.count})</span>
                </label>
              )
            })}
          </div>
        )}
      </div>

      {/* Leagues Section */}
      <div>
        <button
          onClick={() => toggleSection('leagues')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-secondary/20 transition-colors"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Compétitions
          </span>
          <svg
            className={`w-5 h-5 text-muted transition-transform ${expandedSections.includes('leagues') ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSections.includes('leagues') && (
          <div className="px-5 pb-4 flex flex-wrap gap-2">
            {leagueOptions.map((option) => {
              const isSelected = filters.leagues.includes(option.id)
              return (
                <button
                  key={option.id}
                  onClick={() => handleFilterChange('leagues', option.id)}
                  type="button"
                >
                  <TagLigue 
                    league={option.label} 
                    isActive={isSelected}
                    className="text-xs"
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="px-5 py-4 border-t border-editorial bg-secondary/20">
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
          Accès rapide
        </h3>
        <div className="space-y-2">
          <a href="#" className="flex items-center gap-2 text-sm text-primary hover:text-accent-sport transition-colors">
            <svg className="w-4 h-4 text-accent-live" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Matches en direct
          </a>
          <a href="#" className="flex items-center gap-2 text-sm text-primary hover:text-accent-sport transition-colors">
            <svg className="w-4 h-4 text-accent-mvp" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Grands matchs
          </a>
          <a href="#" className="flex items-center gap-2 text-sm text-primary hover:text-accent-sport transition-colors">
            <svg className="w-4 h-4 text-accent-sport" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Cette semaine
          </a>
        </div>
      </div>
    </aside>
  )
}
