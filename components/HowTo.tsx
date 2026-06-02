import { useLocale, useTranslations } from 'next-intl';
import type { PhaseFlags } from '@/lib/operationPhase';
import { ParallaxLetter } from './ParallaxLetter';
import { TrackedAnchor } from './TrackedAnchor';

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
  const locale = useLocale();

  // Teaser variants for each step: until the notice is published, we keep
  // the 3-step narrative but strip committed references (syndicate bank list,
  // exact subscription modalities, calendar bound by the notice).
  const step1BodyKey = flags.showNoticeCTA ? 'step1Body' : 'step1BodyTeaser';
  const step2BodyKey = flags.showNoticeCTA ? 'step2Body' : 'step2BodyTeaser';
  const step3BodyKey = flags.showNoticeCTA ? 'step3Body' : 'step3BodyTeaser';

  const steps = [
    { n: '1', title: t('step1Title'), body: t(step1BodyKey) },
    { n: '2', title: t('step2Title'), body: t(step2BodyKey) },
    { n: '3', title: t('step3Title'), body: t(step3BodyKey) },
  ];

  // Syndicat de placement — 11 établissements confirmés (client 23/05/2026).
  // BDL est chef de file (rendu à part) ; les 10 autres ci-dessous, dont
  // 2 IOB (Tell Markets SPA, Invest Market SPA). Noms propres = invariants
  // selon la langue (rendus en îlot LTR dir="ltr", y compris en version AR).
  const IOB = new Set(['Tell Markets SPA', 'Invest Market SPA']);
  const syndicateMembers = [
    'BNA',
    'BEA',
    'CPA',
    'CNEP Banque',
    'BADR',
    'Société Générale Algérie',
    'Al Salam Bank Algeria',
    'Al Baraka Bank',
    'Tell Markets SPA',
    'Invest Market SPA',
  ];

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

        {/* Membres du syndicat de placement — liste définitive (11 établissements). */}
        {flags.showSyndicateList && (
          <div className="bg-navy border border-paper/15 p-8 lg:p-10 mb-10">
            <p className="font-mono text-[11px] uppercase tracking-micro text-signal mb-6">{t('syndicateLabel')}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
              {/* Chef de file */}
              <span className="border border-signal/40 bg-signal/10 px-3 py-2.5 flex items-center justify-between gap-2">
                <span className="font-semibold text-paper" dir="ltr">{t('syndicateLeader')}</span>
                <span className="text-signal font-mono text-[9px] uppercase tracking-micro shrink-0">
                  {t('syndicateLeaderTag')}
                </span>
              </span>
              {syndicateMembers.map((name) => (
                <span
                  key={name}
                  className="border border-paper/15 px-3 py-2.5 flex items-center justify-between gap-2"
                >
                  <span className="text-paper/85" dir="ltr">{name}</span>
                  {IOB.has(name) && (
                    <span className="text-signal/80 font-mono text-[9px] uppercase tracking-micro shrink-0">
                      {t('syndicateIobTag')}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {(flags.showBulletinCTA || flags.showSubscribeCTA) && (
          <div className="flex flex-wrap gap-4">
            {flags.showBulletinCTA && (
              <TrackedAnchor
                href="/documents/bulletin-souscription-ayrade.pdf"
                className="group btn-primary px-7 py-4 text-[12px] font-semibold uppercase tracking-wider inline-flex items-center gap-3"
                metaEvent={{ name: 'Lead', data: { content_name: 'bulletin_souscription' } }}
              >
                {t('ctaDownload')}
                <span className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true">
                  <DownloadIcon />
                </span>
              </TrackedAnchor>
            )}
            <a
              href={`/${locale}/faq`}
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
