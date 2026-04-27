import { useTranslations } from 'next-intl';
import type { PhaseFlags } from '@/lib/operationPhase';
import { ParallaxLetter } from './ParallaxLetter';

function IconPlus() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="chev text-orange"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function Faq({ flags }: { flags: PhaseFlags }) {
  const t = useTranslations('faq');
  // V1 (notice non publiée) : 6 questions clefs, réponses en version teaser.
  // V2 : 10 questions, réponses officielles adossées à la notice COSOB.
  const leadKey = flags.showNoticeCTA ? 'lead' : 'leadTeaser';

  const q = (n: number, hasTeaser: boolean) => ({
    q: t(`q${n}Title`),
    a: flags.showNoticeCTA || !hasTeaser ? t(`q${n}Body`) : t(`q${n}BodyTeaser`),
  });

  const groups = flags.showNoticeCTA
    ? [
        {
          label: t('groupAccessLabel'),
          items: [q(1, true), q(2, true), q(3, true), q(4, true)],
        },
        {
          label: t('groupReturnLabel'),
          items: [q(5, false), q(6, false), q(7, false)],
        },
        {
          label: t('groupRiskLabel'),
          items: [q(8, true), q(9, false), q(10, true)],
        },
      ]
    : [
        {
          label: t('groupAccessLabel'),
          items: [q(1, true), q(2, true), q(3, true), q(4, true)],
        },
        {
          label: t('groupRiskLabel'),
          items: [q(8, true), q(10, true)],
        },
      ];

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 relative bg-paper"
      aria-labelledby="faq-title"
    >
      <ParallaxLetter className="bg-letter absolute top-10 start-6 text-[16rem] lg:text-[22rem]">
        FAQ
      </ParallaxLetter>

      <div className="max-w-shell mx-auto px-6 lg:px-10 relative">
        <header className="filet mb-16 max-w-4xl">
          <p className="font-mono text-[14px] uppercase tracking-micro text-orange mb-6 font-medium">
            {t('eyebrow')}
          </p>
          <h1
            id="faq-title"
            className="font-display font-light text-[2.5rem] lg:text-[4rem] leading-[0.95] tracking-tight text-ink"
          >
            {t('title')}
          </h1>
          <p className="mt-6 text-ink/70 text-[1.0625rem] leading-[1.65] max-w-2xl">
            {t(leadKey)}
          </p>
        </header>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
          {/* Sidebar — table of contents */}
          <aside className="hidden lg:block sticky top-28 self-start">
            <p className="font-mono text-[11px] uppercase tracking-micro text-ink/50 mb-4">
              {t('tocLabel')}
            </p>
            <ul className="space-y-3 text-sm">
              {groups.map((g, i) => (
                <li key={i}>
                  <a
                    href={`#faq-group-${i + 1}`}
                    className="text-ink/70 hover:text-orange transition-colors link-hover"
                  >
                    {g.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Accordion column */}
          <div className="space-y-14">
            {groups.map((g, gi) => (
              <div key={gi} id={`faq-group-${gi + 1}`}>
                <p className="font-mono text-[12px] uppercase tracking-micro text-signal mb-4 font-medium">
                  {g.label}
                </p>
                <div>
                  {g.items.map((item, i) => (
                    <details key={i} className="faq group py-5">
                      <summary className="flex items-start justify-between gap-6 text-ink">
                        <span className="font-display text-[1.125rem] lg:text-[1.25rem] font-normal leading-snug pr-4">
                          {item.q}
                        </span>
                        <span className="mt-1 shrink-0">
                          <IconPlus />
                        </span>
                      </summary>
                      <div className="pt-4 pb-2 text-ink/70 leading-[1.7] text-[0.975rem] max-w-3xl whitespace-pre-line">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact banner */}
        <div className="mt-20 border-s-2 border-orange ps-6 py-5 max-w-3xl">
          <p className="font-mono text-[12px] uppercase tracking-micro text-orange mb-2 font-medium">
            {t('contactLabel')}
          </p>
          <p className="text-ink/80 text-[0.975rem] leading-relaxed">
            {t('contactBody')}{' '}
            <a
              href="mailto:support@ayrade.com"
              className="text-ink font-semibold link-hover"
            >
              support@ayrade.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
