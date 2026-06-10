import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import './Hero.css';


const Hero = () => {
  // Roles for the typing effect as defined in script.js[cite: 3]
  const roles = [
    'Animated Web Developer',
    'AI Engineer',
    'Creative Coder',
    'Frontend Craftsman'
  ];

  return (
    <section id="hero">
      <div className="hero-content">
        {/* Entrance animations using Framer Motion to replace IntersectionObserver[cite: 3] */}
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
          {/* Typing effect implementation[cite: 3] */}
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
        {/* Kanji stack with parallax effect handled via CSS variables/Framer Motion[cite: 1, 3] */}
        <motion.div 
          style={{ y: 'calc(-50%)' }} 
          className="hero-kanji-stack"
        >
          創造<br />美<br />技術
        </motion.div>
      </div>

      <div className="scroll-hint">Scroll</div>
    </section>
  );
};

export default Hero;