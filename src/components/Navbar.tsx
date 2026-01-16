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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-editorial">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent-live rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent-live/25 group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="font-editorial text-xl font-bold text-primary tracking-tight">
              SportUnion
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted hover:text-accent-sport hover:bg-accent-sport/5 rounded-lg transition-all duration-200 tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <NavbarClient user={user} navLinks={navLinks} />
        </div>
      </div>
    </nav>
  )
}
