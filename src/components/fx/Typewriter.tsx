import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export type TypewriterLine = {
  text: string;
  className?: string;
};

type TypewriterProps = {
  lines: TypewriterLine[];
  speed?: number;
  startDelay?: number;
  className?: string;
  lineClassName?: string;
};

/** Types an array of log lines char by char, leaving finished lines in place. */
export function Typewriter({
  lines,
  speed = 34,
  startDelay = 450,
  className,
  lineClassName = '',
}: TypewriterProps) {
  const reduce = useReducedMotion();
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);
  const [current, setCurrent] = useState('');

  useEffect(() => {
    if (reduce || li >= lines.length) return;

    const entry = lines[li];
    if (!entry) return;
    const line = entry.text;

    if (ci > line.length) {
      setLi((l) => l + 1);
      setCi(0);
      setCurrent('');
      return;
    }

    const delay = ci === 0 ? (li === 0 ? startDelay : 280) : speed;
    const id = setTimeout(() => {
      setCurrent(line.slice(0, ci));
      setCi((c) => c + 1);
    }, delay);

    return () => clearTimeout(id);
  }, [ci, li, lines, speed, startDelay, reduce]);

  if (reduce) {
    return (
      <div className={className}>
        {lines.map((l, i) => (
          <div key={i} className={`${lineClassName} ${l.className ?? ''}`}>
            {l.text}
          </div>
        ))}
      </div>
    );
  }

  const finished = li >= lines.length;
  const activeLine = finished ? undefined : lines[li];

  return (
    <div className={className}>
      {lines.slice(0, li).map((l, i) => (
        <div key={i} className={`${lineClassName} ${l.className ?? ''}`}>
          {l.text}
        </div>
      ))}
      {activeLine && (
        <div className={`${lineClassName} ${activeLine.className ?? ''}`}>
          {current}
          <span className="caret text-cyan-300">▋</span>
        </div>
      )}
      {finished && (
        <div className={lineClassName}>
          <span className="caret text-cyan-300">▋</span>
        </div>
      )}
    </div>
  );
}
