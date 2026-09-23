import React, { useEffect, useState } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollTotal > 0) {
        const currentProgress = (window.scrollY / scrollTotal) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', calculateProgress, { passive: true });
    calculateProgress();

    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);

  return (
    <div className="scroll-progress-wrapper" aria-hidden="true">
      <div 
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
      <div 
        className="scroll-progress-glow"
        style={{ left: `${progress}%` }}
      />
      <div className="scroll-progress-indicator">
        <span className="scroll-progress-text">SYS.SCROLL // {Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default ScrollProgress;
