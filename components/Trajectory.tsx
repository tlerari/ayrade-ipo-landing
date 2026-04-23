'use client';

import { useTranslations } from 'next-intl';
import { ParallaxLetter } from './ParallaxLetter';

type YearPoint = { year: string; ca: number; ebitda: number; rn: number };

/**
 * Données historiques 2022-2025 et prévisionnelles 2026-2031 extraites de la
 * Notice d'information COSOB AYRADE (10 avril 2026) — Chapitre VI §6.2.4.
 * Valeurs exprimées en millions de DZD.
 * Source : Plan d'affaires du management d'AYRADE, valorisation KPMG.
 */
const HISTORICAL: YearPoint[] = [
  { year: '2022', ca: 172, ebitda: 7, rn: 1 },
  { year: '2023', ca: 255, ebitda: 9, rn: 1 },
  { year: '2024', ca: 192, ebitda: 56, rn: 35 },
  { year: '2025', ca: 416, ebitda: 110, rn: 72 },
];

const PROJECTED: YearPoint[] = [
  { year: '2026', ca: 1662, ebitda: 365, rn: 240 },
  { year: '2027', ca: 2469, ebitda: 530, rn: 341 },
  { year: '2028', ca: 2765, ebitda: 667, rn: 430 },
  { year: '2029', ca: 3166, ebitda: 846, rn: 534 },
  { year: '2030', ca: 4011, ebitda: 1231, rn: 819 },
  { year: '2031', ca: 4568, ebitda: 1504, rn: 1063 },
];

const SERIES = [...HISTORICAL, ...PROJECTED];

function formatFr(n: number) {
  // Espace fine insécable entre milliers (style FR).
  return n.toLocaleString('fr-FR').replace(/\u202f/g, ' ');
}

function TrajectoryChart() {
  const W = 900;
  const H = 360;
  const PAD_L = 54;
  const PAD_R = 24;
  const PAD_T = 28;
  const PAD_B = 56;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;
  const groupW = chartW / SERIES.length;
  const barW = groupW * 0.56;
  const maxY = 5000;
  const ticks = [0, 1000, 2000, 3000, 4000, 5000];

  const yScale = (v: number) => PAD_T + chartH * (1 - v / maxY);
  const dividerX = PAD_L + groupW * HISTORICAL.length;

  const ebitdaPoints = SERIES.map((d, i) => `${PAD_L + groupW * i + groupW / 2},${yScale(d.ebitda)}`).join(' ');
  const rnPoints = SERIES.map((d, i) => `${PAD_L + groupW * i + groupW / 2},${yScale(d.rn)}`).join(' ');

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Trajectoire financière AYRADE — Chiffre d'affaires, EBITDA et Résultat net 2022-2031, en millions de dinars algériens."
    >
      {/* Unit label */}
      <text
        x={PAD_L - 10}
        y={PAD_T - 10}
        textAnchor="end"
        fontFamily="var(--font-plex-mono), monospace"
        fontSize="11"
        fill="#0C0C0C"
        fillOpacity="0.65"
      >
        M DZD
      </text>

      {/* Gridlines + Y labels */}
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={PAD_L}
            y1={yScale(t)}
            x2={W - PAD_R}
            y2={yScale(t)}
            stroke="#0B2545"
            strokeOpacity={t === 0 ? 0.25 : 0.08}
            strokeWidth={t === 0 ? 1 : 1}
          />
          <text
            x={PAD_L - 10}
            y={yScale(t) + 4}
            textAnchor="end"
            fontFamily="var(--font-plex-mono), monospace"
            fontSize="12"
            fill="#0C0C0C"
            fillOpacity="0.65"
          >
            {formatFr(t)}
          </text>
        </g>
      ))}

      {/* Vertical divider between Réel and BP */}
      <line
        x1={dividerX}
        y1={PAD_T - 6}
        x2={dividerX}
        y2={H - PAD_B}
        stroke="#F9A64A"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <text
        x={dividerX - 6}
        y={PAD_T - 12}
        textAnchor="end"
        fontFamily="var(--font-plex-mono), monospace"
        fontSize="11"
        fill="#0C0C0C"
        fillOpacity="0.7"
        fontWeight="600"
        style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
      >
        RÉEL
      </text>
      <text
        x={dividerX + 6}
        y={PAD_T - 12}
        fontFamily="var(--font-plex-mono), monospace"
        fontSize="11"
        fill="#F9A64A"
        fontWeight="600"
        style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
      >
        BP 2026-2031
      </text>

      {/* Bars — Chiffre d'affaires */}
      {SERIES.map((d, i) => {
        const x = PAD_L + groupW * i + (groupW - barW) / 2;
        const y = yScale(d.ca);
        const h = H - PAD_B - y;
        const isProjected = i >= HISTORICAL.length;
        const emphasize = d.year === '2025' || d.year === '2031';
        return (
          <g key={d.year}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={Math.max(0, h)}
              fill={isProjected ? '#F9A64A' : '#0B2545'}
              fillOpacity={isProjected ? 0.9 : 0.78}
            />
            <text
              x={x + barW / 2}
              y={H - PAD_B + 20}
              textAnchor="middle"
              fontFamily="var(--font-plex-mono), monospace"
              fontSize="12"
              fill="#0C0C0C"
              fillOpacity={emphasize ? 0.95 : 0.7}
              fontWeight={emphasize ? 600 : 500}
            >
              {d.year}
            </text>
            {emphasize && (
              <text
                x={x + barW / 2}
                y={y - 9}
                textAnchor="middle"
                fontFamily="var(--font-fraunces), serif"
                fontSize="15"
                fill={isProjected ? '#F9A64A' : '#0B2545'}
                fontWeight="500"
              >
                {formatFr(d.ca)}
              </text>
            )}
          </g>
        );
      })}

      {/* Line — EBITDA */}
      <polyline
        points={ebitdaPoints}
        fill="none"
        stroke="#0A7CBD"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {SERIES.map((d, i) => (
        <circle
          key={`ebitda-dot-${d.year}`}
          cx={PAD_L + groupW * i + groupW / 2}
          cy={yScale(d.ebitda)}
          r={d.year === '2031' ? 4 : 2.5}
          fill="#0A7CBD"
        />
      ))}
      {/* Label EBITDA terminal */}
      <text
        x={PAD_L + groupW * (SERIES.length - 1) + groupW / 2 - 6}
        y={yScale(PROJECTED[PROJECTED.length - 1].ebitda) - 10}
        textAnchor="end"
        fontFamily="var(--font-plex-mono), monospace"
        fontSize="12"
        fill="#0A7CBD"
        fontWeight="600"
      >
        EBITDA 1 504
      </text>

      {/* Line — Résultat net */}
      <polyline
        points={rnPoints}
        fill="none"
        stroke="#0B2545"
        strokeOpacity="0.7"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      {SERIES.map((d, i) => (
        <circle
          key={`rn-dot-${d.year}`}
          cx={PAD_L + groupW * i + groupW / 2}
          cy={yScale(d.rn)}
          r={d.year === '2031' ? 3 : 1.8}
          fill="#0B2545"
          fillOpacity="0.85"
        />
      ))}
      <text
        x={PAD_L + groupW * (SERIES.length - 1) + groupW / 2 - 6}
        y={yScale(PROJECTED[PROJECTED.length - 1].rn) + 18}
        textAnchor="end"
        fontFamily="var(--font-plex-mono), monospace"
        fontSize="12"
        fill="#0B2545"
        fillOpacity="0.85"
        fontWeight="600"
      >
        RN 1 063
      </text>
    </svg>
  );
}

export function Trajectory() {
  const t = useTranslations('trajectory');
  // Unité monétaire traduite (« M DZD » FR/EN, « مليون دج » AR) — wave 3 BIDI.
  const currencyM = t('currencyM');

  const blockA = [
    { v: t('a1Value'), l: t('a1Label'), sub: t('a1Sub') },
    { v: t('a2Value'), l: t('a2Label'), sub: t('a2Sub') },
    { v: t('a3Value'), l: t('a3Label'), sub: t('a3Sub') },
    { v: t('a4Value'), l: t('a4Label'), sub: t('a4Sub') },
    { v: t('a5Value'), l: t('a5Label'), sub: t('a5Sub') },
  ];

  const cagrRows = [
    { v: '22 %', l: t('cagrCALabel'), sub: t('cagrCASub') },
    { v: '33 %', l: t('cagrEBITDALabel'), sub: t('cagrEBITDASub') },
    { v: '35 %', l: t('cagrRNLabel'), sub: t('cagrRNSub') },
  ];

  const blockC = [
    { v: '1 234', unit: currencyM, l: t('c1Label'), sub: t('c1Sub') },
    { v: '93 %', unit: '', l: t('c2Label'), sub: t('c2Sub') },
    { v: '3', unit: t('years'), l: t('c3Label'), sub: t('c3Sub') },
    { v: '9,45 %', unit: '', l: t('c4Label'), sub: t('c4Sub') },
  ];

  return (
    <section id="trajectoire" className="py-24 lg:py-32 relative" aria-labelledby="trajectory-title">
      <ParallaxLetter className="bg-letter absolute top-12 start-4 text-[18rem] lg:text-[26rem]">
        V
      </ParallaxLetter>
      <div className="max-w-shell mx-auto px-6 lg:px-10 relative">
        <header className="filet mb-14">
          <p className="font-mono text-[14px] uppercase tracking-micro text-orange mb-6 font-medium">
            {t('eyebrow')}
          </p>
          <h2
            id="trajectory-title"
            className="font-display font-light text-[2.5rem] lg:text-[4rem] leading-[0.95] tracking-tight max-w-4xl"
          >
            {t('title')}
          </h2>
          <p className="mt-6 text-ink/75 text-[1.0625rem] lg:text-lg leading-[1.65] max-w-3xl">{t('lead')}</p>
        </header>

        {/* BLOC A — SOCLE DEMONTRE */}
        <div className="mb-16">
          <h3 className="font-mono text-[14px] uppercase tracking-micro text-signal mb-7 font-medium">
            {t('blockATitle')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-navy/10 mb-8">
            {blockA.map((k, i) => (
              <div key={i} className="bg-paper p-6 lg:p-7 border border-navy/10">
                {/* k.v peut être mixte en AR (« 17 سنة ») ou pur Latin
                    (« +117 % »). dir="auto" + unicode-bidi: isolate laisse
                    HTML5 détecter la direction par le premier caractère fort
                    (Arabe→RTL, Latin→LTR) tout en isolant la valeur du flux
                    parent. En AR, « 17 سنة » rend visuellement « سنة 17 »
                    (nombre à droite) ; en FR/EN, « 17 ans » reste « 17 ans ». */}
                <p className="fig text-[2.25rem] lg:text-[2.5rem] text-navy tabular-nums leading-none">
                  <span dir="auto" style={{ unicodeBidi: 'isolate' }}>{k.v}</span>
                </p>
                <p className="mt-3 font-mono text-[13px] uppercase tracking-micro text-ink/85 font-medium">
                  {k.l}
                </p>
                <p className="mt-1.5 text-[13px] text-ink/65 leading-[1.55]">{k.sub}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-navy/15 pt-6">
            <p className="font-mono text-[13px] uppercase tracking-micro text-ink/70 mb-3 font-medium">
              {t('certificationsLabel')}
            </p>
            <p className="text-[15px] text-ink/85 leading-[1.65] max-w-4xl">
              {t('certificationsList')}
            </p>
          </div>
        </div>

        {/* BLOC B — TRAJECTOIRE FINANCIERE 2022-2031 */}
        <div className="mb-16">
          <h3 className="font-mono text-[14px] uppercase tracking-micro text-signal mb-7 font-medium">
            {t('blockBTitle')}
          </h3>
          <div className="grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-10 items-start">
            <div className="border border-navy/15 bg-paper p-5 lg:p-7">
              <TrajectoryChart />
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 font-mono text-[13px] text-ink/80">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-navy/78" />
                  {t('legendCAReal')}
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-orange" />
                  {t('legendCABP')}
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-0.5 bg-signal" />
                  {t('legendEBITDA')}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block w-4 h-px"
                    style={{ borderTop: '1px dashed #0B2545' }}
                  />
                  {t('legendRN')}
                </span>
              </div>
            </div>

            <aside className="space-y-7">
              {cagrRows.map((k, i) => (
                <div key={i} className="border-s-2 border-orange ps-5">
                  <p className="fig text-[2.75rem] text-navy tabular-nums leading-none">
                    <span className="bidi-ltr" dir="ltr">{k.v}</span>
                  </p>
                  <p className="mt-2.5 font-mono text-[13px] uppercase tracking-micro text-ink/85 font-medium">
                    {k.l}
                  </p>
                  <p className="mt-1.5 text-[13px] text-ink/65 leading-[1.55]">{k.sub}</p>
                </div>
              ))}
            </aside>
          </div>
          <p className="mt-6 text-[13px] text-ink/60 italic leading-[1.6] max-w-3xl">
            {t('sourceChart')}
          </p>
        </div>

        {/* BLOC C — RETOUR ACTIONNAIRE */}
        <div className="mb-10">
          <h3 className="font-mono text-[14px] uppercase tracking-micro text-signal mb-7 font-medium">
            {t('blockCTitle')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-navy/10 mb-6">
            {blockC.map((k, i) => (
              <div key={i} className="bg-paper p-6 lg:p-7 border border-navy/10">
                {/* Flex natif : en RTL parent, les enfants s'inversent
                    visuellement et s'alignent naturellement à droite.
                    Nombre à droite, unité à gauche → lecture R→L « 1 234
                    مليون دج », conforme à la demande wave-3. */}
                <div className="flex items-baseline gap-2 flex-wrap">
                  {/* k.v est toujours pur Latin (« 93 % », « 9,45 % », « 1 234 »).
                      Dans un paragraphe RTL (AR), « 93 % » peut visuellement
                      basculer en « % 93 » à cause de l'interaction ET/EN/WS
                      avec le flux parent — on force donc un îlot LTR isolé
                      (bidi-ltr + dir="ltr"), identique au pattern cagrRows.
                      Le flex parent reste RTL : en AR, le nombre passe à
                      droite et l'unité (k.unit, qui peut être « مليون دج »)
                      à gauche — conforme à la lecture R→L attendue. */}
                  <p className="fig text-[2.5rem] text-navy tabular-nums leading-none">
                    <span className="bidi-ltr" dir="ltr">{k.v}</span>
                  </p>
                  {k.unit && (
                    <span className="font-mono text-[13px] uppercase tracking-micro text-ink/70 font-medium">
                      {k.unit}
                    </span>
                  )}
                </div>
                <p className="mt-3 font-mono text-[13px] uppercase tracking-micro text-ink/85 font-medium">
                  {k.l}
                </p>
                <p className="mt-1.5 text-[13px] text-ink/65 leading-[1.55]">{k.sub}</p>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-ink/60 italic leading-[1.6] max-w-3xl">
            {t('sourceFinance')}
          </p>
        </div>

        <p className="mt-8 text-[13px] text-ink/65 leading-[1.6] max-w-3xl italic">
          {t('disclaimer')}
        </p>
      </div>
    </section>
  );
}
