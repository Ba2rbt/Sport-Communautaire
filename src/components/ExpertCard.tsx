import type { Analysis } from '@/types';

interface ExpertCardProps {
  analysis: Analysis;
}

export default function ExpertCard({ analysis }: ExpertCardProps) {
  return (
    <article className="group bg-white border border-editorial rounded-lg overflow-hidden hover-lift cursor-pointer">
      {/* Image */}
      <div className="relative h-44 bg-gradient-to-br from-accent-sport/20 to-primary/10 flex items-center justify-center overflow-hidden">
        <span className="text-5xl">{analysis.image}</span>
        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-accent-sport text-white text-xs font-semibold tracking-wider uppercase rounded">
            {analysis.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-editorial text-lg font-bold text-primary leading-tight mb-3 group-hover:text-accent-sport transition-colors line-clamp-2">
          {analysis.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
          {analysis.excerpt}
        </p>

        {/* Expert Info */}
        <div className="flex items-center justify-between pt-4 border-t border-editorial">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-lg">
              {analysis.expert.image}
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">{analysis.expert.name}</p>
              <p className="text-xs text-muted">{analysis.expert.title}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">{analysis.readTime}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
