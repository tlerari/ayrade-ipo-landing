import { useTranslations } from 'next-intl';
import { subscriptionUrl } from '@/lib/links';
import { TrackedAnchor } from './TrackedAnchor';

export function MobileSticky() {
  const t = useTranslations();
  return (
    <TrackedAnchor
      href={subscriptionUrl('mobile_sticky')}
      target="_blank"
      rel="noopener noreferrer"
      className="lg:hidden fixed bottom-4 start-4 end-4 z-40 btn-primary px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-center shadow-2xl shadow-navy/30"
      metaEvent={{ name: 'Lead', data: { content_name: 'cta_souscrire_mobile_sticky' } }}
    >
      {t('mobileCta')}
    </TrackedAnchor>
  );
}
