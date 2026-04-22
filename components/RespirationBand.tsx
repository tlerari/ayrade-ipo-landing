import Image from 'next/image';
import { useTranslations } from 'next-intl';

/**
 * RespirationBand — bande panoramique pleine largeur entre Pillars et Thesis.
 * Placeholder pour le film institutionnel AYRADE (CEO + responsables métiers
 * + experts qualité/sécurité). En attendant le tournage, on réutilise la
 * photo de la baie d'Alger en arrière-plan désaturé avec overlay navy,
 * surmontée d'un bouton play orange et d'un titre court.
 */
export function RespirationBand() {
  const t = useTranslations('respiration');

  return (
    <section
      aria-labelledby="respiration-title"
      className="relative bg-navy text-paper overflow-hidden"
    >
      <div className="relative w-full aspect-[21/9] lg:aspect-[21/7]">
        {/* Visuel de fond — photo Alger désaturée/assombrie en attendant la vidéo */}
        <Image
          src="/assets/alger-baie-port.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35 grayscale-[25%]"
        />

        {/* Overlay navy → garantit lisibilité texte */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/55 to-navy/80"
        />

        {/* Contenu centré : eyebrow + title + play button + note */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 lg:px-10">
          <p className="font-mono text-[12px] lg:text-[13px] uppercase tracking-micro text-orange mb-4 font-medium">
            {t('eyebrow')}
          </p>

          <h2
            id="respiration-title"
            className="font-display font-light text-[1.75rem] sm:text-[2.25rem] lg:text-[3.25rem] leading-[1.05] tracking-tight text-paper max-w-3xl mb-8"
          >
            {t('title')}
          </h2>

          {/* Play button — cercle orange, triangle central */}
          <button
            type="button"
            disabled
            aria-label={t('playAriaLabel')}
            className="group relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-orange/80 bg-orange/10 backdrop-blur-sm flex items-center justify-center mb-6 cursor-not-allowed"
          >
            {/* Triangle play */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-orange translate-x-[2px]"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            {/* Halo pulsant subtil */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-orange/30 animate-[ping_3s_ease-in-out_infinite]"
            />
          </button>

          <p className="font-mono text-[11px] lg:text-[12px] uppercase tracking-[0.18em] text-paper/65">
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
}
