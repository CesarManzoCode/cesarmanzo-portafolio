import { useRef, type MouseEvent, type PropsWithChildren } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

type TiltCardProps = PropsWithChildren<{
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
}>;

/**
 * Tilts subtly in 3D toward the cursor and feeds `--mx`/`--my` to the CSS
 * `.spotlight` highlight. Tilt is disabled under reduced-motion, but the
 * spotlight tracking stays (it's cheap and non-vestibular).
 */
export function TiltCard({ children, className, max = 5 }: TiltCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);

    if (reduce) return;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
