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
 * Objectif éditorial : préparer le marché, signaler la rareté (20 % du
 * capital, nombre d'actions limité), proposer un mécanisme de notification
 * sans collecter aucune donnée sensible ni promettre d'allocation.
 *
 * Le formulaire est uniquement front pour l'instant (pas d'endpoint de
 * collecte). Il affiche un état `thanks` après soumission. Aucun email
 * n'est envoyé, aucune liste n'est constituée côté serveur à ce stade —
 * c'est un engagement de posture, pas un pré-enregistrement.
 *
 * Typographie : respect strict de la règle « pas de tiret cadratin » —
 * séparateurs via colons, incises via parenthèses.
 */
export function BeReady() {
  const t = useTranslations('beReady');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const bullets = [
    { label: t('bullet1Label'), value: t('bullet1Value') },
    { label: t('bullet2Label'), value: t('bullet2Value') },
    { label: t('bullet3Label'), value: t('bullet3Value') },
  ];

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
      className="relative bg-navy text-paper py-24 lg:py-32 overflow-hidden"
      aria-labelledby="be-ready-title"
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

      <div className="max-w-shell mx-auto px-6 lg:px-10 relative grid lg:grid-cols-5 gap-y-12 gap-x-10 items-start">
        {/* Colonne gauche : eyebrow + titre + body + bullets */}
        <div className="lg:col-span-3">
          <p className="fade-up d1 font-mono text-[14px] uppercase tracking-micro text-orange mb-4 font-medium">
            {t('eyebrow')}
          </p>

          <h2
            id="be-ready-title"
            className="fade-up d2 font-display font-light text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.02] tracking-[-0.02em] text-paper"
          >
            {t('title')}
          </h2>

          <p className="fade-up d3 mt-8 max-w-2xl text-[1.0625rem] lg:text-lg leading-[1.65] text-paper/80">
            {t('body')}
          </p>

          <dl className="fade-up d4 mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-paper/10 max-w-2xl">
            {bullets.map((b) => (
              <div
                key={b.label}
                className="bg-navy border border-paper/10 p-5"
              >
                <dt className="font-mono text-[11px] uppercase tracking-micro text-signal mb-2">
                  {b.label}
                </dt>
                <dd className="font-display text-[1.125rem] lg:text-[1.25rem] text-paper leading-tight">
                  {b.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="fade-up d5 mt-10">
            <Countdown />
          </div>
        </div>

        {/* Colonne droite : formulaire de notification (V1 uniquement) */}
        <div className="lg:col-span-2 fade-up d4">
          <div className="corner bg-navy border border-paper/15 p-8 lg:p-10 relative">
            <span />
            <span className="tr" />
            <span className="bl" />
            <span className="br" />

            {!submitted ? (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-micro text-signal">
                    {t('emailPlaceholder')}
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    className="bg-transparent border-b border-paper/30 focus:border-orange py-2 text-paper outline-none transition-colors"
                  />
                </label>

                <button
                  type="submit"
                  className="group btn-primary px-7 py-4 text-[12px] font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-3"
                >
                  {t('cta')}
                  <span
                    aria-hidden="true"
                    className="rtl-flip transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>

                <p className="text-[12px] text-paper/60 leading-relaxed">
                  {t('consent')}
                </p>
                <p className="text-[11px] text-paper/45 leading-relaxed">
                  {t('microcopy')}
                </p>
              </form>
            ) : (
              <div role="status" aria-live="polite" className="text-paper/85 text-sm leading-relaxed">
                <p className="font-display text-[1.25rem] text-paper mb-3">
                  {t('cta')} ✓
                </p>
                <p>{t('microcopy')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
