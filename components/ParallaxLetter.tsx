'use client';

import { useParallax } from '@/lib/useParallax';

type Props = {
  children: string;
  className?: string;
  strength?: number;
};

/**
 * Client island qui applique un parallax vertical subtil au chiffre romain filigrane.
 * Utilisé pour les .bg-letter dans chaque section numérotée.
 * aria-hidden="true" systématique — élément purement décoratif.
 */
export function ParallaxLetter({ children, className, strength = 0.10 }: Props) {
  const ref = useParallax<HTMLSpanElement>(strength);
  return (
    <span ref={ref} aria-hidden="true" className={className}>
      {children}
    </span>
  );
}
