import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type RotatingTextProps = {
  items: string[];
  className?: string;
  interval?: number;
};

/** Cycles through phrases with a soft vertical blur swap. */
export function RotatingText({ items, className, interval = 2600 }: RotatingTextProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || items.length <= 1) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval, reduce]);

  if (reduce) {
    return <span className={className}>{items[0]}</span>;
  }

  return (
    <span className={`relative inline-flex overflow-hidden ${className ?? ''}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={items[index]}
          initial={{ y: '0.7em', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.7em', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
