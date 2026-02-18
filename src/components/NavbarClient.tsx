'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'
import UserMenu from './UserMenu'
import { PrimaryButton } from './ui'

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

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

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
              className="text-sm font-medium text-muted hover:text-primary transition-colors hover-underline"
            >
              Connexion
            </Link>
            <Link href="/signup">
              <PrimaryButton size="sm">
                S&apos;inscrire
              </PrimaryButton>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button (Burger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative w-10 h-10 flex items-center justify-center text-primary hover:bg-primary/5 rounded-lg transition-colors touch-target"
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isOpen}
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          {/* Animated burger lines */}
          <span 
            className={`
              block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-out origin-center
              ${isOpen ? 'rotate-45 translate-y-2' : ''}
            `}
          />
          <span 
            className={`
              block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-out
              ${isOpen ? 'opacity-0 scale-x-0' : ''}
            `}
          />
          <span 
            className={`
              block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-out origin-center
              ${isOpen ? '-rotate-45 -translate-y-2' : ''}
            `}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Panel */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 md:hidden
          shadow-2xl transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-editorial">
          <span className="font-editorial text-xl font-bold text-primary">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-muted hover:text-primary hover:bg-secondary rounded-lg transition-colors"
            aria-label="Fermer le menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <ul className="space-y-1">
            {navLinks.map((link, index) => (
              <li 
                key={link.href}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="
                    flex items-center gap-3 px-4 py-4 
                    text-base font-medium text-primary 
                    hover:bg-accent-sport/5 hover:text-accent-sport 
                    rounded-xl transition-all duration-200
                    active:scale-[0.98]
                  "
                >
                  <span className="text-lg">
                    {link.label.includes('MVP') ? '🏆' : 
                     link.label.includes('Match') ? '⚽' :
                     link.label.includes('Compét') ? '🏟️' :
                     link.label.includes('Fan') ? '📍' :
                     link.label.includes('Commun') ? '💬' :
                     link.label.includes('Expert') ? '📰' : '→'}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer with Auth */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-secondary border-t border-editorial">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-sport to-accent-sport/70 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-accent-sport/25">
                  {(user.user_metadata?.full_name || user.email || 'U')
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-primary truncate">
                    {user.user_metadata?.full_name || 'Membre'}
                  </p>
                  <p className="text-xs text-muted truncate">{user.email}</p>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="
                  flex items-center justify-center gap-2 w-full py-3 
                  bg-white border border-editorial rounded-xl
                  text-sm font-medium text-primary
                  hover:bg-primary hover:text-white
                  transition-all duration-200 active:scale-[0.98]
                "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mon profil
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/signup" onClick={() => setIsOpen(false)} className="block">
                <PrimaryButton className="w-full py-3.5 text-base">
                  S&apos;inscrire gratuitement
                </PrimaryButton>
              </Link>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="
                  flex items-center justify-center w-full py-3 
                  text-sm font-medium text-muted hover:text-primary 
                  transition-colors
                "
              >
                Déjà un compte ? <span className="ml-1 text-accent-sport">Connexion</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
