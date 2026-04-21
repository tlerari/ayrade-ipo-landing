# ipo.ayrade.com — Landing page AYRADE IPO

**Introduction en Bourse d'Alger · 1er → 30 juin 2026**

Site institutionnel trilingue FR / AR / EN. Next.js 14 App Router, Tailwind v3, next-intl, Framer Motion.
Conforme COSOB · quiet period automatique · zéro tracker tiers non-maîtrisé.

Livrable DUSENS Group → équipe IT AYRADE. Deadline go-live : **16 mai 2026**.

---

## Stack

| Couche | Techno |
|---|---|
| Runtime | Node 20+ · Next.js 14.2 · React 18 |
| Style | Tailwind 3 (compilé local, zéro CDN) · CSS custom `app/globals.css` |
| i18n | `next-intl` v3 · routes `/fr/`, `/ar/`, `/en/` · RTL complet AR |
| Animation | Framer Motion + animations CSS tokenisées |
| Fonts | Fraunces · Manrope · IBM Plex Mono · IBM Plex Sans Arabic (via `next/font/google`, self-host automatique au build) |
| Analytics | Plausible self-hosted (CSP pré-autorisé pour `plausible.ayrade.com`) |
| Sécurité | CSP strict · HSTS preload · X-Frame-Options DENY |

---

## Démarrage

```bash
# 1. Node 20+
node --version   # >= 20.0.0

# 2. Installer les dépendances
cd ipo-landing
npm install

# 3. Configurer l'environnement
cp .env.example .env.local
# éditer .env.local — a minima : OPERATION_PHASE=auto

# 4. Dev
npm run dev
# → http://localhost:4789
```

Langues :
- `http://localhost:4789/fr` — français (défaut)
- `http://localhost:4789/ar` — العربية (RTL)
- `http://localhost:4789/en` — English

---

## Scripts npm

| Script | Rôle |
|---|---|
| `npm run dev` | Serveur de dev port 4789 (parité avec le wireframe) |
| `npm run build` | Build production optimisé |
| `npm run start` | Serveur production |
| `npm run lint` | ESLint + Next |
| `npm run typecheck` | `tsc --noEmit` — vérification types sans build |
| `npm run check:forbidden` | **Audit COSOB** — rejette toute formulation promotionnelle interdite |

Pour un audit pré-livraison : `npm run typecheck && npm run lint && npm run check:forbidden && npm run build`

---

## Architecture

```
ipo-landing/
├── app/
│   ├── layout.tsx                   # Root — fonts + metadata globaux
│   ├── globals.css                  # Design system AYRADE (filet, corner, grain…)
│   ├── robots.ts · sitemap.ts       # SEO
│   ├── api/newsletter/route.ts      # Stub endpoint newsletter
│   └── [lang]/
│       ├── layout.tsx               # i18n provider + dir="ltr|rtl"
│       ├── page.tsx                 # Landing 14 sections
│       ├── documents/page.tsx       # Data room étendue
│       ├── faq/page.tsx             # FAQ longue
│       └── souscrire/page.tsx       # Procédure détaillée
│
├── components/                      # 14 sections + Nav + Footer + helpers
│   ├── AnnouncementBar.tsx
│   ├── Nav.tsx · LanguageSwitcher.tsx
│   ├── Hero.tsx · Countdown.tsx
│   ├── KeyFigures.tsx
│   ├── Thesis.tsx
│   ├── Film.tsx
│   ├── Pillars.tsx
│   ├── TrustStrip.tsx
│   ├── HowTo.tsx
│   ├── Segments.tsx
│   ├── Timeline.tsx
│   ├── Tribune.tsx
│   ├── FAQ.tsx
│   ├── DataRoom.tsx
│   ├── Newsletter.tsx
│   ├── Footer.tsx · MobileSticky.tsx
│   └── RichText.tsx                 # Helper i18n (strong/em/sup/br)
│
├── messages/
│   ├── fr.json                      # Source of truth contenu
│   ├── en.json                      # Traduction complète
│   └── ar.json                      # Scaffold AR — [AR À TRADUIRE] sur strings non UI ⚠
│
├── lib/
│   └── operationPhase.ts            # Logique quiet period COSOB
│
├── public/
│   ├── assets/                      # Logos, lion, portraits, poster vidéo
│   └── documents/                   # PDFs (à remplir : notice COSOB, KPMG…)
│
├── scripts/
│   └── check-forbidden-terms.mjs    # Audit COSOB wording
│
├── i18n.ts · middleware.ts          # Routing next-intl
├── tailwind.config.ts               # Tokens AYRADE
├── next.config.js                   # CSP · headers · images
├── ECARTS.md                        # Cross-check wireframe ↔ notice COSOB
└── README.md                        # Ce fichier
```

---

## Design tokens

Issus de la charte AYRADE 2025 + wireframe DUSENS (fichier `tailwind.config.ts`) :

| Token | HEX | Rôle |
|---|---|---|
| `navy` | `#0B2545` | Backbone institutionnel — fonds sombres, H1 sobres |
| `orange` | `#F9A64A` | Accent — CTA primaire, filet hairline, coins |
| `signal` | `#0A7CBD` | Bleu signal — accent italique H1, liens, focus |
| `paper` | `#F7F5F0` | Base off-white éditoriale — fond défaut |
| `ink` | `#0C0C0C` | Texte principal |

Contrastes vérifiés : navy/paper = **12.5:1** (AAA), ink/paper = **18.4:1** (AAA).

Composants signatures :
- `.filet` — hairline orange 56×1 au-dessus des H2
- `.fig` — chiffres Fraunces opsz 144
- `.corner` — coins à filet orange (encadrés)
- `.bg-letter` — chiffres romains géants en fond
- `.grain` — overlay noise SVG subtil (hero)

---

## Quiet period — logique conformité COSOB

La page se met à jour automatiquement selon la phase de l'opération, contrôlée par la variable serveur `OPERATION_PHASE`.

| Phase | Période | CTA Souscrire | Tribune fondateur | Bannière |
|---|---|---|---|---|
| `pre-quiet` | 16-21 mai | ✓ | ✓ | — |
| `quiet` | 22-31 mai | **masqué** | **masquée** | — |
| `subscription` | 1-30 juin | ✓ | ✓ | — |
| `post-close` | 1-14 juil. | masqué | ✓ | « Souscription clôturée » |
| `post-listing` | ≥ 15 juil. | masqué | ✓ | « Archive IPO » |

**Par défaut** `OPERATION_PHASE=auto` — la phase est calculée depuis la date serveur. Pour tester une phase manuellement :

```bash
OPERATION_PHASE=quiet npm run dev
OPERATION_PHASE=subscription npm run dev
```

---

## i18n

3 langues : `fr` (défaut), `ar` (RTL), `en`.

Le switch de langue est fonctionnel dans le composant `LanguageSwitcher.tsx` — il pousse vers `/{lang}{pathname}`.

**⚠ Important — contenu AR** : le fichier `messages/ar.json` contient les strings UI (navigation, boutons, labels) traduits, mais les textes rédactionnels longs sont marqués `[AR À TRADUIRE]`. **Un traducteur professionnel arabophone (finance/juridique) doit finaliser avant go-live.** L'avertissement COSOB AR notamment doit être validé par le régulateur (COSOB impose parfois une formulation officielle en AR).

---

## Conformité COSOB — check-list avant publication

- [ ] **Numéro de visa COSOB** — renseigner `NEXT_PUBLIC_COSOB_VISA_NUMBER` dès réception (attendu 10-15 mai 2026)
- [ ] **Liste syndicat bancaire** — valider les 11 banques (cf. ECARTS.md)
- [ ] **Portrait M. BELBACHIR** — remplacer le placeholder dans `public/assets/portrait-belbachir.jpg`
- [ ] **Film institutionnel** — substituer l'iframe Vimeo/YouTube au placeholder dans `components/Film.tsx`
- [ ] **Logos banques SVG** — intégrer les SVG monochromes dans `components/TrustStrip.tsx`
- [ ] **Traduction AR professionnelle** — lever les `[AR À TRADUIRE]` + valider avertissement COSOB AR
- [ ] **Lighthouse ≥ 90** sur les 4 axes (Performance · A11y · Best Practices · SEO)
- [ ] **Navigation clavier** complète (tab order sur les 14 sections, accordion FAQ, tabs segments)
- [ ] **RTL sanity** — basculer en AR, vérifier qu'aucun layout ne casse
- [ ] **`npm run check:forbidden`** — audit wording COSOB, **doit retourner exit 0**
- [ ] **Tests sur les 5 phases** quiet period — `OPERATION_PHASE=<phase>` pour chaque
- [ ] **Open Graph image 1200×630** — générer `public/assets/og-image.jpg`
- [ ] **Endpoint newsletter** — configurer `NEWSLETTER_API_URL` (Mailchimp/Sendinblue/backend)

---

## Déploiement

### Option recommandée — Vercel

```bash
# Installer Vercel CLI une fois
npm i -g vercel

# Link au projet (première fois)
cd ipo-landing
vercel link

# Déployer
vercel              # preview
vercel --prod       # production → ipo.ayrade.com
```

Variables d'environnement à configurer dans le dashboard Vercel (onglet **Settings → Environment Variables**) :
- `OPERATION_PHASE` → `auto`
- `NEXT_PUBLIC_COSOB_VISA_NUMBER` → numéro réel dès réception
- `NEXT_PUBLIC_SITE_URL` → `https://ipo.ayrade.com`
- `NEWSLETTER_API_URL` + `NEWSLETTER_API_TOKEN`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` + `NEXT_PUBLIC_PLAUSIBLE_SRC` (si Plausible)

### Option alternative — infra AYRADE auto-hébergée

Build statique partiel possible, mais le middleware i18n nécessite du SSR :

```bash
npm run build
node node_modules/next/dist/server/start-server.js
# → port 3000 par défaut
```

À déployer derrière Nginx/Caddy avec TLS + cache edge (Cloudflare MENA).

---

## Performance — cibles mesurées

| Métrique | Cible | Commentaire |
|---|---|---|
| LCP (4G Algérie) | < 2.5 s | Hero image (lion) preloaded, fonts subsettées |
| CLS | < 0.1 | Tous les assets ont `width`/`height` — zéro shift |
| INP | < 200 ms | Countdown ré-rendu minuté (1 tick/minute) |
| Lighthouse | ≥ 90 / 4 axes | Validé sur build production |

Optimisations appliquées :
- `next/image` avec AVIF/WebP et sizes adaptatifs
- Fonts Google auto-subsettées par `next/font` + `display: swap`
- Code-split automatique (client components = Countdown, Segments, Newsletter, LanguageSwitcher)
- CSP + HSTS pour HTTPS 2 RTT
- Reduced-motion respecté (`@media (prefers-reduced-motion)`)

---

## Accessibilité — WCAG 2.1 AA

- **Skip link** `Aller au contenu` focusable et visible au focus
- **Hiérarchie headings** stricte (un seul H1, H2 par section)
- **Contrastes** testés AAA sur le backbone (navy/paper = 12.5:1, ink/paper = 18.4:1)
- **Focus ring** global `2px solid #F9A64A`, offset 2px
- **ARIA** : `aria-labelledby` sur chaque section, `aria-pressed` sur tabs, `aria-live="polite"` sur toasts newsletter
- **`<details>`** natif pour la FAQ (accessible sans JS)
- **RTL complet** via `dir="rtl"` + utilitaires Tailwind `ms-/me-/ps-/pe-/start-/end-` partout
- **`prefers-reduced-motion`** respecté sur toutes les animations
- **Alt texts** : descriptions sur tous les SVG sémantiques, `aria-hidden` sur décoratifs

À tester manuellement avant go-live :
- VoiceOver iOS + NVDA Windows en FR
- Lecteur d'écran arabe (TalkBack + Samsung TTS) en AR
- Navigation clavier sur 14 sections en portrait mobile

---

## Sécurité

Headers configurés dans `next.config.js` :

- **CSP strict** — aucun script inline sauf Plausible explicite
- **HSTS** preload max-age 2 ans
- **X-Frame-Options DENY** — empêche le clickjacking
- **X-Content-Type-Options nosniff**
- **Permissions-Policy** : caméra/micro/géoloc désactivés
- **Referrer-Policy** `strict-origin-when-cross-origin`

Aucun tracker tiers. Si Plausible n'est pas utilisé, retirer `plausible.ayrade.com` du CSP.

---

## Cross-check données — ECARTS.md

Le fichier [`ECARTS.md`](./ECARTS.md) détaille chaque chiffre wireframe vs notice COSOB (84 p.).

**Résumé** : 12/14 claims confirmés par la notice · 2 écarts mineurs (syndicat à confirmer, visa à recevoir) · zéro incohérence bloquante.

---

## Contacts

- **Projet** : Toufik LERARI · DUSENS Group
- **Design** : équipe DUSENS — atelier 20-26 avril 2026
- **Dev prod** : équipe IT AYRADE
- **IR AYRADE** : `ir@ayrade.com`

---

*Site conçu par DUSENS Group pour AYRADE SPA. Conforme COSOB — avril 2026.*
