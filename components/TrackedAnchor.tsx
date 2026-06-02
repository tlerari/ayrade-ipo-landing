'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

/**
 * <TrackedAnchor /> — drop-in replacement de <a> qui déclenche un event
 * Meta Pixel (window.fbq) au clic. Utilisé pour la campagne de conversion
 * Meta Ads ouverte le 02/06/2026 (demande Rania CHAIB).
 *
 * Le pixel base est posé dans app/[lang]/layout.tsx (ungated, comme
 * Metricool — risque Loi 18-07 assumé client). Si pour une raison
 * quelconque fbq n'est pas chargé (bloqueur de pub, network down,
 * navigateur exotique), le clic se déroule normalement et l'event est
 * simplement ignoré — l'analytique ne doit JAMAIS empêcher l'action.
 *
 * Exemples d'usage :
 *
 *   <TrackedAnchor
 *     href="/documents/bulletin-souscription-ayrade.pdf"
 *     metaEvent={{ name: 'Lead', data: { content_name: 'bulletin_souscription' } }}
 *   >
 *     Télécharger le bulletin
 *   </TrackedAnchor>
 *
 *   <TrackedAnchor
 *     href="mailto:belbachir.lamine@ayrade.com"
 *     metaEvent={{ name: 'ViewContent', data: { content_name: 'contact_ir_lamine' } }}
 *   >
 *     belbachir.lamine@ayrade.com
 *   </TrackedAnchor>
 */
type MetaEventName = 'Lead' | 'ViewContent';
type MetaEvent = { name: MetaEventName; data?: Record<string, unknown> };

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> & {
  metaEvent?: MetaEvent;
  children: ReactNode;
};

export function TrackedAnchor({ metaEvent, children, ...rest }: Props) {
  function handleClick(_e: MouseEvent<HTMLAnchorElement>) {
    if (!metaEvent || typeof window === 'undefined') return;
    const fbq = window.fbq;
    if (typeof fbq !== 'function') return;
    try {
      if (metaEvent.data) {
        fbq('track', metaEvent.name, metaEvent.data);
      } else {
        fbq('track', metaEvent.name);
      }
    } catch {
      // analytique non bloquante.
    }
  }

  return (
    <a {...rest} onClick={handleClick}>
      {children}
    </a>
  );
}
