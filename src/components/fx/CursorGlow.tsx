import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Soft radial glow that trails the pointer. Desktop / fine pointers only. */
export function CursorGlow() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 320, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 320, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return <motion.div aria-hidden className="cursor-glow" style={{ x: sx, y: sy }} />;
}
