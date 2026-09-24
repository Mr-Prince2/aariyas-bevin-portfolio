import React from 'react';
import useTheme from '../../hooks/useTheme';
import './ThemeToggle.css';

const ThemeToggle = ({ className = '', id = 'theme-toggle-btn' }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      id={id}
      type="button"
      className={`theme-toggle ${isLight ? 'theme-toggle--light' : 'theme-toggle--dark'} ${className}`}
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to Dark Mode (月)' : 'Switch to Light Mode (日)'}
      title={isLight ? 'Switch to Dark Mode (月)' : 'Switch to Light Mode (日)'}
    >
      <span className="theme-toggle__bracket-tl" aria-hidden="true" />
      <span className="theme-toggle__bracket-br" aria-hidden="true" />

      <span className="theme-toggle__icon-wrapper" aria-hidden="true">
        {/* Animated Sun Icon */}
        <svg
          className="theme-toggle__icon theme-toggle__icon--sun"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.15" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M6.34 17.66l-1.41 1.41" />
          <path d="M19.07 4.93l-1.41 1.41" />
        </svg>

        {/* Animated Crescent Moon Icon */}
        <svg
          className="theme-toggle__icon theme-toggle__icon--moon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" fillOpacity="0.2" />
        </svg>
      </span>

      {/* Japanese Kanji Mood Tag: 日 (Day/Sun) vs 月 (Night/Moon) */}
      <span className="theme-toggle__kanji">
        {isLight ? '日' : '月'}
      </span>
    </button>
  );
};

export default ThemeToggle;
