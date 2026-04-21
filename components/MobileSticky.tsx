import { useTranslations } from 'next-intl';

export function MobileSticky() {
  const t = useTranslations();
  return (
    <a
      href="#comment"
      className="lg:hidden fixed bottom-4 start-4 end-4 z-40 btn-primary px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-center shadow-2xl shadow-navy/30"
    >
      {t('mobileCta')}
    </a>
  );
}
