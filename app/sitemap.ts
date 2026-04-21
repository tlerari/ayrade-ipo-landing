import type { MetadataRoute } from 'next';
import { locales } from '@/i18n';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ipo.ayrade.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/documents', '/faq', '/souscrire'];
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    for (const loc of locales) {
      urls.push({
        url: `${BASE}/${loc}${path}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}${path}`])),
        },
      });
    }
  }

  return urls;
}
