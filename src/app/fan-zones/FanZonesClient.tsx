'use client'

import { useState, useRef, useEffect } from 'react'
import type { FanZone } from '@/types/fanzone'
import { FanZoneCard, FanZoneMap } from '@/components/fanzone'

interface FanZonesClientProps {
  fanZones: FanZone[]
}

export default function FanZonesClient({ fanZones }: FanZonesClientProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [searchCity, setSearchCity] = useState('')
  const [showMap, setShowMap] = useState(false)
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  // Filter fan zones by city
  const filteredFanZones = fanZones.filter((fz) =>
    fz.city.toLowerCase().includes(searchCity.toLowerCase()) ||
    fz.name.toLowerCase().includes(searchCity.toLowerCase()) ||
    fz.teamName?.toLowerCase().includes(searchCity.toLowerCase())
  )

  // Scroll to card when marker is clicked
  const handleMarkerClick = (id: string) => {
    setSelectedId(id)
    const cardElement = cardRefs.current.get(id)
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Handle card click
  const handleCardClick = (id: string) => {
    setSelectedId(id)
  }

  // Get unique cities for quick filters
  const cities = [...new Set(fanZones.map((fz) => fz.city))].sort()

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-editorial text-4xl md:text-5xl font-bold text-primary mb-4">
          Fan Zones
        </h1>
        <p className="text-muted text-lg max-w-2xl">
          Trouvez les meilleurs endroits pour regarder les matchs près de chez vous.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher par ville, nom ou équipe..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-editorial rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-accent-sport/50 focus:border-accent-sport transition-all"
          />
        </div>

        {/* Mobile: Toggle Map/List */}
        <button
          onClick={() => setShowMap(!showMap)}
          className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-accent-sport text-white font-semibold rounded-full"
        >
          {showMap ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Voir la liste
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Voir la carte
            </>
          )}
        </button>
      </div>

      {/* Quick City Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSearchCity('')}
          className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
            searchCity === '' 
              ? 'bg-accent-sport text-white' 
              : 'bg-secondary text-muted hover:bg-secondary/80'
          }`}
        >
          Toutes
        </button>
        {cities.slice(0, 6).map((city) => (
          <button
            key={city}
            onClick={() => setSearchCity(city)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
              searchCity === city 
                ? 'bg-accent-sport text-white' 
                : 'bg-secondary text-muted hover:bg-secondary/80'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted mb-4">
        {filteredFanZones.length} fan zone{filteredFanZones.length > 1 ? 's' : ''} trouvée{filteredFanZones.length > 1 ? 's' : ''}
      </p>

      {/* Main Content: 2-column layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* List (left on desktop, full on mobile when not showing map) */}
        <div className={`lg:w-1/2 xl:w-2/5 ${showMap ? 'hidden lg:block' : ''}`}>
          <div className="space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted/20">
            {filteredFanZones.length > 0 ? (
              filteredFanZones.map((fanZone) => (
                <div
                  key={fanZone.id}
                  ref={(el) => {
                    if (el) cardRefs.current.set(fanZone.id, el)
                  }}
                >
                  <FanZoneCard
                    fanZone={fanZone}
                    isSelected={selectedId === fanZone.id}
                    onClick={() => handleCardClick(fanZone.id)}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <span className="text-5xl mb-4 block">🔍</span>
                <p className="text-muted">Aucune fan zone trouvée pour "{searchCity}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Map (right on desktop, full on mobile when showing map) */}
        <div className={`lg:w-1/2 xl:w-3/5 ${!showMap ? 'hidden lg:block' : ''}`}>
          <div className="sticky top-4 h-[calc(100vh-16rem)] min-h-[400px]">
            <FanZoneMap
              fanZones={filteredFanZones}
              selectedId={selectedId}
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
