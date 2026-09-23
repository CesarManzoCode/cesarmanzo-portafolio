import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';

export function NotFound() {
  const { c } = useI18n();
  return (
    <section data-tone="dark" className="surface surface-ink tone-dark min-h-[80vh] pt-[calc(var(--header-h)+5rem)] pb-24">
      <div className="wrap">
        <p className="mono accent">404</p>
        <h1 className="name mt-5 text-[clamp(3.6rem,12vw,10rem)]">{c.notFound.title}</h1>
        <p className="lede mt-6 max-w-[48ch]">{c.notFound.body}</p>
        <p className="mt-10">
          <Link to={paths.home} className="btn btn-solid">
            {c.notFound.home} <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
