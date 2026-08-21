import { useI18n } from '../i18n/context';

export function Footer() {
  const { c } = useI18n();

  return (
    <footer className="border-t border-[var(--rule)]">
      <div className="shell flex flex-col gap-2 py-7 text-[0.78rem] text-[var(--ink-3)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {c.footer.rights}
        </p>
        <p>{c.footer.built}</p>
      </div>
    </footer>
  );
}
