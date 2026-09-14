import React from 'react';
import './CyberGrid.css';

const CyberGrid = () => {
  return (
    <div className="cyber-grid-container" aria-hidden="true">
      {/* Perspective Cyber Grid */}
      <div className="cyber-grid-floor" />

      {/* Cyber Scanline overlay */}
      <div className="cyber-scanline" />
    </div>
  );
};

export default CyberGrid;
