'use client'

import { useState } from 'react'
import { TagLigue } from './Tag'

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterSection {
  title: string
  options: FilterOption[]
  type: 'checkbox' | 'radio' | 'tag'
}

interface SidebarFiltersProps {
  sections: FilterSection[]
  onFilterChange?: (sectionTitle: string, selectedIds: string[]) => void
  className?: string
}

export function SidebarFilters({ sections, onFilterChange, className = '' }: SidebarFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [expandedSections, setExpandedSections] = useState<string[]>(sections.map(s => s.title))

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    )
  }

  const handleFilterChange = (sectionTitle: string, optionId: string, type: 'checkbox' | 'radio' | 'tag') => {
    setSelectedFilters(prev => {
      const currentSelected = prev[sectionTitle] || []
      let newSelected: string[]

      if (type === 'radio') {
        newSelected = [optionId]
      } else {
        newSelected = currentSelected.includes(optionId)
          ? currentSelected.filter(id => id !== optionId)
          : [...currentSelected, optionId]
      }

      const updated = { ...prev, [sectionTitle]: newSelected }
      onFilterChange?.(sectionTitle, newSelected)
      return updated
    })
  }

  return (
    <aside className={`bg-white border border-editorial rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-editorial bg-secondary/30">
        <h2 className="font-editorial text-lg font-bold text-primary">Filtres</h2>
      </div>

      {/* Sections */}
      <div className="divide-y divide-editorial">
        {sections.map((section) => {
          const isExpanded = expandedSections.includes(section.title)
          const selected = selectedFilters[section.title] || []

          return (
            <div key={section.title} className="py-4 px-5">
              {/* Section Header */}
              <button
                type="button"
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between mb-3"
              >
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  {section.title}
                </span>
                <svg
                  className={`w-5 h-5 text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className={section.type === 'tag' ? 'flex flex-wrap gap-2' : 'space-y-2'}>
                  {section.options.map((option) => {
                    const isSelected = selected.includes(option.id)

                    if (section.type === 'tag') {
                      return (
                        <TagLigue
                          key={option.id}
                          league={option.label}
                          isActive={isSelected}
                          className="cursor-pointer"
                        />
                      )
                    }

                    return (
                      <label
                        key={option.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative">
                          <input
                            type={section.type}
                            name={section.title}
                            checked={isSelected}
                            onChange={() => handleFilterChange(section.title, option.id, section.type)}
                            className="sr-only peer"
                          />
                          <div className={`
                            w-5 h-5 border-2 transition-all
                            ${section.type === 'radio' ? 'rounded-full' : 'rounded'}
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
                        <span className="text-sm text-primary group-hover:text-accent-sport transition-colors">
                          {option.label}
                        </span>
                        {option.count !== undefined && (
                          <span className="ml-auto text-xs text-muted">({option.count})</span>
                        )}
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Clear Filters */}
      {Object.values(selectedFilters).some(arr => arr.length > 0) && (
        <div className="px-5 py-4 border-t border-editorial">
          <button
            type="button"
            onClick={() => setSelectedFilters({})}
            className="w-full py-2 text-sm font-medium text-accent-sport hover:text-accent-sport/80 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </aside>
  )
}

export default SidebarFilters
