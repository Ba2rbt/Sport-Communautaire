import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import NavbarClient from './NavbarClient'

const navLinks = [
  { href: '/matches', label: 'Matches' },
  { href: '/competitions', label: 'Compétitions' },
  { href: '/fanzones', label: 'FanZones' },
  { href: '/community', label: 'Community' },
  { href: '/experts', label: 'Experts' },
]

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-editorial">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-editorial text-2xl font-bold text-primary tracking-tight">
              SportUnion
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-primary transition-colors duration-200 tracking-wide uppercase"
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
