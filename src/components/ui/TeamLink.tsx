'use client'

import Link from 'next/link'
import { getTeamSlug } from '@/lib/utils'
import { MouseEvent, ReactNode } from 'react'

interface TeamLinkProps {
  teamName: string
  children: ReactNode
  className?: string
  showIcon?: boolean
  stopPropagation?: boolean
}

/**
 * Lien cliquable vers une page équipe
 * Gère automatiquement le slug et empêche la propagation si nécessaire
 */
export function TeamLink({ 
  teamName, 
  children, 
  className = '',
  showIcon = false,
  stopPropagation = true
}: TeamLinkProps) {
  const slug = getTeamSlug(teamName)

  const handleClick = (e: MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation()
    }
  }

  return (
    <Link 
      href={`/team/${slug}`}
      onClick={handleClick}
      className={`
        inline-flex items-center gap-1.5
        hover:text-accent-sport transition-colors
        ${className}
      `}
    >
      {children}
      {showIcon && (
        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </Link>
  )
}

interface PlayerLinkProps {
  playerName: string
  children: ReactNode
  className?: string
  showIcon?: boolean
  stopPropagation?: boolean
}

/**
 * Lien cliquable vers une page joueur
 * Gère automatiquement le slug et empêche la propagation si nécessaire
 */
export function PlayerLink({ 
  playerName, 
  children, 
  className = '',
  showIcon = false,
  stopPropagation = true
}: PlayerLinkProps) {
  const { getPlayerSlug } = require('@/lib/utils')
  const slug = getPlayerSlug(playerName)

  const handleClick = (e: MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation()
    }
  }

  return (
    <Link 
      href={`/player/${slug}`}
      onClick={handleClick}
      className={`
        inline-flex items-center gap-1.5
        hover:text-accent-sport transition-colors
        ${className}
      `}
    >
      {children}
      {showIcon && (
        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </Link>
  )
}

export default TeamLink
