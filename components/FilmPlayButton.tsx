'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Bouton play + lightbox YouTube pour la section RespirationBand
 * (« Découvrir AYRADE »). Tant que `youtubeId` est vide / undefined,
 * le bouton reste désactivé (placeholder « bientôt en ligne », comme
 * avant la livraison du film). Dès qu'un ID est posé (via l'env var
 * NEXT_PUBLIC_YOUTUBE_ID), le bouton ouvre une lightbox 16:9 avec
 * l'embed YouTube en mode privacy-enhanced (youtube-nocookie.com),
 * domaine déjà autorisé dans la CSP du vhost nginx.
 *
 * Lightbox : aria-modal=true, fermeture par ESC, clic backdrop, ou
 * bouton ×. body scroll-lock pendant l'affichage.
 */
type Props = {
  youtubeId?: string;
};

function PlayTriangle() {
  return (
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
  );
}

export function FilmPlayButton({ youtubeId }: Props) {
  const t = useTranslations('respiration');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const ready = !!youtubeId && youtubeId.length > 0;

  // Placeholder désactivé — version d'avant livraison du film.
  if (!ready) {
    return (
      <button
        type="button"
        disabled
        aria-label={t('playAriaLabel')}
        className="group relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-orange/80 bg-orange/10 backdrop-blur-sm flex items-center justify-center mb-6 cursor-not-allowed"
      >
        <PlayTriangle />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-orange/30 animate-[ping_3s_ease-in-out_infinite]"
        />
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('playAriaLabelActive')}
        className="group relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-orange bg-orange/15 backdrop-blur-sm flex items-center justify-center mb-6 cursor-pointer transition-all hover:bg-orange/25 hover:scale-105"
      >
        <PlayTriangle />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-orange/40 animate-[ping_3s_ease-in-out_infinite]"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('lightboxTitle')}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[80] bg-navy/95 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
        >
          <button
            type="button"
            aria-label={t('closeAria')}
            onClick={() => setOpen(false)}
            className="absolute top-4 end-4 lg:top-8 lg:end-8 w-12 h-12 rounded-full bg-paper/10 hover:bg-paper/20 transition-colors flex items-center justify-center text-paper text-2xl font-light"
          >
            ×
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl aspect-video bg-black shadow-2xl"
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={t('lightboxTitle')}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
