import { useTranslations } from 'next-intl';
import { ParallaxLetter } from './ParallaxLetter';

/**
 * Section 04 — Stratégie et utilisation des fonds.
 * Données issues de la Notice d'information COSOB AYRADE (10/04/2026) :
 *  - §1.1.5 Utilisation du produit net (958,5 M DZD : 593 CAPEX + 366 BFR)
 *  - §6.2.3 Politique d'investissement (phasing 281/184/128 M DZD 2026-2028)
 *  - §6.2.4.1 Business plan 2026-2031 par BU (EPC, Services IT, Cybersécurité)
 */
export function Strategy() {
  const t = useTranslations('strategy');

  const bus = [
    {
      badge: t('bu1Badge'),
      title: t('bu1Title'),
      transition: t('bu1Transition'),
      cagr: t('bu1Cagr'),
      body: t('bu1Body'),
    },
    {
      badge: t('bu2Badge'),
      title: t('bu2Title'),
      transition: t('bu2Transition'),
      cagr: t('bu2Cagr'),
      body: t('bu2Body'),
    },
    {
      badge: t('bu3Badge'),
      title: t('bu3Title'),
      transition: t('bu3Transition'),
      cagr: t('bu3Cagr'),
      body: t('bu3Body'),
    },
  ];

  const jalons = [
    { year: '2026', amount: '281', detail: t('j1Detail') },
    { year: '2027', amount: '184', detail: t('j2Detail') },
    { year: '2028', amount: '128', detail: t('j3Detail') },
  ];

  return (
    <section
      id="strategie"
      className="bg-navy text-paper py-24 lg:py-32 relative"
      aria-labelledby="strategy-title"
    >
      <ParallaxLetter className="bg-letter absolute top-16 end-6 text-[16rem] lg:text-[22rem] text-paper/5">
        IV
      </ParallaxLetter>
      <div className="max-w-shell mx-auto px-6 lg:px-10 relative">
        {/* ── Header ── */}
        <header className="filet mb-16">
          <p className="font-mono text-[14px] uppercase tracking-micro text-orange mb-6 font-medium">
            {t('eyebrow')}
          </p>
          <h2
            id="strategy-title"
            className="font-display font-light text-[2.5rem] lg:text-[4rem] leading-[0.95] tracking-tight max-w-4xl text-paper"
          >
            {t('title')}
          </h2>
          <p className="mt-6 text-paper/80 text-[1.0625rem] lg:text-lg leading-[1.65] max-w-3xl">
            {t('lead')}
          </p>
        </header>

        {/* ── BLOC A — Utilisation du produit net ── */}
        <div className="mb-20">
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-7">
            <h3 className="font-mono text-[14px] uppercase tracking-micro text-signal font-medium">
              {t('blockAtitle')}
            </h3>
            <p className="font-mono text-[12px] text-paper/55">
              <span className="bidi-ltr" dir="ltr">{t('blockAmeta')}</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.55fr_1fr] gap-px bg-paper/10">
            {/* CAPEX — gros bloc */}
            <div className="bg-navy border border-paper/10 p-7 lg:p-10">
              <div className="flex items-baseline justify-between gap-3 flex-wrap mb-5">
                <span className="font-mono text-[12px] uppercase tracking-micro text-paper/60 font-medium">
                  {t('aCapexKicker')}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-micro text-orange border border-orange/40 px-2.5 py-1 font-medium">
                  {t('aCapexPct')}
                </span>
              </div>
              <div className="flex items-baseline gap-3 flex-wrap mb-5 bidi-ltr" dir="ltr">
                <span className="fig text-[3.5rem] lg:text-[4.25rem] text-paper tabular-nums leading-none">
                  593
                </span>
                <span className="font-mono text-[14px] uppercase tracking-micro text-paper/70 font-medium">
                  M DZD
                </span>
              </div>
              <h4 className="font-display text-[1.5rem] lg:text-[1.75rem] tracking-tight leading-[1.15] text-paper mb-3">
                {t('aCapexTitle')}
              </h4>
              <p className="text-[15px] lg:text-base text-paper/75 leading-[1.65] max-w-lg">
                {t('aCapexBody')}
              </p>
            </div>

            {/* BFR — bloc complémentaire */}
            <div className="bg-navy border border-paper/10 p-7 lg:p-10">
              <div className="flex items-baseline justify-between gap-3 flex-wrap mb-5">
                <span className="font-mono text-[12px] uppercase tracking-micro text-paper/60 font-medium">
                  {t('aBfrKicker')}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-micro text-signal border border-signal/50 px-2.5 py-1 font-medium">
                  {t('aBfrPct')}
                </span>
              </div>
              <div className="flex items-baseline gap-3 flex-wrap mb-5 bidi-ltr" dir="ltr">
                <span className="fig text-[3rem] lg:text-[3.5rem] text-paper tabular-nums leading-none">
                  366
                </span>
                <span className="font-mono text-[14px] uppercase tracking-micro text-paper/70 font-medium">
                  M DZD
                </span>
              </div>
              <h4 className="font-display text-[1.375rem] lg:text-[1.5rem] tracking-tight leading-[1.15] text-paper mb-3">
                {t('aBfrTitle')}
              </h4>
              <p className="text-[15px] lg:text-base text-paper/75 leading-[1.65] max-w-md">
                {t('aBfrBody')}
              </p>
            </div>
          </div>
        </div>

        {/* ── BLOC B — Trois moteurs de croissance ── */}
        <div className="mb-20">
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-7">
            <h3 className="font-mono text-[14px] uppercase tracking-micro text-signal font-medium">
              {t('blockBtitle')}
            </h3>
            <p className="font-mono text-[12px] text-paper/55">
              <span className="bidi-ltr" dir="ltr">{t('blockBmeta')}</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-paper/10">
            {bus.map((bu, i) => (
              <div
                key={i}
                className="bg-navy border border-paper/10 p-7 lg:p-8 flex flex-col gap-4 transition-colors duration-200 hover:border-orange/40"
              >
                <span className="self-start font-mono text-[11px] uppercase tracking-micro text-orange/90 border border-orange/40 px-2.5 py-1 font-medium">
                  {bu.badge}
                </span>
                <h4 className="font-display text-[1.5rem] lg:text-[1.75rem] tracking-tight leading-[1.15] text-paper">
                  {bu.title}
                </h4>
                <div className="border-t border-paper/10 pt-4 space-y-2">
                  <p className="font-mono text-[14px] text-paper/85 tabular-nums leading-tight">
                    <span className="bidi-ltr" dir="ltr">{bu.transition}</span>
                  </p>
                  <p className="font-mono text-[12px] uppercase tracking-micro text-signal font-semibold">
                    <span className="bidi-ltr" dir="ltr">{bu.cagr}</span>
                  </p>
                </div>
                <p className="text-[15px] text-paper/75 leading-[1.65] flex-1">
                  {bu.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BLOC C — Calendrier d'investissement ── */}
        <div>
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-7">
            <h3 className="font-mono text-[14px] uppercase tracking-micro text-signal font-medium">
              {t('blockCtitle')}
            </h3>
            <p className="font-mono text-[12px] text-paper/55">
              <span className="bidi-ltr" dir="ltr">{t('blockCmeta')}</span>
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="hidden md:grid grid-cols-3 gap-px bg-paper/10">
            {jalons.map((j, i) => (
              <div key={i} className="bg-navy border border-paper/10 p-7 lg:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange shrink-0" />
                  <span className="font-mono text-[13px] uppercase tracking-micro text-signal font-semibold">
                    {j.year}
                  </span>
                  <span className="flex-1 h-px bg-paper/15" />
                </div>
                <div className="flex items-baseline gap-2 flex-wrap mb-4 bidi-ltr" dir="ltr">
                  <span className="fig text-[3rem] lg:text-[3.25rem] text-paper tabular-nums leading-none">
                    {j.amount}
                  </span>
                  <span className="font-mono text-[13px] uppercase tracking-micro text-paper/70 font-medium">
                    M DZD
                  </span>
                </div>
                <p className="text-[14px] text-paper/75 leading-[1.6]">{j.detail}</p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden border-s-2 border-orange/60 ps-6 space-y-8">
            {jalons.map((j, i) => (
              <div key={i} className="relative">
                <span className="absolute -start-[1.875rem] top-1.5 w-3 h-3 rounded-full bg-orange" />
                <p className="font-mono text-[13px] uppercase tracking-micro text-signal mb-3 font-semibold">
                  {j.year}
                </p>
                <div className="flex items-baseline gap-2 flex-wrap mb-3 bidi-ltr" dir="ltr">
                  <span className="fig text-[2.5rem] text-paper tabular-nums leading-none">
                    {j.amount}
                  </span>
                  <span className="font-mono text-[13px] uppercase tracking-micro text-paper/70 font-medium">
                    M DZD
                  </span>
                </div>
                <p className="text-[14px] text-paper/75 leading-[1.6]">{j.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 text-[14px] text-paper/70 leading-relaxed max-w-3xl">
          {t('footer')}
        </p>
      </div>
    </section>
  );
}
