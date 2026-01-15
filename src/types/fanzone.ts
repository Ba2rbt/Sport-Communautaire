export interface FanZone {
  id: string
  name: string
  city: string
  address?: string
  lat: number
  lng: number
  teamId?: string
  teamName?: string
  teamLogo?: string
  description?: string
  capacity?: number
  amenities?: string[]
  openingHours?: string
  imageUrl?: string
  isVerified: boolean
  isActive: boolean
}

export type Amenity = 'screen' | 'bar' | 'food' | 'terrace' | 'parking' | 'wifi'

export const amenityLabels: Record<Amenity, { label: string; icon: string }> = {
  screen: { label: 'Écran géant', icon: '📺' },
  bar: { label: 'Bar', icon: '🍺' },
  food: { label: 'Restauration', icon: '🍔' },
  terrace: { label: 'Terrasse', icon: '☀️' },
  parking: { label: 'Parking', icon: '🅿️' },
  wifi: { label: 'WiFi', icon: '📶' },
}
