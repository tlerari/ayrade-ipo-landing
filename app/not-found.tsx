import Link from 'next/link';

// Root-level 404 page — required by Next.js 14 App Router.
// Renders inside the root layout, so Tailwind classes are available.
// Affiché en FR par défaut (marché principal) ; une version localisée par
// langue pourra être ajoutée plus tard dans app/[lang]/not-found.tsx.

export const metadata = {
  title: 'Page introuvable',
  description: 'La page que vous cherchez n’existe pas.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-paper text-ink px-6 py-16 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/55 mb-6">
        Erreur 404
      </p>

      <h1 className="font-display font-light text-5xl lg:text-7xl leading-[0.95] tracking-[-0.03em] mb-6 max-w-2xl">
        Page introuvable.
      </h1>

      <div
        aria-hidden="true"
        style={{
          width: 56,
          height: 1,
          background: '#F9A64A',
          margin: '1.5rem 0 1.75rem',
        }}
      />

      <p className="text-ink/70 max-w-md mb-10 leading-relaxed">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
        Revenez à l&apos;accueil pour consulter l&apos;opération.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/fr"
          className="btn-primary px-7 py-4 text-[12px] font-semibold uppercase tracking-wider inline-flex items-center gap-3"
        >
          Accueil
        </Link>
        <Link
          href="/fr#contacts"
          className="btn-ghost px-7 py-4 text-[12px] font-semibold uppercase tracking-wider inline-flex items-center gap-3 link-hover"
        >
          Contacts IR
        </Link>
      </div>
    </main>
  );
}
