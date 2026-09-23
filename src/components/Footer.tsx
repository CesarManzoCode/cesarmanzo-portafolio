import { useI18n } from '../i18n/context';

export function Footer() {
  const { c } = useI18n();
  return (
    <footer data-tone="dark" className="surface surface-ink tone-dark">
      <div className="wrap flex flex-col gap-2 border-t border-[var(--line)] py-7 text-[0.76rem] fg-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {c.footer.rights}
        </p>
        <p>{c.footer.built}</p>
      </div>
    </footer>
  );
}
