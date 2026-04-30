import { useTranslations, useLocale } from 'next-intl';
import type { PhaseFlags } from '@/lib/operationPhase';
import { ParallaxLetter } from './ParallaxLetter';

function IconFile() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className="text-ink/40 shrink-0" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}
function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className="text-ink/40 shrink-0" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}
function IconPhone() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className="text-ink/40 shrink-0" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}
function IconMapPin() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className="text-ink/40 shrink-0 mt-0.5" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

export function DataRoom({ flags }: { flags: PhaseFlags }) {
  const t = useTranslations('dataRoom');
  const locale = useLocale();
  // V1 (notice non publiée) : les libellés doc1/doc2 renvoient une version
  // « bientôt disponible » et les liens PDF deviennent inactifs (ph-box).
  const doc1Label = flags.showNoticeCTA ? t('doc1') : t('doc1Teaser');
  const doc2Label = flags.showBulletinCTA ? t('doc2') : t('doc2Teaser');
  // Communiqué de presse — version localisée selon la langue active.
  // Reçu client 30/04/2026 (3 PDFs FR/EN/AR dans /CP-annonce/).
  const cpHref = `/documents/communique-presse-${locale}.pdf`;

  return (
    <section id="contacts" className="py-24 lg:py-32 relative" aria-labelledby="dataroom-title">
      <ParallaxLetter className="bg-letter absolute top-8 end-6 text-[16rem] lg:text-[22rem]">
        VIII
      </ParallaxLetter>
      <div className="max-w-shell mx-auto px-6 lg:px-10 relative">
        <header className="filet mb-16">
          <p className="font-mono text-[14px] uppercase tracking-micro text-orange mb-6 font-medium">{t('eyebrow')}</p>
          <h2 id="dataroom-title" className="font-display font-light text-[2.5rem] lg:text-[4rem] leading-[0.95] tracking-tight max-w-3xl">
            {t('title')}
          </h2>
        </header>

        <div className="grid md:grid-cols-3 gap-px bg-navy/12">
          {/* Documents */}
          <div className="bg-paper p-8 lg:p-10">
            <p className="font-mono text-[12px] uppercase tracking-micro text-signal mb-6 font-medium">{t('docsTitle')}</p>
            <ul className="space-y-4 text-sm">
              {/* 1. Communiqué de presse — document d'annonce, toujours
                  publiable même en V1 (pas d'acte réglementé COSOB, c'est la
                  communication de lancement). */}
              <li>
                <a
                  href={cpHref}
                  className="group flex items-center gap-2 text-ink hover:text-signal transition-colors duration-150"
                >
                  <IconFile />
                  <span className="link-hover flex-1">{t('docPress')}</span>
                  <span
                    aria-hidden="true"
                    className="rtl-flip opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-signal font-mono text-xs"
                  >
                    →
                  </span>
                </a>
              </li>
              {/* 2. Notice d'information COSOB — V2 uniquement (gate :
                  notice publiée). V1 : libellé « bientôt disponible ». */}
              <li>
                {flags.showNoticeCTA ? (
                  <a
                    href="/documents/notice-cosob-ayrade.pdf"
                    className="group flex items-center gap-2 text-ink hover:text-signal transition-colors duration-150"
                  >
                    <IconFile />
                    <span className="link-hover flex-1">{doc1Label}</span>
                    <span
                      aria-hidden="true"
                      className="rtl-flip opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-signal font-mono text-xs"
                    >
                      →
                    </span>
                  </a>
                ) : (
                  <span className="flex items-center gap-2 text-ink/40">
                    <IconFile />
                    <span className="font-mono text-xs">{doc1Label}</span>
                  </span>
                )}
              </li>
              {/* 3. Bulletin de souscription — V2 uniquement (gate :
                  bulletin téléchargeable). V1 : libellé « bientôt disponible ». */}
              <li>
                {flags.showBulletinCTA ? (
                  <a
                    href="/documents/bulletin-souscription-ayrade.pdf"
                    className="group flex items-center gap-2 text-ink hover:text-signal transition-colors duration-150"
                  >
                    <IconFile />
                    <span className="link-hover flex-1">{doc2Label}</span>
                    <span
                      aria-hidden="true"
                      className="rtl-flip opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-signal font-mono text-xs"
                    >
                      →
                    </span>
                  </a>
                ) : (
                  <span className="flex items-center gap-2 text-ink/40">
                    <IconFile />
                    <span className="font-mono text-xs">{doc2Label}</span>
                  </span>
                )}
              </li>
              {/* 4. Plaquette investisseurs — V2 uniquement. En V1 la
                  plaquette n'est pas encore validée et ne peut pas être
                  diffusée (période de préannonce). */}
              {flags.showNoticeCTA && (
                <li>
                  <a
                    href="/documents/plaquette-investisseurs-ayrade.pdf"
                    className="group flex items-center gap-2 text-ink hover:text-signal transition-colors duration-150"
                  >
                    <IconFile />
                    <span className="link-hover flex-1">{t('doc3')}</span>
                    <span
                      aria-hidden="true"
                      className="rtl-flip opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-signal font-mono text-xs"
                    >
                      →
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Relations investisseurs */}
          <div className="bg-paper p-8 lg:p-10">
            <p className="font-mono text-[12px] uppercase tracking-micro text-signal mb-6 font-medium">{t('irTitle')}</p>
            <div className="space-y-5 text-sm">
              <div>
                <p className="font-semibold text-ink text-sm">{t('irName1')}</p>
                <p className="font-mono text-xs text-ink/60 mt-1">
                  <a href="mailto:belbachir.lamine@ayrade.com" className="hover:text-signal transition-colors inline-flex items-center gap-1.5">
                    <IconMail />
                    belbachir.lamine@ayrade.com
                  </a>
                </p>
              </div>
              <div className="pt-4 border-t border-navy/10">
                <p className="font-semibold text-ink text-sm">{t('irName2')}</p>
                <p className="font-mono text-xs text-ink/60 mt-1">
                  <a href="mailto:lotfi.temmam@tell.group" className="hover:text-signal transition-colors inline-flex items-center gap-1.5">
                    <IconMail />
                    lotfi.temmam@tell.group
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Presse */}
          <div className="bg-paper p-8 lg:p-10">
            <p className="font-mono text-[12px] uppercase tracking-micro text-signal mb-6 font-medium">{t('pressTitle')}</p>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-ink text-sm">{t('pressAgencyName')}</p>
              <p className="font-mono text-xs text-ink/60">{t('pressAgencyRole')}</p>
              <p className="font-mono text-xs text-ink/60">
                <a href="tel:+213770255872" className="hover:text-signal transition-colors inline-flex items-center gap-1.5">
                  <IconPhone />
                  +213 770 25 58 72
                </a>
              </p>
              <p className="font-mono text-xs text-ink/60">
                <a href="mailto:presse@ayrade.com" className="hover:text-signal transition-colors inline-flex items-center gap-1.5">
                  <IconMail />
                  presse@ayrade.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
