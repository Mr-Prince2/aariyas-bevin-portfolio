import { useState, useEffect, useCallback } from 'react';

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

  // Add smooth transition class temporarily
  root.classList.add('theme-transition');
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;

  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
  if (metaColorScheme) {
    metaColorScheme.setAttribute('content', theme);
  }

  const timer = setTimeout(() => {
    root.classList.remove('theme-transition');
  }, 350);

  return () => clearTimeout(timer);
}

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof document !== 'undefined') {
      const activeAttr = document.documentElement.getAttribute('data-theme');
      if (activeAttr === 'light' || activeAttr === 'dark') return activeAttr;
    }
    return getInitialTheme();
  });

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
    applyTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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
