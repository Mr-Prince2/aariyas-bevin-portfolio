import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Divider.css';

gsap.registerPlugin(ScrollTrigger);

const Divider = () => {
  const dividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(dividerRef.current, {
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        scaleX: 0.7,
        duration: 1.2,
        ease: 'power2.out',
      });
    }, dividerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="divider" ref={dividerRef}>
      <span className="divider-text">創造は終わらない — The creation never ends</span>
    </div>
  );
};

export default Divider;