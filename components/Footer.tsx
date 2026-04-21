import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

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
            <p className="font-mono text-[12px] uppercase tracking-micro text-paper/75 mb-3 font-medium">Suivre la société</p>
            <div className="flex gap-4 md:justify-end">
              <span className="font-mono text-[13px] text-paper/65">{t('linkedinPlaceholder')}</span>
              <span className="font-mono text-[13px] text-paper/65">{t('twitterPlaceholder')}</span>
            </div>
          </div>
        </div>

        <div className="py-10 border-b border-paper/10 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2">
            <p className="font-mono text-[12px] uppercase tracking-micro text-orange font-medium">{t('disclaimerLabel')}</p>
          </div>
          <div className="lg:col-span-10 text-[13px] text-paper/75 leading-relaxed space-y-3 max-w-4xl">
            <p>{t('disclaimer1')}</p>
            <p>{t('disclaimer2')}</p>
          </div>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[12px] uppercase tracking-micro text-paper/65 font-medium">
          <p>{t('copyright')}</p>
          <ul className="flex flex-wrap gap-6">
            <li><a href="#" className="link-hover">{t('legal')}</a></li>
            <li><a href="#" className="link-hover">{t('privacy')}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
