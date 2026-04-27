import { useTranslations } from 'next-intl';
import type { PhaseFlags } from '@/lib/operationPhase';
import { ParallaxLetter } from './ParallaxLetter';
import { AnimatedNumber } from './AnimatedNumber';

function KPI({
  value,
  label,
  sub,
  delay,
}: {
  value: string;
  label: string;
  sub?: string;
  delay: number;
}) {
  return (
    <div
      className="fade-up border-s border-signal/50 ps-5 py-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="fig text-[2rem] lg:text-[2.5rem] text-ink leading-none tabular-nums">
        <AnimatedNumber value={value} durationMs={1100} />
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-micro text-signal font-medium">
        {label}
      </p>
      {sub && <p className="mt-1 text-xs text-ink/45 font-mono">{sub}</p>}
    </div>
  );
}

function FileTextIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-signal flex-shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

export function KeyFigures({ flags }: { flags: PhaseFlags }) {
  const t = useTranslations('keyFigures');
  // Syndicate list gate : when the syndicate isn't published yet, show a
  // placeholder value and body (teaser variants) instead of the definitive
  // "BDL + 11" figure and the official visa body.
  const syndicateReady = flags.showSyndicateList;

  return (
    <section
      id="operation"
      className="py-24 lg:py-32 relative"
      aria-labelledby="kf-title"
    >
      <ParallaxLetter className="bg-letter absolute top-16 start-4 text-[16rem] lg:text-[22rem]">
        I
      </ParallaxLetter>

      <div className="max-w-shell mx-auto px-6 lg:px-10 relative">
        <header className="filet mb-16">
          <p className="font-mono text-[14px] uppercase tracking-micro text-orange mb-6 font-medium">
            {t('eyebrow')}
          </p>
          <h2
            id="kf-title"
            className="font-display font-light text-[2.5rem] lg:text-[4rem] leading-[0.95] tracking-tight max-w-3xl"
          >
            {t('title')}
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <KPI
            value={t('kpi1Value')}
            label={t('kpi1Label')}
            sub={t('kpi1Sub')}
            delay={100}
          />
          <KPI value={t('kpi2Value')} label={t('kpi2Label')} delay={150} />
          <KPI
            value={t('kpi3Value')}
            label={t('kpi3Label')}
            sub={t('kpi3Sub')}
            delay={200}
          />
          <KPI value={t('kpi4Value')} label={t('kpi4Label')} delay={250} />
          <KPI value={t('kpi5Value')} label={t('kpi5Label')} delay={300} />
          <KPI
            value={syndicateReady ? t('kpi6Value') : t('kpi6ValueTeaser')}
            label={syndicateReady ? t('kpi6Label') : t('kpi6LabelTeaser')}
            sub={syndicateReady ? t('kpi6Sub') : t('kpi6SubTeaser')}
            delay={350}
          />
        </div>

        <div className="bg-paper border border-navy/12 border-s-2 border-s-signal ps-6 py-5 flex items-start gap-3">
          <FileTextIcon />
          <p className="text-sm text-ink/75 leading-relaxed">
            <strong className="text-ink">
              {flags.showNoticeCTA ? t('visaTitle') : t('visaTitleTeaser')}
            </strong>{' '}
            {flags.showNoticeCTA ? t('visaBody') : t('visaBodyTeaser')}
            {flags.showNoticeCTA && (
              <>
                {' '}
                <a
                  href="/documents/notice-cosob-ayrade.pdf"
                  className="text-signal underline font-semibold link-hover"
                >
                  {t('visaCta')}
                </a>
                .
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
