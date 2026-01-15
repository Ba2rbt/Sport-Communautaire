import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SportUnion | Votre portail sportif communautaire',
  description: 'Suivez les matches en direct, découvrez les analyses d\'experts et rejoignez la communauté sportive.',
  keywords: ['sport', 'matches', 'football', 'basketball', 'communauté', 'analyses'],
  authors: [{ name: 'SportUnion' }],
  openGraph: {
    title: 'SportUnion',
    description: 'Votre portail sportif communautaire',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="antialiased min-h-screen font-sans">
        <Navbar />
        <main>{children}</main>
        
        {/* Footer */}
        <footer className="bg-primary text-secondary mt-24">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Brand */}
              <div className="md:col-span-1">
                <h2 className="font-editorial text-2xl font-bold mb-4">SportUnion</h2>
                <p className="text-muted text-sm leading-relaxed">
                  Votre portail sportif communautaire. Analyses, matches en direct et passion partagée.
                </p>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h3>
                <ul className="space-y-3">
                  {['Matches', 'Compétitions', 'FanZones'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-muted hover:text-secondary text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Communauté */}
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Communauté</h3>
                <ul className="space-y-3">
                  {['Community', 'Experts', 'Événements'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-muted hover:text-secondary text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Suivez-nous</h3>
                <div className="flex gap-4">
                  {['Twitter', 'Instagram', 'YouTube'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-secondary/10 hover:bg-accent-sport rounded-full flex items-center justify-center transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-16 pt-8 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted text-sm">
                © 2026 SportUnion. Tous droits réservés.
              </p>
              <div className="flex gap-6">
                {['Confidentialité', 'Conditions', 'Cookies'].map((link) => (
                  <a key={link} href="#" className="text-muted hover:text-secondary text-sm transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
