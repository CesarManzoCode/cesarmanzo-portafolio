import { useEffect, useRef, useState, type CSSProperties, type PropsWithChildren, type ReactNode } from 'react';
import type { FigureRef, MediaKey, StatusTone } from '../data/projects';
import { MEDIA, MEDIA_SIZE } from '../data/media';
import { useI18n } from '../i18n/context';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------------------------------------------------------------------- *
 * useInView — true once the element has been seen. Charts use it to
 * run their one meaningful motion (a verify run filling in, a line
 * drawing itself); under reduced motion they start finished.
 * -------------------------------------------------------------------- */
export function useInView<E extends Element>(margin = '0px 0px -12% 0px') {
  const ref = useRef<E>(null);
  const [seen, setSeen] = useState(() => typeof IntersectionObserver === 'undefined' || reduced());

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, margin]);

  return [ref, seen] as const;
}

/** Fades and lifts its content in, once. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: PropsWithChildren<{ className?: string; delay?: number; as?: 'div' | 'section' | 'li' | 'figure' }>) {
  const [ref, seen] = useInView<HTMLDivElement>('0px 0px -6% 0px');
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${seen ? 'in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------- *
 * Rich — `code` spans inside otherwise plain copy.
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
 * Shot — a real capture, with its intrinsic size reserved.
 * -------------------------------------------------------------------- */
export function Shot({
  media,
  alt,
  className = '',
  priority = false,
  style,
}: {
  media: MediaKey;
  alt: string;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
}) {
  const [w, h] = MEDIA_SIZE[media];
  return (
    <img
      src={MEDIA[media]}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`w-full ${/\bh-/.test(className) ? '' : 'h-auto'} ${className}`}
      style={style}
    />
  );
}

export type FrameKind = 'window' | 'phone' | 'bare';

/** A capture inside a quiet window frame. The bar carries a label we wrote, never a fake URL. */
export function Framed({
  media,
  alt,
  label,
  kind = 'window',
  zoom,
  priority,
  className = '',
}: {
  media: MediaKey;
  alt: string;
  label?: string;
  kind?: FrameKind;
  zoom?: 'md' | 'lg';
  priority?: boolean;
  className?: string;
}) {
  const img = <Shot media={media} alt={alt} priority={priority} />;
  if (kind === 'phone') {
    return (
      <div className={`frame frame-phone ${className}`}>
        {img}
      </div>
    );
  }
  return (
    <div className={`frame ${kind === 'bare' ? 'frame-bare' : ''} ${className}`}>
      {kind === 'window' && (
        <div className="frame-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          {label && <span>{label}</span>}
        </div>
      )}
      {zoom ? <div className={`figure-scroll zoom-${zoom}`}>{img}</div> : img}
    </div>
  );
}

/** A project figure: framed capture + caption (+ a swipe hint when it pans on phones). */
export function Figure({
  f,
  kind,
  label,
  className = '',
  priority,
  captionClassName = '',
}: {
  f: FigureRef;
  kind?: FrameKind;
  label?: string;
  className?: string;
  priority?: boolean;
  captionClassName?: string;
}) {
  const { t, c } = useI18n();
  const frameKind: FrameKind = kind ?? (f.narrow ? 'phone' : f.dark ? 'bare' : 'window');
  return (
    <figure className={className}>
      <Framed media={f.media} alt={t(f.alt)} label={label} kind={frameKind} zoom={f.zoom} priority={priority} />
      <figcaption className={`caption ${captionClassName}`}>
        {f.zoom && <span className="mono mr-2 md:hidden">↔ {c.a11y.swipe}</span>}
        <Rich text={t(f.caption)} />
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------- *
 * Status, links, stats.
 * -------------------------------------------------------------------- */
export function Status({ tone, children, className = '' }: PropsWithChildren<{ tone: StatusTone; className?: string }>) {
  const { c } = useI18n();
  return (
    <p className={`flex items-baseline gap-2.5 text-[0.82rem] leading-snug ${className}`}>
      <span className={`dot dot-${tone} translate-y-[-1px]`} aria-hidden="true" />
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

export function Stat({ value, label, size = 'lg' }: { value: ReactNode; label: ReactNode; size?: 'md' | 'lg' | 'xl' }) {
  const cls =
    size === 'xl'
      ? 'text-[4.2rem] sm:text-[5.6rem] lg:text-[7rem]'
      : size === 'lg'
        ? 'text-[2.9rem] sm:text-[3.4rem] xl:text-[4.2rem]'
        : 'text-[2.3rem] sm:text-[2.7rem]';
  // lg sits beside a capture: big, but never wider than its third of a column.
  return (
    <div className="min-w-0">
      <p className={`num ${cls}`}>{value}</p>
      <p className="mt-2 max-w-[24ch] text-[0.84rem] leading-snug fg-2">{label}</p>
    </div>
  );
}

export function Kicker({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <p className={`label fg-3 ${className}`}>{children}</p>;
}
