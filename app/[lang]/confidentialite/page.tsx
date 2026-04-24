import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Nav } from '@/components/Nav';
import { LegalPage } from '@/components/LegalPage';
import { Footer } from '@/components/Footer';
import { getOperationPhase, getPhaseFlags } from '@/lib/operationPhase';

export default function ConfidentialitePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  setRequestLocale(lang);
  const t = useTranslations();
  const phase = getOperationPhase();
  const flags = getPhaseFlags(phase);

  // V1 : la section 5 (destinataires des données) ne mentionne pas les
  // banques du syndicat tant que la liste n'est pas publiée.
  const s5Body = flags.showSyndicateList ? 's5Body' : 's5BodyTeaser';

  const sectionKeys = [
    { title: 's1Title', body: 's1Body' },
    { title: 's2Title', body: 's2Body' },
    { title: 's3Title', body: 's3Body' },
    { title: 's4Title', body: 's4Body' },
    { title: 's5Title', body: s5Body },
    { title: 's6Title', body: 's6Body' },
    { title: 's7Title', body: 's7Body' },
    { title: 's8Title', body: 's8Body' },
  ];

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
        <LegalPage namespace="privacyPolicy" sectionKeys={sectionKeys} flags={flags} />
      </main>
      <Footer flags={flags} />
    </>
  );
}
