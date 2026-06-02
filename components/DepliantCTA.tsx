import { useTranslations } from 'next-intl';

/**
 * Bloc droit du bandeau Hero pendant la phase 'subscription' — valorise le
 * dépliant investisseurs (synthèse 2 pages : prix, calendrier, fiscalité,
 * comment souscrire, 6 raisons d'investir). Vient en lieu et place du
 * formulaire `<AlertCompact />` de la phase pré-souscription (alerte e-mail).
 *
 * Le lien pointe vers `/documents/plaquette-investisseurs-ayrade.pdf`
 * (même slot que la plaquette gated en V1 — fichier livré le 02/06/2026
 * sous forme de dépliant Adobe Illustrator).
 */
function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function DepliantCTA() {
  const t = useTranslations('depliant');

  return (
    <div className="w-full">
      <p className="font-mono text-[11px] uppercase tracking-micro text-orange mb-5 font-medium">
        {t('eyebrow')}
      </p>

      <h3 className="font-display font-light text-paper text-[1.625rem] lg:text-[1.875rem] leading-[1.1] tracking-tight mb-3">
        {t('title')}
      </h3>

      <p className="text-paper/70 text-sm leading-relaxed mb-6 max-w-md">
        {t('body')}
      </p>

      <a
        href="/documents/plaquette-investisseurs-ayrade.pdf"
        className="group btn-primary px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider inline-flex items-center gap-3"
      >
        {t('cta')}
        <span className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true">
          <DownloadIcon />
        </span>
      </a>
    </div>
  );
}
