import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills, skillCategories } from '../../data';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const kanjiNumeral = (i) => ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][i] || String(i + 1);

const Skills = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const revealContainerRef = useRef(null);
  const ruleRef = useRef(null);
  const gridRef = useRef(null);
  const catRef = useRef(null);

  const revealLines = [
    ['Mastering', 'modern', 'full-stack', 'development,'],
    ['intelligent', 'AI', 'models,'],
    ['and', 'fluid', 'interactive', 'motion'],
    ['to', 'forge', 'high-impact', 'digital', 'experiences.'],
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Top entrance
      const headerTop = headerRef.current?.querySelector('.sk-header-top');
      if (headerTop) {
        gsap.from(headerTop, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 35,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // 2. Editorial Outline-to-Fill Scroll-Driven Text Reveal (reference style)
      const fillWords = revealContainerRef.current?.querySelectorAll('.reveal-word-fill');
      if (fillWords && fillWords.length > 0) {
        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: revealContainerRef.current,
            start: 'top 82%',
            end: 'bottom 45%',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        revealTl.fromTo(
          fillWords,
          { opacity: 0 },
          {
            opacity: 1,
            stagger: 0.06,
            duration: 0.1,
            ease: 'power1.out',
          }
        );

        // Buffer hold: ensures all words reach 100% solid opacity well before the scroll trigger finishes
        revealTl.to({}, { duration: 0.25 });
      }

      // 3. Japanese Divider Rule expand
      if (ruleRef.current) {
        gsap.fromTo(
          ruleRef.current,
          { scaleX: 0 },
          {
            scrollTrigger: {
              trigger: ruleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.inOut',
          }
        );
      }

      // 4. Staggered Skill Cards + Card Title Scrub Highlight
      const cards = gridRef.current?.querySelectorAll('.skill-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 50,
          scale: 0.94,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
        });

        // Skill card header scrub highlight for individual cards
        cards.forEach((card) => {
          const cardWords = card.querySelectorAll('.sk-card-scrub-word');
          if (cardWords.length > 0) {
            const cardTl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                end: 'top 65%',
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            });

            cardTl.fromTo(
              cardWords,
              { opacity: 0.2 },
              {
                opacity: 1,
                stagger: 0.05,
                duration: 0.1,
                ease: 'power1.out',
              }
            );
            cardTl.to({}, { duration: 0.15 });
          }
        });

        // Hover interaction: skill cards stay still, only skill-icons move
        cards.forEach((card) => {
          const icon = card.querySelector('.skill-icon');
          if (!icon) return;

          const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(icon, {
              x: x * 0.15,
              y: y * 0.15,
              rotation: x * 0.05,
              scale: 1.1,
              duration: 0.3,
              ease: 'power1.out',
            });
          };

          const handleMouseLeave = () => {
            gsap.to(icon, {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
            });
          };

          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseleave', handleMouseLeave);
        });
      }

      // 4. Staggered Skill Category Rows
      const rows = catRef.current?.querySelectorAll('.sk-cat-row');
      if (rows && rows.length > 0) {
        gsap.from(rows, {
          scrollTrigger: {
            trigger: catRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          x: -30,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="skills-inner">
        <div className="sk-header" ref={headerRef}>
          <div className="sk-header-top">
            <div className="sk-header-left">
              <span className="sk-eyebrow">02 // CYBER MATRIX</span>
              <div className="sk-title-row">
                <h2 className="sk-title">Skills</h2>
                <span className="sk-title-jp">技能</span>
              </div>
            </div>
            <div className="sk-seal" aria-hidden="true"><span>技</span></div>
          </div>
        </div>

        {/* ── Editorial Outline-to-Fill Scroll Reveal (Reference Layout) ── */}
        <div className="sk-reveal-container" ref={revealContainerRef}>
          <div className="sk-reveal-text">
            {revealLines.map((line, lineIdx) => (
              <div key={lineIdx} className="reveal-line">
                {line.map((word, wordIdx) => (
                  <span key={wordIdx} className="reveal-word">
                    <span className="reveal-word-stroke" aria-hidden="true">{word}</span>
                    <span className="reveal-word-fill">{word}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="sk-rule" ref={ruleRef} />

        <div className="skills-grid" ref={gridRef}>
          {skills?.map((card, i) => (
            <div key={i} className="skill-card cyber-card">
              <div className="skill-card-telemetry">
                <span>[ SK-0{i + 1} ]</span>
              </div>
              <span className="skill-icon" aria-hidden="true">{card.icon}</span>
              <div className="skill-name">
                {card.name.split(' ').map((word, wIdx, arr) => (
                  <span key={wIdx} className="sk-card-word-wrap">
                    <span className="sk-card-scrub-word">{word}</span>
                    {wIdx < arr.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </div>
              <div className="skill-desc">{card.desc}</div>
              <div className="skill-tags">
                {card.tags?.map((tag, tagIndex) => (
                  <span key={tagIndex} className={`tag ${tag.type || ''}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="sk-cat-section" ref={catRef}>
          <div className="sk-cat-grid">
            {skillCategories.map((cat, i) => (
              <div className="sk-cat-row" key={i}>
                <span className="sk-cat-num">{kanjiNumeral(i)}</span>
                <div className="sk-cat-body">
                  <h3 className="sk-cat-title">{cat.title}</h3>
                  <div className="sk-cat-list">
                    {cat.skills.map((s, si) => (
                      <span key={si}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;