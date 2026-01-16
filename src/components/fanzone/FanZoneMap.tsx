'use client'

import { useEffect, useState, useRef } from 'react'
import type { FanZone } from '@/types/fanzone'
import { amenityLabels } from '@/types/fanzone'

interface FanZoneMapProps {
  fanZones: FanZone[]
  selectedId?: string
  onMarkerClick?: (id: string) => void
  center?: [number, number]
  zoom?: number
}

export default function FanZoneMap({ 
  fanZones, 
  selectedId, 
  onMarkerClick, 
  center = [46.603354, 1.888334], 
  zoom = 6 
}: FanZoneMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<Map<string, any>>(new Map())
  const [isMapReady, setIsMapReady] = useState(false)
  const leafletRef = useRef<typeof import('leaflet') | null>(null)

  // Initialize map on client side only
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return
    if (mapInstanceRef.current) return // Already initialized

    // Dynamic import of Leaflet
    const initMap = async () => {
      try {
        // Import Leaflet dynamically
        const L = await import('leaflet')
        leafletRef.current = L.default

        // Import CSS
        await import('leaflet/dist/leaflet.css')

        // Fix default icon paths
        delete (L.default.Icon.Default.prototype as any)._getIconUrl
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })

        // Create map
        const map = L.default.map(mapContainerRef.current!).setView(center, zoom)
        
        // Add OpenStreetMap tiles
        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map)

        mapInstanceRef.current = map
        setIsMapReady(true)
      } catch (error) {
        console.error('Failed to initialize map:', error)
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        setIsMapReady(false)
      }
    }
  }, [center, zoom])

  // Add/update markers when map is ready or fanZones change
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !leafletRef.current) return

    const L = leafletRef.current
    const map = mapInstanceRef.current

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current.clear()

    // Create custom icon function
    const createIcon = (isSelected: boolean, teamLogo?: string) => {
      const size = isSelected ? 44 : 36
      const bgColor = isSelected ? '#00b140' : '#0066cc'
      const emoji = teamLogo || '🏟️'
      
      return L.divIcon({
        className: 'custom-fanzone-marker',
        html: `
          <div style="
            width: ${size}px;
            height: ${size}px;
            background: ${bgColor};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${isSelected ? '20px' : '16px'};
            ${isSelected ? 'animation: marker-pulse 1.5s ease-in-out infinite;' : ''}
          ">
            ${emoji}
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size],
      })
    }

    // Add markers for each fan zone
    fanZones.forEach((fanZone) => {
      const isSelected = selectedId === fanZone.id
      const icon = createIcon(isSelected, fanZone.teamLogo)

      const marker = L.marker([fanZone.lat, fanZone.lng], { icon }).addTo(map)

      // Create popup content
      const amenitiesHtml = fanZone.amenities?.map((amenity) => {
        const info = amenityLabels[amenity as keyof typeof amenityLabels]
        return info ? `<span title="${info.label}" style="margin-right: 4px;">${info.icon}</span>` : ''
      }).join('') || ''

      const popupContent = `
        <div style="min-width: 220px; font-family: system-ui, sans-serif;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <span style="font-size: 28px;">${fanZone.teamLogo || '🏟️'}</span>
            <div>
              <strong style="font-size: 14px; color: #0a0a0a;">${fanZone.name}</strong>
              <div style="font-size: 12px; color: #666;">${fanZone.city}</div>
            </div>
          </div>
          ${fanZone.teamName ? `<div style="font-size: 12px; color: #0066cc; font-weight: 600; margin-bottom: 8px;">${fanZone.teamName}</div>` : ''}
          ${fanZone.description ? `<p style="font-size: 12px; color: #666; margin-bottom: 8px; line-height: 1.4;">${fanZone.description.substring(0, 100)}...</p>` : ''}
          ${amenitiesHtml ? `<div style="margin-bottom: 8px;">${amenitiesHtml}</div>` : ''}
          ${fanZone.capacity ? `<div style="font-size: 11px; color: #666; padding-top: 8px; border-top: 1px solid #eee;">👥 Capacité: ${fanZone.capacity} pers.</div>` : ''}
        </div>
      `

      marker.bindPopup(popupContent, { maxWidth: 280 })

      // Handle click
      marker.on('click', () => {
        onMarkerClick?.(fanZone.id)
      })

      markersRef.current.set(fanZone.id, marker)
    })

    // If selected, center and open popup
    if (selectedId) {
      const selectedMarker = markersRef.current.get(selectedId)
      const fanZone = fanZones.find(fz => fz.id === selectedId)
      if (selectedMarker && fanZone) {
        map.setView([fanZone.lat, fanZone.lng], Math.max(map.getZoom(), 10), { animate: true })
        selectedMarker.openPopup()
      }
    }
  }, [isMapReady, fanZones, selectedId, onMarkerClick])

  return (
    <>
      <style jsx global>{`
        @keyframes marker-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .custom-fanzone-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
        }
        
        .leaflet-popup-content {
          margin: 12px 16px !important;
        }
        
        .leaflet-container {
          font-family: system-ui, sans-serif;
          z-index: 1;
        }
        
        .leaflet-control-attribution {
          font-size: 10px;
        }
      `}</style>
      <div className="relative w-full h-full rounded-lg overflow-hidden border border-editorial shadow-lg bg-secondary">
        {!isMapReady && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-accent-sport/30 border-t-accent-sport rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted">Chargement de la carte...</p>
            </div>
          </div>
        )}
        <div 
          ref={mapContainerRef} 
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        />
      </div>
    </>
  )
}
