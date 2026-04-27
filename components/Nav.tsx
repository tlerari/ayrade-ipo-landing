import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Nav({ showSubscribe }: { showSubscribe: boolean }) {
  const t = useTranslations('nav');
  const locale = useLocale();

  // Construit un href absolu vers la home de la locale + ancre.
  // Indispensable pour que le logo et les liens du menu fonctionnent depuis
  // les sous-pages (FAQ, mentions légales, confidentialité, etc.) où les
  // ancres `#top`, `#operation`, `#ayrade`… ne pointent vers rien.
  // Sur la home, Next.js et le navigateur traitent ces hrefs de façon
  // équivalente à de simples ancres (même URL → scroll vers l'ancre).
  const home = `/${locale}`;
  const link = (anchor: string) => `${home}#${anchor}`;

  return (
    <header id="nav" className="bg-paper border-b border-navy/10">
      <nav className="max-w-shell mx-auto px-6 lg:px-10 h-[84px] flex items-center justify-between gap-6">
        <a href={home} className="flex items-center gap-3 shrink-0" aria-label="AYRADE — Accueil">
          <Image
            src="/assets/logo-ayrade-dark.png"
            alt="AYRADE"
            width={260}
            height={56}
            priority
            className="h-12 w-auto"
          />
        </a>
        <ul className="hidden lg:flex items-center gap-9 text-[14px]">
          <li><a href={link('operation')} className="link-hover">{t('operation')}</a></li>
          <li><a href={link('ayrade')} className="link-hover">{t('ayrade')}</a></li>
          <li><a href={link('pourquoi')} className="link-hover">{t('pourquoi')}</a></li>
          <li><a href={link('strategie')} className="link-hover">{t('strategie')}</a></li>
          <li><a href={link('comment')} className="link-hover">{t('howTo')}</a></li>
          <li><a href={link('contacts')} className="link-hover">{t('contacts')}</a></li>
        </ul>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {showSubscribe && (
            <a
              href={link('comment')}
              className="btn-primary px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider"
            >
              {t('subscribe')}
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
