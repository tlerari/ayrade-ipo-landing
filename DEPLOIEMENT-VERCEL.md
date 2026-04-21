# Déploiement Vercel — Preview AYRADE IPO

Guide pas-à-pas pour mettre en ligne le site en mode preview protégé
par mot de passe. **Durée estimée : 15 minutes.**

---

## Prérequis

- Un compte GitHub (gratuit) — pour héberger le code
- Un compte Vercel (gratuit, plan Hobby) — connecté à ce GitHub
- Le dépôt local est prêt : `git init` déjà fait, 1 commit baseline

---

## 1. Créer le dépôt GitHub distant

1. Aller sur <https://github.com/new>
2. Repository name : `ayrade-ipo-landing` (privé — **Private**, pas Public)
3. Ne rien cocher (pas de README, pas de .gitignore — déjà présents)
4. **Create repository**

GitHub affiche ensuite des instructions — garder l'URL HTTPS du dépôt :
`https://github.com/<ton-compte>/ayrade-ipo-landing.git`

---

## 2. Pousser le code local vers GitHub

Depuis le dossier `ipo-landing/` dans un terminal :

```bash
git remote add origin https://github.com/<ton-compte>/ayrade-ipo-landing.git
git push -u origin main
```

Si c'est la première fois que tu pousses vers GitHub depuis cette machine,
il te demandera tes identifiants GitHub (utiliser un Personal Access Token
en lieu et place du mot de passe — générable dans GitHub → Settings →
Developer settings → Tokens).

---

## 3. Importer le projet dans Vercel

1. Aller sur <https://vercel.com/new>
2. **Import Git Repository** → sélectionner `ayrade-ipo-landing`
3. Framework preset : Next.js (détecté automatiquement)
4. Root directory : laisser `.` (le code est à la racine du repo)
5. **Ne pas déployer tout de suite** — cliquer sur **Environment Variables**
   pour ajouter les variables ci-dessous avant le premier build.

---

## 4. Variables d'environnement Vercel

Ajouter les variables suivantes dans Vercel :

| Clé                              | Valeur suggérée                            | Obligatoire |
|----------------------------------|--------------------------------------------|-------------|
| `PREVIEW_PASSWORD`               | *(ton choix — ex. `AYRADE-preview-2026`)*  | **Oui**     |
| `PREVIEW_USERNAME`               | `ayrade` (ou autre)                        | Non — défaut `ayrade` |
| `OPERATION_PHASE`                | `auto`                                      | Non         |
| `NEXT_PUBLIC_SITE_URL`           | L'URL Vercel une fois connue               | À remplir après 1er déploiement |
| `NEXT_PUBLIC_COSOB_VISA_NUMBER`  | (vide pour l'instant)                      | Non         |

**Point important — la protection Basic Auth ne s'active QUE si
`PREVIEW_PASSWORD` est définie sur Vercel.** Si elle est vide, le site sera
accessible sans mot de passe. C'est voulu (permet le dev local sans popup).

Pour chaque variable, cocher les 3 environnements (Production / Preview /
Development). Vercel différencie ces environnements, mais pour un preview
on veut la même protection partout.

---

## 5. Déployer

Cliquer sur **Deploy**. Le premier build prend 2-3 minutes. À la fin,
Vercel affiche une URL du type :

```
https://ayrade-ipo-landing.vercel.app
```

À l'ouverture, le navigateur demande un identifiant / mot de passe :
- Identifiant : `ayrade`
- Mot de passe : celui défini dans `PREVIEW_PASSWORD`

---

## 6. Partager le lien aux équipes / client

Message type à envoyer :

> **Accès preview — site AYRADE IPO**
>
> URL : https://ayrade-ipo-landing.vercel.app
> Identifiant : `ayrade`
> Mot de passe : `AYRADE-preview-2026`
>
> Accès restreint. Merci de ne pas diffuser à l'extérieur tant que
> le visa COSOB n'est pas officiellement communiqué.
>
> Retours à consigner dans [lien doc partagé].

---

## 7. Workflow de mise à jour

À chaque `git push` vers la branche `main` sur GitHub, Vercel redéploie
automatiquement en ~90 secondes. L'URL reste la même — les équipes voient
la dernière version sans rien faire.

Pour tester une modif sans impacter le lien principal, créer une branche :

```bash
git checkout -b retours-client
# … modifs …
git push -u origin retours-client
```

Vercel génère alors une URL de preview dédiée à la branche, utile pour
faire valider un lot de modifs avant de merger.

---

## 8. Rotations et passages au public

**Changer le mot de passe :** Vercel → Project → Settings → Environment
Variables → modifier `PREVIEW_PASSWORD` → redéployer (bouton Redeploy sur
le dernier déploiement, ou simple `git commit --allow-empty -m "rotate
password" && git push`).

**Passer le site en public (go-live) :**
1. Vider `PREVIEW_PASSWORD` dans les env vars Vercel
2. Dans `app/robots.ts`, remettre `allow: '/'` au lieu de `disallow: '/'`
3. Dans `app/layout.tsx`, remettre `robots: { index: true, follow: true }`
4. Commit + push — le site devient public et indexable

---

## Notes

- Le plan **Hobby (gratuit)** de Vercel suffit amplement pour l'usage
  preview. Pas besoin de passer au Pro.
- Les PDF (`/documents/*.pdf`) sont bien protégés par le middleware Basic
  Auth — ils demandent aussi le mot de passe.
- Les bundles JS/CSS internes Next (`/_next/static/*`) sont exclus du
  middleware pour des raisons de performance. Aucun contenu sensible n'y
  transite (c'est du code compilé, les secrets ne finissent jamais dans
  le bundle client).
- Si Vercel demande un `ownership` lors de l'import : le sélectionner sur
  ton compte personnel. On migrera vers une organisation Team DUSENS si
  besoin.
