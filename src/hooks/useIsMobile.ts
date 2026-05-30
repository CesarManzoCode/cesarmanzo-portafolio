import { useEffect, useState } from 'react';

/**
 * Tracks whether the viewport is phone-sized. Used to disable GPU-heavy
 * motion (parallax, tilt, blur reveals) on phones — desktop is unaffected.
 */
export function useIsMobile(query = '(max-width: 767px)') {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return isMobile;
}
