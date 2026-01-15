import { createClient } from '@/lib/supabase/server'
import { MatchHero, MatchStats, MVPVote, MatchDiscussion } from '@/components/match'
import type { MatchDetails, Team, TeamStats } from '@/types/match'
import { notFound } from 'next/navigation'

// Mock data generator for demo
function getMockMatch(id: string): MatchDetails {
  const homeTeam: Team = {
    id: 'team-psg',
    name: 'Paris Saint-Germain',
    shortName: 'PSG',
    logo: '🔵',
  }

  const awayTeam: Team = {
    id: 'team-om',
    name: 'Olympique de Marseille',
    shortName: 'OM',
    logo: '⚪',
  }

  const homeStats: TeamStats = {
    name: homeTeam.name,
    logo: homeTeam.logo,
    possession: 58,
    shots: 14,
    shotsOnTarget: 6,
    corners: 7,
    fouls: 11,
    yellowCards: 2,
    redCards: 0,
    offsides: 3,
    passes: 487,
    passAccuracy: 89,
  }

  const awayStats: TeamStats = {
    name: awayTeam.name,
    logo: awayTeam.logo,
    possession: 42,
    shots: 9,
    shotsOnTarget: 4,
    corners: 4,
    fouls: 14,
    yellowCards: 3,
    redCards: 0,
    offsides: 2,
    passes: 356,
    passAccuracy: 82,
  }

  return {
    id,
    homeTeam,
    awayTeam,
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    minute: 67,
    league: 'Ligue 1',
    date: '15 Janvier 2026',
    time: '21:00',
    venue: 'Parc des Princes, Paris',
    round: 'Journée 18',
    homeStats,
    awayStats,
  }
}

// In production, fetch from Supabase
async function getMatch(id: string): Promise<MatchDetails | null> {
  // const supabase = createClient()
  // const { data, error } = await supabase
  //   .from('matches')
  //   .select('*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*)')
  //   .eq('id', id)
  //   .single()
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Return mock data for demo
  return getMockMatch(id)
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const match = await getMatch(id)
  
  if (!match) {
    return { title: 'Match non trouvé - SportUnion' }
  }

  return {
    title: `${match.homeTeam.shortName} vs ${match.awayTeam.shortName} - ${match.league} | SportUnion`,
    description: `Suivez ${match.homeTeam.name} contre ${match.awayTeam.name} en ${match.league}. Score, statistiques et discussion en direct.`,
  }
}

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const match = await getMatch(id)
  
  if (!match) {
    notFound()
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero */}
      <MatchHero
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeScore={match.homeScore}
        awayScore={match.awayScore}
        status={match.status}
        minute={match.minute}
        league={match.league}
        date={match.date}
        time={match.time}
        venue={match.venue}
        round={match.round}
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <MatchStats 
              homeTeam={match.homeStats} 
              awayTeam={match.awayStats} 
            />

            {/* Discussion */}
            <MatchDiscussion 
              matchId={match.id} 
              user={user} 
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* MVP Vote */}
            <MVPVote
              matchId={match.id}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              user={user}
            />

            {/* Related Content */}
            <div className="bg-white border border-editorial rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-editorial">
                <h3 className="font-editorial text-lg font-bold text-primary">
                  À lire aussi
                </h3>
              </div>
              <div className="divide-y divide-editorial">
                {[
                  { title: 'Preview: Les clés du Classico', category: 'Analyse' },
                  { title: 'Mbappé de retour après blessure', category: 'Actualité' },
                  { title: 'Historique des confrontations', category: 'Stats' },
                ].map((article, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="block px-6 py-4 hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-xs text-accent-sport font-semibold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <p className="text-primary font-medium mt-1 line-clamp-2">
                      {article.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="bg-white border border-editorial rounded-lg p-6">
              <h3 className="font-editorial text-lg font-bold text-primary mb-4">
                Partager ce match
              </h3>
              <div className="flex gap-3">
                {[
                  { name: 'Twitter', icon: '𝕏', color: 'bg-black' },
                  { name: 'Facebook', icon: 'f', color: 'bg-blue-600' },
                  { name: 'WhatsApp', icon: '💬', color: 'bg-green-500' },
                  { name: 'Copier', icon: '🔗', color: 'bg-muted' },
                ].map((social) => (
                  <button
                    key={social.name}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      text-white text-sm font-bold
                      ${social.color}
                      hover:opacity-80 transition-opacity
                    `}
                    title={social.name}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
