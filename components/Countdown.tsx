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
 *
 * Mode `compact` (26/04/2026) — variante inline pour intégration sous une
 * headline (utilisée dans Hero après suppression du bloc autonome BeReady).
 * Mêmes données, taille ×0.5 environ, layout horizontal sans séparateurs
 * verticaux pour ne pas surcharger la colonne gauche du Hero.
 */
export function Countdown({ compact = false }: { compact?: boolean }) {
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

  const cells = [
    { value: dd, unit: t('days') },
    { value: hh, unit: t('hours') },
    { value: mm, unit: t('minutes') },
  ];

  // ── Mode compact (Hero inline) ──────────────────────────────────────
  // Taille rééquilibrée le 28/04/2026 pour matcher la présence visuelle
  // du bloc <AlertCompact /> à droite (chiffres ~3.5rem, séparateurs
  // verticaux subtils, date d'ouverture isolée par un border-top).
  if (compact) {
    return (
      <div
        role="timer"
        aria-live="polite"
        suppressHydrationWarning
        className="w-full"
      >
        <p className="font-mono text-[11px] uppercase tracking-micro text-orange mb-5 font-medium">
          {t('label')}
        </p>

        <div className="grid grid-cols-3 font-mono text-paper tabular-nums">
          {cells.map((c, i) => (
            <div
              key={c.unit}
              className={`flex flex-col items-center text-center px-2 ${
                i > 0 ? 'border-s border-paper/12' : ''
              }`}
            >
              <span
                className="fig text-[2.75rem] lg:text-[3.25rem] leading-none text-paper font-light"
                dir="ltr"
              >
                {c.value}
              </span>
              <span className="mt-2 text-[11px] uppercase tracking-micro text-paper/60 font-medium">
                {c.unit}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 font-mono text-[11px] uppercase tracking-micro text-paper/65 font-medium text-center">
          {t('openingDate')}
        </p>
      </div>
    );
  }

  // ── Mode plein (autonome) ───────────────────────────────────────────
  return (
    <div
      role="timer"
      aria-live="polite"
      suppressHydrationWarning
      className="w-full"
    >
      <p className="font-mono text-[11px] uppercase tracking-micro text-signal mb-5 font-medium">
        {t('label')}
      </p>

      {/* Grille 3 cellules — chaque cellule = gros chiffre + unité sous le
          chiffre, séparée par un filet vertical subtil. */}
      <div className="grid grid-cols-3 font-mono text-paper tabular-nums">
        {cells.map((c, i) => (
          <div
            key={c.unit}
            className={`flex flex-col items-center text-center px-2 ${
              i > 0 ? 'border-s border-paper/12' : ''
            }`}
          >
            <span
              className="fig text-[3rem] lg:text-[3.5rem] leading-none text-paper"
              dir="ltr"
            >
              {c.value}
            </span>
            <span className="mt-2 text-[11px] uppercase tracking-micro text-paper/60 font-medium">
              {c.unit}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 pt-4 border-t border-paper/10 font-mono text-[11px] uppercase tracking-micro text-paper/65 font-medium text-center">
        {t('openingDate')}
      </p>
    </div>
  );
}
