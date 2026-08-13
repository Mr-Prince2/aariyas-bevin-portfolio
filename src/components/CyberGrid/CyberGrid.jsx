import React from 'react';
import './CyberGrid.css';

const CyberGrid = () => {
  return (
    <div className="cyber-grid-container" aria-hidden="true">
      {/* Perspective Cyber Grid */}
      <div className="cyber-grid-floor" />

      {/* Cyber Scanline overlay */}
      <div className="cyber-scanline" />

      {/* Vertical Telemetry Sidebars */}
      <div className="cyber-telemetry-left">
        <span className="telemetry-tag">SYS.LOC // NEO_TOKYO</span>
        <span className="telemetry-kanji">日本 ・ 東京</span>
        <span className="telemetry-bar" />
        <span className="telemetry-tag">PASSION: 100%</span>
      </div>

      <div className="cyber-telemetry-right">
        <span className="telemetry-tag">MODE // CREATIVE_AI</span>
        <span className="telemetry-kanji">情熱 ・ 技術</span>
        <span className="telemetry-bar" />
        <span className="telemetry-tag">STATUS: ONLINE</span>
      </div>
    </div>
  );
};

export default CyberGrid;
