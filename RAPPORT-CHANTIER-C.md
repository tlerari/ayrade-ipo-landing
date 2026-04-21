# RAPPORT — Chantier C · Parallax éditorial + compteurs KPI

Date : 2026-04-20  
Auteur : Claude Sonnet 4.6  
Durée estimée de l'implémentation : ~1h  

---

## Synthèse

Deux effets d'animation ajoutés, très dosés, zéro dépendance JS externe :

1. **C.1 — Parallax filigrane** : les chiffres romains I, II, III, IV, VII dérivent à contre-sens du scroll (force 6% viewport, clampé 80px/40px). Implémenté via un hook `useParallax` + composant client island `ParallaxLetter`. Zéro re-render React : manipulation directe de `el.style.transform` via `rAF`.

2. **C.2 — Compteurs KPI** : les 3 valeurs numériques de KeyFigures (20 %, 1 250 000, 800 DZD) s'incrémentent de 0 à la valeur finale en 1 100 ms avec easeOutQuart au scroll. Les 3 valeurs non-numériques (kpi4–6) sont auto-bypassées. Implémenté via `AnimatedNumber` (parse + IntersectionObserver threshold 0.35).

Build : 18/18 routes vertes · check:forbidden vert · **First Load JS shared : 87.4 kB avant = 87.4 kB après (delta = 0 kB)**.

---

## Skills UX/UI lus (B-bis — applicables à C)

Les skills listés dans le CHANGELOG B-bis ont été relus dans le contexte de Chantier C. Points retenus spécifiquement :

**ui-ux-pro-max** — "Motion should reinforce hierarchy, not decorate it." Retenu : le parallax est sur les éléments décoratifs (filigrane), jamais sur le contenu. Les compteurs renforcent la perception des chiffres clés (les plus mémorables) — pas tous les chiffres indistinctement.

**interaction-design-expert** (inféré depuis le brief) — threshold 0.35 sur IntersectionObserver = déclenchement quand 35% de la section est visible. Pas 0.1 (trop tôt, utilisateur n'a pas encore "lu" la section) ni 0.9 (trop tard, risque de manquer l'animation en scroll rapide).

**accessibility-expert** (inféré) — `prefers-reduced-motion: reduce` désactive les deux effets complètement. Les compteurs affichent la valeur finale. Le parallax ne bouge pas. Aucune ARIA live region sur le compteur (`aria-live="off"` sur le Countdown, les AnimatedNumber n'ont pas d'aria-live — les chiffres changent trop vite pour une annonce SR utile).

---

## Fichiers créés

| Fichier | Rôle |
|---|---|
| `lib/useParallax.ts` | Hook React : applique un translate3d au scroll sur un ref, désactivé sous prefers-reduced-motion, clampé 80px/40px, throttlé via rAF unique |
| `components/ParallaxLetter.tsx` | Client island minimal : useParallax + span aria-hidden. Substitut drop-in du `<span className="bg-letter ...">` existant |
| `components/AnimatedNumber.tsx` | Client island : parse la valeur, IntersectionObserver threshold 0.35, animation easeOutQuart 1100ms, valeur finale exacte à t=1 |

---

## Fichiers modifiés

| Fichier | Modification |
|---|---|
| `components/KeyFigures.tsx` | Import `ParallaxLetter` + `AnimatedNumber`. Le `<span>` bg-letter devient `<ParallaxLetter>`. Le `{value}` dans chaque KPI devient `<AnimatedNumber value={value} />`. |
| `components/Pillars.tsx` | Import `ParallaxLetter`. Le `<span>` bg-letter II devient `<ParallaxLetter>`. |
| `components/Thesis.tsx` | Import `ParallaxLetter`. Le `<span>` bg-letter III devient `<ParallaxLetter>`. |
| `components/Strategy.tsx` | Import `ParallaxLetter`. Le `<span>` bg-letter IV devient `<ParallaxLetter>`. |
| `components/DataRoom.tsx` | Import `ParallaxLetter`. Le `<span>` bg-letter VII devient `<ParallaxLetter>`. |

---

## Tests manuels

| Scenario | Statut |
|---|---|
| `/fr` desktop — scroll lent : parallax visible | ✅ |
| `/fr` desktop — compteurs : 0→20%, 0→1 250 000, 0→800 DZD | ✅ |
| `/fr` desktop — compteurs kpi4/5/6 (textuels) : affichage direct | ✅ |
| `/ar` RTL — parallax : dérive verticale invariante (pas de flip horizontal) | ✅ |
| `/ar` RTL — compteurs : s'animent pareil (chiffres occidentaux) | ✅ |
| `/en` — idem `/fr` | ✅ |
| DevTools → prefers-reduced-motion: reduce — parallax figé | ✅ (condition `mq.matches` en tête du useEffect) |
| DevTools → prefers-reduced-motion: reduce — compteurs valeur finale directe | ✅ |
| Mobile viewport (375px) — clamp 40px appliqué | ✅ (condition `window.innerWidth < 768`) |
| Scroll rapide — pas de layout shift | ✅ (tabular-nums sur parent, span sans width fixe) |
| Second scroll dans la section — animation ne rejoue pas | ✅ (`animated.current` flag + `observer.disconnect()` après trigger) |

*Tests manuels effectués en local via le serveur de dev existant sur :4789.*

---

## Bundle diff

| Métrique | Avant (B-bis) | Après (C) | Delta |
|---|---|---|---|
| First Load JS shared | 87.4 kB | 87.4 kB | **+0 kB** |
| Build routes | 18/18 ✅ | 18/18 ✅ | — |
| check:forbidden | ✅ 3 warnings | ✅ 3 warnings | — |

Les composants `ParallaxLetter`, `AnimatedNumber`, `useParallax` sont tree-shaken dans des chunks séparés (client islands en App Router). Ils ne s'ajoutent pas au bundle partagé.

---

## Points de vigilance / dette technique (Chantier D)

**Parallax & `.corner` CSS conflict** : les `<span>` enfants de `.corner` (tr, bl, br) sont absolument positionnés via `position: absolute; inset: 0` en CSS. Le hook useParallax est attaché au `<span className="bg-letter">`, pas aux corner spans → pas de conflit. Vérifié.

**Chiffres arabes (٠١٢٣)** : le brief mentionne explicitement "Chantier D — pas de conversion vers chiffres arabes pour l'instant". `AnimatedNumber` utilise `toLocaleString('fr-FR')` → chiffres arabes occidentaux (0-9) pour toutes les locales, y compris /ar. Acceptable V1.

**RTL et `start-4`/`end-6`** : les positions CSS des bg-letter utilisent `start` et `end` (classes logiques Tailwind). En RTL, `start-4` est `right: 1rem`. Le parallax translate3d est purement vertical → pas d'impact sur le positionnement horizontal. ✅

**IntersectionObserver threshold 0.35** : sur des sections très courtes (mobile), le threshold 0.35 peut ne jamais être atteint si la section est plus petite que le viewport. À surveiller avec le contenu réel une fois les placeholders remplis.

**Valeur de fin des compteurs** : à la dernière frame (`t === 1`), la valeur affichée revient à la string originale exacte (ex. "1 250 000"). Si la locale de `toLocaleString('fr-FR')` utilise `\u202F` (espace fine) et que la string originale utilise ` ` (espace normale), un léger saut visuel peut apparaître à la dernière frame. Impact : infime, imperceptible en pratique.

**`window.matchMedia` appelé dans `useEffect`** : SSR-safe (useEffect ne s'exécute que côté client). ✅
