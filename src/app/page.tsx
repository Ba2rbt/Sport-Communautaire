import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="bg-gradient-sport min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="bg-accent/10 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl" />
          <div className="bg-accentOrange/10 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl">
          {/* Logo / Title */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <span className="gradient-text">{t('common.appName')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted-300 mx-auto mb-8 max-w-2xl text-lg md:text-xl">
            {t('home.hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/matches"
              className="bg-gradient-accent text-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold transition-transform hover:scale-105"
            >
              {t('navigation.matches')}
            </Link>
            <Link
              href="/community"
              className="border-muted-600 bg-secondary/50 hover:border-accent hover:bg-secondary inline-flex items-center gap-2 rounded-xl border px-8 py-4 font-semibold text-white transition-colors"
            >
              {t('navigation.community')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Live Matches */}
          <div className="card-hover glass rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-accent/20 flex h-12 w-12 items-center justify-center rounded-xl text-2xl">
                TV
              </div>
              <h3 className="text-xl font-bold">{t('home.sections.liveMatches')}</h3>
            </div>
            <p className="text-muted-400">
              Suivez les scores en temps reel avec notre systeme Realtime.
            </p>
          </div>

          {/* MVP Voting */}
          <div className="card-hover glass rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-accentOrange/20 flex h-12 w-12 items-center justify-center rounded-xl text-2xl">
                MVP
              </div>
              <h3 className="text-xl font-bold">{t('mvp.title')}</h3>
            </div>
            <p className="text-muted-400">
              Votez pour le meilleur joueur de chaque match et de la saison.
            </p>
          </div>

          {/* Community */}
          <div className="card-hover glass rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-sport-mma/20 flex h-12 w-12 items-center justify-center rounded-xl text-2xl">
                Chat
              </div>
              <h3 className="text-xl font-bold">{t('navigation.community')}</h3>
            </div>
            <p className="text-muted-400">
              Rejoignez les discussions et partagez votre passion du sport.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-muted-800 bg-primary/50 border-t px-4 py-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-muted-500">{t('footer.copyright')}</p>
        </div>
      </footer>
    </main>
  );
}
