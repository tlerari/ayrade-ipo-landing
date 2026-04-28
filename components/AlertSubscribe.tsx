'use client';

/**
 * AlertSubscribe — bloc « Soyez prévenu » sur la landing AYRADE IPO.
 *
 * Inséré entre la DataRoom et le Footer. Permet aux visiteurs de s'inscrire
 * pour recevoir une alerte e-mail le 1ᵉʳ juin 2026 à l'ouverture de la
 * souscription.
 *
 * Conformité Loi 18-07 (Algérie) :
 *   - Consentement explicite obligatoire (checkbox).
 *   - Double opt-in (un mail de confirmation est envoyé avant toute
 *     conservation effective des données — voir backend).
 *   - Lien de désinscription dans chaque mail.
 *
 * Anti-spam :
 *   - Honeypot field (`hp_field`) caché en CSS, doit rester vide.
 *   - Rate limit côté serveur (5 inscriptions / IP / heure).
 *
 * Affiche aussi un bandeau de retour si l'URL contient `?alert=…`
 * (après clic sur lien de confirmation ou désinscription dans un e-mail).
 */

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

type Status = 'idle' | 'loading' | 'success' | 'already' | 'error' | 'invalid' | 'rateLimited';
type ReturnFlag = 'confirmed' | 'already-confirmed' | 'unsubscribed' | 'invalid' | null;

export function AlertSubscribe() {
  const t = useTranslations('alert');
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState(''); // honeypot — doit rester vide
  const [status, setStatus] = useState<Status>('idle');
  const [returnFlag, setReturnFlag] = useState<ReturnFlag>(null);

  // Détecte le retour depuis un mail de confirmation / désinscription.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const alert = params.get('alert');
    if (
      alert === 'confirmed' ||
      alert === 'already-confirmed' ||
      alert === 'unsubscribed' ||
      alert === 'invalid'
    ) {
      setReturnFlag(alert as ReturnFlag);
      // On nettoie l'URL pour éviter de réafficher au reload, mais on garde le hash.
      const url = new URL(window.location.href);
      url.searchParams.delete('alert');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;

    if (!email.trim()) {
      setStatus('invalid');
      return;
    }
    if (!consent) {
      setStatus('invalid');
      return;
    }

    setStatus('loading');
    try {
      const r = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          locale,
          consent: true,
          hp_field: hp,
        }),
      });

      if (r.status === 429) {
        setStatus('rateLimited');
        return;
      }

      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        setStatus('error');
        return;
      }
      if (data?.message === 'already_confirmed') {
        setStatus('already');
      } else {
        setStatus('success');
      }
    } catch {
      setStatus('error');
    }
  }

  // ----- Affichage du bandeau de retour (top du composant) -----
  const returnBanner = returnFlag && (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-md border px-5 py-4 mb-8 text-[14px] leading-relaxed ${
        returnFlag === 'confirmed' || returnFlag === 'unsubscribed'
          ? 'border-orange/30 bg-orange/5 text-navy'
          : 'border-navy/20 bg-paper text-navy/90'
      }`}
    >
      {t(`return.${returnFlag === 'already-confirmed' ? 'alreadyConfirmed' : returnFlag}`)}
    </div>
  );

  // ----- État après soumission -----
  if (status === 'success' || status === 'already') {
    return (
      <section
        id="alert"
        aria-labelledby="alert-title"
        className="bg-paper border-t border-navy/10"
      >
        <div className="max-w-shell mx-auto px-6 lg:px-10 py-16 lg:py-20 max-w-3xl">
          {returnBanner}
          <p className="text-[11px] tracking-[0.18em] uppercase text-orange font-semibold mb-3">
            {t('eyebrow')}
          </p>
          <h2 id="alert-title" className="text-[28px] lg:text-[32px] font-serif text-navy leading-tight mb-4">
            {status === 'success' ? t('success.title') : t('success.alreadyTitle')}
          </h2>
          <p className="text-[15px] leading-relaxed text-ink/85">
            {status === 'success' ? t('success.body') : t('success.alreadyBody')}
          </p>
        </div>
      </section>
    );
  }

  // ----- Formulaire (idle / loading / erreurs) -----
  return (
    <section
      id="alert"
      aria-labelledby="alert-title"
      className="bg-paper border-t border-navy/10"
    >
      <div className="max-w-shell mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="max-w-3xl">
          {returnBanner}
          <p className="text-[11px] tracking-[0.18em] uppercase text-orange font-semibold mb-3">
            {t('eyebrow')}
          </p>
          <h2 id="alert-title" className="text-[28px] lg:text-[32px] font-serif text-navy leading-tight mb-4">
            {t('title')}
          </h2>
          <p className="text-[15px] leading-relaxed text-ink/85 mb-8 max-w-2xl">
            {t('lead')}
          </p>

          <form onSubmit={onSubmit} noValidate className="space-y-5">
            {/* Honeypot (caché aux humains, visible aux bots). */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <label>
                Ne pas remplir
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <label className="sr-only" htmlFor="alert-email">{t('emailLabel')}</label>
              <input
                id="alert-email"
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="flex-1 px-4 py-3 text-[15px] bg-white border border-navy/20 rounded-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || !email || !consent}
                className="btn-primary px-6 py-3 text-[12px] font-semibold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? t('submitLoading') : t('submit')}
              </button>
            </div>

            <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink/85 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                disabled={status === 'loading'}
                className="mt-1 h-4 w-4 shrink-0 rounded-sm border-navy/30 text-orange focus:ring-1 focus:ring-orange"
              />
              <span dangerouslySetInnerHTML={{ __html: t.raw('consent') }} />
            </label>

            {status === 'invalid' && (
              <p role="alert" className="text-[13px] text-red-700">{t('errors.invalid')}</p>
            )}
            {status === 'rateLimited' && (
              <p role="alert" className="text-[13px] text-red-700">{t('errors.rateLimited')}</p>
            )}
            {status === 'error' && (
              <p role="alert" className="text-[13px] text-red-700">{t('errors.server')}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
