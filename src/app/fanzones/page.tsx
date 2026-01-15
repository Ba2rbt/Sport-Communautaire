import Link from 'next/link'

interface FanZone {
  id: string
  name: string
  team: string
  teamLogo: string
  members: number
  posts: number
  isLive: boolean
  coverColor: string
}

const mockFanZones: FanZone[] = [
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
    teamLogo: '💚',
    members: 22100,
    posts: 7600,
    isLive: false,
    coverColor: 'from-green-600 to-green-900',
  },
  {
    id: 'losc',
    name: 'Dogues Virage Est',
    team: 'LOSC Lille',
    teamLogo: '🐕',
    members: 18900,
    posts: 5400,
    isLive: false,
    coverColor: 'from-red-700 to-blue-900',
  },
  {
    id: 'rcl',
    name: 'Red Tigers',
    team: 'RC Lens',
    teamLogo: '🟡',
    members: 24300,
    posts: 6800,
    isLive: true,
    coverColor: 'from-yellow-500 to-red-600',
  },
]

function FanZoneCard({ fanzone }: { fanzone: FanZone }) {
  return (
    <Link 
      href={`/fanzones/${fanzone.id}`}
      className="block bg-white border border-editorial rounded-lg overflow-hidden hover-lift"
    >
      {/* Cover */}
      <div className={`h-24 bg-gradient-to-r ${fanzone.coverColor} relative`}>
        {fanzone.isLive && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-accent-live text-white text-xs font-bold rounded-full">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse-live" />
            LIVE
          </div>
        )}
        <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center text-3xl border-2 border-white">
          {fanzone.teamLogo}
        </div>
      </div>

      {/* Content */}
      <div className="pt-10 pb-6 px-6">
        <h3 className="font-editorial text-xl font-bold text-primary mb-1">
          {fanzone.name}
        </h3>
        <p className="text-sm text-muted mb-4">{fanzone.team}</p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-muted">{fanzone.members.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-muted">{fanzone.posts.toLocaleString()} posts</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const metadata = {
  title: 'FanZones | SportUnion',
  description: 'Rejoignez les communautés de supporters : discussions, chants, actualités et événements de vos équipes favorites.',
}

export default function FanZonesPage() {
  const liveFanZones = mockFanZones.filter(fz => fz.isLive)
  const otherFanZones = mockFanZones.filter(fz => !fz.isLive)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-editorial text-5xl font-bold text-primary mb-4">
          FanZones
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Rejoignez la communauté de supporters de votre équipe favorite.
        </p>
      </div>

      {/* Live FanZones */}
      {liveFanZones.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-editorial text-2xl font-bold text-primary">
              En direct
            </h2>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-accent-live/10 text-accent-live text-sm font-bold rounded-full">
              <span className="w-2 h-2 bg-accent-live rounded-full animate-pulse-live" />
              {liveFanZones.length} actives
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveFanZones.map((fanzone) => (
              <FanZoneCard key={fanzone.id} fanzone={fanzone} />
            ))}
          </div>
        </section>
      )}

      {/* All FanZones */}
      <section>
        <h2 className="font-editorial text-2xl font-bold text-primary mb-6">
          Toutes les FanZones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherFanZones.map((fanzone) => (
            <FanZoneCard key={fanzone.id} fanzone={fanzone} />
          ))}
        </div>
      </section>

      {/* Create FanZone CTA */}
      <div className="text-center py-12 bg-gradient-to-r from-accent-sport/10 to-accent-mvp/10 border border-editorial rounded-lg">
        <h2 className="font-editorial text-2xl font-bold text-primary mb-4">
          Votre équipe n&apos;est pas listée ?
        </h2>
        <p className="text-muted mb-6">
          Créez une FanZone pour rassembler les supporters.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors">
          Créer une FanZone
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )
}
