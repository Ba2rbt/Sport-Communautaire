'use client'

import { useEffect, useState } from 'react'
import type { FanZone } from '@/types/fanzone'
import { amenityLabels } from '@/types/fanzone'

// Dynamic import for Leaflet (client-side only)
import dynamic from 'next/dynamic'

interface FanZoneMapProps {
  fanZones: FanZone[]
  selectedId?: string
  onMarkerClick?: (id: string) => void
  center?: [number, number]
  zoom?: number
}

// Leaflet components loaded dynamically to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

function MapContent({ fanZones, selectedId, onMarkerClick, center, zoom }: FanZoneMapProps) {
  const [L, setL] = useState<typeof import('leaflet') | null>(null)

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      setL(leaflet.default)
    })
  }, [])

  if (!L) return null

  // Custom marker icons
  const defaultIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: #0066cc;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="font-size: 14px;">🏟️</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })

  const selectedIcon = L.divIcon({
    className: 'custom-marker-selected',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background: #00b140;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,177,64,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: pulse 1.5s infinite;
      ">
        <span style="font-size: 18px;">🏟️</span>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  })

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {fanZones.map((fanZone) => (
        <Marker
          key={fanZone.id}
          position={[fanZone.lat, fanZone.lng]}
          icon={selectedId === fanZone.id ? selectedIcon : defaultIcon}
          eventHandlers={{
            click: () => onMarkerClick?.(fanZone.id),
          }}
        >
          <Popup>
            <div className="min-w-[200px] p-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{fanZone.teamLogo || '🏟️'}</span>
                <div>
                  <h3 className="font-bold text-primary text-sm">{fanZone.name}</h3>
                  <p className="text-xs text-muted">{fanZone.city}</p>
                </div>
              </div>
              {fanZone.teamName && (
                <p className="text-xs text-accent-sport font-medium mb-2">
                  {fanZone.teamName}
                </p>
              )}
              {fanZone.description && (
                <p className="text-xs text-muted mb-2 line-clamp-2">
                  {fanZone.description}
                </p>
              )}
              {fanZone.amenities && fanZone.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {fanZone.amenities.map((amenity) => {
                    const info = (amenityLabels as Record<string, { label: string; icon: string }>)[amenity]
                    return info ? (
                      <span key={amenity} className="text-sm" title={info.label}>
                        {info.icon}
                      </span>
                    ) : null
                  })}
                </div>
              )}
              {fanZone.address && (
                <p className="text-xs text-muted border-t border-gray-200 pt-2 mt-2">
                  📍 {fanZone.address}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default function FanZoneMap({ fanZones, selectedId, onMarkerClick, center = [46.603354, 1.888334], zoom = 6 }: FanZoneMapProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full bg-secondary rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-sport/30 border-t-accent-sport rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Chargement de la carte...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-editorial shadow-lg">
      <style jsx global>{`
        @import 'leaflet/dist/leaflet.css';
        
        .leaflet-container {
          width: 100%;
          height: 100%;
          font-family: inherit;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        
        .leaflet-popup-content {
          margin: 8px 12px;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <MapContent
          fanZones={fanZones}
          selectedId={selectedId}
          onMarkerClick={onMarkerClick}
          center={center}
          zoom={zoom}
        />
      </MapContainer>
    </div>
  )
}
