import Link from 'next/link'

const competitions = [
  { id: 'ligue-1', name: 'Ligue 1', logo: '🇫🇷', country: 'France', season: '2024-25', totalVotes: 45230 },
  { id: 'premier-league', name: 'Premier League', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'Angleterre', season: '2024-25', totalVotes: 78450 },
  { id: 'la-liga', name: 'La Liga', logo: '🇪🇸', country: 'Espagne', season: '2024-25', totalVotes: 56780 },
  { id: 'serie-a', name: 'Serie A', logo: '🇮🇹', country: 'Italie', season: '2024-25', totalVotes: 34560 },
  { id: 'bundesliga', name: 'Bundesliga', logo: '🇩🇪', country: 'Allemagne', season: '2024-25', totalVotes: 29870 },
]

export const metadata = {
  title: 'MVP Saison | SportUnion',
  description: 'Classement des meilleurs joueurs de chaque compétition. Votez pour votre MVP de la saison !',
}

export default function MVPIndexPage() {
  return (
    <div className="min-h-screen bg-[#0f0720] text-white overflow-hidden selection:bg-orange-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[30%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* Hero Header */}
        <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-orange-500/30 rounded-full bg-orange-500/5 backdrop-blur-md mb-8">
               <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
               <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Saison 2025/2026</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 mb-8 drop-shadow-2xl">
                Hall of MVP
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto border-t border-white/5 pt-8">
                C'est vous qui décidez. Le pouvoir est entre vos mains pour élire les légendes de demain.
            </p>
        </div>

        {/* Competition Cards - Expanded Layout */}
        <div className="space-y-4">
             {competitions.map((comp, index) => (
                <Link 
                    key={comp.id} 
                    href={`/mvp/${comp.id}`} 
                    className="group relative block"
                >
                    <div className="relative h-32 md:h-40 glass border border-white/5 rounded-2xl flex items-center justify-between px-8 md:px-12 overflow-hidden transition-all duration-500 hover:h-48 hover:border-orange-500/50 hover:bg-[#1a1033]">
                        {/* Background Hover Effect */}
                        <div className="absolute inset-0 bg-linear-to-r from-orange-600/20 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        
                        <div className="relative z-10 flex items-center gap-8">
                            <span className="text-5xl md:text-7xl font-black text-white/5 group-hover:text-white/20 transition-colors">
                                0{index + 1}
                            </span>
                            <div className="text-4xl md:text-5xl grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                                {comp.logo}
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white group-hover:text-orange-400 transition-colors">
                                    {comp.name}
                                </h2>
                                <p className="text-sm font-mono text-slate-500 group-hover:text-white/60">
                                    {comp.country} • {comp.totalVotes.toLocaleString()} Votes
                                </p>
                            </div>
                        </div>

                        <div className="relative z-10 hidden md:flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-10 group-hover:translate-x-0">
                            <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
                                Voir le classement
                            </span>
                            <div className="w-12 h-12 rounded-full border border-orange-500 flex items-center justify-center text-orange-500 bg-orange-500/10">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
             ))}
        </div>

      </div>
    </div>
  )
}
