import type { Match } from '@/types';

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <article className="group bg-white border border-editorial rounded-lg p-6 hover-lift cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-muted tracking-wider uppercase">
          {match.competition}
        </span>
        {match.isLive && (
          <span className="flex items-center gap-1.5 px-2 py-1 bg-accent-live/10 text-accent-live text-xs font-bold rounded">
            <span className="w-1.5 h-1.5 bg-accent-live rounded-full animate-pulse-live" />
            LIVE
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="space-y-3">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-lg">
              {match.homeTeam.logo}
            </span>
            <span className="font-semibold text-primary">
              {match.homeTeam.name}
            </span>
          </div>
          {match.status !== 'upcoming' && (
            <span className="font-editorial text-xl font-bold text-primary">
              {match.homeScore}
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-lg">
              {match.awayTeam.logo}
            </span>
            <span className="font-semibold text-primary">
              {match.awayTeam.name}
            </span>
          </div>
          {match.status !== 'upcoming' && (
            <span className="font-editorial text-xl font-bold text-primary">
              {match.awayScore}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-editorial flex items-center justify-between">
        <div className="text-sm text-muted">
          <span>{match.date}</span>
          <span className="mx-2">•</span>
          <span>{match.time}</span>
        </div>
        <svg
          className="w-5 h-5 text-muted group-hover:text-accent-sport group-hover:translate-x-1 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </article>
  );
}
