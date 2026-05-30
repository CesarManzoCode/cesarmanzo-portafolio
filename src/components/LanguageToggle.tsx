import { useI18n } from '../i18n/context';
import type { Lang } from '../i18n/content';

const langs: Lang[] = ['en', 'es'];

export function LanguageToggle() {
  const { lang, setLang, c } = useI18n();

  return (
    <div
      role="group"
      aria-label={c.a11y.language}
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 font-mono text-xs font-semibold"
    >
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            lang === l ? 'bg-white/12 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
