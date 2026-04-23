'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const TARGET = new Date('2026-06-01T09:00:00+01:00').getTime();

function pad(n: number): string {
  return String(Math.max(0, n)).padStart(2, '0');
}

/**
 * Compte à rebours — mount-guard pour éviter l'hydration mismatch.
 *
 * Le rendu SSR/SSG peut être caché : afficher une valeur calculée côté serveur
 * revient à montrer une valeur obsolète. On attend donc le mount client,
 * on affiche un placeholder "—" entre-temps, puis on tick toutes les 30 s.
 *
 * aria-live="polite" — annonce discrète pour lecteurs d'écran.
 *
 * i18n (23/04/2026) — libellés, date d'ouverture et unités (j/h/min) tirés du
 * namespace `countdown`. En AR, les chiffres 00 sont isolés en dir="ltr" pour
 * éviter que les groupes numériques basculent visuellement dans le flux RTL.
 */
export function Countdown() {
  const t = useTranslations('countdown');
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const ready = now !== null;
  const diff  = ready ? TARGET - (now as number) : 0;
  const days  = ready && diff > 0 ? Math.floor(diff / 86_400_000) : 0;
  const hours = ready && diff > 0 ? Math.floor((diff % 86_400_000) / 3_600_000) : 0;
  const mins  = ready && diff > 0 ? Math.floor((diff % 3_600_000) / 60_000) : 0;

  const dd = ready ? pad(days)  : '—';
  const hh = ready ? pad(hours) : '—';
  const mm = ready ? pad(mins)  : '—';

  return (
    <div
      className="mt-16 pt-8 border-t border-paper/15"
      role="timer"
      aria-live="polite"
      suppressHydrationWarning
    >
      <p className="font-mono text-[12px] uppercase tracking-micro text-paper/75 mb-4 font-medium">
        {t('label')}
      </p>

      <div className="flex items-baseline flex-wrap gap-x-1 font-mono text-paper tabular-nums">
        {/* Days — dd isolé LTR pour garantir l'ordre des chiffres en AR */}
        <span className="text-[2rem] lg:text-[2.5rem] leading-none" dir="ltr">{dd}</span>
        <span className="text-[12px] uppercase tracking-micro text-paper/70 me-3 font-medium">{t('days')}</span>

        <span aria-hidden="true" className="text-paper/30 text-lg me-3">·</span>

        {/* Hours */}
        <span className="text-[2rem] lg:text-[2.5rem] leading-none" dir="ltr">{hh}</span>
        <span className="text-[12px] uppercase tracking-micro text-paper/70 me-3 font-medium">{t('hours')}</span>

        <span aria-hidden="true" className="text-paper/30 text-lg me-3">·</span>

        {/* Minutes */}
        <span className="text-[2rem] lg:text-[2.5rem] leading-none" dir="ltr">{mm}</span>
        <span className="text-[12px] uppercase tracking-micro text-paper/70 font-medium">{t('minutes')}</span>
      </div>

      <p className="mt-4 font-mono text-[12px] uppercase tracking-micro text-paper/70 font-medium">
        {t('openingDate')}
      </p>
    </div>
  );
}
