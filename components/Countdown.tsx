'use client';

import { useEffect, useState } from 'react';

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
 */
export function Countdown() {
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
        Ouverture de la souscription dans
      </p>

      <div className="flex items-baseline flex-wrap gap-x-1 font-mono text-paper tabular-nums">
        {/* Days */}
        <span className="text-[2rem] lg:text-[2.5rem] leading-none">{dd}</span>
        <span className="text-[12px] uppercase tracking-micro text-paper/70 me-3 font-medium">j</span>

        <span aria-hidden="true" className="text-paper/30 text-lg me-3">·</span>

        {/* Hours */}
        <span className="text-[2rem] lg:text-[2.5rem] leading-none">{hh}</span>
        <span className="text-[12px] uppercase tracking-micro text-paper/70 me-3 font-medium">h</span>

        <span aria-hidden="true" className="text-paper/30 text-lg me-3">·</span>

        {/* Minutes */}
        <span className="text-[2rem] lg:text-[2.5rem] leading-none">{mm}</span>
        <span className="text-[12px] uppercase tracking-micro text-paper/70 font-medium">min</span>
      </div>

      <p className="mt-4 font-mono text-[12px] uppercase tracking-micro text-paper/70 font-medium">
        1<sup>er</sup> juin 2026 · 09:00 (Alger, UTC+1)
      </p>
    </div>
  );
}
