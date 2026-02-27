'use client'

import { Suspense } from 'react'
import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { login, type AuthState } from '../actions'

const initialState: AuthState = {}

function LoginForm() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <div className="glass bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
      <form action={formAction} className="space-y-6">
        {redirectTo && (
          <input type="hidden" name="redirectTo" value={redirectTo} />
        )}

        {state.error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-500 text-center">{state.error}</p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="nom@exemple.com"
            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-accent-sport focus:ring-1 focus:ring-accent-sport text-white placeholder:text-slate-600 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-300">Mot de passe</label>
            <a href="#" className="text-xs text-accent-sport hover:text-white transition-colors">
              Oublié ?
            </a>
          </div>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-accent-sport focus:ring-1 focus:ring-accent-sport text-white placeholder:text-slate-600 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-white/5 text-center">
        <p className="text-sm text-slate-400">
          Pas encore de compte ?{' '}
          <Link
            href="/signup"
            className="text-accent-sport font-bold hover:text-white transition-colors"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-accent-sport rounded-full mx-auto flex items-center justify-center mb-4">
            <span className="font-bold text-black text-xl">S</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Bon retour</h1>
          <p className="text-slate-400">Connectez-vous pour accéder à votre espace.</p>
        </div>

        {/* Suspense requis par Next.js pour useSearchParams() */}
        <Suspense
          fallback={
            <div className="glass bg-white/5 border border-white/10 rounded-2xl p-8 h-64 animate-pulse" />
          }
        >
          <LoginForm />
        </Suspense>

        <p className="mt-8 text-center text-xs text-slate-500">
          © 2026 SportUnion. Tous droits réservés.
        </p>
      </div>
    </div>
  )
}
