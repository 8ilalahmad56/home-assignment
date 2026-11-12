import {useEffect, useLayoutEffect, useRef, useState} from 'react';

/**
 * Sizes the headline to span its parent container dynamically with safety margins.
 */
export function useFitHeadline<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const wide = window.matchMedia('(min-width: 768px)');

    const PROBE = 100;
    const fit = () => {
      if (wide.matches) {
        el.style.fontSize = `${PROBE}px`;
        const styles = getComputedStyle(parent);
        const padL = parseFloat(styles.paddingLeft) || 0;
        const padR = parseFloat(styles.paddingRight) || 0;
        const available = Math.max((parent.clientWidth - padL - padR) * 0.82, 300);
        const natural = el.offsetWidth;
        if (natural > 0) {
          el.style.fontSize = `${Math.floor((PROBE * available) / natural)}px`;
        }
      } else {
        el.style.fontSize = '';
      }
      parent.style.setProperty('--mega', getComputedStyle(el).fontSize);
    };

    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    window.addEventListener('resize', fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, []);

  return ref;
}

const THEME_KEY = 'bilal-portfolio-theme';

export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved === 'dark';
    } catch {
      /* storage blocked */
    }
    return false; // Default to luxury warm Oat light palette
  });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#1E140F' : '#F6F2EB');
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    } catch {
      /* not persisted */
    }
  }, [dark]);

  return [dark, () => setDark((d) => !d)] as const;
}
