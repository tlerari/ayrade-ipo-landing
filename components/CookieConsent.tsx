'use client';

/**
 * CookieConsent — bandeau de consentement + chargement GA4.
 *
 * Conformité Loi 18-07 (Algérie) : pas de tracking sans consentement explicite
 * de l'utilisateur. Tant que le consentement n'est pas donné, AUCUN script
 * Google Analytics n'est injecté dans la page.
 *
 * Les choix sont mémorisés dans localStorage avec la clé `ayrade_consent`.
 * Valeurs possibles : "granted" | "denied". Si la clé est absente, le
 * bandeau s'affiche au prochain chargement.
 *
 * Pour révoquer le consentement (si jamais on ajoute un lien "Gérer mes
 * cookies" dans le footer), il suffit d'effacer la clé localStorage et
 * de recharger la page.
 */

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useTranslations, useLocale } from 'next-intl';

const STORAGE_KEY = 'ayrade_consent';
const GA_MEASUREMENT_ID = 'G-J218MFJGDL';

type Consent = 'granted' | 'denied' | null;

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('cookies');
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'granted' || stored === 'denied') {
        setConsent(stored);
      }
    } catch {
      // localStorage indisponible (mode privé strict, etc.) — on n'injecte rien
      // et on n'affiche pas le bandeau. Pas de tracking par défaut.
      setConsent('denied');
    }
  }, []);

  function persist(value: Exclude<Consent, null>) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* no-op : on continue même sans localStorage */
    }
    setConsent(value);
  }

  // Évite le flash SSR : on ne rend rien tant que le composant n'est pas hydraté.
  if (!mounted) return null;

  return (
    <>
      {/* GA4 — chargé UNIQUEMENT si l'utilisateur a accepté. */}
      {consent === 'granted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=Lax;Secure',
              });
            `}
          </Script>
        </>
      )}

      {/* Bandeau de consentement — uniquement si choix pas encore fait. */}
      {consent === null && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={t('title')}
          className="fixed inset-x-0 bottom-0 z-[60] bg-paper/95 backdrop-blur border-t border-navy/15 shadow-lg"
        >
          <div className="max-w-shell mx-auto px-6 lg:px-10 py-4 lg:py-5 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
            <p className="text-[13px] lg:text-[14px] leading-relaxed text-ink/85 flex-1">
              <strong className="font-semibold text-navy">{t('title')}</strong>
              {' — '}
              {t('body')}{' '}
              <a
                href={`/${locale}/confidentialite`}
                className="underline underline-offset-2 hover:text-orange transition-colors"
              >
                {t('learnMore')}
              </a>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => persist('denied')}
                className="px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-navy/80 hover:text-navy transition-colors"
              >
                {t('decline')}
              </button>
              <button
                type="button"
                onClick={() => persist('granted')}
                className="btn-primary px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider"
              >
                {t('accept')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
