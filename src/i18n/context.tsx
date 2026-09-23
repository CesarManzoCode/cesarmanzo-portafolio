import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { content, type Lang, type SiteContent } from './content';
import type { T } from '../data/projects';

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  c: SiteContent;
  /** Picks the reader’s language from a bilingual value. */
  t: (v: T | string) => string;
};

const LanguageContext = createContext<I18nValue | null>(null);
const STORAGE_KEY = 'cm-lang';

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* private mode: fall through to the default */
  }
  return 'en';
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const t = (v: T | string) => (typeof v === 'string' ? v : v[lang]);

  return <LanguageContext.Provider value={{ lang, setLang, c: content[lang], t }}>{children}</LanguageContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}
