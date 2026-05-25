/**
 * COSOB quiet-period logic.
 *
 * The subscription operation for AYRADE IPO follows regulated phases. Each phase
 * unlocks or locks specific parts of the landing page (e.g. "Souscrire" CTA,
 * founder tribune, closing countdown).
 *
 * Phases (local time Algiers, UTC+1):
 *   pre-quiet      : 2026-05-16  →  2026-05-21  — full content
 *   quiet          : 2026-05-22  →  2026-05-31  — no "Souscrire" CTA, no tribune
 *   subscription   : 2026-06-01  →  2026-06-30  — full content + closing countdown
 *   post-close     : 2026-07-01  →  2026-07-14  — "Souscription clôturée"
 *   post-listing   : 2026-07-15  →            — archive mode
 *
 * Override with env var OPERATION_PHASE=<phase> — useful for QA and "auto" for
 * production.
 *
 * ── Orthogonal axis: NOTICE & SYNDICATE PUBLICATION ──
 *
 * The information notice of the operation is not yet finalised at the time the
 * site goes live. Until the notice is finalised:
 *   - no mention of the "notice d'information" (document official),
 *   - no notice download CTA.
 *
 * NOTE (21/05/2026) — the subscription form (bulletin de souscription) has
 * been validated by the client and is published publicly BEFORE the notice.
 * It is therefore decoupled from this gate: showBulletinCTA is always true.
 *
 * NOTE (23/05/2026) — the placement syndicate (11 establishments, BDL lead
 * manager) has been confirmed by the client and is now published BEFORE the
 * notice. Decoupled from this gate too: showSyndicateList is always true.
 *
 * Controlled by the env var NEXT_PUBLIC_NOTICE_PUBLISHED (default: "false").
 * Flip to "true" and redeploy when the syndicate is confirmed. Orthogonal to
 * the phase above: both inputs combine into the PhaseFlags consumed by
 * components.
 */

export type OperationPhase =
  | 'pre-quiet'
  | 'quiet'
  | 'subscription'
  | 'post-close'
  | 'post-listing';

export const PHASE_DATES = {
  preQuietStart: '2026-05-16T00:00:00+01:00',
  quietStart: '2026-05-22T00:00:00+01:00',
  subscriptionStart: '2026-06-01T09:00:00+01:00',
  subscriptionEnd: '2026-06-30T15:00:00+01:00',
  postCloseStart: '2026-07-01T00:00:00+01:00',
  listingStart: '2026-07-15T00:00:00+01:00',
} as const;

const VALID: OperationPhase[] = [
  'pre-quiet',
  'quiet',
  'subscription',
  'post-close',
  'post-listing',
];

export function getOperationPhase(now: Date = new Date()): OperationPhase {
  const override = process.env.OPERATION_PHASE;

  if (override && override !== 'auto') {
    if ((VALID as string[]).includes(override)) {
      return override as OperationPhase;
    }
    throw new Error(`Invalid OPERATION_PHASE: "${override}". Expected one of: ${VALID.join(', ')} or "auto".`);
  }

  const t = now.getTime();
  const listing = new Date(PHASE_DATES.listingStart).getTime();
  const postClose = new Date(PHASE_DATES.postCloseStart).getTime();
  const subEnd = new Date(PHASE_DATES.subscriptionEnd).getTime();
  const subStart = new Date(PHASE_DATES.subscriptionStart).getTime();
  const quietStart = new Date(PHASE_DATES.quietStart).getTime();

  if (t >= listing) return 'post-listing';
  if (t >= postClose) return 'post-close';
  if (t >= subStart && t <= subEnd) return 'subscription';
  if (t >= quietStart) return 'quiet';
  return 'pre-quiet';
}

/**
 * Returns whether the notice & syndicate have been officially published.
 * Driven by NEXT_PUBLIC_NOTICE_PUBLISHED env var (default: false).
 */
export function getNoticePublished(): boolean {
  return process.env.NEXT_PUBLIC_NOTICE_PUBLISHED === 'true';
}

/**
 * Feature flags derived from the current phase AND the notice publication
 * state. Phase flags drive the lifecycle of the offering (pre-quiet → listing).
 * Notice flags drive the V1 teaser → V2 full communication switch.
 *
 * Note (26/04/2026) — le flag `showBeReady` (bloc "Soyez prêts" autonome
 * affichant un formulaire d'alerte email + countdown XL) a été retiré sur
 * décision client. Le countdown est désormais intégré inline dans le Hero
 * via `<Countdown compact />`, conditionné par `showOpeningCountdown`.
 */
export interface PhaseFlags {
  // Phase-driven
  showSubscribeCTA: boolean;
  showFounderTribune: boolean;
  showOpeningCountdown: boolean;
  showClosingCountdown: boolean;
  showClosedBanner: boolean;
  showArchiveNotice: boolean;
  // Notice/syndicate-driven (orthogonal to phase)
  showNoticeCTA: boolean;
  showSyndicateList: boolean;
  showBulletinCTA: boolean;
}

export function getPhaseFlags(
  phase: OperationPhase,
  noticePublished: boolean = getNoticePublished(),
): PhaseFlags {
  // Notice-driven flags are orthogonal to phases.
  const noticeFlags = {
    showNoticeCTA: noticePublished,
    // Syndicat de placement : confirmé par le client (décision 23/05/2026),
    // 11 établissements (BDL chef de file). Publié AVANT la notice —
    // décorrélé du gate notice (toujours affiché).
    showSyndicateList: true,
    // Bulletin de souscription : document validé par le client, publié
    // publiquement AVANT la notice (décision client 21/05/2026). Décorrélé
    // du gate notice — toujours disponible.
    showBulletinCTA: true,
  };

  switch (phase) {
    case 'pre-quiet':
      return {
        showSubscribeCTA: true,
        showFounderTribune: true,
        showOpeningCountdown: true,
        showClosingCountdown: false,
        showClosedBanner: false,
        showArchiveNotice: false,
        ...noticeFlags,
      };
    case 'quiet':
      return {
        showSubscribeCTA: false,
        showFounderTribune: false,
        showOpeningCountdown: true,
        showClosingCountdown: false,
        showClosedBanner: false,
        showArchiveNotice: false,
        ...noticeFlags,
      };
    case 'subscription':
      return {
        showSubscribeCTA: true,
        showFounderTribune: true,
        showOpeningCountdown: false,
        showClosingCountdown: true,
        showClosedBanner: false,
        showArchiveNotice: false,
        ...noticeFlags,
      };
    case 'post-close':
      return {
        showSubscribeCTA: false,
        showFounderTribune: true,
        showOpeningCountdown: false,
        showClosingCountdown: false,
        showClosedBanner: true,
        showArchiveNotice: false,
        ...noticeFlags,
      };
    case 'post-listing':
      return {
        showSubscribeCTA: false,
        showFounderTribune: true,
        showOpeningCountdown: false,
        showClosingCountdown: false,
        showClosedBanner: false,
        showArchiveNotice: true,
        ...noticeFlags,
      };
  }
}
