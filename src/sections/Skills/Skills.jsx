import React, { useEffect, useRef } from 'react';
import { skills, skillBars } from '../../data'; 
import './Skills.css';

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const barObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const bars = sectionRef.current.querySelectorAll('.skill-bar-fill');
          bars.forEach(bar => {
            bar.style.width = bar.dataset.pct + '%';
          });
        }
      });
    }, { threshold: 0.3 });

    if (sectionRef.current) {
      barObserver.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) barObserver.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="section-header fade-up">
        <span className="section-num">02 —</span>
        <h2 className="section-title">Skills</h2>
        <span className="section-title-jp">技能</span>
      </div>

      {/* SKILL CARDS GRID */}
      <div className="skills-grid">
        {skills?.map((card, i) => (
          <div key={i} className="skill-card fade-up">
            <span className="skill-icon">{card.icon}</span>
            <div className="skill-name">{card.name}</div>
            <div className="skill-desc">{card.desc}</div>
            <div className="skill-tags">
              {/* Maps directly to the structured label and type schema in index.js */}
              {card.tags?.map((tag, tagIndex) => (
                <span key={tagIndex} className={`tag ${tag.type || ''}`}>
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* SKILL PROGRESS BARS SECTION */}
      <div className="skill-bar-section fade-up">
        <div className="red-line" style={{ margin: '3rem 0 2rem' }}></div>
        <div className="skill-bar-grid" id="skill-bars">
          {skillBars?.map((bar, i) => (
            <div key={i} className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">{bar.name}</span>
                <span className="skill-bar-pct">{bar.pct}%</span>
              </div>
              <div className="skill-bar-track">
                <div 
                  className="skill-bar-fill" 
                  data-pct={bar.pct} 
                  style={{ width: '0%' }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;