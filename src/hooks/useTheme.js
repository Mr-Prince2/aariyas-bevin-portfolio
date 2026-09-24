import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'portfolio-theme';

export function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  } catch (e) {
    return 'dark';
  }
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;

  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
  if (metaColorScheme) {
    metaColorScheme.setAttribute('content', theme);
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof document !== 'undefined') {
      const activeAttr = document.documentElement.getAttribute('data-theme');
      if (activeAttr === 'light' || activeAttr === 'dark') return activeAttr;
    }
    return getInitialTheme();
  });

  const isTransitioningRef = useRef(false);

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
    applyTheme(newTheme);
  }, []);

  const toggleTheme = useCallback((event) => {
    if (isTransitioningRef.current) return;
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fallback if View Transitions API is not supported or user prefers reduced motion
    if (typeof document === 'undefined' || !document.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    isTransitioningRef.current = true;

    // Calculate origin coordinate (center of clicked trigger element or center of screen)
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (event) {
      const target = event.currentTarget || event.target;
      if (target && target.getBoundingClientRect) {
        const rect = target.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
        x = event.clientX;
        y = event.clientY;
      }
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath,
        },
        {
          duration: 650,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });

    transition.finished.finally(() => {
      isTransitioningRef.current = false;
    });
  }, [theme, setTheme]);

  useEffect(() => {
    // Initial sync
    applyTheme(theme);

    // Listen for OS system theme changes if user hasn't explicitly set in current session
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      const hasSavedTheme = localStorage.getItem(STORAGE_KEY);
      if (!hasSavedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);

    // Listen for changes from other tabs
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
        setThemeState(e.newValue);
        applyTheme(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, [theme, setTheme]);

  return { theme, isDark: theme === 'dark', isLight: theme === 'light', toggleTheme, setTheme };
}

export default useTheme;
