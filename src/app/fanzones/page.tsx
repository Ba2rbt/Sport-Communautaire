import Link from 'next/link'
import FanZonesMapSection from './FanZonesMapSection'
import type { FanZone as FanZoneLocation } from '@/types/fanzone'

interface FanZoneCommunity {
  id: string
  name: string
  team: string
  teamLogo: string
  members: number
  posts: number
  isLive: boolean
  coverColor: string
}

const mockFanZones: FanZoneCommunity[] = [
  {
    id: 'psg',
    name: 'Collectif Ultras Paris',
    team: 'Paris Saint-Germain',
    teamLogo: '🔵',
    members: 45200,
    posts: 12850,
    isLive: true,
    coverColor: 'from-blue-900 to-red-600',
  },
  {
    id: 'om',
    name: 'Commandos Ultra 84',
    team: 'Olympique de Marseille',
    teamLogo: '⚪',
    members: 38700,
    posts: 11200,
    isLive: true,
    coverColor: 'from-sky-400 to-white',
  },
  {
    id: 'ol',
    name: 'Bad Gones 1987',
    team: 'Olympique Lyonnais',
    teamLogo: '🦁',
    members: 28500,
    posts: 8900,
    isLive: false,
    coverColor: 'from-red-600 to-blue-800',
  },
  {
    id: 'asse',
    name: 'Magic Fans',
    team: 'AS Saint-Étienne',
    teamLogo: '�',
    members: 22100,
    posts: 7400,
    isLive: false,
    coverColor: 'from-green-600 to-green-800',
  },
  {
    id: 'lens',
    name: 'Red Tigers',
    team: 'RC Lens',
    teamLogo: '🟡',
    members: 19800,
    posts: 6200,
    isLive: true,
    coverColor: 'from-red-600 to-yellow-500',
  },
  {
    id: 'nantes',
    name: 'Brigade Loire',
    team: 'FC Nantes',
    teamLogo: '🐤',
    members: 15600,
    posts: 4800,
    isLive: false,
    coverColor: 'from-yellow-400 to-green-600',
  },
]

const mockFanZoneLocations: FanZoneLocation[] = [
  {
    id: 'fz-1',
    name: 'Le Comptoir du Sport',
    city: 'Paris',
    address: '15 Rue de Rivoli, 75001 Paris',
    lat: 48.8566,
    lng: 2.3522,
    teamName: 'Paris Saint-Germain',
    teamLogo: '🔵',
    description: 'Le QG des supporters parisiens avec écran géant.',
    capacity: 200,
    amenities: ['screen', 'bar', 'food', 'wifi'],
    isVerified: true,
    isActive: true,
  },
  {
    id: 'fz-2',
    name: 'La Brasserie Olympique',
    city: 'Marseille',
    address: '42 Quai du Port, 13002 Marseille',
    lat: 43.2965,
    lng: 5.3698,
    teamName: 'Olympique de Marseille',
    teamLogo: '⚪',
    description: 'Vue sur le Vieux-Port et ambiance chaleureuse.',
    capacity: 350,
    amenities: ['screen', 'bar', 'food', 'terrace'],
    isVerified: true,
    isActive: true,
  },
  {
    id: 'fz-3',
    name: 'Le Repaire des Gones',
    city: 'Lyon',
    address: '8 Place Bellecour, 69002 Lyon',
    lat: 45.7640,
    lng: 4.8357,
    teamName: 'Olympique Lyonnais',
    teamLogo: '🦁',
    description: 'Bar à thème OL avec maillots historiques.',
    capacity: 150,
    amenities: ['screen', 'bar', 'food', 'wifi'],
    isVerified: true,
    isActive: true,
  },
  {
    id: 'fz-4',
    name: 'Le Chaudron Vert',
    city: 'Saint-Étienne',
    address: '25 Place Jean Jaurès, 42000 Saint-Étienne',
    lat: 45.4397,
    lng: 4.3872,
    teamName: 'AS Saint-Étienne',
    teamLogo: '💚',
    description: 'L\'antre des supporters stéphanois.',
    capacity: 180,
    amenities: ['screen', 'bar', 'terrace', 'parking'],
    isVerified: false,
    isActive: true,
  },
  {
    id: 'fz-5',
    name: 'Le Café des Dogues',
    city: 'Lille',
    address: '12 Grand Place, 59000 Lille',
    lat: 50.6292,
    lng: 3.0573,
    teamName: 'LOSC Lille',
    teamLogo: '🐕',
    description: 'Point de ralliement des supporters du LOSC.',
    capacity: 120,
    amenities: ['screen', 'bar', 'food'],
    isVerified: true,
    isActive: true,
  },
  {
    id: 'fz-6',
    name: 'Le Bistrot Sang et Or',
    city: 'Lens',
    address: '5 Place du Cantin, 62300 Lens',
    lat: 50.4289,
    lng: 2.8319,
    teamName: 'RC Lens',
    teamLogo: '🟡',
    description: 'À deux pas du stade Bollaert.',
    capacity: 250,
    amenities: ['screen', 'bar', 'food', 'parking'],
    isVerified: true,
    isActive: true,
  },
]

function FanZoneCard({ fanzone }: { fanzone: FanZoneCommunity }) {
  return (
    <Link 
      href={`/fanzones/${fanzone.id}`}
      className="group relative block overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-accent-sport/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
    >
      {/* Cover Gradient */}
      <div className={`h-32 w-full bg-gradient-to-br ${fanzone.coverColor} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Logo Container */}
      <div className="absolute top-20 left-6">
        <div className="w-16 h-16 bg-[#0f172a] rounded-xl flex items-center justify-center text-3xl shadow-xl border border-white/10 group-hover:scale-110 transition-transform duration-300 group-hover:border-accent-sport/50">
          {fanzone.teamLogo}
        </div>
      </div>

      {/* Live Badge */}
      {fanzone.isLive && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-red-500/90 text-white text-xs font-bold rounded-full shadow-lg border border-red-400/50 backdrop-blur-sm animate-pulse">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
          LIVE
        </div>
      )}

      {/* Content */}
      <div className="pt-8 pb-6 px-6">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-sport transition-colors line-clamp-1">
          {fanzone.name}
        </h3>
        <p className="text-sm text-slate-400 mb-6 font-medium tracking-wide uppercase text-xs">
          {fanzone.team}
        </p>
        
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex flex-col">
             <span className="text-lg font-bold text-white">{fanzone.members.toLocaleString()}</span>
             <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Membres</span>
          </div>
          <div className="w-px h-8 bg-white/5" />
          <div className="flex flex-col items-end">
             <span className="text-lg font-bold text-white">{fanzone.posts.toLocaleString()}</span>
             <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Posts</span>
          </div>
        </div>
        
        {/* Hover Action */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-accent-sport transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </Link>
  )
}

export const metadata = {
  title: 'FanZones | SportUnion',
  description: 'Rejoignez les communautés de supporters : discussions, chants, actualités et événements de vos équipes favorites.',
}

export default function FanZonesPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden selection:bg-accent-sport/30">
      
      {/* Hero Header */}
      <div className="relative border-b border-white/5 bg-[#020617]/80 backdrop-blur-sm z-20">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-sport/10 border border-accent-sport/20 text-accent-sport text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-accent-sport animate-pulse shadow-[0_0_10px_currentColor]" />
                Fans & Ultras
              </div>
              <h1 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tighter">
                Fan<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-sport to-purple-500">Zones</span>
              </h1>
              <p className="text-slate-400 text-xl font-light leading-relaxed">
                Trouvez les meilleurs lieux pour vivre les matchs. Rejoignez les tribunes virtuelles et vibrez avec votre communauté.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/fanzones/map" className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10">
                Explorer La Carte
              </Link>
              <Link href="/fanzones/create" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 hover:border-white/40 transition-all">
                Créer un Groupe
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      {/* Map Preview Section */}
      <div className="h-[400px] w-full relative bg-slate-900 overflow-hidden border-y border-white/5 group">
         {/* Fake Map UI */}
         <div className="absolute inset-0 bg-[#050b1d]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617]/50 to-[#020617]" />
             {/* Random Dots mimicking locations - static for SSR safety */}
             <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-sport rounded-full animate-ping" />
             <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-700" />
             <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-500 rounded-full animate-ping delay-300" />
         </div>
         
         <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-700 group-hover:backdrop-blur-none group-hover:bg-black/20">
             <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
                 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 backdrop-blur-md">
                    <span className="text-3xl">🗺️</span>
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">Carte Interactive</h3>
                 <p className="text-slate-300 mb-6 max-w-md mx-auto">Trouvez les bars, pubs et lieux de rassemblement autour de vous.</p>
                 <Link href="/fanzones/map" className="inline-flex items-center gap-2 px-6 py-2 bg-accent-sport/20 border border-accent-sport/50 text-accent-sport font-bold rounded-lg hover:bg-accent-sport hover:text-white transition-all">
                    Ouvrir la carte
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                 </Link>
             </div>
         </div>
      </div>

      {/* Popular Groups Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="text-accent-sport">🔥</span> 
                Groupes Populaires
                </h2>
                <p className="text-slate-400">Rejoignez les communautés les plus actives du moment</p>
            </div>
            <Link href="/fanzones/all" className="hidden md:flex items-center gap-2 text-sm font-bold text-white hover:text-accent-sport transition-colors uppercase tracking-wider">
                Voir tout <span className="text-lg">→</span>
            </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockFanZones.map((fanzone) => (
            <FanZoneCard key={fanzone.id} fanzone={fanzone} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
            <Link href="/fanzones/all" className="inline-block px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-lg">
                Voir tous les groupes
            </Link>
        </div>
      </div>
    </div>
  )
}