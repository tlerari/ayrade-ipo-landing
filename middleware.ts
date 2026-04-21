import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

// ─────────────────────────────────────────────────────────────────────────
// Middleware AYRADE IPO
//
// 1. Protection Basic Auth — activée uniquement si PREVIEW_PASSWORD est
//    définie (en dev local, on laisse vide pour ne pas bloquer le dev).
//    En production/preview Vercel, on pose PREVIEW_PASSWORD en variable
//    d'environnement pour verrouiller l'accès au site *et aux PDF*.
//
// 2. Routage i18n next-intl pour les pages (locales FR / AR / EN).
// ─────────────────────────────────────────────────────────────────────────

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

const AUTH_REALM = 'AYRADE IPO — Preview';

function unauthorized() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${AUTH_REALM}", charset="UTF-8"`,
    },
  });
}

function checkBasicAuth(req: NextRequest): NextResponse | null {
  const expectedPassword = process.env.PREVIEW_PASSWORD;
  // Pas de mot de passe configuré → pas de protection (cas dev local)
  if (!expectedPassword) return null;

  const expectedUser = process.env.PREVIEW_USERNAME ?? 'ayrade';

  const header = req.headers.get('authorization');
  if (!header?.startsWith('Basic ')) return unauthorized();

  try {
    const decoded = atob(header.slice(6));
    const sep = decoded.indexOf(':');
    if (sep === -1) return unauthorized();
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);
    if (user !== expectedUser || pass !== expectedPassword) return unauthorized();
  } catch {
    return unauthorized();
  }
  return null;
}

export default function middleware(req: NextRequest) {
  // 1. Auth globale (pages + assets + PDF)
  const authFail = checkBasicAuth(req);
  if (authFail) return authFail;

  // 2. Ne pas invoquer next-intl sur les fichiers physiques (PDF, images,
  //    favicon, assets sous /public/*). On laisse Next servir directement.
  const { pathname } = req.nextUrl;
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  // 3. Routage i18n sur les pages
  return intlMiddleware(req);
}

export const config = {
  // On intercepte tout sauf les bundles internes (JS/CSS hashés, pas d'enjeu
  // de confidentialité sur ceux-ci et ça évite de ralentir le chargement).
  matcher: ['/((?!_next/static|_next/image|_vercel|api).*)'],
};
