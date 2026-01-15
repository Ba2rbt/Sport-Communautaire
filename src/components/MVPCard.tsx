import type { MVP } from '@/types';

interface MVPCardProps {
  mvp: MVP;
  rank: number;
}

export default function MVPCard({ mvp, rank }: MVPCardProps) {
  return (
    <article className="group relative bg-white border border-editorial rounded-lg overflow-hidden hover-lift cursor-pointer">
      {/* Rank Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="flex items-center justify-center w-8 h-8 bg-accent-mvp text-white font-bold text-sm rounded-full shadow-lg">
          {rank}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/5 to-accent-sport/10 flex items-center justify-center">
        <span className="text-6xl">{mvp.image}</span>
        {/* MVP Badge */}
        <div className="absolute bottom-0 right-0 bg-accent-mvp text-white px-3 py-1 text-xs font-bold tracking-wider">
          MVP
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-editorial text-lg font-bold text-primary group-hover:text-accent-sport transition-colors">
              {mvp.name}
            </h3>
            <p className="text-sm text-muted">{mvp.team}</p>
          </div>
          <div className="flex items-center gap-1 bg-accent-mvp/10 px-2 py-1 rounded">
            <svg className="w-4 h-4 text-accent-mvp" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold text-accent-mvp">{mvp.rating}</span>
          </div>
        </div>

        <p className="text-xs text-muted uppercase tracking-wider mb-3">{mvp.position}</p>
        
        <div className="pt-3 border-t border-editorial">
          <p className="text-sm text-primary font-medium">{mvp.stats}</p>
        </div>
      </div>
    </article>
  );
}
