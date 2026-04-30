import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, localeDirections, type Locale } from '@/i18n';
import { CookieConsent } from '@/components/CookieConsent';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!locales.includes(lang as Locale)) notFound();

  setRequestLocale(lang);

  const messages = await getMessages();
  const dir = localeDirections[lang as Locale];

  return (
    <NextIntlClientProvider messages={messages}>
      <div lang={lang} dir={dir}>
        {children}
        <CookieConsent />
        {/* Metricool tracker pixel — demande client 29/04/2026.
            Chargé indépendamment du consentement cookies (risque Loi 18-07
            explicitement assumé par le client). Pixel 1×1 offscreen, sans
            impact layout. Mention dans la politique de confidentialité §7. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://tracker.metricool.com/c3po.jpg?hash=2f35743cbd5ad6d98c9bd7549fced693"
          alt=""
          width={1}
          height={1}
          aria-hidden="true"
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
        />
      </div>
    </NextIntlClientProvider>
  );
}

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const messages = (await import(`@/messages/${lang}.json`)).default;
  return {
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        fr: '/fr',
        ar: '/ar',
        en: '/en',
      },
    },
    openGraph: {
      title: messages.meta.ogTitle,
      description: messages.meta.ogDescription,
      locale: lang === 'ar' ? 'ar_DZ' : lang === 'en' ? 'en_US' : 'fr_DZ',
      type: 'website',
      images: [{ url: '/assets/og-image.jpg', width: 1200, height: 630, alt: 'AYRADE IPO' }],
    },
  };
}
