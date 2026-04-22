import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ParallaxLetter } from './ParallaxLetter';

/* ─── Icons (stroke, 20px) ─── */
function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  );
}
function IconRadar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M19.07 4.93a10 10 0 11-14.14 0" />
      <path d="M15.54 8.46a5 5 0 10-7.08 7.08" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}
function IconFileText() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="13" y2="17"/>
    </svg>
  );
}
function IconClock() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 7 12 12 15 14"/>
    </svg>
  );
}
function IconDownload() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

export function ASA() {
  const t = useTranslations('asa');

  const capabilities = [
    { icon: <IconShield />, title: t('cap1Title'), body: t('cap1Body') },
    { icon: <IconRadar />, title: t('cap2Title'), body: t('cap2Body') },
    { icon: <IconFileText />, title: t('cap3Title'), body: t('cap3Body') },
    { icon: <IconClock />, title: t('cap4Title'), body: t('cap4Body') },
  ];

  return (
    <section
      id="asa"
      className="bg-orange text-navy py-24 lg:py-32 relative overflow-hidden"
      aria-labelledby="asa-title"
    >
      {/* Roman numeral filigree — navy tint on orange */}
      <ParallaxLetter className="bg-letter absolute top-10 start-8 text-[18rem] lg:text-[26rem] !text-navy/10">
        VII
      </ParallaxLetter>

      <div className="max-w-shell mx-auto px-6 lg:px-10 relative">
        {/* ── Header : 2-col (texte gauche / visuel droite) ── */}
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-start mb-16 lg:mb-20">
          {/* Left column : eyebrow + masthead + title + lead */}
          <header>
            {/* Navy filet hairline, replaces .filet (which is orange) */}
            <span className="block w-14 h-px bg-navy mb-6" aria-hidden="true" />

            <p className="font-mono text-[14px] uppercase tracking-micro text-navy mb-6 font-medium">
              {t('eyebrow')}
            </p>

            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-8">
              <span className="font-display font-light text-[4.5rem] lg:text-[6.5rem] leading-none tracking-tight text-navy select-none">
                ASA
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-navy/70">
                {t('productFullName')}
              </span>
            </div>

            <h2
              id="asa-title"
              className="font-display font-light text-[2rem] lg:text-[2.75rem] leading-[1.08] tracking-tight text-navy mb-6"
            >
              {t('title')}
            </h2>
            <p className="text-navy/80 leading-relaxed text-[1.0625rem]">
              {t('lead')}
            </p>
          </header>

          {/* Right column : appliance visual */}
          <figure className="relative w-full aspect-[15/8] lg:aspect-[4/3] border border-navy/15 overflow-hidden shadow-[0_20px_60px_-20px_rgba(11,37,69,0.45)]">
            <Image
              src="/assets/asa-appliance.jpg"
              alt={t('visualAlt')}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              priority={false}
            />
          </figure>
        </div>

        {/* ── Capabilities grid 2x2 — paper cards on orange ── */}
        <div className="grid md:grid-cols-2 gap-px bg-navy/15 mb-16" role="list">
          {capabilities.map((c, i) => (
            <div
              key={i}
              role="listitem"
              className="bg-paper p-8 lg:p-10 flex gap-5 items-start transition-colors duration-200 hover:bg-paper-50"
            >
              <div className="shrink-0 w-12 h-12 border border-navy/40 flex items-center justify-center text-navy">
                {c.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl lg:text-[1.5rem] tracking-tight mb-3 text-navy">
                  {c.title}
                </h3>
                <p className="text-navy/70 leading-relaxed text-[0.95rem]">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pull-quote CEO ── */}
        <blockquote className="border-s-2 border-navy ps-6 md:ps-8 mb-12 max-w-3xl">
          <p className="font-display font-light italic text-[1.375rem] lg:text-[1.75rem] leading-[1.35] text-navy mb-4">
            {t('quote')}
          </p>
          <footer className="font-mono text-[11px] uppercase tracking-micro text-navy/60">
            — {t('quoteAttribution')}
          </footer>
        </blockquote>

        {/* ── CTA — navy solid on orange ── */}
        <div className="flex flex-wrap gap-4">
          <a
            href="/documents/presentation-asa.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-navy text-paper hover:bg-navy-700 transition-colors duration-200 px-7 py-4 text-[12px] font-semibold uppercase tracking-wider inline-flex items-center gap-3"
          >
            {t('ctaDownload')}
            <span
              className="transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            >
              <IconDownload />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
