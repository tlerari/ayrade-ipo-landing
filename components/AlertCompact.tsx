'use client';

/**
 * AlertCompact — version condensée du bloc d'alerte e-mail, intégrée dans le
 * Hero (à côté du Countdown). Forme un bloc cohérent countdown + alerte sous
 * la zone titre, séparé du contenu par un border-top.
 *
 * Design : sombre (sur fond navy du Hero), texte paper, champ avec bordure
 * paper/30. Layout horizontal sur desktop (champ + bouton inline), vertical
 * sur mobile.
 *
 * Mêmes garanties Loi 18-07 que <AlertSubscribe /> :
 *   - Consentement explicite obligatoire
 *   - Double opt-in (mail confirmation envoyé par /api/subscribe)
 *   - Honeypot anti-bot
 *   - Désinscription one-click via le lien dans chaque mail
 */

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

type Status = 'idle' | 'loading' | 'success' | 'already' | 'error' | 'invalid' | 'rateLimited';
type ReturnFlag = 'confirmed' | 'already-confirmed' | 'unsubscribed' | 'invalid' | null;

export function AlertCompact() {
  const t = useTranslations('alert');
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [returnFlag, setReturnFlag] = useState<ReturnFlag>(null);

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
      const url = new URL(window.location.href);
      url.searchParams.delete('alert');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;

    if (!email.trim() || !consent) {
      setStatus('invalid');
      return;
    }

    setStatus('loading');
    try {
      const r = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), locale, consent: true, hp_field: hp }),
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
      setStatus(data?.message === 'already_confirmed' ? 'already' : 'success');
    } catch {
      setStatus('error');
    }
  }

  // ----- État après soumission (vue confirmation) -----
  if (status === 'success' || status === 'already') {
    return (
      <div aria-live="polite">
        <p className="font-mono text-[11px] uppercase tracking-micro text-orange mb-2 font-medium">
          {t('eyebrow')}
        </p>
        <p className="text-[15px] text-paper leading-relaxed font-medium mb-2">
          {status === 'success' ? t('success.title') : t('success.alreadyTitle')}
        </p>
        <p className="text-[13px] text-paper/75 leading-relaxed">
          {status === 'success' ? t('success.body') : t('success.alreadyBody')}
        </p>
      </div>
    );
  }

  // ----- Bandeau de retour depuis lien e-mail -----
  const returnBanner = returnFlag && (
    <div
      role="status"
      aria-live="polite"
      className={`mb-4 px-4 py-3 text-[12px] leading-relaxed border ${
        returnFlag === 'confirmed' || returnFlag === 'unsubscribed'
          ? 'border-orange/40 bg-orange/10 text-paper'
          : 'border-paper/20 bg-paper/5 text-paper/80'
      }`}
    >
      {t(`return.${returnFlag === 'already-confirmed' ? 'alreadyConfirmed' : returnFlag}`)}
    </div>
  );

  return (
    <div>
      {returnBanner}
      <p className="font-mono text-[11px] uppercase tracking-micro text-orange mb-3 font-medium">
        {t('eyebrow')}
      </p>
      <p className="text-[15px] lg:text-[16px] text-paper leading-snug mb-5 font-medium">
        {t('compactTitle')}
      </p>

      <form onSubmit={onSubmit} noValidate className="space-y-3">
        {/* Honeypot */}
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

        <div className="flex flex-col sm:flex-row gap-2">
          <label className="sr-only" htmlFor="alert-compact-email">{t('emailLabel')}</label>
          <input
            id="alert-compact-email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="flex-1 px-3.5 py-2.5 text-[14px] bg-paper/5 text-paper placeholder-paper/45 border border-paper/25 rounded-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email || !consent}
            className="btn-primary px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? t('submitLoading') : t('submit')}
          </button>
        </div>

        <label className="flex items-start gap-2.5 text-[12px] leading-snug text-paper/75 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={status === 'loading'}
            className="mt-0.5 h-3.5 w-3.5 shrink-0 border-paper/30 bg-paper/5 text-orange focus:ring-1 focus:ring-orange"
          />
          <span dangerouslySetInnerHTML={{ __html: t.raw('compactConsent') }} />
        </label>

        {status === 'invalid' && (
          <p role="alert" className="text-[12px] text-orange">{t('errors.invalid')}</p>
        )}
        {status === 'rateLimited' && (
          <p role="alert" className="text-[12px] text-orange">{t('errors.rateLimited')}</p>
        )}
        {status === 'error' && (
          <p role="alert" className="text-[12px] text-orange">{t('errors.server')}</p>
        )}
      </form>
    </div>
  );
}
