import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';

export function NotFound() {
  const { c } = useI18n();
  return (
    <section className="shell py-24 md:py-32">
      <p className="label">404</p>
      <h1 className="display mt-4 text-[3rem] leading-none sm:text-[4rem]">{c.notFound.title}</h1>
      <p className="prose-lede mt-5 max-w-[48ch]">{c.notFound.body}</p>
      <p className="mt-8">
        <Link to={paths.home} className="link">
          {c.notFound.home} <span aria-hidden="true">→</span>
        </Link>
      </p>
    </section>
  );
}
