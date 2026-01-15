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
      <div className="relative h-48 bg-gradient-to-br from-primary/5 to-accent-sport/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-5xl transition-transform duration-500 group-hover:scale-110">
          {image}
        </div>
        
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-accent-sport text-white text-xs font-semibold tracking-wider uppercase rounded">
              {category}
            </span>
          </div>
        )}

        {/* Live Indicator */}
        {isLive && (
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-accent-live text-white text-xs font-bold rounded-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse-live" />
              LIVE
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-editorial text-lg font-bold text-primary leading-tight mb-2 group-hover:text-accent-sport transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Meta */}
        <p className="text-sm text-muted line-clamp-2 mb-3">
          {meta}
        </p>

        {/* Footer */}
        {date && (
          <div className="flex items-center justify-between pt-3 border-t border-editorial">
            <span className="text-xs text-muted">{date}</span>
            <svg
              className="w-4 h-4 text-muted group-hover:text-accent-sport group-hover:translate-x-1 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </>
  )

  const className = `
    group bg-white border border-editorial rounded-lg overflow-hidden
    hover-lift cursor-pointer
  `

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <article className={className} onClick={onClick}>
      {content}
    </article>
  )
}

export default CardEvent
