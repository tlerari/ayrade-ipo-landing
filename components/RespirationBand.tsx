import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FilmPlayButton } from './FilmPlayButton';

/**
 * RespirationBand — bande panoramique pleine largeur entre Pillars et Thesis.
 * Section « Découvrir AYRADE » qui déclenche, depuis le 02/06/2026, la
 * lecture du film institutionnel AYRADE via une lightbox YouTube
 * (privacy-enhanced, domaine déjà autorisé dans la CSP nginx).
 *
 * L'ID YouTube est posé via NEXT_PUBLIC_YOUTUBE_ID (env de build). S'il est
 * absent, le bouton reste désactivé (placeholder « bientôt en ligne »).
 */
export function RespirationBand() {
  const t = useTranslations('respiration');
  const youtubeId = process.env.NEXT_PUBLIC_YOUTUBE_ID;
  const ready = !!youtubeId && youtubeId.length > 0;

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

          {/* Play button — délégué au client component (lightbox YouTube
              quand NEXT_PUBLIC_YOUTUBE_ID est posé, placeholder désactivé
              sinon). */}
          <FilmPlayButton youtubeId={youtubeId} />

          {/* Note « bientôt en ligne » masquée dès que le film est en ligne. */}
          {!ready && (
            <p className="font-mono text-[11px] lg:text-[12px] uppercase tracking-[0.18em] text-paper/65">
              {t('note')}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
