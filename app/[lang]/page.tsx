import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { KeyFigures } from '@/components/KeyFigures';
import { Pillars } from '@/components/Pillars';
import { RespirationBand } from '@/components/RespirationBand';
import { Thesis } from '@/components/Thesis';
import { Strategy } from '@/components/Strategy';
import { Trajectory } from '@/components/Trajectory';
import { HowTo } from '@/components/HowTo';
import { Citation } from '@/components/Citation';
import { ASA } from '@/components/ASA';
import { DataRoom } from '@/components/DataRoom';
import { Footer } from '@/components/Footer';
import { MobileSticky } from '@/components/MobileSticky';
import { getOperationPhase, getPhaseFlags } from '@/lib/operationPhase';

export default function LandingPage({ params: { lang } }: { params: { lang: string } }) {
  setRequestLocale(lang);
  const t = useTranslations();
  const phase = getOperationPhase();
  const flags = getPhaseFlags(phase);
  const visaNumber = process.env.NEXT_PUBLIC_COSOB_VISA_NUMBER;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 bg-navy text-paper px-4 py-2 text-sm"
      >
        {t('skipLink')}
      </a>

      <div className="sticky top-0 z-50 isolate">
        <AnnouncementBar visaNumber={visaNumber} />
        <Nav showSubscribe={flags.showSubscribeCTA} />
      </div>

      <main id="main">
        <Hero flags={flags} />
        <KeyFigures flags={flags} />
        <Pillars />
        <RespirationBand />
        <Thesis flags={flags} />
        <Strategy flags={flags} />
        <Trajectory flags={flags} />
        <HowTo flags={flags} />
        <Citation />
        <ASA />
        <DataRoom flags={flags} />
      </main>

      <Footer flags={flags} />
      {flags.showSubscribeCTA && <MobileSticky />}
    </>
  );
}
