import { useEffect, useRef, useState, type PropsWithChildren, type ReactNode } from 'react';
import type { Head } from '../i18n/content';

/* -------------------------------------------------------------------- *
 * Rise — the page's only entrance gesture: 12px and 450ms, once, on
 * first view. IntersectionObserver + CSS, so nothing runs per frame.
 * -------------------------------------------------------------------- */
export function Rise({
  children,
  className = '',
  delay = 0,
}: PropsWithChildren<{ className?: string; delay?: number }>) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={shown ? { animation: `rise 450ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both` } : { opacity: 0 }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Project masthead — shared by all six, so six different compositions
 * still read as one document.
 * -------------------------------------------------------------------- */
export function ProjectHead({ head, dark = false }: { head: Head; dark?: boolean }) {
  const muted = dark ? 'text-[var(--dark-ink-2)]' : 'text-[var(--ink-3)]';
  const rule = dark ? 'border-[var(--dark-rule)]' : 'border-[var(--rule)]';

  return (
    <header className={`border-b pb-8 sm:pb-10 ${rule}`}>
      <p className={`mono ${muted}`}>{head.n}</p>
      <h3 className="display mt-1 text-[2.6rem] leading-[0.95] sm:text-[3.6rem] md:text-[4.4rem]">{head.name}</h3>

      <div className="mt-4 grid gap-x-10 gap-y-4 md:mt-6 md:grid-cols-12">
        <p className={`mono md:col-span-4 ${muted}`}>{head.kind}</p>
        <p className={`prose-lede md:col-span-8 ${dark ? 'text-[var(--dark-ink)]' : ''}`}>{head.lede}</p>
      </div>

      <div className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-12">
        <p className={`text-[0.8125rem] leading-relaxed md:col-span-4 ${muted}`}>{head.status}</p>
        {head.links.length > 0 && (
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:col-span-8">
            {head.links.map((l) => (
              <li key={l.href}>
                <a className={`link ${dark ? 'link-dark' : ''}`} href={l.href} target="_blank" rel="noreferrer noopener">
                  {l.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------- *
 * Figure — a framed capture and its caption. The caption carries the
 * claim; the image is the proof.
 * -------------------------------------------------------------------- */
export function Figure({
  src,
  alt,
  caption,
  dark = false,
  className = '',
  priority = false,
  zoom,
  swipeHint,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  dark?: boolean;
  className?: string;
  priority?: boolean;
  /** Dense captures stay legible on a phone by panning instead of shrinking. */
  zoom?: 'md' | 'lg';
  swipeHint?: string;
}) {
  return (
    <figure className={className}>
      <div className={`figure-frame ${dark ? 'on-dark' : ''}`}>
        <div className={zoom ? `figure-scroll zoom-${zoom}` : ''}>
          <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" className="w-full" />
        </div>
      </div>
      {(caption || (zoom && swipeHint)) && (
        <figcaption className={`caption ${dark ? 'caption-dark' : ''}`}>
          {zoom && swipeHint && <span className="mono mr-2 md:hidden">↔ {swipeHint}</span>}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* -------------------------------------------------------------------- *
 * Rule-separated titled paragraphs. No cards, no chips.
 * -------------------------------------------------------------------- */
export function PointList({
  points,
  dark = false,
  columns = 2,
}: {
  points: { title: string; body: string }[];
  dark?: boolean;
  columns?: 1 | 2 | 3;
}) {
  const rule = dark ? 'border-[var(--dark-rule)]' : 'border-[var(--rule)]';
  const muted = dark ? 'text-[var(--dark-ink-2)]' : 'text-[var(--ink-2)]';

  return (
    <ul className={`grid gap-x-12 ${columns === 2 ? 'sm:grid-cols-2' : ''}${columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
      {points.map((p) => (
        <li key={p.title} className={`border-t py-6 ${rule}`}>
          <h4 className="text-[0.95rem] font-semibold leading-snug tracking-[-0.01em]">{p.title}</h4>
          <p className={`mt-2 text-[0.9rem] leading-relaxed ${muted}`}>{p.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function SectionLabel({ children, dark = false }: PropsWithChildren<{ dark?: boolean }>) {
  return <p className={`label ${dark ? 'text-[var(--dark-ink-2)]' : ''}`}>{children}</p>;
}
