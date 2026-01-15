'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface Team {
  id: string
  name: string
  shortName: string
  logo: string
}

interface MVPVoteProps {
  matchId: string
  homeTeam: Team
  awayTeam: Team
  user: User | null
}

export default function MVPVote({ matchId, homeTeam, awayTeam, user }: MVPVoteProps) {
  const [homeVotes, setHomeVotes] = useState(0)
  const [awayVotes, setAwayVotes] = useState(0)
  const [userVote, setUserVote] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const totalVotes = homeVotes + awayVotes
  const homePercent = totalVotes > 0 ? Math.round((homeVotes / totalVotes) * 100) : 50
  const awayPercent = totalVotes > 0 ? Math.round((awayVotes / totalVotes) * 100) : 50

  // Fetch initial votes
  useEffect(() => {
    // Mock initial data - in production, fetch from Supabase
    setHomeVotes(127)
    setAwayVotes(89)
  }, [matchId])

  // Check if user has voted
  useEffect(() => {
    if (!user) return
    // Mock - in production, check Supabase
    // For demo, no initial vote
  }, [user, matchId])

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel(`mvp_votes_${matchId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'mvp_votes',
          filter: `match_id=eq.${matchId}`,
        },
        () => {
          // Refetch vote counts
          // For demo, we'll simulate realtime updates
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [matchId, supabase])

  const handleVote = async (teamId: string) => {
    if (!user) {
      // Redirect to login
      window.location.href = `/login?redirectTo=/match/${matchId}`
      return
    }

    setIsLoading(true)

    try {
      // Simulate vote - in production, insert into Supabase
      if (userVote === teamId) {
        // Remove vote
        if (teamId === homeTeam.id) {
          setHomeVotes(prev => prev - 1)
        } else {
          setAwayVotes(prev => prev - 1)
        }
        setUserVote(null)
      } else {
        // Switch vote or new vote
        if (userVote) {
          // Remove old vote
          if (userVote === homeTeam.id) {
            setHomeVotes(prev => prev - 1)
          } else {
            setAwayVotes(prev => prev - 1)
          }
        }
        // Add new vote
        if (teamId === homeTeam.id) {
          setHomeVotes(prev => prev + 1)
        } else {
          setAwayVotes(prev => prev + 1)
        }
        setUserVote(teamId)
      }
    } catch (error) {
      console.error('Vote error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-white border border-editorial rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-editorial bg-gradient-to-r from-accent-mvp/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-mvp rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <h2 className="font-editorial text-xl font-bold text-primary">Vote MVP</h2>
            <p className="text-sm text-muted">Quelle équipe mérite le titre ?</p>
          </div>
        </div>
      </div>

      {/* Vote Buttons */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Home Team Button */}
          <button
            onClick={() => handleVote(homeTeam.id)}
            disabled={isLoading}
            className={`
              relative p-6 rounded-xl border-2 transition-all duration-300
              ${userVote === homeTeam.id 
                ? 'border-accent-sport bg-accent-sport/5 shadow-lg shadow-accent-sport/20' 
                : 'border-editorial hover:border-accent-sport/50 hover:bg-secondary/50'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-4xl">{homeTeam.logo}</span>
              <span className="font-semibold text-primary">{homeTeam.shortName}</span>
            </div>
            {userVote === homeTeam.id && (
              <div className="absolute top-2 right-2">
                <svg className="w-6 h-6 text-accent-sport" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>

          {/* Away Team Button */}
          <button
            onClick={() => handleVote(awayTeam.id)}
            disabled={isLoading}
            className={`
              relative p-6 rounded-xl border-2 transition-all duration-300
              ${userVote === awayTeam.id 
                ? 'border-accent-mvp bg-accent-mvp/5 shadow-lg shadow-accent-mvp/20' 
                : 'border-editorial hover:border-accent-mvp/50 hover:bg-secondary/50'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-4xl">{awayTeam.logo}</span>
              <span className="font-semibold text-primary">{awayTeam.shortName}</span>
            </div>
            {userVote === awayTeam.id && (
              <div className="absolute top-2 right-2">
                <svg className="w-6 h-6 text-accent-mvp" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        </div>

        {/* Results Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-accent-sport">{homePercent}%</span>
            <span className="text-muted">{totalVotes} votes</span>
            <span className="font-semibold text-accent-mvp">{awayPercent}%</span>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden bg-secondary">
            <div 
              className="bg-accent-sport transition-all duration-700 ease-out"
              style={{ width: `${homePercent}%` }}
            />
            <div 
              className="bg-accent-mvp transition-all duration-700 ease-out"
              style={{ width: `${awayPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted">
            <span>{homeVotes} votes</span>
            <span>{awayVotes} votes</span>
          </div>
        </div>

        {/* Realtime indicator */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
          <span className="w-2 h-2 bg-accent-live rounded-full animate-pulse-live" />
          <span>Mise à jour en temps réel</span>
        </div>
      </div>

      {/* Login CTA */}
      {!user && (
        <div className="px-6 py-4 border-t border-editorial bg-secondary/30 text-center">
          <p className="text-sm text-muted">
            <a href={`/login?redirectTo=/match/${matchId}`} className="text-accent-sport hover:underline font-medium">
              Connectez-vous
            </a>
            {' '}pour voter
          </p>
        </div>
      )}
    </section>
  )
}
