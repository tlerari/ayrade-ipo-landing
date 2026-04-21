import { useTranslations } from 'next-intl';
import type { PhaseFlags } from '@/lib/operationPhase';
import { ParallaxLetter } from './ParallaxLetter';

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

export function HowTo({ flags }: { flags: PhaseFlags }) {
  const t = useTranslations('howTo');

  const steps = [
    { n: '1', title: t('step1Title'), body: t('step1Body') },
    { n: '2', title: t('step2Title'), body: t('step2Body') },
    { n: '3', title: t('step3Title'), body: t('step3Body') },
  ];

  // Placeholder bank names 2–11
  const bankPlaceholders = Array.from({ length: 10 }, (_, i) => `[PH : banque ${i + 2}]`);

  return (
    <section id="comment" className="bg-navy text-paper py-24 lg:py-32 relative" aria-labelledby="howto-title">
      <ParallaxLetter className="bg-letter absolute top-10 end-8 text-[18rem] lg:text-[26rem] text-paper/5">
        VI
      </ParallaxLetter>
      <div className="max-w-shell mx-auto px-6 lg:px-10 relative">
        <header className="filet mb-16">
          <p className="font-mono text-[14px] uppercase tracking-micro text-orange mb-6 font-medium">{t('eyebrow')}</p>
          <h2 id="howto-title" className="font-display font-light text-[2.5rem] lg:text-[4rem] leading-[0.95] tracking-tight text-paper max-w-3xl">
            {t('title')}
          </h2>
        </header>

        <ol className="grid lg:grid-cols-3 gap-px bg-paper/10 mb-10">
          {steps.map((s) => (
            <li key={s.n} className="bg-navy border border-paper/10 p-10 lg:p-12 flex flex-col relative">
              {/* Step circle — Fraunces regular, white on orange */}
              <span
                className="absolute -top-4 -start-4 w-11 h-11 bg-orange rounded-full flex items-center justify-center font-display font-normal text-paper text-base select-none"
                aria-hidden="true"
              >
                {s.n}
              </span>
              <h3 className="font-display text-2xl lg:text-[1.75rem] tracking-tight mb-4 text-paper">{s.title}</h3>
              <p className="text-paper/65 leading-relaxed flex-1">{s.body}</p>
            </li>
          ))}
        </ol>

        {/* Banques du syndicat */}
        <div className="bg-navy border border-paper/15 p-8 lg:p-10 mb-10">
          <p className="font-mono text-[11px] uppercase tracking-micro text-signal mb-6">{t('syndicateLabel')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-paper">{t('syndicateLeader')}</span>
              <span className="text-signal font-mono text-[10px] uppercase tracking-micro">
                {t('syndicateLeaderTag')}
              </span>
            </div>
            {bankPlaceholders.map((name, i) => (
              <span
                key={i}
                className="ph-box font-mono text-[10px] px-2 py-1.5 leading-tight"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {flags.showSubscribeCTA && (
          <div className="flex flex-wrap gap-4">
            <a
              href="/documents/bulletin-souscription-ayrade.pdf"
              className="group btn-primary px-7 py-4 text-[12px] font-semibold uppercase tracking-wider inline-flex items-center gap-3"
            >
              {t('ctaDownload')}
              <span className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true">
                <DownloadIcon />
              </span>
            </a>
            <a
              href="#contacts"
              className="btn-ghost-dark px-7 py-4 text-[12px] font-semibold uppercase tracking-wider"
            >
              {t('ctaFaq')}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
