import type { ReactNode } from 'react';
import { Reveal } from './fx/Reveal';
import { TextReveal } from './fx/TextReveal';

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
};

export function SectionHeading({ index, eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
      <Reveal y={16}>
        <span className="kicker">
          {index && <span className="font-mono text-cyan-300/90">{index}</span>}
          {eyebrow}
        </span>
      </Reveal>

      <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        <TextReveal text={title} />
      </h2>

      {description && (
        <Reveal delay={0.1} y={16}>
          <p className={`mt-4 text-base leading-7 text-slate-300/90 sm:text-lg ${centered ? 'mx-auto' : ''}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
