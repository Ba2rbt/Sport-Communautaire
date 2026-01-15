import { TagLigue } from '@/components/ui'

interface CompetitionHeroProps {
  name: string
  logo: string
  country: string
  description: string
  season: string
  totalTeams: number
}

export default function CompetitionHero({
  name,
  logo,
  country,
  description,
  season,
  totalTeams,
}: CompetitionHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent-sport/30" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="comp-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="2" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#comp-pattern)" />
        </svg>
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-accent-sport/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-accent-mvp/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-7xl md:text-8xl border border-white/20 shadow-2xl">
              {logo}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <TagLigue league={country} />
              <span className="px-3 py-1 bg-white/10 text-white/80 text-sm font-medium rounded-full border border-white/20">
                {season}
              </span>
            </div>

            <h1 className="font-editorial text-4xl md:text-6xl font-black mb-4 tracking-tight">
              {name}
            </h1>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-6">
              {description}
            </p>

            {/* Stats Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                <svg className="w-5 h-5 text-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-semibold">{totalTeams} équipes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
