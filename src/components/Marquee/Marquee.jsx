import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { marqueeItems } from '@data';
import './Marquee.css';

gsap.registerPlugin(ScrollTrigger);

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Base continuous scrolling
      const tl = gsap.to(trackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 35,
        ease: 'none',
      });

      // Scroll-driven acceleration and skew
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          // Boost speed slightly based on velocity
          const boost = 1 + Math.min(Math.abs(velocity) / 400, 3.5);
          gsap.to(tl, { timeScale: boost, duration: 0.3 });

          // Subtle futuristic skew according to scroll velocity direction
          const skew = Math.max(Math.min(velocity / 120, 8), -8);
          gsap.to(trackRef.current, { skewX: skew, duration: 0.3 });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="marquee" ref={containerRef} aria-hidden="true">
      <div className="marquee__gradient-left" />
      <div className="marquee__gradient-right" />
      <div className="marquee__track" ref={trackRef}>
        {items.map((item, i) => (
          <span
            key={i}
            className={`marquee__item ${item.accent ? 'marquee__item--accent' : ''}`}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;