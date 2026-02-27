import Link from 'next/link'
import type { Match } from '@/types'
import { PrimaryButton, BadgeLive } from './ui'
import { getTeamSlug } from '@/lib/utils'

interface HeroMatchProps {
  match: Match
}

export default function HeroMatch({ match }: HeroMatchProps) {
  const homeTeamSlug = getTeamSlug(match.homeTeam.name)
  const awayTeamSlug = getTeamSlug(match.awayTeam.name)

  return (
    <section className="relative w-full overflow-hidden text-white min-h-[85vh] flex items-center justify-center">
      {/* Full-width Immersive Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black" />
        
        {/* Animated Aurora Effect */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-blue/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      {/* Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 z-10">
        <div className="flex flex-col items-center">
          
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-white/10 mb-8 animate-fade-in-down">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-live animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-300">
              Match à la une
            </span>
          </div>

          {/* Teams Display */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-12">
            
            {/* Home Team */}
            <Link 
              href={`/team/${homeTeamSlug}`}
              className="group flex flex-col items-center lg:items-end text-center lg:text-right"
            >
              <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
                <div className="w-32 h-32 lg:w-40 lg:h-40 glass rounded-full flex items-center justify-center text-6xl shadow-2xl shadow-accent-blue/10 border border-white/5 group-hover:border-accent-blue/30 transition-colors">
                  {match.homeTeam.logo}
                </div>
                <div className="absolute inset-0 rounded-full bg-accent-blue/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-2 group-hover:text-accent-blue transition-colors">
                {match.homeTeam.name}
              </h2>
              <p className="text-slate-400 font-medium tracking-widest uppercase text-sm">HOME</p>
            </Link>

            {/* VS / Score */}
            <div className="flex flex-col items-center justify-center">
              {match.status === 'upcoming' ? (
                <div className="text-center p-8 rounded-3xl glass border-white/5 bg-white/[0.02]">
                  <div className="text-6xl lg:text-8xl font-black tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent mb-2">
                    {match.time}
                  </div>
                  <div className="text-slate-400 font-medium tracking-widest uppercase">{match.date}</div>
                </div>
              ) : (
                <div className="flex items-center gap-4 text-7xl lg:text-9xl font-black tracking-tighter">
                  <span className={(match.homeScore ?? 0) > (match.awayScore ?? 0) ? 'text-accent-live' : 'text-white'}>
                    {match.homeScore ?? 0}
                  </span>
                  <span className="text-slate-700 text-4xl lg:text-6xl">:</span>
                  <span className={(match.awayScore ?? 0) > (match.homeScore ?? 0) ? 'text-accent-live' : 'text-white'}>
                    {match.awayScore ?? 0}
                  </span>
                </div>
              )}
              
              {/* Venue */}
              <div className="mt-8 flex items-center gap-2 text-slate-400 text-sm font-medium px-4 py-2 rounded-full bg-white/5 border border-white/5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {match.venue || 'Stade Principal'}
              </div>
            </div>

            {/* Away Team */}
            <Link 
              href={`/team/${awayTeamSlug}`}
              className="group flex flex-col items-center lg:items-start text-center lg:text-left"
            >
               <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
                <div className="w-32 h-32 lg:w-40 lg:h-40 glass rounded-full flex items-center justify-center text-6xl shadow-2xl shadow-accent-orange/10 border border-white/5 group-hover:border-accent-orange/30 transition-colors">
                  {match.awayTeam.logo}
                </div>
                <div className="absolute inset-0 rounded-full bg-accent-orange/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-2 group-hover:text-accent-orange transition-colors">
                {match.awayTeam.name}
              </h2>
              <p className="text-slate-400 font-medium tracking-widest uppercase text-sm">AWAY</p>
            </Link>

          </div>

          {/* CTA */}
          <Link href={`/match/${match.id}`}>
            <PrimaryButton className="px-8 py-4 text-lg shadow-xl shadow-accent-live/20 hover:scale-105 transition-transform">
              VOIR LE MATCH
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
