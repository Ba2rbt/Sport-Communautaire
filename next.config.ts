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
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'img.api-sports.io',
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
      },
      {
        protocol: 'https',
        hostname: 'crests.football-data.org',
      },
    ],
  },
}

export default nextConfig
