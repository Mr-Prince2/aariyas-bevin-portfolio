import React, { useEffect } from 'react';
import './SakuraPetals.css';

const SakuraPetals = () => {
  useEffect(() => {
    const container = document.getElementById('sakura-container');
    
    const spawnPetal = () => {
      if (!container) return;

      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      
      // Randomize position and timing
      const startLeft = Math.random() * 100;
      const duration = 6 + Math.random() * 8;
      const delay = Math.random() * 2;
      
      petal.style.left = `${startLeft}vw`;
      petal.style.top = '-20px';
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;

      container.appendChild(petal);

      // Clean up the DOM element after animation finishes
      setTimeout(() => {
        petal.remove();
      }, (duration + 2) * 1000);
    };

    const interval = setInterval(spawnPetal, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="sakura-container" aria-hidden="true" />
  );
};

export default SakuraPetals;