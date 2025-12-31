import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sport Communautaire - Plateforme Multisport',
  description:
    'Plateforme communautaire multisport gratuite. Suivez les matchs, votez pour le MVP, rejoignez la communauté.',
  keywords: ['sport', 'football', 'basket', 'MMA', 'communauté', 'MVP', 'matchs', 'stats'],
  authors: [{ name: 'Sport Communautaire' }],
  openGraph: {
    title: 'Sport Communautaire',
    description: 'Plateforme communautaire multisport gratuite',
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-primary text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
