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
 * The banking syndicate of the operation is not yet definitively constituted
 * at the time the site goes live. Until the syndicate is confirmed and the
 * notice is finalised:
 *   - no mention of the "notice d'information" (document official),
 *   - no mention of the banking syndicate or its members,
 *   - no download CTA for the notice or the subscription form.
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
  showBeReady: boolean;
}

export function getPhaseFlags(
  phase: OperationPhase,
  noticePublished: boolean = getNoticePublished(),
): PhaseFlags {
  // Notice-driven flags are orthogonal to phases.
  // showBeReady is the visual counterpart: it surfaces the "teaser" signal
  // block when notice & syndicate are not yet published.
  const noticeFlags = {
    showNoticeCTA: noticePublished,
    showSyndicateList: noticePublished,
    showBulletinCTA: noticePublished,
    showBeReady: !noticePublished,
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
        // Once closed, no more Be Ready signal whatever happens
        showBeReady: false,
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
        showBeReady: false,
      };
  }
}
