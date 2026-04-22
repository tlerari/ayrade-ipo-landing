import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

type LegalPageProps = {
  /** Translation namespace, e.g. "legalNotice" or "privacyPolicy". */
  namespace: string;
  /** List of translation keys for each section's title + body, in order. */
  sectionKeys: Array<{ title: string; body: string }>;
  /** Optional eyebrow / header overrides are read from the same namespace. */
};

export function LegalPage({ namespace, sectionKeys }: LegalPageProps) {
  const t = useTranslations(namespace);

  const b = (chunks: ReactNode) => <strong className="font-semibold text-ink">{chunks}</strong>;

  return (
    <section className="py-20 lg:py-28 bg-paper">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <header className="mb-14">
          <p className="font-mono text-[13px] uppercase tracking-micro text-orange mb-4 font-medium">
            {t('eyebrow')}
          </p>
          <h1 className="font-display font-light text-[2.25rem] lg:text-[3.25rem] leading-[1.05] tracking-tight text-ink mb-6">
            {t('title')}
          </h1>
          <p className="text-ink/70 leading-[1.7] text-[1rem]">{t.rich('lead', { b })}</p>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-micro text-ink/50">
            {t('lastUpdated')}
          </p>
        </header>

        <div className="space-y-10">
          {sectionKeys.map((s, i) => (
            <section key={i} className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-[1.375rem] lg:text-[1.5rem] font-normal leading-snug tracking-tight text-ink mb-4">
                {t(s.title)}
              </h2>
              <div className="text-ink/75 leading-[1.75] text-[0.975rem] whitespace-pre-line">
                {t.rich(s.body, { b })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
