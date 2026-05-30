import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { content, type Lang, type SiteContent } from './content';

type I18nValue = { lang: Lang; setLang: (l: Lang) => void; c: SiteContent };

const LanguageContext = createContext<I18nValue | null>(null);
const STORAGE_KEY = 'cm-lang';

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* ignore */
  }
  return 'en'; // English is the default on first visit.
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, c: content[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}
