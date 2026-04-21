import { useTranslations } from 'next-intl';
import { ParallaxLetter } from './ParallaxLetter';

function IconCloud() {
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10 text-signal mb-6" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M17.5 19a4.5 4.5 0 100-9h-1.8A7 7 0 104 14.9" />
      <path d="M12 19h16v10H12z" />
    </svg>
  );
}

function IconServer() {
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10 text-signal mb-6" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <rect x="4" y="4" width="32" height="13" rx="1" />
      <rect x="4" y="22" width="32" height="13" rx="1" />
      <circle cx="32" cy="10.5" r="1.5" />
      <circle cx="32" cy="28.5" r="1.5" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10 text-signal mb-6" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M20 6l12 5v8c0 8-5 13-12 15-7-2-12-7-12-15v-8l12-5z" />
      <path d="M15 20l4 4 7-8" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-signal" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-signal" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-signal" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18" /><path d="M6 12h12" /><path d="M6 18h12" /><path d="M6 6h12" />
    </svg>
  );
}
function IconServerSmall() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-signal" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}
function IconAward() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-signal" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

export function Pillars() {
  const t = useTranslations('pillars');

  const pillars = [
    { Icon: IconCloud, title: t('p1Title'), body: t('p1Body'), phLabel: 'cloud / serveurs' },
    { Icon: IconServer, title: t('p2Title'), body: t('p2Body'), phLabel: 'datacenter / infra' },
    { Icon: IconShield, title: t('p3Title'), body: t('p3Body'), phLabel: 'SOC / cyber' },
  ];

  const stats = [
    { Icon: IconCalendar, value: t('stat1Value'), label: t('stat1Label') },
    { Icon: IconUsers, value: t('stat2Value'), label: t('stat2Label') },
    { Icon: IconBuilding, value: t('stat3Value'), label: t('stat3Label') },
    { Icon: IconServerSmall, value: t('stat4Value'), label: t('stat4Label') },
    { Icon: IconAward, value: t('stat5Value'), label: t('stat5Label') },
  ];

  return (
    <section id="ayrade" className="bg-navy text-paper py-24 lg:py-32 relative" aria-labelledby="pillars-title">
      <ParallaxLetter className="bg-letter absolute top-16 end-6 text-[16rem] lg:text-[22rem] text-paper/5">
        II
      </ParallaxLetter>
      <div className="max-w-shell mx-auto px-6 lg:px-10 relative">
        <header className="filet mb-8">
          <p className="font-mono text-[14px] uppercase tracking-micro text-orange mb-6 font-medium">{t('eyebrow')}</p>
          <h2 id="pillars-title" className="font-display font-light text-[2.5rem] lg:text-[4rem] leading-[0.95] tracking-tight max-w-4xl text-paper">
            {t('title')}
          </h2>
        </header>

        <p className="text-paper/70 text-[1.0625rem] leading-relaxed mb-14 max-w-3xl">{t('lead')}</p>

        <div className="grid md:grid-cols-3 gap-px bg-paper/10 mb-14">
          {pillars.map((p, i) => (
            <article
              key={i}
              className="relative corner bg-navy p-8 lg:p-10 flex flex-col border border-paper/10 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange/40 focus-within:border-orange/40"
            >
              <span />
              <span className="tr" />
              <span className="bl" />
              <span className="br" />

              {/* Photo band — small editorial placeholder above the pillar */}
              <div
                aria-hidden="true"
                className="relative aspect-[16/9] mb-6 border border-dashed border-orange/45 bg-orange/[0.04] flex items-center justify-center overflow-hidden"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-orange/80 text-center px-3 leading-tight">
                  [ PH : {p.phLabel} ]
                </span>
                {/* subtle corner ticks */}
                <span className="absolute top-1 left-1 w-2 h-px bg-orange/50" />
                <span className="absolute top-1 left-1 w-px h-2 bg-orange/50" />
                <span className="absolute top-1 right-1 w-2 h-px bg-orange/50" />
                <span className="absolute top-1 right-1 w-px h-2 bg-orange/50" />
                <span className="absolute bottom-1 left-1 w-2 h-px bg-orange/50" />
                <span className="absolute bottom-1 left-1 w-px h-2 bg-orange/50" />
                <span className="absolute bottom-1 right-1 w-2 h-px bg-orange/50" />
                <span className="absolute bottom-1 right-1 w-px h-2 bg-orange/50" />
              </div>

              <p.Icon />
              <h3 className="font-display text-2xl mb-3 tracking-tight text-paper">{p.title}</h3>
              <p className="text-paper/65 leading-relaxed text-[15px] flex-1">{p.body}</p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-8 border-t border-paper/15">
          {stats.map((s, i) => (
            <div key={i}>
              <s.Icon />
              <p className="mt-2 fig text-2xl text-paper tabular-nums">{s.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-micro text-paper/70 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
