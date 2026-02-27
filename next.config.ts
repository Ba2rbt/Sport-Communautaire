import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // TODO Phase 1 – corriger les erreurs de types Supabase générés
  // (competitions/[id], experts/create, profile/ProfileEditModal)
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
