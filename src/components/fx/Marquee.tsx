import type { ReactNode } from 'react';

type MarqueeProps = {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
};

/** Seamless infinite ribbon — duplicates its content and translates -50%. */
export function Marquee({ children, reverse = false, className = '' }: MarqueeProps) {
  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
