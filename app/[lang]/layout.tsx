import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { locales, localeDirections, type Locale } from '@/i18n';
import { CookieConsent } from '@/components/CookieConsent';

// Pixel ID Meta — campagne conversion Rania CHAIB (02/06/2026).
const META_PIXEL_ID = '2510693299361888';

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

        {/* Meta Pixel — campagne conversion Meta Ads (demande Rania CHAIB
            02/06/2026). Chargé indépendamment du consentement cookies (option
            (b) explicitement choisie par le client — risque Loi 18-07 et RGPD
            assumé). Mention à ajouter dans la politique de confidentialité §7
            au même titre que Metricool. Events custom posés au clic via le
            composant <TrackedAnchor /> (Lead sur bulletin + fiche ASA,
            ViewContent sur les autres liens de la DataRoom). */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height={1}
            width={1}
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
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
