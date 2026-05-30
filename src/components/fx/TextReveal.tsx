import { Fragment } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const word: Variants = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

/** Headline reveal that lifts each word from behind a mask, word by word. */
export function TextReveal({ text, className, delay = 0, stagger = 0.05 }: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span aria-hidden className="inline-block overflow-hidden align-bottom">
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </motion.span>
  );
}
