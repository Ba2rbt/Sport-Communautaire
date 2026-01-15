import type { FanZone } from '@/types/fanzone'
import { amenityLabels } from '@/types/fanzone'

interface FanZoneCardProps {
  fanZone: FanZone
  isSelected?: boolean
  onClick?: () => void
}

export default function FanZoneCard({ fanZone, isSelected, onClick }: FanZoneCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left bg-white border rounded-lg overflow-hidden transition-all duration-200
        ${isSelected 
          ? 'border-accent-sport shadow-lg shadow-accent-sport/20 ring-2 ring-accent-sport/20' 
          : 'border-editorial hover:border-accent-sport/50 hover:shadow-md'
        }
      `}
    >
      {/* Image or gradient header */}
      {fanZone.imageUrl ? (
        <div 
          className="h-32 bg-cover bg-center"
          style={{ backgroundImage: `url(${fanZone.imageUrl})` }}
        />
      ) : (
        <div className="h-32 bg-gradient-to-br from-accent-sport/20 to-accent-mvp/20 flex items-center justify-center">
          <span className="text-5xl">{fanZone.teamLogo || '🏟️'}</span>
        </div>
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-primary line-clamp-1">{fanZone.name}</h3>
            <p className="text-sm text-muted flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {fanZone.city}
            </p>
          </div>
          {fanZone.isVerified && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-accent-live/10 text-accent-live text-xs font-medium rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Vérifié
            </span>
          )}
        </div>

        {/* Team */}
        {fanZone.teamName && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{fanZone.teamLogo}</span>
            <span className="text-sm text-muted">{fanZone.teamName}</span>
          </div>
        )}

        {/* Description */}
        {fanZone.description && (
          <p className="text-sm text-muted line-clamp-2 mb-3">
            {fanZone.description}
          </p>
        )}

        {/* Amenities */}
        {fanZone.amenities && fanZone.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {fanZone.amenities.slice(0, 4).map((amenity) => {
              const amenityInfo = (amenityLabels as Record<string, { label: string; icon: string }>)[amenity]
              return amenityInfo ? (
                <span 
                  key={amenity}
                  className="px-2 py-0.5 bg-secondary text-muted text-xs rounded-full"
                  title={amenityInfo.label}
                >
                  {amenityInfo.icon}
                </span>
              ) : null
            })}
            {fanZone.amenities.length > 4 && (
              <span className="px-2 py-0.5 bg-secondary text-muted text-xs rounded-full">
                +{fanZone.amenities.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Capacity */}
        {fanZone.capacity && (
          <div className="mt-3 pt-3 border-t border-editorial flex items-center justify-between text-sm">
            <span className="text-muted">Capacité</span>
            <span className="font-medium text-primary">{fanZone.capacity} pers.</span>
          </div>
        )}
      </div>
    </button>
  )
}
