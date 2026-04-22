import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { ParallaxLetter } from './ParallaxLetter';

export function Thesis() {
  const t = useTranslations('thesis');

  const b = (chunks: ReactNode) => <strong className="font-semibold text-ink">{chunks}</strong>;

  const reasons = [
    { n: '01', title: t.rich('reason1Title', { b }), body: t.rich('reason1Body', { b }) },
    { n: '02', title: t.rich('reason2Title', { b }), body: t.rich('reason2Body', { b }) },
    { n: '03', title: t.rich('reason3Title', { b }), body: t.rich('reason3Body', { b }) },
  ];

  return (
    <section id="pourquoi" className="relative py-24 lg:py-32" aria-labelledby="thesis-title">
      <ParallaxLetter className="bg-letter absolute top-12 start-4 text-[18rem] lg:text-[26rem]">
        III
      </ParallaxLetter>
      <div className="max-w-shell mx-auto px-6 lg:px-10 relative">
        <header className="filet mb-16">
          <p className="font-mono text-[14px] uppercase tracking-micro text-orange mb-6 font-medium">{t('eyebrow')}</p>
          <h2 id="thesis-title" className="font-display font-light text-[2.5rem] lg:text-[4rem] leading-[0.95] tracking-tight max-w-3xl">
            {t('title')}
          </h2>
        </header>

        <ol className="space-y-0">
          {reasons.map((r, idx) => (
            <li key={r.n}>
              {idx > 0 && <div className="dot-rule my-0" aria-hidden="true" />}
              <div className="grid md:grid-cols-[96px_1fr] gap-6 items-start py-12">
                <span
                  className="font-mono text-[4.5rem] lg:text-[5rem] text-orange leading-none tabular-nums select-none"
                  aria-hidden="true"
                >
                  {r.n}
                </span>
                <div>
                  <h3 className="font-display font-light italic text-[1.625rem] lg:text-[1.875rem] leading-tight tracking-tight mb-4 text-ink">
                    {r.title}
                  </h3>
                  <p className="text-ink/70 leading-[1.65] text-[1.0625rem]">{r.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="dot-rule" aria-hidden="true" />
      </div>
    </section>
  );
}
