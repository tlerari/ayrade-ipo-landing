'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── Easing ─────────────────────────────────────────────────────── */

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

/* ─── Parse ──────────────────────────────────────────────────────── */

type Parsed = { num: number; suffix: string };

/**
 * Extrait le premier bloc numérique d'une chaîne, en commençant dès le premier caractère.
 * Ne retourne null que si la chaîne ne commence PAS par un chiffre.
 *
 * Exemples :
 *   "20 %"       → { num: 20,      suffix: " %" }
 *   "1 250 000"  → { num: 1250000, suffix: "" }
 *   "800 DZD"    → { num: 800,     suffix: " DZD" }
 *   "Du 1ᵉʳ …"  → null  (commence par une lettre → pas d'animation)
 */
function tryParse(str: string): Parsed | null {
  // Capture un bloc numérique en début de chaîne
  // [\d](?:[\d\u00A0\u202F ]*[\d])? = 1 chiffre, optionnellement suivi d'autres
  // avec séparateurs de milliers possibles (espace, espace insécable, espace fine)
  const m = str.match(/^([\d](?:[\d\u00A0\u202F ]*[\d])?)([^0-9][\s\S]*|)$/);
  if (!m) return null;

  const numStr = m[1];
  const suffix = m[2] ?? '';

  // Supprimer tous les séparateurs pour obtenir le nombre brut
  const num = parseFloat(numStr.replace(/[\u00A0\u202F ]/g, ''));
  if (isNaN(num) || !isFinite(num) || num === 0) return null;

  return { num, suffix };
}

/* ─── Format ─────────────────────────────────────────────────────── */

/**
 * Formate un nombre avec groupement de milliers fr-FR (espace fine \u202F),
 * puis ajoute le suffixe (ex. " %", " DZD", "").
 */
function fmt(n: number, suffix: string): string {
  return Math.round(n).toLocaleString('fr-FR') + suffix;
}

/* ─── Component ──────────────────────────────────────────────────── */

type Props = {
  value: string;
  durationMs?: number;
};

/**
 * Affiche une valeur numérique avec une animation de compteur au scroll.
 * SSR : rend la valeur finale immédiatement (pas d'hydration mismatch).
 * Si la valeur n'est pas numérique → affichage direct, pas d'animation.
 * Si prefers-reduced-motion: reduce → affichage direct, pas d'animation.
 */
export function AnimatedNumber({ value, durationMs = 1700 }: Props) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value); // SSR-safe : valeur finale dès le début
  const animated = useRef(false);

  useEffect(() => {
    const parsed = tryParse(value);
    if (!parsed || animated.current) return;

    const el = spanRef.current;
    if (!el) return;

    // prefers-reduced-motion : afficher la valeur finale, ne pas animer
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return;
        animated.current = true;
        observer.disconnect();

        const t0 = performance.now();
        const target = parsed.num;

        const run = (now: number) => {
          const elapsed = now - t0;
          const t = Math.min(elapsed / durationMs, 1);
          const current = target * easeOutQuart(t);

          if (t < 1) {
            setDisplay(fmt(current, parsed.suffix));
            requestAnimationFrame(run);
          } else {
            // Valeur finale : chaîne exacte d'origine (pas de drift de formatage)
            setDisplay(value);
          }
        };

        requestAnimationFrame(run);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  // Isolation bidi — stratégie à deux branches :
  //
  //  1. Valeur SANS caractère arabe (« +100 », « ISO 9001 », « 22 % »,
  //     « +10 000 ») → on force un îlot LTR isolé (bidi-ltr + dir="ltr").
  //     Garantit l'ordre exact des digits et du suffixe dans un flux RTL
  //     parent, et évite que « % » ne passe à gauche du nombre.
  //
  //  2. Valeur AVEC au moins un caractère arabe (« BDL + 11 مؤسسة »,
  //     « بورصة الجزائر (SGBV) ») → dir="auto" + unicode-bidi: isolate.
  //     HTML5 détecte le premier caractère fort :
  //       - « BDL… » commence par L → span basculé LTR, l'arabe en fin
  //         de chaîne reste lisible (RTL au niveau des glyphes).
  //       - « بورصة… » commence par AL → span basculé RTL, l'acronyme
  //         entre parenthèses reste LTR au sein du flux arabe.
  //     Chaque valeur est rendue dans sa direction logique naturelle,
  //     tout en étant isolée du flux parent.
  const hasArabic = /[\u0600-\u06FF]/.test(value);
  if (hasArabic) {
    return (
      <span ref={spanRef} dir="auto" style={{ unicodeBidi: 'isolate' }}>
        {display}
      </span>
    );
  }
  return (
    <span ref={spanRef} className="bidi-ltr" dir="ltr">
      {display}
    </span>
  );
}
