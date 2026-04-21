'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeLabels, type Locale } from '@/i18n';

export function LanguageSwitcher() {
  const current = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('langSwitch');

  const switchTo = (next: Locale) => {
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/') || `/${next}`);
  };

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="hidden md:flex border border-navy/20 font-mono text-[10px] uppercase tracking-micro"
    >
      {locales.map((loc) => {
        const active = loc === current;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-pressed={active}
            className={`px-2.5 py-1.5 transition-colors ${
              active ? 'bg-navy text-paper' : 'text-ink hover:bg-navy/5'
            }`}
          >
            {localeLabels[loc]}
          </button>
        );
      })}
    </div>
  );
}
