import { useTranslations } from 'next-intl';
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

export function Faq() {
  const t = useTranslations('faq');

  // 10 questions organized in 3 thematic groups
  const groups = [
    {
      label: t('groupAccessLabel'),
      items: [
        { q: t('q1Title'), a: t('q1Body') },
        { q: t('q2Title'), a: t('q2Body') },
        { q: t('q3Title'), a: t('q3Body') },
        { q: t('q4Title'), a: t('q4Body') },
      ],
    },
    {
      label: t('groupReturnLabel'),
      items: [
        { q: t('q5Title'), a: t('q5Body') },
        { q: t('q6Title'), a: t('q6Body') },
        { q: t('q7Title'), a: t('q7Body') },
      ],
    },
    {
      label: t('groupRiskLabel'),
      items: [
        { q: t('q8Title'), a: t('q8Body') },
        { q: t('q9Title'), a: t('q9Body') },
        { q: t('q10Title'), a: t('q10Body') },
      ],
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
            {t('lead')}
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
              href="mailto:ir@ayrade.dz"
              className="text-ink font-semibold link-hover"
            >
              ir@ayrade.dz
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
