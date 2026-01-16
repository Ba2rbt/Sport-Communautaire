'use client'

import { useState } from 'react'
import type { FanZone } from '@/types/fanzone'
import { FanZoneCard, FanZoneMap } from '@/components/fanzone'

interface FanZonesMapSectionProps {
  fanZoneLocations: FanZone[]
}

export default function FanZonesMapSection({ fanZoneLocations }: FanZonesMapSectionProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [searchCity, setSearchCity] = useState('')

  // Filter fan zones
  const filteredFanZones = fanZoneLocations.filter((fz) =>
    fz.city.toLowerCase().includes(searchCity.toLowerCase()) ||
    fz.name.toLowerCase().includes(searchCity.toLowerCase()) ||
    fz.teamName?.toLowerCase().includes(searchCity.toLowerCase())
  )

  // Get unique cities
  const cities = [...new Set(fanZoneLocations.map((fz) => fz.city))].sort()

  return (
    <div className="p-6">
      {/* Search & Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher par ville ou équipe..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 border border-editorial rounded-full bg-secondary/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-sport/50 focus:border-accent-sport transition-all text-sm"
          />
        </div>
      </div>

      {/* Quick City Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSearchCity('')}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            searchCity === '' 
              ? 'bg-accent-sport text-white' 
              : 'bg-secondary text-muted hover:bg-secondary/80'
          }`}
        >
          Toutes
        </button>
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSearchCity(city)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              searchCity === city 
                ? 'bg-accent-sport text-white' 
                : 'bg-secondary text-muted hover:bg-secondary/80'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* 2-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* List */}
        <div className="lg:w-2/5 space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted/20">
          {filteredFanZones.length > 0 ? (
            filteredFanZones.map((fanZone) => (
              <FanZoneCard
                key={fanZone.id}
                fanZone={fanZone}
                isSelected={selectedId === fanZone.id}
                onClick={() => setSelectedId(fanZone.id)}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <span className="text-4xl mb-2 block">🔍</span>
              <p className="text-muted text-sm">Aucun résultat pour &quot;{searchCity}&quot;</p>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="lg:w-3/5 h-[500px] rounded-lg overflow-hidden">
          <FanZoneMap
            fanZones={filteredFanZones}
            selectedId={selectedId}
            onMarkerClick={setSelectedId}
          />
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-muted mt-4 text-center">
        {filteredFanZones.length} lieu{filteredFanZones.length > 1 ? 'x' : ''} trouvé{filteredFanZones.length > 1 ? 's' : ''}
      </p>
    </div>
  )
}
