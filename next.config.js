const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    // En dev, Next.js a besoin de 'unsafe-eval' pour HMR / Fast Refresh.
    // En prod, on reste verrouillé (pas de unsafe-eval).
    const scriptSrc = isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.ayrade.com"
      : "script-src 'self' 'unsafe-inline' https://plausible.ayrade.com";
    const csp = [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://plausible.ayrade.com" + (isDev ? ' ws://localhost:* http://localhost:*' : ''),
      "frame-src 'self' https://player.vimeo.com https://www.youtube-nocookie.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      ...(isDev ? [] : ['upgrade-insecure-requests']),
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
