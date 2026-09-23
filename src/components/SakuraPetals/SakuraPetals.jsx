import React, { useEffect } from 'react';
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
  'sakura-fall-sway',
];

const SakuraPetals = () => {
  useEffect(() => {
    const container = document.getElementById('sakura-container');
    if (!container) return;

    let activeCount = 0;
    const MAX_PETALS = 32;

    const spawnPetal = (initialY = null) => {
      if (!container || activeCount >= MAX_PETALS) return;

      const petal = document.createElement('div');
      petal.className = 'sakura-petal';

      // Pick random petal geometry, gradient, and animation
      const pathIndex = Math.floor(Math.random() * PETAL_PATHS.length);
      const gradIndex = (Math.floor(Math.random() * 3)) + 1;
      const animName = ANIMATION_VARIANTS[Math.floor(Math.random() * ANIMATION_VARIANTS.length)];

      const width = 13 + Math.random() * 9; // 13px - 22px
      const height = width * 1.2;
      const startLeft = Math.random() * 100;
      const duration = 8 + Math.random() * 8; // 8s - 16s gentle fall
      const delay = initialY !== null ? 0 : Math.random() * 1.5;

      petal.style.width = `${width}px`;
      petal.style.height = `${height}px`;
      petal.style.left = `${startLeft}vw`;
      petal.style.top = initialY !== null ? `${initialY}vh` : '-30px';
      petal.style.animationName = animName;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;

      petal.innerHTML = `
        <svg viewBox="0 0 30 36" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <path d="${PETAL_PATHS[pathIndex]}" fill="url(#sakura-grad-${gradIndex})" />
        </svg>
      `;

      container.appendChild(petal);
      activeCount++;

      setTimeout(() => {
        if (petal.parentNode) {
          petal.remove();
          activeCount--;
        }
      }, (duration + delay + 1) * 1000);
    };

    // Pre-populate a few ambient petals across the screen on load
    for (let i = 0; i < 7; i++) {
      spawnPetal(Math.random() * 85);
    }

    const interval = setInterval(() => spawnPetal(), 750);

    return () => {
      clearInterval(interval);
      // Clean up any remaining petal nodes on unmount
      const existing = container.querySelectorAll('.sakura-petal');
      existing.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div id="sakura-container" aria-hidden="true">
      {/* Shared SVG gradients for soft cherry blossom color tones */}
      <svg width="0" height="0" className="sakura-defs-svg">
        <defs>
          {/* 1. Tender blush with crimson base */}
          <linearGradient id="sakura-grad-1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#d95364" stopOpacity="0.88" />
            <stop offset="35%" stopColor="#fca3b5" stopOpacity="0.82" />
            <stop offset="80%" stopColor="#ffd8e1" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#fff5f7" stopOpacity="0.94" />
          </linearGradient>

          {/* 2. Soft pastel rose */}
          <linearGradient id="sakura-grad-2" x1="20%" y1="100%" x2="80%" y2="0%">
            <stop offset="0%" stopColor="#c84656" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#f79bb0" stopOpacity="0.85" />
            <stop offset="90%" stopColor="#ffe4ec" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
          </linearGradient>

          {/* 3. Whisper pink with warm undertone */}
          <linearGradient id="sakura-grad-3" x1="0%" y1="90%" x2="100%" y2="10%">
            <stop offset="0%" stopColor="#df6475" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ffb9c7" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#fff7f9" stopOpacity="0.92" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SakuraPetals;