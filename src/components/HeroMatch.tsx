import type { Match } from '@/types';

interface HeroMatchProps {
  match: Match;
}

export default function HeroMatch({ match }: HeroMatchProps) {
  return (
    <section className="relative overflow-hidden bg-primary text-secondary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-sport via-transparent to-accent-live" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-sport">
            Match du jour
          </span>
          {match.isLive && (
            <span className="flex items-center gap-2 px-3 py-1 bg-accent-live text-white text-xs font-bold rounded-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse-live" />
              EN DIRECT
            </span>
          )}
        </div>

        {/* Competition Info */}
        <p className="text-muted text-sm mb-6 tracking-wide">
          {match.competition} • {match.venue}
        </p>

        {/* Match Display */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Home Team */}
          <div className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-secondary/10 rounded-full flex items-center justify-center mb-4 text-4xl md:text-5xl">
              {match.homeTeam.logo}
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl font-bold mb-1">
              {match.homeTeam.name}
            </h2>
            <span className="text-muted text-sm tracking-wider">
              {match.homeTeam.shortName}
            </span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center py-8">
            {match.status === 'upcoming' ? (
              <div className="text-center">
                <p className="font-editorial text-5xl md:text-7xl font-bold tracking-tight">
                  {match.time}
                </p>
                <p className="text-muted text-sm mt-2">{match.date}</p>
              </div>
            ) : (
              <div className="flex items-center gap-6 md:gap-10">
                <span className="font-editorial text-6xl md:text-8xl font-bold">
                  {match.homeScore}
                </span>
                <span className="text-3xl md:text-4xl text-muted font-light">—</span>
                <span className="font-editorial text-6xl md:text-8xl font-bold">
                  {match.awayScore}
                </span>
              </div>
            )}
            {match.status === 'live' && (
              <p className="text-accent-live text-sm font-semibold mt-4 tracking-wide">
                45&apos; + 2
              </p>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-secondary/10 rounded-full flex items-center justify-center mb-4 text-4xl md:text-5xl">
              {match.awayTeam.logo}
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl font-bold mb-1">
              {match.awayTeam.name}
            </h2>
            <span className="text-muted text-sm tracking-wider">
              {match.awayTeam.shortName}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <button className="group flex items-center gap-3 px-8 py-4 bg-accent-sport hover:bg-accent-sport/90 text-white font-semibold rounded-full transition-all duration-300">
            Suivre le match
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
