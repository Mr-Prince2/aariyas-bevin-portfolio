import React, { useEffect, useRef } from 'react';
import { skills, skillCategories } from '../../data';
import './Skills.css';

const kanjiNumeral = (i) => ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][i] || String(i + 1);

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('[data-reveal]');
    if (!els?.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="skills-inner">
        <div className="sk-header" data-reveal>
          <div className="sk-header-left">
            <span className="sk-eyebrow">02</span>
            <div className="sk-title-row">
              <h2 className="sk-title">Skills</h2>
              <span className="sk-title-jp">技能</span>
            </div>
          </div>
          <div className="sk-seal" aria-hidden="true"><span>技</span></div>
        </div>

        <div className="sk-rule" data-reveal />

        <div className="skills-grid">
          {skills?.map((card, i) => (
            <div key={i} className="skill-card" data-reveal>
              <span className="skill-icon" aria-hidden="true">{card.icon}</span>
              <div className="skill-name">{card.name}</div>
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

        <div className="sk-cat-section" data-reveal>
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