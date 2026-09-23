import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const kanjiRef = useRef(null);
  const hintRef = useRef(null);

  const roles = [
    'Animated Web Developer',
    'AI Engineer',
    'Creative Coder',
    'Frontend Craftsman'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for parallax and fade-out as user scrolls past Hero
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Text content lifts and fades
      tl.to(
        contentRef.current,
        {
          opacity: 0,
          y: -120,
          ease: 'none',
        },
        0
      );

      // Kanji stack moves slower (parallax depth effect)
      if (kanjiRef.current) {
        tl.to(
          kanjiRef.current,
          {
            y: 180,
            opacity: 0.05,
            ease: 'none',
          },
          0
        );
      }

      // Scroll hint fades out promptly on scroll start
      if (hintRef.current) {
        tl.to(
          hintRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.2,
            ease: 'power1.out',
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef}>
      <div className="hero-content-wrapper" ref={contentRef}>
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-eyebrow"
          >
            <span>Welcome to my world</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hero-name"
          >
            Aariyas<br />Bevin
          </motion.h1>

          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-name-jp"
          >
            アーリヤス・ベヴィン
          </motion.span>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-role"
          >
            <TypeAnimation
              sequence={[
                roles[0], 1800,
                roles[1], 1800,
                roles[2], 1800,
                roles[3], 1800,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="typing"
            />
            <br />
            B.Tech AI & Data Science · Animated Web Developer ·<br />
            Storytelling through code, motion & <em>Japanese aesthetics</em>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-cta"
          >
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-secondary">Say Hello</a>
          </motion.div>
        </div>

        <div className="hero-right">
          <div ref={kanjiRef} className="hero-kanji-wrapper">
            <div className="hero-kanji-stack">
              創造<br />美<br />技術
            </div>
          </div>
        </div>

        <div className="scroll-hint" ref={hintRef}>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;