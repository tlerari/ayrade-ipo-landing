import type { MetadataRoute } from 'next';

/**
 * Phase preview : on interdit l'indexation de l'ensemble du site.
 * Au moment du go-live public, remplacer par :
 *   rules: { userAgent: '*', allow: '/', disallow: ['/api/'] }
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}
