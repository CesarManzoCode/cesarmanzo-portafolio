import { motion, useReducedMotion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
}>;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  blur = true,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  // On phones, render statically: scroll-reveal jank is the main cause of the
  // "loads block by block" feel. Desktop keeps the full animation.
  if (reduce || isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
