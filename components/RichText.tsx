/**
 * RichText — safe render of i18n messages containing a constrained subset of
 * HTML tags: <strong>, <em>, <sup>, <br>.
 *
 * Uses next-intl's rich text feature. Caller passes the message key and this
 * component expands it into React nodes. No dangerouslySetInnerHTML.
 */
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

type Tags = {
  strong: (chunks: ReactNode) => ReactNode;
  em: (chunks: ReactNode) => ReactNode;
  sup: (chunks: ReactNode) => ReactNode;
  br: () => ReactNode;
};

const defaultTags: Tags = {
  strong: (chunks) => <strong className="text-ink font-semibold">{chunks}</strong>,
  em: (chunks) => <em className="italic">{chunks}</em>,
  sup: (chunks) => <sup>{chunks}</sup>,
  br: () => <br />,
};

export function useRichText(namespace?: string) {
  const t = useTranslations(namespace);
  return (key: string, extraTags?: Partial<Tags>) =>
    t.rich(key, { ...defaultTags, ...extraTags } as never);
}

/**
 * Dark variants — when used inside a dark-themed section, <strong> should
 * adopt light ink instead.
 */
export function useRichTextDark(namespace?: string) {
  const t = useTranslations(namespace);
  const darkTags: Tags = {
    strong: (chunks) => <strong className="text-paper font-semibold">{chunks}</strong>,
    em: (chunks) => <em className="italic">{chunks}</em>,
    sup: (chunks) => <sup>{chunks}</sup>,
    br: () => <br />,
  };
  return (key: string, extraTags?: Partial<Tags>) =>
    t.rich(key, { ...darkTags, ...extraTags } as never);
}
