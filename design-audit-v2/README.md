# Design Audit V2 — Chantier B-bis

Date : 2026-04-20  
Environnement : headless (Next.js build uniquement) — screenshots browser non disponibles.

## Composants modifiés

| Composant | Changements |
|---|---|
| Hero.tsx | Labels KPI /40→/55, tabular-nums, stagger d3→d4 |
| KeyFigures.tsx | Stagger 80ms→50ms par item |
| Pillars.tsx | Stat labels /45→/50 |
| Citation.tsx | leading-[1.2]→[1.25], guillemet opacity 0.18→0.22 |
| DataRoom.tsx | Contacts /50→/65 (5 instances) |

## Note screenshots
Dans un environnement CI/headless, les screenshots avant/après nécessitent un navigateur Chromium
(Playwright ou chrome-devtools skill). À produire lors d'une session avec `npm run dev`.
