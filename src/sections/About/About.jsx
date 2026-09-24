import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
      });

      // 2. Text paragraphs staggered cascade
      const paragraphs = textRef.current?.querySelectorAll('p, .cyber-laser-divider');
      if (paragraphs && paragraphs.length > 0) {
        gsap.from(paragraphs, {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 35,
          stagger: 0.18,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // 3. Cyber Card entrance (stays fixed in place without tilt or wobble)
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          scale: 0.95,
          y: 40,
          duration: 0.85,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <div className="section-header" ref={headerRef}>
        <span className="section-num">01 //</span>
        <h2 className="section-title">About Me</h2>
        <span className="section-title-jp">私について</span>
      </div>

      <div className="about-grid">
        <div className="about-text" ref={textRef}>
          <p>
            I'm <strong>Aariyas Bevin</strong>, a final-year B.Tech student in <em>Artificial Intelligence & Data Science</em>, where code meets creativity and logic dances with art.
          </p>
          <p>
            My world exists at the intersection of <strong>animated web development</strong> and <em>Japanese culture</em> — I believe interfaces should not just function, but breathe.
          </p>
          
          <div className="cyber-laser-divider"></div>
          
          <p>
            Deeply influenced by the philosophy of <em>monozukuri</em> (ものづくり), I approach every project as a craft. From pixel-perfect UI to AI-powered systems, I build with intention.
          </p>
        </div>

        <div className="about-card cyber-card" ref={cardRef}>
          <span className="about-card-header">自己</span>
          <div className="info-row">
            <span className="info-label">Name</span>
            <span className="info-value">Aariyas Bevin</span>
          </div>
          <div className="info-row">
            <span className="info-label">Degree</span>
            <span className="info-value">B.Tech AI & DS</span>
          </div>
          <div className="info-row">
            <span className="info-label">Status</span>
            <span className="info-value" style={{color: 'var(--jade-light)'}}>● Open to Opportunities</span>
          </div>
          <div className="info-row">
            <span className="info-label">Philosophy</span>
            <span className="info-value accent">ものづくり (Monozukuri)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;