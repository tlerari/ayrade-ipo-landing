import Image from 'next/image';

/**
 * RespirationBand — bande panoramique pleine largeur entre Pillars et Thesis.
 * Panorama de la baie d'Alger : respiration visuelle et ancrage territorial.
 */
export function RespirationBand() {
  return (
    <section
      aria-hidden="true"
      className="relative bg-navy text-paper overflow-hidden"
    >
      <div className="relative w-full aspect-[21/9] lg:aspect-[21/7]">
        <Image
          src="/assets/alger-baie-port.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
