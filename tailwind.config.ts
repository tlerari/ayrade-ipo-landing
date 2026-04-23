import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2545',
          950: '#05121F',
          900: '#061E33',
          800: '#0B2545',
          700: '#13335E',
          600: '#1D4579',
        },
        paper: {
          DEFAULT: '#F7F5F0',
          50: '#FBFAF7',
          100: '#F7F5F0',
          200: '#EDE9DD',
          300: '#D9D3C2',
        },
        orange: {
          DEFAULT: '#F9A64A',
          400: '#FBBC72',
          500: '#F9A64A',
          600: '#E18F35',
          700: '#BE7421',
        },
        signal: {
          DEFAULT: '#0A7CBD',
          400: '#4BA8DF',
          500: '#0A7CBD',
          600: '#086399',
        },
        ink: '#0C0C0C',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
        arabic: ['var(--font-plex-arabic)', 'system-ui', 'sans-serif'],
        // Amiri — display arabe statutaire (titres, citation).
        // Normalement appliqué via override [lang='ar'] en CSS ;
        // exposé ici pour les cas d'usage ponctuels.
        'display-ar': ['var(--font-amiri)', '"Noto Naskh Arabic"', 'serif'],
      },
      letterSpacing: {
        micro: '0.3em',
      },
      maxWidth: {
        shell: '1360px',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.2, 0.75, 0.2, 1) both',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
