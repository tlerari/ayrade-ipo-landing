const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // SSG strict — pages générées en HTML statique au build, servies par Nginx.
  // Pas de runtime Node côté serveur. Headers de sécurité (CSP/HSTS/etc.)
  // posés par le vhost Nginx (cf. .secrets/04_deploy.sh).
  output: 'export',
  trailingSlash: false,

  images: {
    // L'image optimizer Next nécessite un runtime — incompatible avec
    // output: 'export'. On sert les images brutes (acceptable vu le faible
    // nombre d'images sur la V1 teaser).
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);
