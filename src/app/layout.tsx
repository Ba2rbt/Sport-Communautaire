import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sport-union.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SportUnion – Scores, stats & communauté sportive',
    template: '%s | SportUnion',
  },
  description:
    'Suivez les scores en direct, consultez les statistiques détaillées, votez pour le MVP et rejoignez la communauté sportive francophone. Football, basket, MMA et plus.',
  keywords: [
    'sport',
    'football',
    'basketball',
    'MMA',
    'scores',
    'stats',
    'MVP',
    'ligue 1',
    'top 14',
    'communauté sportive',
    'fan zone',
  ],
  authors: [{ name: 'SportUnion', url: siteUrl }],
  creator: 'SportUnion',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'SportUnion',
    title: 'SportUnion – Scores, stats & communauté sportive',
    description: 'Scores en direct, stats, votes MVP et communauté sportive francophone.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'SportUnion – portail sportif communautaire',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SportUnion – Scores, stats & communauté sportive',
    description: 'Scores en direct, stats, votes MVP et communauté sportive francophone.',
    images: ['/og-default.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        {/* Leaflet CSS for maps */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="antialiased min-h-screen font-sans">
        <Navbar />
        <main>{children}</main>

        {/* Footer */}
        <footer className="relative bg-[#020617] text-white mt-12 overflow-hidden border-t border-white/5">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(34,197,94,0.03),_transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
              {/* Brand Column */}
              <div className="md:col-span-4 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="bg-accent-sport w-6 h-6 rounded-full flex items-center justify-center">
                    <span className="text-[#020617] font-bold text-xs">S</span>
                  </div>
                  <h2 className="font-sans text-xl font-bold tracking-tight">SportUnion</h2>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  La plateforme de référence pour le sport amateur et communautaire. Statistiques en
                  temps réel, analyses d&apos;experts et passion partagée.
                </p>
                <div className="flex gap-3 pt-2">
                  {['Twitter', 'Instagram', 'Discord'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-accent-sport hover:text-black flex items-center justify-center transition-all duration-300 group"
                    >
                      <span className="sr-only">{social}</span>
                      <svg
                        className="w-4 h-4 text-slate-400 group-hover:text-black transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Columns */}
              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-mono text-xs text-accent-sport uppercase tracking-widest mb-6">
                    Plateforme
                  </h3>
                  <ul className="space-y-3">
                    {['Matches en direct', 'Compétitions', 'FanZones', 'Classements'].map(
                      (link) => (
                        <li key={link}>
                          <a
                            href="#"
                            className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 block text-sm"
                          >
                            {link}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-accent-sport uppercase tracking-widest mb-6">
                    Communauté
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Forum & Débats',
                      'Analyses Experts',
                      'Devenir Contributeur',
                      'Événements',
                    ].map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 block text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-accent-sport uppercase tracking-widest mb-6">
                    Légal
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Conditions d'utilisation",
                      'Politique de confidentialité',
                      'Cookies',
                      'Contact',
                    ].map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 block text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-xs font-mono">
                © 2026 SPORTUNION. TOUS DROITS RÉSERVÉS.
              </p>
              <div className="flex gap-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-slate-500 text-xs font-mono tracking-widest">
                  SYSTÈME OPÉRATIONNEL
                </span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
