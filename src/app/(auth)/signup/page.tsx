'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signup, type AuthState } from '../actions'

const initialState: AuthState = {}

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, initialState)

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {/* Header */}
      <header className="border-b border-editorial bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="font-editorial text-2xl font-bold text-primary">
            SportUnion
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="font-editorial text-4xl font-bold text-primary mb-3">
              Créer un compte
            </h1>
            <p className="text-muted">
              Rejoignez la communauté SportUnion
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-editorial rounded-lg p-8">
            <form action={formAction} className="space-y-6">
              {/* Success Message (email confirmation) */}
              {state.success && state.message && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">✓ Inscription réussie !</p>
                  <p className="text-sm text-green-600 mt-1">{state.message}</p>
                </div>
              )}

              {/* Error Message */}
              {state.error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{state.error}</p>
                </div>
              )}

              {/* Full Name Field */}
              <div>
                <label 
                  htmlFor="fullName" 
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Nom complet
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  className="w-full px-4 py-3 border border-editorial rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-sport focus:border-transparent transition-all text-primary placeholder:text-muted/50"
                  placeholder="Jean Dupont"
                />
              </div>

              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-editorial rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-sport focus:border-transparent transition-all text-primary placeholder:text-muted/50"
                  placeholder="vous@exemple.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 border border-editorial rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-sport focus:border-transparent transition-all text-primary placeholder:text-muted/50"
                  placeholder="Min. 6 caractères"
                />
                <p className="mt-2 text-xs text-muted">
                  Minimum 6 caractères
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-semibold rounded-lg transition-colors"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Création...
                  </span>
                ) : (
                  'Créer mon compte'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-editorial" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-muted">ou</span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-muted">
              Déjà un compte ?{' '}
              <Link 
                href="/login" 
                className="text-accent-sport hover:text-accent-sport/80 font-medium transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </div>

          {/* Footer Text */}
          <p className="text-center text-xs text-muted mt-8">
            En créant un compte, vous acceptez nos{' '}
            <a href="#" className="underline hover:text-primary">conditions d&apos;utilisation</a>
            {' '}et notre{' '}
            <a href="#" className="underline hover:text-primary">politique de confidentialité</a>.
          </p>
        </div>
      </main>
    </div>
  )
}
