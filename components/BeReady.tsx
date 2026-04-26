import { useTranslations } from 'next-intl';
import { Countdown } from './Countdown';

/**
 * BeReady — bloc d'anticipation V1 (phase « teaser »).
 *
 * V1 livraison preprod (26/04/2026) : le formulaire de notification a été
 * désactivé sur décision client (DUSENS · AYRADE) en attendant la
 * publication de la notice COSOB et la mise en conformité loi 18-07
 * (DPO + base CRM investisseurs). La colonne droite affiche désormais un
 * message d'attente. Le canal d'alerte sera réactivé en V2.
 *
 * Le composant est devenu un Server Component pur (pas d'état local,
 * pas de form handler) — compatible static export.
 *
 * Typographie : respect strict de la règle « pas de tiret cadratin »
 * (séparateurs via colons, incises via parenthèses).
 */
export function BeReady() {
  const t = useTranslations('beReady');

  return (
    <section
      id="be-ready"
      className="relative bg-navy text-paper pt-6 pb-16 lg:pt-8 lg:pb-20 overflow-hidden"
      aria-label={t('eyebrow')}
    >
      {/* Grille décorative — même esthétique que Hero, plus discrète */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage: 'url(/assets/pattern-header-1.webp)',
          backgroundRepeat: 'repeat',
          backgroundSize: '257px 257px',
        }}
      />

      <div className="max-w-shell mx-auto px-6 lg:px-10 relative">
        {/* Cadre unifié : compteur (gauche) + message d'attente (droite). */}
        <div className="corner bg-navy border border-paper/15 relative fade-up d1">
          <span />
          <span className="tr" />
          <span className="bl" />
          <span className="br" />

          <div className="grid lg:grid-cols-2">
            {/* Colonne gauche : Countdown */}
            <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-e border-paper/10">
              <Countdown />
            </div>

            {/* Colonne droite : message d'attente (formulaire désactivé V1) */}
            <div className="p-8 lg:p-12 flex flex-col gap-4 justify-center">
              <span className="font-mono text-[11px] uppercase tracking-micro text-signal font-medium">
                {t('eyebrow')}
              </span>
              <h3 className="font-display text-[1.5rem] lg:text-[1.75rem] leading-[1.15] text-paper font-light">
                {t('comingSoonTitle')}
              </h3>
              <p className="text-[14px] text-paper/75 leading-relaxed">
                {t('comingSoonBody')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
