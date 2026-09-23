import React, { useMemo } from 'react';
import './SakuraPetals.css';

// Authentic notched cherry blossom petal vector paths
const PETAL_PATHS = [
  // 1. Classic notched petal with apical cleft
  'M 15 35 C 10 27, 3 21, 3 13 C 3 6.5, 7.5 1.5, 12 1.5 C 13.6 1.5, 14.5 3, 15 5 C 15.5 3, 16.4 1.5, 18 1.5 C 22.5 1.5, 27 6.5, 27 13 C 27 21, 20 27, 15 35 Z',
  // 2. Gracefully curved flutter petal
  'M 14 34 C 8.5 26, 2 19, 3.5 11 C 4.8 4.5, 9.5 1.5, 13 2.5 C 14.2 3.5, 14.8 4.8, 15.2 6 C 16.2 4.2, 17.2 2.5, 19.5 2.5 C 23.8 2.5, 27 8, 25.8 16 C 24.2 23, 18.5 28.5, 14 34 Z',
  // 3. Delicate slender breeze petal
  'M 13 32 C 8.5 25, 4 19, 4.5 12 C 5 6, 8.8 2, 11.5 2 C 12.4 3, 12.8 4.2, 13.2 5.2 C 13.8 4.2, 14.5 3, 15.5 2 C 18.5 2, 22 6, 21.5 12 C 21 19, 16.5 25, 13 32 Z',
];

const ANIMATION_VARIANTS = [
  'sakura-fall-drift-right',
  'sakura-fall-drift-left',
  'sakura-fall-sway-wide',
  'sakura-fall-sway-gentle',
];

const TOTAL_PETALS = 28;

const SakuraPetals = () => {
  // Precompute static petal parameters so there are zero runtime DOM allocations or pauses
  const petals = useMemo(() => {
    return Array.from({ length: TOTAL_PETALS }, (_, i) => {
      const width = 13 + ((i * 3.7) % 10); // 13px - 23px
      const height = width * 1.2;
      const left = ((i * 100) / TOTAL_PETALS + (i % 3) * 2.5) % 100;
      const duration = 10 + ((i * 2.1) % 8); // 10s - 18s smooth continuous fall
      // Negative delays stagger the continuous loops across the entire height of the viewport on initial load
      const delay = -((i * 1.45) % 18); 
      const animName = ANIMATION_VARIANTS[i % ANIMATION_VARIANTS.length];
      const pathIndex = i % PETAL_PATHS.length;
      const gradIndex = (i % 3) + 1;

      return {
        id: i,
        width,
        height,
        left,
        duration,
        delay,
        animName,
        path: PETAL_PATHS[pathIndex],
        gradIndex,
      };
    });
  }, []);

  return (
    <div id="sakura-container" aria-hidden="true">
      {/* Shared SVG gradients for soft cherry blossom color tones */}
      <svg width="0" height="0" className="sakura-defs-svg">
        <defs>
          <linearGradient id="sakura-grad-1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#d95364" stopOpacity="0.88" />
            <stop offset="35%" stopColor="#fca3b5" stopOpacity="0.82" />
            <stop offset="80%" stopColor="#ffd8e1" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#fff5f7" stopOpacity="0.94" />
          </linearGradient>

          <linearGradient id="sakura-grad-2" x1="20%" y1="100%" x2="80%" y2="0%">
            <stop offset="0%" stopColor="#c84656" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#f79bb0" stopOpacity="0.85" />
            <stop offset="90%" stopColor="#ffe4ec" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="sakura-grad-3" x1="0%" y1="90%" x2="100%" y2="10%">
            <stop offset="0%" stopColor="#df6475" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ffb9c7" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#fff7f9" stopOpacity="0.92" />
          </linearGradient>
        </defs>
      </svg>

      {/* Persistent continuous-loop petals: zero pauses, uninterrupted natural drift */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="sakura-petal"
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
            left: `${p.left}vw`,
            animationName: p.animName,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg viewBox="0 0 30 36" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
            <path d={p.path} fill={`url(#sakura-grad-${p.gradIndex})`} />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default SakuraPetals;