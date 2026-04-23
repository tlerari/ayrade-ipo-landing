import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function Citation() {
  const t = useTranslations('citation');

  return (
    <section className="bg-paper py-24 lg:py-32 px-6 lg:px-10 relative overflow-hidden">
      {/* Decorative oversized guillemet */}
      <span
        aria-hidden="true"
        className="absolute top-8 start-6 lg:start-14 font-display font-light leading-none select-none pointer-events-none"
        style={{ fontSize: 'clamp(5rem, 12vw, 11rem)', color: '#F9A64A', opacity: 0.18 }}
      >
        «
      </span>

      <div className="max-w-4xl mx-auto relative">
        <blockquote className="font-display font-light italic text-[1.5rem] md:text-[1.875rem] lg:text-[2.25rem] leading-[1.3] tracking-tight text-ink mb-10">
          {t('quote')}
        </blockquote>

        {/* Attribution avec portrait CEO */}
        <footer className="flex items-center gap-5">
          <div className="shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden ring-2 ring-orange/40 ring-offset-2 ring-offset-paper relative">
            <Image
              src="/assets/lmb-portrait.jpg"
              alt={t('photoAlt')}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="w-14 h-px bg-orange mb-3" aria-hidden="true" />
            <p className="font-sans font-semibold text-ink text-base">{t('name')}</p>
            <p className="font-mono text-[14px] uppercase tracking-micro text-orange mt-1 font-medium">{t('role')}</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
