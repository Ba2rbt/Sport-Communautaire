/**
 * Design System de la plateforme selon la feuille de route
 * 
 * Ce fichier contient les classes Tailwind standardisées pour maintenir
 * la cohérence visuelle sur toute la plateforme.
 */

// ============================================
// COULEURS (définies dans globals.css)
// ============================================
/**
 * - primary: #050816 (fond principal)
 * - secondary: #0f172a (cards, panels)
 * - accent: #22c55e (état live, CTA)
 * - accentOrange: #f97316 (MVP, trophées)
 * - muted: #64748b (texte secondaire)
 */

// ============================================
// LAYOUTS
// ============================================
export const layouts = {
  /** Container principal : `max-w-6xl mx-auto px-4 md:px-6` */
  container: 'max-w-6xl mx-auto px-4 md:px-6',
  
  /** Grille matchs responsive : `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4` */
  gridMatches: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4',
  
  /** Grille articles responsive : `grid grid-cols-1 md:grid-cols-3 gap-6` */
  gridArticles: 'grid grid-cols-1 md:grid-cols-3 gap-6',
}

// ============================================
// TYPOGRAPHIE
// ============================================
export const typography = {
  /** Titre page : `text-3xl md:text-4xl font-bold` */
  pageTitle: 'text-3xl md:text-4xl font-bold text-slate-100',
  
  /** Titre section : `text-xl md:text-2xl font-semibold tracking-tight` */
  sectionTitle: 'text-xl md:text-2xl font-semibold tracking-tight text-slate-100',
  
  /** Sous-titre : `text-xl font-semibold` */
  subtitle: 'text-xl font-semibold text-slate-100',
  
  /** Texte courant : `text-sm md:text-base text-slate-200` */
  body: 'text-sm md:text-base text-slate-200',
  
  /** Meta/info : `text-xs uppercase tracking-wide text-slate-400` */
  meta: 'text-xs uppercase tracking-wide text-slate-400',
}

// ============================================
// COMPOSANTS DE BASE
// ============================================
export const components = {
  /** 
   * Card match/combat standard
   * Usage : wrapper pour MatchCard, CardFight
   */
  card: 'bg-secondary/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 hover:border-accent/60 transition',
  
  /**
   * Fond général de la page
   */
  pageBackground: 'bg-primary text-slate-100 min-h-screen',
}

// ============================================
// BUTTONS (voir src/components/ui/Button.tsx)
// ============================================
export const buttons = {
  /** Bouton principal (accent vert) */
  primary: 'inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition',
  
  /** Bouton secondaire (border + fond secondary) */
  secondary: 'inline-flex items-center justify-center rounded-lg border border-slate-600 bg-secondary px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 transition',
}

// ============================================
// TAGS SPORTS
// ============================================
export const sportTags = {
  /** Football : `bg-green-500/10 text-green-400 text-[11px] rounded-full px-2 py-0.5` */
  football: 'bg-green-500/10 text-green-400 text-[11px] rounded-full px-2 py-0.5 font-semibold uppercase',
  
  /** Basketball : `bg-orange-500/10 text-orange-400` */
  basketball: 'bg-orange-500/10 text-orange-400 text-[11px] rounded-full px-2 py-0.5 font-semibold uppercase',
  
  /** MMA : `bg-red-500/10 text-red-400` */
  mma: 'bg-red-500/10 text-red-400 text-[11px] rounded-full px-2 py-0.5 font-semibold uppercase',
}

// ============================================
// BADGES
// ============================================
export const badges = {
  /** Badge Live : voir BadgeLive component */
  live: 'bg-accent text-black text-[10px] font-semibold rounded-full px-2 py-0.5 uppercase',
  
  /** Badge MVP : voir BadgeMVP component */
  mvp: 'inline-flex items-center gap-1 rounded-full bg-accent-orange/10 text-accent-orange px-2 py-0.5 text-[11px] font-semibold uppercase',
}

// ============================================
// TABLES (voir src/components/ui/TableStats.tsx)
// ============================================
export const tables = {
  /** Table wrapper : `w-full text-xs md:text-sm text-slate-200` */
  table: 'w-full text-xs md:text-sm text-slate-200',
  
  /** Header : `border-b border-slate-700 text-slate-400 uppercase text-[11px]` */
  header: 'border-b border-slate-700 text-slate-400 uppercase text-[11px] font-semibold',
  
  /** Row : `border-b border-slate-800/60` */
  row: 'border-b border-slate-800/60 hover:bg-slate-800/20 transition',
}

// ============================================
// HELPERS
// ============================================

/**
 * Retourne la classe Tailwind pour un tag de sport
 * @param sport - 'football', 'basketball', 'mma', etc.
 */
export function getSportTagClass(sport: string): string {
  const normalized = sport.toLowerCase()
  if (normalized.includes('foot') || normalized.includes('soccer')) return sportTags.football
  if (normalized.includes('basket')) return sportTags.basketball
  if (normalized.includes('mma') || normalized.includes('combat') || normalized.includes('ufc')) return sportTags.mma
  return sportTags.football // default
}

/**
 * Combine plusieurs classes avec des espaces
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
