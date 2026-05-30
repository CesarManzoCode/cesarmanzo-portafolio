import { useRef, type MouseEvent, type PropsWithChildren } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';

type MagneticProps = PropsWithChildren<{
  className?: string;
  strength?: number;
}>;

/** Pulls its child toward the cursor while hovered, then springs back. */
export function Magnetic({ children, className, strength = 0.4 }: MagneticProps) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 280, damping: 18, mass: 0.3 });

  if (reduce || isMobile) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
