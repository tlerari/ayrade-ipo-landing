import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { PhaseFlags } from '@/lib/operationPhase';
import { Countdown } from './Countdown';
import { AlertCompact } from './AlertCompact';

// Photo Hero — version unique sur FR / EN / AR (visuel AYRADE fourni par le client).
const HERO_IMAGE = '/assets/ayrade-hero.jpg';

// Pattern décoratif du hero — motif AYRADE (couleur sable), tuile 257×257.
// Appliqué uniformément sur FR / EN / AR après A/B test.
// Version .webp (23/04/2026) : remplace le PNG d'origine — compression ×2,8 (4068→1424 o)
// pour le même rendu visuel (mix-blend-screen + opacity 0.14).
const HERO_PATTERN = '/assets/pattern-header-1.webp';

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
      <div className="max-w-shell mx-auto px-6 lg:px-10 pt-14 pb-12 lg:pt-20 lg:pb-16 relative">

        {/* ════════ Ligne 1 — texte (gauche) + photo datacenter (droite) ════════ */}
        <div className="grid lg:grid-cols-5 gap-y-16 gap-x-10 items-stretch">

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
                {flags.showNoticeCTA && (
                  <a
                    href="/documents/notice-cosob-ayrade.pdf"
                    className="btn-ghost-dark px-7 py-4 text-[12px] font-semibold uppercase tracking-wider inline-flex items-center gap-3 link-hover"
                  >
                    {t('ctaDownload')}
                  </a>
                )}
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
              {flags.showNoticeCTA ? t('disclaimer') : t('disclaimerTeaser')}
            </p>
          </div>

          {/* ── Right column — datacenter photo. ── */}
          <div className="lg:col-span-2 fade-up d4 flex">
            <figure className="relative corner bg-navy border border-paper/15 overflow-hidden w-full min-h-[420px] lg:min-h-0">
              <span />
              <span className="tr" />
              <span className="bl" />
              <span className="br" />
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

        {/* ════════ Ligne 2 — bloc cohérent Countdown + Alerte e-mail ════════
            Réintroduction de l'UX d'avant la Task #25 (26/04/2026), désormais
            conforme Loi 18-07 grâce au double opt-in côté backend (cf.
            email-alert-server/). Encart bordé full-width pour matérialiser
            visuellement le "bloc cohérent" demandé par le client (28/04/2026). */}
        {flags.showOpeningCountdown && (
          <div className="fade-up d5 mt-12 lg:mt-16 border border-paper/20 bg-paper/[0.03]">
            <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-paper/15">
              <div className="p-6 sm:p-8 lg:p-10">
                <Countdown compact />
              </div>
              <div className="p-6 sm:p-8 lg:p-10">
                <AlertCompact />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

