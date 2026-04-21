'use client';

import { useEffect, useRef } from 'react';

/**
 * Attache un parallax vertical à un élément.
 * Le différentiel est exprimé en fraction de vh (ex. 0.06 = 6% viewport sur la traversée).
 * Désactivé si prefers-reduced-motion: reduce.
 * Déplacement clampé à 80px desktop / 40px mobile.
 *
 * Perf : manipule directement el.style.transform via rAF — zéro re-render React.
 */
export function useParallax<T extends HTMLElement>(strength: number = 0.10) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // progression : -1 (sous viewport) → 0 (centré) → +1 (au-dessus)
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const raw = -progress * strength * vh; // contre-sens
        const cap = window.innerWidth < 768 ? 60 : 120;
        const dy = Math.max(-cap, Math.min(cap, raw));
        el.style.transform = `translate3d(0, ${dy.toFixed(1)}px, 0)`;
        rafId = 0;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return ref;
}
