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

        {/* Decorative circles with animation */}
        <div className="absolute -top-24 -right-24 w-64 sm:w-96 h-64 sm:h-96 bg-accent-sport/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-52 sm:w-80 h-52 sm:h-80 bg-accent-live/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content Container - Full Width */}
      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 lg:py-32">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fade-in">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-accent-sport" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-accent-sport">
              Match du jour
            </span>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-accent-sport" />
            {match.isLive && <BadgeLive size="md" />}
          </div>

          {/* Competition Info */}
          <p 
            className="text-center text-muted text-xs sm:text-sm md:text-base mb-8 sm:mb-10 tracking-wide animate-fade-in px-4"
            style={{ animationDelay: '100ms' }}
          >
            {match.competition} {match.venue && `• ${match.venue}`}
          </p>

          {/* Match Display - XXL Score */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-0">
            {/* Home Team - Clickable */}
            <Link 
              href={`/team/${homeTeamSlug}`}
              className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right lg:pr-8 xl:pr-12 animate-fade-in group/home"
              style={{ animationDelay: '200ms' }}
            >
              <div className="relative mb-4 sm:mb-6">
                <div className="
                  w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 
                  bg-white/5 backdrop-blur-sm rounded-full 
                  flex items-center justify-center 
                  text-3xl sm:text-5xl md:text-6xl lg:text-7xl 
                  border border-white/10 shadow-2xl
                  group-hover/home:scale-105 group-hover/home:border-accent-sport/50 transition-all duration-300
                ">
                  {match.homeTeam.logo}
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-accent-sport/20 rounded-full blur-xl -z-10 group-hover/home:bg-accent-sport/40 transition-colors" />
              </div>
              <h2 className="font-editorial text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 tracking-tight group-hover/home:text-accent-sport transition-colors">
                {match.homeTeam.name}
              </h2>
              <span className="text-muted text-xs sm:text-sm md:text-base tracking-widest uppercase">
                {match.homeTeam.shortName}
              </span>
            </Link>

            {/* Score XXL */}
            <div 
              className="flex flex-col items-center py-4 sm:py-8 lg:py-0 lg:px-4 xl:px-8 animate-fade-in"
              style={{ animationDelay: '300ms' }}
            >
              {match.status === 'upcoming' ? (
                <div className="text-center">
                  <p className="font-editorial text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                    {match.time}
                  </p>
                  <p className="text-muted text-sm sm:text-base md:text-lg mt-3 sm:mt-4 tracking-wide">{match.date}</p>
                </div>
              ) : (
                <div className="relative">
                  {/* Score container with glow */}
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-8 lg:gap-10 xl:gap-12">
                    <span className="
                      font-editorial 
                      text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 
                      font-black leading-none 
                      bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent 
                      drop-shadow-2xl
                    ">
                      {match.homeScore}
                    </span>
                    <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white/30 font-thin">—</span>
                    <span className="
                      font-editorial 
                      text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 
                      font-black leading-none 
                      bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent 
                      drop-shadow-2xl
                    ">
                      {match.awayScore}
                    </span>
                  </div>
                  
                  {/* Live indicator */}
                  {match.status === 'live' && (
                    <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2">
                      <span className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-accent-live/20 backdrop-blur-sm rounded-full border border-accent-live/30">
                        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-accent-live rounded-full animate-pulse-live" />
                        <span className="text-accent-live font-bold text-xs sm:text-sm tracking-wider">
                          45&apos; + 2
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Away Team - Clickable */}
            <Link 
              href={`/team/${awayTeamSlug}`}
              className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-8 xl:pl-12 animate-fade-in group/away"
              style={{ animationDelay: '400ms' }}
            >
              <div className="relative mb-4 sm:mb-6">
                <div className="
                  w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 
                  bg-white/5 backdrop-blur-sm rounded-full 
                  flex items-center justify-center 
                  text-3xl sm:text-5xl md:text-6xl lg:text-7xl 
                  border border-white/10 shadow-2xl
                  group-hover/away:scale-105 group-hover/away:border-accent-live/50 transition-all duration-300
                ">
                  {match.awayTeam.logo}
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-accent-live/20 rounded-full blur-xl -z-10 group-hover/away:bg-accent-live/40 transition-colors" />
              </div>
              <h2 className="font-editorial text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 tracking-tight group-hover/away:text-accent-live transition-colors">
                {match.awayTeam.name}
              </h2>
              <span className="text-muted text-xs sm:text-sm md:text-base tracking-widest uppercase">
                {match.awayTeam.shortName}
              </span>
            </Link>
          </div>

          {/* CTA */}
          <div 
            className="flex justify-center mt-10 sm:mt-16 lg:mt-20 animate-fade-in"
            style={{ animationDelay: '500ms' }}
          >
            <Link href={`/match/${match.id}`}>
              <PrimaryButton
                size="lg"
                rightIcon={
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
                className="group text-sm sm:text-base"
              >
                Suivre le match
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
