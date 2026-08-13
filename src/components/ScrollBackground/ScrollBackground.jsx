import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollBackground.css';

import panel1 from '../../assets/samurai_panel_1.jpg';
import panel2 from '../../assets/Samurai_panel_2.png';
import panel3 from '../../assets/samurai_panel_3.jpg';
import panel4 from '../../assets/samurai_panel_4.jpg';
import panel5 from '../../assets/samurai_panel_5.jpg';

gsap.registerPlugin(ScrollTrigger);

const ScrollBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const panels = gsap.utils.toArray('.bg-panel');
    const sections = ['#hero', '#about', '#skills', '#projects', '#contact'];

    // Ensure all panels except the first are initially hidden
    gsap.set(panels, { opacity: 0 });
    gsap.set(panels[0], { opacity: 1 });

    sections.forEach((section, index) => {
      if (index === 0) return; // First section is already visible

      const prevPanel = panels[index - 1];
      const currPanel = panels[index];

      // Create a timeline for crossfading with cinematic zoom and focus pull
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%', // Start crossfade when section is 15% into view
          end: 'top 15%',   // End crossfade near the top
          scrub: 1.5,       // Extra smooth scrub
        }
      });

      // The new panel fades in, zooms out to normal size, and pulls into focus
      tl.fromTo(currPanel, 
        { opacity: 0, scale: 1.15, filter: 'blur(15px)' }, 
        { opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'power1.inOut' }, 
        0
      );

      // The old panel fades out, zooms in slightly, and blurs out
      tl.fromTo(prevPanel, 
        { opacity: 1, scale: 1, filter: 'blur(0px)' }, 
        { opacity: 0, scale: 1.05, filter: 'blur(10px)', ease: 'power1.inOut' }, 
        0
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="scroll-bg-container" ref={containerRef}>
      <img src={panel1} className="bg-panel" alt="Panel 1" />
      <img src={panel2} className="bg-panel" alt="Panel 2" />
      <img src={panel3} className="bg-panel" alt="Panel 3" />
      <img src={panel4} className="bg-panel" alt="Panel 4" />
      <img src={panel5} className="bg-panel" alt="Panel 5" />
      <div className="bg-overlay"></div>
    </div>
  );
};

export default ScrollBackground;
