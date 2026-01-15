'use client'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded ${className}`}
      style={{
        animation: 'shimmer 1.5s ease-in-out infinite',
      }}
    />
  )
}

export function MatchCardSkeleton() {
  return (
    <div className="bg-white border border-editorial rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-editorial bg-secondary/30">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>

      {/* Teams & Score */}
      <div className="p-6">
        {/* Home Team */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-10 w-10 rounded" />
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-5 w-28" />
          </div>
          <Skeleton className="h-10 w-10 rounded" />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-editorial bg-secondary/20">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}

export function MatchGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MatchCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function SidebarSkeleton() {
  return (
    <div className="bg-white border border-editorial rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-editorial bg-secondary/30">
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Sections */}
      {[1, 2, 3].map((section) => (
        <div key={section} className="py-4 px-5 border-b border-editorial last:border-b-0">
          <Skeleton className="h-4 w-24 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Skeleton className="w-5 h-5 rounded" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Add shimmer animation to globals.css
export function SkeletonStyles() {
  return (
    <style jsx global>{`
      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `}</style>
  )
}

export default Skeleton
