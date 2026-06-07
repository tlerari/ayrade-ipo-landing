/**
 * Helpers de liens externes du site IPO AYRADE.
 *
 * Plateforme de souscription en ligne — hébergée par AYRADE (souscription
 * .ayrade.com), portée juridiquement par Tell Markets SPA (IOB chef de
 * file). Mise en ligne 05/06/2026.
 *
 * `subscriptionUrl(content)` construit l'URL complète avec les UTM AYRADE
 * pour identifier le trafic venant d'ipo.ayrade.com. Le paramètre
 * `content` distingue les emplacements du CTA dans le site (hero, nav,
 * mobile_sticky) — utile à Rania pour mesurer la performance de chaque
 * point d'entrée et à Tell Markets pour leur analytics interne.
 *
 * Si l'URL ou la convention de tracking change, c'est ici — un seul
 * endroit. Tout le reste du code passe par cette fonction.
 */
const SUBSCRIPTION_FORM_URL = 'https://souscription.ayrade.com/';

export function subscriptionUrl(content: string): string {
  const params = new URLSearchParams({
    utm_source: 'ipo-ayrade-com',
    utm_medium: 'cta',
    utm_campaign: 'souscription',
    utm_content: content,
  });
  return `${SUBSCRIPTION_FORM_URL}?${params.toString()}`;
}
