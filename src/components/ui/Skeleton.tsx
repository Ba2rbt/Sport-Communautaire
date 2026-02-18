'use client'

interface SkeletonProps {
  className?: string
}

/**
 * Base Skeleton component with elegant shimmer animation
 */
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-shimmer bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] rounded ${className}`}
    />
  )
}

/**
 * Match Card Skeleton - NYTimes style
 */
export function MatchCardSkeleton() {
  return (
    <div className="bg-white border border-editorial rounded-xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-editorial bg-gradient-to-r from-secondary to-secondary/50">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>

      {/* Teams & Score */}
      <div className="p-6 space-y-5">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="w-14 h-14 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
          </div>
          <Skeleton className="h-12 w-12 rounded-lg" />
        </div>

        {/* VS Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-editorial" />
          <Skeleton className="h-6 w-10 rounded-full" />
          <div className="flex-1 h-px bg-editorial" />
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="w-14 h-14 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-28 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </div>
          <Skeleton className="h-12 w-12 rounded-lg" />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-editorial bg-secondary/30">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-36 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
    </div>
  )
}

/**
 * Match Grid Skeleton with staggered animation
 */
export function MatchGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="animate-fade-in"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <MatchCardSkeleton />
        </div>
      ))}
    </div>
  )
}

/**
 * Sidebar Filter Skeleton
 */
export function SidebarSkeleton() {
  return (
    <div className="bg-white border border-editorial rounded-xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="px-5 py-4 border-b border-editorial bg-gradient-to-r from-secondary to-transparent">
        <Skeleton className="h-6 w-20 rounded" />
      </div>

      {/* Sections */}
      {[1, 2, 3].map((section, sectionIdx) => (
        <div 
          key={section} 
          className="py-4 px-5 border-b border-editorial last:border-b-0"
          style={{ animationDelay: `${sectionIdx * 150}ms` }}
        >
          <Skeleton className="h-4 w-24 mb-4 rounded" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item, itemIdx) => (
              <div 
                key={item} 
                className="flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${(sectionIdx * 4 + itemIdx) * 50}ms` }}
              >
                <Skeleton className="w-5 h-5 rounded" />
                <Skeleton className="h-4 flex-1 max-w-[120px] rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Hero Section Skeleton
 */
export function HeroSkeleton() {
  return (
    <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side */}
          <div className="flex-1 space-y-6 animate-fade-in">
            <Skeleton className="h-6 w-32 rounded-full bg-white/10" />
            <Skeleton className="h-12 w-3/4 rounded bg-white/10" />
            <Skeleton className="h-8 w-1/2 rounded bg-white/10" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-12 w-32 rounded-lg bg-white/10" />
              <Skeleton className="h-12 w-32 rounded-lg bg-white/10" />
            </div>
          </div>
          
          {/* Score Card */}
          <div className="w-full lg:w-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 min-w-[320px]">
              <div className="flex items-center justify-between gap-8">
                <div className="text-center space-y-3">
                  <Skeleton className="w-20 h-20 rounded-xl mx-auto bg-white/20" />
                  <Skeleton className="h-4 w-16 mx-auto rounded bg-white/20" />
                </div>
                <div className="text-center">
                  <Skeleton className="h-16 w-24 rounded-lg bg-white/20" />
                </div>
                <div className="text-center space-y-3">
                  <Skeleton className="w-20 h-20 rounded-xl mx-auto bg-white/20" />
                  <Skeleton className="h-4 w-16 mx-auto rounded bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Article Card Skeleton
 */
export function ArticleCardSkeleton() {
  return (
    <div className="bg-white border border-editorial rounded-xl overflow-hidden animate-fade-in">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-6 w-full rounded" />
        <Skeleton className="h-6 w-3/4 rounded" />
        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
        </div>
        <div className="flex items-center gap-3 pt-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Profile Card Skeleton
 */
export function ProfileCardSkeleton() {
  return (
    <div className="bg-white border border-editorial rounded-xl p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-32 rounded" />
          <Skeleton className="h-4 w-48 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center p-3 bg-secondary rounded-lg">
            <Skeleton className="h-6 w-10 mx-auto mb-2 rounded" />
            <Skeleton className="h-3 w-16 mx-auto rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Table Row Skeleton
 */
export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr className="border-b border-editorial animate-fade-in">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className={`h-4 ${i === 0 ? 'w-8' : i === 1 ? 'w-32' : 'w-12'} rounded`} />
        </td>
      ))}
    </tr>
  )
}

/**
 * Table Skeleton with header and rows
 */
export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white border border-editorial rounded-xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="px-6 py-4 border-b border-editorial bg-secondary/30">
        <Skeleton className="h-6 w-32 rounded" />
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-editorial bg-secondary/20">
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="px-4 py-3 text-left">
                  <Skeleton className={`h-4 ${i === 0 ? 'w-6' : i === 1 ? 'w-20' : 'w-10'} rounded`} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <TableRowSkeleton key={i} cols={cols} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * Comment/Post Skeleton
 */
export function CommentSkeleton() {
  return (
    <div className="flex gap-4 p-4 border-b border-editorial animate-fade-in">
      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-16 rounded" />
        </div>
      </div>
    </div>
  )
}

/**
 * Page Loading Skeleton - Full page loader
 */
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero placeholder */}
      <HeroSkeleton />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SidebarSkeleton />
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <MatchGridSkeleton count={6} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton
