import type { Metadata, Viewport } from 'next';
import { Fraunces, Manrope, IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Amiri } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-arabic',
});

// Amiri — naskh classique, typographie statutaire pour les grands titres AR
// et la citation LMB (équivalent Fraunces pour l'arabe).
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-amiri',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ipo.ayrade.com'),
  title: {
    default: "AYRADE · Introduction en Bourse d'Alger",
    template: '%s',
  },
  description: "AYRADE — Introduction en Bourse d'Alger. Souscription du 1er au 30 juin 2026.",
  // Preview : site verrouillé derrière Basic Auth, on l'exclut des moteurs
  // tant que l'opération n'est pas publique. À rouvrir au go-live.
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#0B2545',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable} ${plexArabic.variable} ${amiri.variable}`}>
      <body className="font-sans antialiased text-ink selection:bg-orange/30">{children}</body>
    </html>
  );
}
