'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Countdown } from './Countdown';

/**
 * BeReady — bloc d'anticipation V1 (phase « teaser »).
 *
 * S'affiche uniquement lorsque `flags.showBeReady === true`, c'est-à-dire
 * avant que la notice d'information ne soit définitivement publiée par la
 * COSOB et avant que le syndicat bancaire ne soit formellement constitué.
 *
 * Structure minimale (validée 24/04/2026) :
 *   - colonne gauche  : formulaire « M'alerter » (email + CTA + consent + microcopy)
 *   - colonne droite  : Countdown
 *
 * Le formulaire est uniquement front pour l'instant (pas d'endpoint de
 * collecte). Il affiche un état `thanks` après soumission. Aucun email
 * n'est envoyé, aucune liste n'est constituée côté serveur à ce stade :
 * c'est un engagement de posture, pas un pré-enregistrement.
 *
 * Typographie : respect strict de la règle « pas de tiret cadratin »
 * (séparateurs via colons, incises via parenthèses).
 */
export function BeReady() {
  const t = useTranslations('beReady');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // NB : pas de POST à ce stade — la mécanique de collecte sera branchée
    // quand la notice sera publiée et que l'ouverture du CRM investisseurs
    // sera validée juridiquement (bdl + DPO).
    setSubmitted(true);
  }

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
        {/* Cadre unifié : compteur (gauche) + séparateur + formulaire (droite).
            Le cadre corner englobe les deux colonnes pour créer une
            mini-section autonome cohérente avec l'esthétique AYRADE. */}
        <div className="corner bg-navy border border-paper/15 relative fade-up d1">
          <span />
          <span className="tr" />
          <span className="bl" />
          <span className="br" />

          <div className="grid lg:grid-cols-2">
            {/* Colonne gauche : Countdown — labels alignés avec la colonne
                formulaire (pas de flex items-center, on part du haut). */}
            <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-e border-paper/10">
              <Countdown />
            </div>

            {/* Colonne droite : formulaire « M'alerter » */}
            <div className="p-8 lg:p-12">
              {!submitted ? (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-micro text-signal font-medium">
                      {t('emailPlaceholder')}
                    </span>
                    {/* Input + CTA alignés sur une seule ligne : underline
                        partagé visuellement, bouton compact à droite pour ne
                        plus dominer visuellement le Countdown en regard. */}
                    <div className="flex items-stretch gap-2">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('emailPlaceholder')}
                        className="flex-1 min-w-0 bg-transparent border-b border-paper/30 focus:border-orange py-2 text-paper outline-none transition-colors"
                      />
                      <button
                        type="submit"
                        className="group shrink-0 btn-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        {t('cta')}
                        <span
                          aria-hidden="true"
                          className="rtl-flip transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[12px] text-paper/65 leading-relaxed">
                    {t('consent')}
                  </p>
                </form>
              ) : (
                <div role="status" aria-live="polite" className="text-paper/85 text-sm leading-relaxed">
                  <p className="font-display text-[1.25rem] text-paper">
                    {t('cta')} ✓
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
