import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { PhaseFlags } from '@/lib/operationPhase';
import { Countdown } from './Countdown';

// Photo Hero — version unique sur FR / EN / AR (visuel AYRADE fourni par le client).
const HERO_IMAGE = '/assets/ayrade-hero.jpg';

// Pattern décoratif du hero — chevrons AYRADE (couleur sable), tuile 257×257.
// Appliqué uniformément sur FR / EN / AR après A/B test.
const HERO_PATTERN = '/assets/pattern-header-1.png';

export function Hero({ flags }: { flags: PhaseFlags }) {
  const t = useTranslations('hero');

  return (
    <section id="top" className="relative grain overflow-hidden bg-navy text-paper">
      {/* Pattern décoratif — tuile 257×257, opacité contenue pour rester lisible sur navy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-screen"
        style={{
          backgroundImage: `url(${HERO_PATTERN})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '257px 257px',
        }}
      />
      <div className="max-w-shell mx-auto px-6 lg:px-10 pt-14 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-5 gap-y-16 gap-x-10 items-center relative">

        {/* ── Left column ── */}
        <div className="lg:col-span-3">
          <p className="fade-up d1 font-mono text-[14px] uppercase tracking-micro text-orange mb-4 font-medium">
            {t('eyebrow')}
          </p>

          <h1 className="fade-up d2 font-display font-light text-[2.75rem] sm:text-[3.75rem] lg:text-[5rem] xl:text-[5.5rem] leading-[0.95] tracking-[-0.03em] text-paper">
            {t('title')}
          </h1>

          <p className="fade-up d3 mt-8 max-w-2xl text-[1.0625rem] lg:text-lg leading-[1.65] text-paper/80">
            {t('lead')}
          </p>

          {(flags.showSubscribeCTA || !flags.showArchiveNotice) && (
            <div className="fade-up d4 mt-10 flex flex-col sm:flex-row gap-3">
              {flags.showSubscribeCTA && (
                <a
                  href="#comment"
                  className="group btn-primary px-7 py-4 text-[12px] font-semibold uppercase tracking-wider inline-flex items-center gap-3"
                >
                  {t('ctaSubscribe')}
                  <span
                    aria-hidden="true"
                    className="rtl-flip transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              )}
              <a
                href="/documents/notice-cosob-ayrade.pdf"
                className="btn-ghost-dark px-7 py-4 text-[12px] font-semibold uppercase tracking-wider inline-flex items-center gap-3 link-hover"
              >
                {t('ctaDownload')}
              </a>
            </div>
          )}

          {flags.showClosedBanner && (
            <div className="mt-10 border-s-2 border-orange ps-5 py-3 text-paper/80 text-sm">
              {t('closedBanner')}
            </div>
          )}
          {flags.showArchiveNotice && (
            <div className="mt-10 border-s-2 border-signal ps-5 py-3 text-paper/80 text-sm">
              {t('archiveBanner')}
            </div>
          )}

          <p className="fade-up d5 mt-8 text-[13px] text-paper/75 max-w-xl leading-relaxed">
            {t('disclaimer')}
          </p>

          {(flags.showOpeningCountdown || flags.showClosingCountdown) && (
            <Countdown />
          )}
        </div>

        {/* ── Right column — datacenter photo (portrait 4/5) ── */}
        <div className="lg:col-span-2 fade-up d4">
          <figure className="relative corner aspect-[4/5] bg-navy border border-paper/15 overflow-hidden">
            <span />
            <span className="tr" />
            <span className="bl" />
            <span className="br" />

            {/* Photo */}
            <Image
              src={HERO_IMAGE}
              alt={t('imageAlt')}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              priority
            />
          </figure>
        </div>

      </div>
    </section>
  );
}

