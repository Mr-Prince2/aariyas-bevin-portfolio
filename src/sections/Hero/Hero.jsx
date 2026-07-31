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
  // Roles for the typing effect
  const roles = [
    'Animated Web Developer',
    'AI Engineer',
    'Creative Coder',
    'Frontend Craftsman'
  ];

  useEffect(() => {
    let tl;

    const initGSAP = () => {
      if (tl) tl.kill();
      
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          endTrigger: '#about',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Fade out the text content as we scroll down
      tl.to(contentRef.current, {
        opacity: 0,
        y: -150,
        duration: 0.4,
        ease: 'power2.inOut'
      }, 0);
    };

    initGSAP();
    
    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="hero" ref={containerRef}>
      <div className="hero-content-wrapper" ref={contentRef}>
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hero-eyebrow"
          >
            Welcome to my world
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hero-name"
          >
            Aariyas<br />Bevin
          </motion.h1>

          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-name-jp"
          >
            アーリヤス・ベヴィン
          </motion.span>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-cta"
          >
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-secondary">Say Hello</a>
          </motion.div>
        </div>

        <div className="hero-right">
          <motion.div 
            style={{ y: 'calc(-50%)' }} 
            className="hero-kanji-stack"
          >
            創造<br />美<br />技術
          </motion.div>
        </div>

        <div className="scroll-hint">Scroll</div>
      </div>
    </section>
  );
};

export default Hero;