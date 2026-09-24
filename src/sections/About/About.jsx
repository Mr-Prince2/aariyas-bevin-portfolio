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

  const aboutParagraphs = [
    [
      "I'm",
      { text: "Aariyas", type: "strong" },
      { text: "Bevin,", type: "strong" },
      "a", "final-year", "B.Tech", "student", "in",
      { text: "Artificial", type: "em" },
      { text: "Intelligence", type: "em" },
      { text: "&", type: "em" },
      { text: "Data", type: "em" },
      { text: "Science,", type: "em" },
      "where", "code", "meets", "creativity", "and", "logic", "dances", "with", "art."
    ],
    [
      "My", "world", "exists", "at", "the", "intersection", "of",
      { text: "animated", type: "strong" },
      { text: "web", type: "strong" },
      { text: "development", type: "strong" },
      "and",
      { text: "Japanese", type: "em" },
      { text: "culture", type: "em" },
      "—", "I", "believe", "interfaces", "should", "not", "just", "function,", "but", "breathe."
    ],
    [
      "Deeply", "influenced", "by", "the", "philosophy", "of",
      { text: "monozukuri", type: "em" },
      "(ものづくり),", "I", "approach", "every", "project", "as", "a", "craft.",
      "From", "pixel-perfect", "UI", "to", "AI-powered", "systems,", "I", "build", "with", "intention."
    ]
  ];

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

      // 2. Editorial Outline-to-Solid-Fill Scroll-Driven Text Reveal (matching Skills section design)
      const fillWords = textRef.current?.querySelectorAll('.about-reveal-fill');
      if (fillWords && fillWords.length > 0) {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 55%',
            end: 'bottom 35%',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        // Initial delay buffer so outline is visible first before fill begins
        aboutTl.to({}, { duration: 0.12 });

        aboutTl.fromTo(
          fillWords,
          { opacity: 0 },
          {
            opacity: 1,
            stagger: 0.04,
            duration: 0.1,
            ease: 'power1.out',
          }
        );

        // Buffer hold: ensures 100% completion before leaving scroll range
        aboutTl.to({}, { duration: 0.2 });
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
          {aboutParagraphs.map((para, pIdx) => (
            <React.Fragment key={pIdx}>
              <p className="about-reveal-para">
                {para.map((item, wIdx) => {
                  const word = typeof item === 'string' ? item : item.text;
                  const type = typeof item === 'string' ? '' : (item.type || '');
                  const typeClass = type ? ` is-${type}` : '';
                  return (
                    <span key={wIdx} className={`about-reveal-word${typeClass}`}>
                      <span className={`about-reveal-stroke${typeClass}`} aria-hidden="true">{word}</span>
                      <span className={`about-reveal-fill${typeClass}`}>{word}</span>
                    </span>
                  );
                })}
              </p>
              {pIdx === 1 && (
                <div className="about-laser-divider" />
              )}
            </React.Fragment>
          ))}
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