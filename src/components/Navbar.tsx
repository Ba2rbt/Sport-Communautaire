import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import NavbarClient from './NavbarClient'

const navLinks = [
  { href: '/matches', label: 'Matches' },
  { href: '/competitions', label: 'Compétitions' },
  { href: '/mvp', label: '🏆 MVP' },
  { href: '/fanzones', label: 'FanZones' },
  { href: '/community', label: 'Community' },
  { href: '/experts', label: 'Experts' },
]

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-7xl px-4 md:px-6">
      <div className="glass rounded-2xl border-white/10 px-6 py-3 shadow-2xl backdrop-blur-xl bg-black/40">
        <div className="flex items-center justify-between">
          {/* Logo Modernisé */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-live to-emerald-600 shadow-lg shadow-accent-live/20 group-hover:shadow-accent-live/40 transition-all duration-300 transform group-hover:-rotate-3">
              <span className="font-bold text-white text-lg">S</span>
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-sans text-xl font-bold tracking-tight text-white group-hover:text-accent-live transition-colors">
              SportUnion
            </span>
          </Link>

          {/* Desktop Navigation - Pill style */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent-live rounded-full group-hover:w-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            <NavbarClient user={user} navLinks={navLinks} />
          </div>
        </div>
      </div>
    </nav>
  )
}
