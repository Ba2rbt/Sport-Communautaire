import type { Match } from '@/types'
import { PrimaryButton, BadgeLive } from './ui'

interface HeroMatchProps {
  match: Match
}

export default function HeroMatch({ match }: HeroMatchProps) {
  return (
    <section className="relative w-full overflow-hidden bg-primary text-secondary">
      {/* Full-width Background Pattern */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent-sport/30" />
        
        {/* Animated grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-sport/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-accent-live/10 rounded-full blur-3xl" />
      </div>

      {/* Content Container - Full Width */}
      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-sport" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent-sport">
              Match du jour
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-sport" />
            {match.isLive && <BadgeLive size="md" />}
          </div>

          {/* Competition Info */}
          <p className="text-center text-muted text-sm md:text-base mb-10 tracking-wide">
            {match.competition} • {match.venue}
          </p>

          {/* Match Display - XXL Score */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
            {/* Home Team */}
            <div className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right lg:pr-12">
              <div className="relative mb-6">
                <div className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center text-5xl md:text-6xl lg:text-7xl border border-white/10 shadow-2xl">
                  {match.homeTeam.logo}
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-accent-sport/20 rounded-full blur-xl -z-10" />
              </div>
              <h2 className="font-editorial text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-tight">
                {match.homeTeam.name}
              </h2>
              <span className="text-muted text-sm md:text-base tracking-widest uppercase">
                {match.homeTeam.shortName}
              </span>
            </div>

            {/* Score XXL */}
            <div className="flex flex-col items-center py-8 lg:py-0 lg:px-8">
              {match.status === 'upcoming' ? (
                <div className="text-center">
                  <p className="font-editorial text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                    {match.time}
                  </p>
                  <p className="text-muted text-base md:text-lg mt-4 tracking-wide">{match.date}</p>
                </div>
              ) : (
                <div className="relative">
                  {/* Score container with glow */}
                  <div className="flex items-center gap-4 md:gap-8 lg:gap-12">
                    <span className="font-editorial text-7xl md:text-9xl lg:text-[12rem] font-black leading-none bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-2xl">
                      {match.homeScore}
                    </span>
                    <span className="text-4xl md:text-5xl lg:text-6xl text-white/30 font-thin">—</span>
                    <span className="font-editorial text-7xl md:text-9xl lg:text-[12rem] font-black leading-none bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-2xl">
                      {match.awayScore}
                    </span>
                  </div>
                  
                  {/* Live indicator */}
                  {match.status === 'live' && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                      <span className="flex items-center gap-2 px-4 py-2 bg-accent-live/20 backdrop-blur-sm rounded-full border border-accent-live/30">
                        <span className="w-2 h-2 bg-accent-live rounded-full animate-pulse-live" />
                        <span className="text-accent-live font-bold text-sm tracking-wider">
                          45&apos; + 2
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-12">
              <div className="relative mb-6">
                <div className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center text-5xl md:text-6xl lg:text-7xl border border-white/10 shadow-2xl">
                  {match.awayTeam.logo}
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-accent-live/20 rounded-full blur-xl -z-10" />
              </div>
              <h2 className="font-editorial text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-tight">
                {match.awayTeam.name}
              </h2>
              <span className="text-muted text-sm md:text-base tracking-widest uppercase">
                {match.awayTeam.shortName}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-16 lg:mt-20">
            <PrimaryButton
              size="lg"
              rightIcon={
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
              className="group"
            >
              Suivre le match
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  )
}
