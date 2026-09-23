import { useEffect, useRef, useState, type PropsWithChildren, type ReactNode } from 'react';
import type { FigureRef, StatusTone } from '../data/projects';
import { MEDIA } from '../data/media';
import { useI18n } from '../i18n/context';

/* -------------------------------------------------------------------- *
 * Rise — the site’s only entrance gesture: 12px and 450ms, once, on
 * first view. IntersectionObserver + CSS, so nothing runs per frame.
 * -------------------------------------------------------------------- */
export function Rise({
  children,
  className = '',
  delay = 0,
}: PropsWithChildren<{ className?: string; delay?: number }>) {
  const ref = useRef<HTMLDivElement>(null);
  // Without an observer, or under reduced motion, there is no gesture at all.
  const [shown, setShown] = useState(
    () => typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
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
  }, [shown]);

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
 * Rich — inline `code` spans inside otherwise plain copy.
 * -------------------------------------------------------------------- */
export function Rich({ text }: { text: string }) {
  const parts = text.split('`');
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="inline-code">
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
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
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  dark?: boolean;
  className?: string;
  priority?: boolean;
  /** Dense captures stay legible on a phone by panning instead of shrinking. */
  zoom?: 'md' | 'lg';
}) {
  const { c } = useI18n();
  return (
    <figure className={className}>
      <div className={`figure-frame ${dark ? 'on-dark' : ''}`}>
        <div className={zoom ? `figure-scroll zoom-${zoom}` : ''}>
          <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" className="w-full" />
        </div>
      </div>
      {(caption || zoom) && (
        <figcaption className="caption">
          {zoom && <span className="mono mr-2 md:hidden">↔ {c.a11y.swipe}</span>}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function ProjectFigure({ f, className = '', priority = false }: { f: FigureRef; className?: string; priority?: boolean }) {
  const { t } = useI18n();
  return (
    <Figure
      className={className}
      src={MEDIA[f.media]}
      alt={t(f.alt)}
      caption={t(f.caption)}
      zoom={f.zoom}
      dark={f.dark}
      priority={priority}
    />
  );
}

/* -------------------------------------------------------------------- *
 * Status — a tone dot and the status line.
 * -------------------------------------------------------------------- */
export function Status({ tone, children, className = '' }: PropsWithChildren<{ tone: StatusTone; className?: string }>) {
  const { c } = useI18n();
  return (
    <p className={`flex items-baseline gap-2 text-[0.8125rem] leading-snug ${className}`}>
      <span className={`tone-dot tone-${tone}`} aria-hidden="true" />
      <span>
        <span className="sr-only">{c.tone[tone]}: </span>
        {children}
      </span>
    </p>
  );
}

export function ExternalLink({ href, children, className = 'link' }: PropsWithChildren<{ href: string; className?: string }>) {
  const { c } = useI18n();
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer noopener">
      {children} <span aria-hidden="true">↗</span>
      <span className="sr-only"> ({c.a11y.openInNew})</span>
    </a>
  );
}

/** A rule-topped section heading used across the accessible pages. */
export function SectionHead({ label, title, children, id }: PropsWithChildren<{ label: string; title?: string; id?: string }>) {
  return (
    <div id={id} className="border-t border-[var(--ink)] pt-6 md:pt-8">
      <div className="grid gap-4 md:grid-cols-12 md:gap-12">
        <p className="label md:col-span-4">{label}</p>
        {(title || children) && (
          <div className="md:col-span-8">
            {title && <h2 className="display text-[2.2rem] leading-[1.02] sm:text-[2.8rem]">{title}</h2>}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
