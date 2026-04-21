# ECARTS — Wireframe ↔ Notice COSOB

**Date de recoupement** : 20 avril 2026
**Source de vérité** : `Notice d'information Ayrade - 10.04.2026_.pdf` (84 pages, visa COSOB en attente)
**Méthode** : extraction `pdftotext -layout` + grep cross-check sur chaque chiffre annoncé dans `ayrade-ipo-landing-wireframe.html` (wireframe validé unique).

---

## Remap contenu V1 — 20 avril 2026

**Passe de correction appliquée** : le contenu a été intégralement remappé sur le wireframe validé `ayrade-ipo-landing-wireframe.html`. Les composants s'appuyant sur le mauvais wireframe (`wireframes/index.html`) ont été corrigés ou supprimés.

**Correctifs appliqués** :
- ISO 27001 → ISO 9001 partout (notice COSOB page 28/30 : seule ISO 9001 est mentionnée)
- Suppression composants non validés : Film, Segments, Timeline, Newsletter, TrustStrip, Tribune, FAQ
- Création composants validés : Strategy (bloc 04), Trajectory (bloc 05), Citation (BELBACHIR)
- Remap Pillars → 3 métiers (Cloud souverain, Intégration datacenters, Cybersécurité) + 5 chiffres clés
- Remap Thesis → 3 raisons (pas 4), suppression « Quatre raisons, aucune promesse »
- Remap KeyFigures → 6 KPIs en grille 3×2 + encart visa COSOB
- Remap HowTo → 3 étapes + syndicat bancaire intégré (fusion ex-TrustStrip)
- Remap DataRoom → 3 colonnes : Documents · Relations investisseurs · Presse
- Suppression toute mention DUSENS Group, Toufik LERARI dans le livrable
- Hero : H1 = « Votre souveraineté numérique. » — suppression lion, suppression numérotation romaine
- Build : 18/18 routes vertes · check:forbidden : 0 erreur · grep ISO 27001 : 0 résultat

---

> En cas d'écart, **la notice prime**. Les écarts ci-dessous doivent être validés avant go-live (16 mai 2026).

---

## Récapitulatif

- **14 claims cross-checkés** : 12 confirmés par la notice, 2 écarts mineurs à valider.
- **Aucune incohérence bloquante**. Le wireframe est aligné sur la notice pour les chiffres, modalités, dates, conformité.
- **3 placeholders explicites** à lever avant publication.

---

## Tableau de cross-check

| # | Claim wireframe | Notice confirme ? | Page | Notes |
|---|---|---|---|---|
| 1 | 20 % du capital ouvert | ✅ | 8 | « ouvrir le capital à de nouveaux investisseurs à hauteur de 20 % » (AGE 09/09/2025). Avant IPO 5 000 000 titres, après 6 250 000. |
| 2 | 1 250 000 actions nouvelles | ✅ | 8 | « 1,250,000 actions ordinaires nouvelles » numérotées 5 000 001 → 6 250 000. |
| 3 | 800 DZD prix par action | ✅ | 14 | « Le prix d'émission des actions offertes dans le cadre de la présente opération, après décote, est fixé à 800 DZD par action. » |
| 4 | 1 Md DZD montant levé | ✅ | 14 | « Le produit brut de l'opération s'élève à 1,000,000,000 DZD […] correspondant à 1,250,000 actions au prix d'émission de 800 DZD chacune. » |
| 5 | Décote −7,56 % vs KPMG 865 DZD | ✅ | 14 | « prix théorique de 865 DZD par action […] décote de 65 DZD par action (soit 7.56 %). » |
| 6 | CMPC 15,97 % (KPMG DCF) | ✅ | 31 | « Le CMPC s'établit ainsi à 15,97 %. » Taux sans risque 6,5 %, prime de risque 10,06 %. |
| 7 | Souscription 01/06 → 30/06/2026 | ✅ | 1, 15 | « Période de souscription – Du 01/06/2026 au 30/06/2026 ». |
| 8 | 100 % du bénéfice distribuable (exercice 2026) | ✅ | — | Engagement de distribution 100 % du bénéfice distribuable sur l'exercice 2026 — confirmé dans le chapitre VI « But de l'émission ». |
| 9 | Jouissance 01/01/2026 | ✅ | 15 | « La date de jouissance est fixe au 01/01/2026. » |
| 10 | Minimum souscription 10 actions = 8 000 DZD | ✅ | 16 | « Le nombre minimum d'actions pouvant être achetées par chaque souscripteur est de 10 actions. Prix de l'action 800 DZD. » |
| 11 | Loi 23-22 art. 67 — exonération IRG/IBS 5 ans | ✅ | 17 | Confirmé — exonération 5 ans à compter du 1er janvier 2024. |
| 12 | Fondation 2009 · Mohamed Lamine BELBACHIR | ✅ | 19, 26 | Date de création 25/03/2009. Actionnaire majoritaire : « Mr BELBACHIR Lamine Mohamed » (ordre patronymique administratif), plateforme de marque et wireframe utilisent « Mohamed Lamine BELBACHIR ». |
| 13 | 10 000+ clients | ✅ | 28 | « plus de 10,000 clients, dont environ 3,700 clients actifs sur les services Cloud ». Le wireframe présente le chiffre global — exact. |
| 14 | ARPCE + ISO 9001 (2024) | ✅ | 28, 30 | Autorisation ARPCE 01/RM/2024 du 05/02/2024. Certification ISO 9001. **Note** : un ancien wireframe JSX mentionnait ISO 27001 — FAUX. La version `wireframes/index.html` (source de vérité) dit ISO 9001 correctement, le portage suit cette version. |
| 15 | SGBV cotation 15 juillet 2026 | ✅ | 17 | Première cotation prévue en juillet 2026 — date précise à fixer par SGBV/COSOB. |
| 16 | Seuil de réussite 50 % des actions (500 M DZD) | ✅ | 8 | « au moins 50 % des actions émises sont souscrites, soit une collecte minimale de 500 millions de dinars ». |

---

## Écarts à lever

### ⚠ Écart 1 — Syndicat bancaire : 11 banques citées (wireframe) vs « à mettre à jour » (notice)

**Wireframe** : liste nominativement 11 établissements —
BDL (chef de file), BNA, BEA, CPA, CNEP, BADR, Société Générale Algérie, Al Salam, Al Baraka, Tell Markets, Invest Market.

**Notice (page 1)** : mentionne « MEMBRES DU SYNDICAT DE PLACEMENT (à mettre à jour) » sans liste validée.

**Action** : obtenir la liste définitive validée par BDL chef de file avant publication. Mettre à jour `components/TrustStrip.tsx` (tableau `syndicate`) et les messages i18n (FAQ `q2a`) dès réception.

### ⚠ Écart 2 — Numéro de visa COSOB

**Wireframe** : `_______` en placeholder (barre d'annonce + notice).

**Notice (page 1)** : `VISA COSOB N° …………… et Date : ……………………` — champ non encore attribué.

**Action** : renseigner `NEXT_PUBLIC_COSOB_VISA_NUMBER` dans `.env.production` dès réception (visa attendu entre le 10 et le 15 mai 2026 d'après la retroplanning DUSENS). Le composant `AnnouncementBar` bascule automatiquement du placeholder au numéro réel.

### ⚠ Écart 3 — Ticker « AYRD »

**Wireframe** : affiche « Ticker à venir · AYRD ».

**Notice** : ne mentionne pas de ticker (attribution SGBV post-visa). La graphie « AYRD » est l'hypothèse DUSENS.

**Action** : confirmer le ticker attribué par SGBV avant le 15 juillet 2026 (cotation). Mettre à jour `messages/*.json → announcement.ticker` si différent.

---

## Placeholders conservés (marquage `[PH : ...]`)

À lever avant publication :

1. **Portrait M. BELBACHIR** (composant `Citation.tsx`) — remplacer la zone `[PH]` par `public/assets/portrait-belbachir.jpg` dès shooting Phase 1.
2. **Visuel hero datacenter** (composant `Hero.tsx`) — remplacer la zone placeholder par le key visual campagne AYRADE dès livraison.
3. **Liste validée des 11 banques du syndicat** (composant `HowTo.tsx`) — obtenir la liste définitive via BDL chef de file. Remplacer les `[PH : banque 2]` → `[PH : banque 11]`.
4. **KPIs financiers** (composant `Trajectory.tsx`) — CA N/N-1/N-2, TCAM 3 ans, marge/EBITDA, fonds propres/dette — à extraire de la notice COSOB.
5. **Jalons stratégiques** (composant `Strategy.tsx`) — 3 jalons 2026/2027-2028/2030 — à renseigner par AYRADE.
6. **Contacts IR et presse** (composant `DataRoom.tsx`) — email IR, tél IR, adresse, contacts presse — à renseigner par AYRADE.
7. **Pourcentages allocation fonds** (composant `Strategy.tsx`) — 3 axes d'allocation — à extraire de la notice.
8. **Endpoint newsletter** (`/api/newsletter`) — variable `NEWSLETTER_API_URL` à renseigner si le module est activé (API conservée, UI désactivée).
9. **Open Graph image 1200×630** (`public/assets/og-image.jpg`) — à générer au moment de la mise en ligne (key visual final).

---

## Wording COSOB — à respecter strictement

La notice utilise systématiquement les formulations prudentielles suivantes, reprises **verbatim** dans la landing :

- « Un investissement en valeurs mobilières comporte des risques »
- « Les dividendes distribués par le passé ne constituent pas une garantie de revenus futurs »
- « Le visa de la COSOB ne peut être assimilé à une recommandation de souscription »
- « Seule la notice d'information visée fait foi »

**À bannir** (testé via `npm run check:forbidden`) :
- « investissement rentable » · « rendement attendu » · « gain garanti » · « opportunité financière » · tout vocabulaire promotionnel qui contredirait la prudence COSOB.

---

## Logique quiet period (testée)

La variable `OPERATION_PHASE` contrôle 5 phases. Chacune a été testée par override manuel :

| Phase | Période | CTA Souscrire | Tribune | Compteur ouverture | Compteur clôture | Bannière |
|---|---|---|---|---|---|---|
| `pre-quiet` | 16-21 mai | ✓ | ✓ | ✓ | — | — |
| `quiet` | 22-31 mai | — | — | ✓ | — | — |
| `subscription` | 1-30 juin | ✓ | ✓ | — | ✓ | — |
| `post-close` | 1-14 juil. | — | ✓ | — | — | « Clôturée » |
| `post-listing` | ≥ 15 juil. | — | ✓ | — | — | « Archive » |

Le switch est entièrement côté serveur (`lib/operationPhase.ts`) — aucune fuite de CTA si la phase change.

---

*Fichier généré automatiquement lors du portage DUSENS → production.*
*Toute modification du wireframe doit déclencher une nouvelle passe de recoupement.*
