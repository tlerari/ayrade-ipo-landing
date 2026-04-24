import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import type { PhaseFlags } from '@/lib/operationPhase';

// Icônes SVG inline — évite la dépendance lucide-react pour 3 pictos.
// 20×20 viewBox, stroke = currentColor, style harmonisé.
function IconLinkedIn() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 01-.01 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 01-1.38-.9 3.72 3.72 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 00-2.13 1.38A5.88 5.88 0 00.63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.88 5.88 0 001.38 2.13c.65.65 1.3 1.05 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 002.13-1.38 5.88 5.88 0 001.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 00-1.38-2.13A5.88 5.88 0 0019.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zM12 16a4 4 0 114-4 4 4 0 01-4 4zm6.41-11.85a1.44 1.44 0 11-1.44 1.44 1.44 1.44 0 011.44-1.44z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

export function Footer({ flags }: { flags: PhaseFlags }) {
  const t = useTranslations('footer');
  const locale = useLocale();
  // V1 : le disclaimer COSOB passe au futur tant que la notice n'est pas visée.
  const disclaimer1Key = flags.showNoticeCTA ? 'disclaimer1' : 'disclaimer1Teaser';

  return (
    <footer className="bg-navy text-paper pt-16 pb-10">
      <div className="max-w-shell mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-8 pb-10 border-b border-paper/10">
          <div>
            <Image
              src="/assets/logo-ayrade-light.png"
              alt="AYRADE"
              width={460}
              height={92}
              className="h-20 w-auto mb-6"
            />
            <p className="text-paper/60 text-sm leading-relaxed max-w-sm">{t('tagline')}</p>
          </div>
          <div className="md:text-end">
            <p className="font-mono text-[12px] uppercase tracking-micro text-paper/75 mb-3 font-medium">{t('followLabel')}</p>
            <div className="flex gap-5 md:justify-end items-center">
              <a
                href="https://www.linkedin.com/company/ayrade/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="AYRADE sur LinkedIn"
                className="text-paper/65 hover:text-paper transition-colors"
              >
                <IconLinkedIn />
              </a>
              <a
                href="https://www.instagram.com/ayrade_corp/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="AYRADE sur Instagram"
                className="text-paper/65 hover:text-paper transition-colors"
              >
                <IconInstagram />
              </a>
              <a
                href="https://www.facebook.com/ayrade/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="AYRADE sur Facebook"
                className="text-paper/65 hover:text-paper transition-colors"
              >
                <IconFacebook />
              </a>
            </div>
          </div>
        </div>

        <div className="py-10 border-b border-paper/10 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2">
            <p className="font-mono text-[12px] uppercase tracking-micro text-orange font-medium">{t('disclaimerLabel')}</p>
          </div>
          <div className="lg:col-span-10 text-[13px] text-paper/75 leading-relaxed space-y-3 max-w-4xl">
            <p>{t(disclaimer1Key)}</p>
            <p>{t('disclaimer2')}</p>
          </div>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[12px] uppercase tracking-micro text-paper/65 font-medium">
          <p>{t('copyright')}</p>
          <ul className="flex flex-wrap gap-6">
            <li><a href={`/${locale}/mentions-legales`} className="link-hover">{t('legal')}</a></li>
            <li><a href={`/${locale}/confidentialite`} className="link-hover">{t('privacy')}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
