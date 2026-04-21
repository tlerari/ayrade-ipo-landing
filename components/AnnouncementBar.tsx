import { useTranslations } from 'next-intl';

export function AnnouncementBar({ visaNumber }: { visaNumber?: string }) {
  const t = useTranslations('announcement');
  return (
    <div className="bg-navy text-paper">
      <div className="max-w-shell mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-y-2 py-2.5 font-mono text-[12px] uppercase tracking-micro font-medium">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-orange pulse-dot" />
          <span className="text-paper">
            {t('visaLabel')}{' '}
            <span className="text-orange font-semibold">{visaNumber || t('visaPlaceholder')}</span> · {t('visaDate')}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-paper/90">
          <span>{t('compartment')}</span>
          <span>{t('ticker')}</span>
        </div>
      </div>
    </div>
  );
}
