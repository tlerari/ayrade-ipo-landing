'use client';

// Global error boundary — required by Next.js 14 App Router.
// Renders WHEN the root layout itself throws, so it must include its own
// <html> and <body> tags and cannot rely on global CSS being loaded.
// Styles are inline to stay resilient.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F7F5F0',
          color: '#0C0C0C',
          padding: '2rem',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(12, 12, 12, 0.55)',
            marginBottom: '1.5rem',
          }}
        >
          Erreur inattendue
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            margin: 0,
            marginBottom: '1rem',
            maxWidth: '36rem',
          }}
        >
          Une erreur est survenue.
        </h1>
        <p
          style={{
            color: 'rgba(12, 12, 12, 0.7)',
            marginBottom: '2.5rem',
            maxWidth: '32rem',
            lineHeight: 1.6,
          }}
        >
          Nous n&apos;avons pas pu charger cette page. Merci de réessayer dans
          quelques instants.
        </p>
        <button
          onClick={() => reset()}
          style={{
            background: '#F9A64A',
            color: '#0B2545',
            padding: '1rem 1.75rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.25s ease, color 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#0B2545';
            e.currentTarget.style.color = '#F9A64A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F9A64A';
            e.currentTarget.style.color = '#0B2545';
          }}
        >
          Réessayer
        </button>
        {error?.digest && (
          <p
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: '10px',
              color: 'rgba(12, 12, 12, 0.35)',
              marginTop: '3rem',
            }}
          >
            Ref : {error.digest}
          </p>
        )}
      </body>
    </html>
  );
}
