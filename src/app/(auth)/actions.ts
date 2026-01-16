'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface AuthState {
  error?: string
  success?: boolean
  message?: string
}

export async function login(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const redirectTo = formData.get('redirectTo') as string | null

  if (!email || !password) {
    return { error: 'Email et mot de passe requis' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Email ou mot de passe incorrect' }
  }

  revalidatePath('/', 'layout')
  redirect(redirectTo || '/')
}

export async function signup(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  if (!email || !password) {
    return { error: 'Email et mot de passe requis' }
  }

  if (password.length < 6) {
    return { error: 'Le mot de passe doit contenir au moins 6 caractères' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    console.error('Signup error:', error.message)
    
    if (error.message.includes('already registered')) {
      return { error: 'Cet email est déjà utilisé' }
    }
    if (error.message.includes('valid email')) {
      return { error: 'Veuillez entrer une adresse email valide' }
    }
    if (error.message.includes('Password')) {
      return { error: 'Le mot de passe doit contenir au moins 6 caractères' }
    }
    if (error.message.includes('rate limit')) {
      return { error: 'Trop de tentatives, veuillez réessayer plus tard' }
    }
    // Show actual error for debugging
    return { error: `Erreur: ${error.message}` }
  }

  // Check if email confirmation is required
  if (data?.user?.identities?.length === 0) {
    return { error: 'Cet email est déjà utilisé' }
  }

  // If email confirmation is enabled in Supabase
  if (data?.user && !data?.session) {
    return { 
      success: true,
      error: undefined,
      message: 'Vérifiez votre email pour confirmer votre inscription'
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
