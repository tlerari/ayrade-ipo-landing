import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, localeDirections, type Locale } from '@/i18n';

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
