import Link from 'next/link'

interface CardEventProps {
  href?: string
  image: string
  title: string
  meta: string
  category?: string
  date?: string
  isLive?: boolean
  onClick?: () => void
}

export function CardEvent({
  href,
  image,
  title,
  meta,
  category,
  date,
  isLive,
  onClick,
}: CardEventProps) {
  const content = (
    <>
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {/* Background gradient for image area */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0" />
        
        <div className="absolute inset-0 flex items-center justify-center text-6xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 drop-shadow-2xl">
          {image}
        </div>
        
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-accent-blue/20 border border-accent-blue/30 text-accent-blue backdrop-blur-md text-xs font-bold tracking-wider uppercase rounded-full shadow-lg">
              {category}
            </span>
          </div>
        )}

        {/* Live Indicator */}
        {isLive && (
          <div className="absolute top-4 right-4 z-10">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full shadow-lg shadow-red-600/40 animate-pulse-slow">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              LIVE
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 relative">
        {/* Glow effect specific to this section */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

        {/* Title */}
        <h3 className="font-sans text-xl font-bold text-slate-100 leading-tight mb-2 group-hover:text-accent-glow transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Meta */}
        <p className="text-sm text-slate-400 font-medium line-clamp-2 mb-4">
          {meta}
        </p>

        {/* Footer */}
        {date && (
          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{date}</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-glow group-hover:text-black transition-all duration-300">
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  )

  const containerClassName = `
    group relative overflow-hidden rounded-2xl
    glass bg-gradient-to-br from-white/[0.08] to-white/[0.01]
    border border-white/10 hover:border-accent-glow/30
    transition-all duration-300 hover:shadow-2xl hover:shadow-accent-glow/5 hover:-translate-y-1
    flex flex-col h-full
  `

  if (href) {
    return (
      <Link href={href} className={containerClassName}>
        {content}
      </Link>
    )
  }

  return (
    <article className={`${containerClassName} cursor-pointer`} onClick={onClick}>
      {content}
    </article>
  )
}

export default CardEvent
