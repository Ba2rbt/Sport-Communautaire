'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'
import UserMenu from './UserMenu'

interface NavLink {
  href: string
  label: string
}

interface NavbarClientProps {
  user: User | null
  navLinks: NavLink[]
}

export default function NavbarClient({ user, navLinks }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Auth */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <UserMenu user={user} />
        ) : (
          <>
            <Link
              href="/login"
              className="text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-full transition-colors"
            >
              S&apos;inscrire
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-primary"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-secondary/95 backdrop-blur-sm border-b border-editorial md:hidden">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-muted hover:text-primary transition-colors duration-200 tracking-wide uppercase"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 mt-4 border-t border-editorial flex flex-col gap-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-accent-sport text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {(user.user_metadata?.full_name || user.email || 'U')
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary">
                          {user.user_metadata?.full_name || 'Membre'}
                        </p>
                        <p className="text-xs text-muted">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium text-muted hover:text-primary transition-colors"
                    >
                      Mon profil
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium text-muted hover:text-primary transition-colors"
                    >
                      Connexion
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-3 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg text-center transition-colors"
                    >
                      S&apos;inscrire
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
