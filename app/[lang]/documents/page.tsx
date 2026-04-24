import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Nav } from '@/components/Nav';
import { DataRoom } from '@/components/DataRoom';
import { Footer } from '@/components/Footer';
import { getOperationPhase, getPhaseFlags } from '@/lib/operationPhase';

export default function DocumentsPage({ params: { lang } }: { params: { lang: string } }) {
  setRequestLocale(lang);
  const t = useTranslations();
  const phase = getOperationPhase();
  const flags = getPhaseFlags(phase);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 bg-navy text-paper px-4 py-2 text-sm"
      >
        {t('skipLink')}
      </a>
      <div className="sticky top-0 z-50 isolate">
        <AnnouncementBar visaNumber={process.env.NEXT_PUBLIC_COSOB_VISA_NUMBER} />
        <Nav showSubscribe={flags.showSubscribeCTA} />
      </div>
      <main id="main">
        <DataRoom flags={flags} />
      </main>
      <Footer flags={flags} />
    </>
  );
}
