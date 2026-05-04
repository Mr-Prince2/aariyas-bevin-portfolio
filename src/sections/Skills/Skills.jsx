import React, { useEffect, useRef } from 'react';
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

  const skillCards = [
    { icon: "前", name: "Frontend Development", desc: "Crafting pixel-perfect, animated interfaces with deep attention to motion and aesthetics.", tags: ["HTML5", "CSS3", "JavaScript"], accent: "crimson", accentTag: "Animations" },
    { icon: "反", name: "React Ecosystem", desc: "Building dynamic SPAs and component-driven UIs with hooks, state management, and more.", tags: ["React.js", "React Native", "Chart.js"], accent: "crimson", accentTag: "Leaflet.js" },
    { icon: "知", name: "AI & Machine Learning", desc: "Developing intelligent systems — from computer vision to NLP pipelines.", tags: ["YOLOv9", "ResNet-50", "MiDaS"], accent: "mist", accentTag: "ONNX" },
    { icon: "後", name: "Backend & APIs", desc: "Building robust REST APIs and data pipelines with Python-first backend frameworks.", tags: ["FastAPI", "PostgreSQL", "PostGIS"], accent: "mist", accentTag: "Python" },
    { icon: "動", name: "Animation & Motion", desc: "Breathing life into UIs — CSS animations, keyframes, transitions, and 3D transforms.", tags: ["CSS Animations", "3D Transforms", "GSAP"], accent: "mist", accentTag: "Scroll Effects" },
    { icon: "美", name: "Design & Aesthetics", desc: "Translating Japanese wabi-sabi and anime visual language into modern digital experiences.", tags: ["UI/UX Design", "Typography", "Color Theory"], accent: "crimson", accentTag: "Theming" }
  ];

  const skillBars = [
    { name: "HTML / CSS", pct: "92" },
    { name: "JavaScript", pct: "85" },
    { name: "React.js", pct: "80" },
    { name: "Python / ML", pct: "70" },
    { name: "FastAPI", pct: "65" },
    { name: "Web Animation", pct: "88" }
  ];

  return (
    <section id="skills" ref={sectionRef}>
      <div className="section-header fade-up">
        <span className="section-num">02 —</span>
        <h2 className="section-title">Skills</h2>
        <span className="section-title-jp">技能</span>
      </div>

      <div className="skills-grid">
        {skillCards.map((card, i) => (
          <div key={i} className="skill-card fade-up">
            <span className="skill-icon">{card.icon}</span>
            <div className="skill-name">{card.name}</div>
            <div className="skill-desc">{card.desc}</div>
            <div className="skill-tags">
              {card.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              <span className={`tag ${card.accent}`}>{card.accentTag}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="skill-bar-section fade-up">
        <div className="red-line" style={{ margin: '3rem 0 2rem' }}></div>
        <div className="skill-bar-grid" id="skill-bars">
          {skillBars.map((bar, i) => (
            <div key={i} className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">{bar.name}</span>
                <span className="skill-bar-pct">{bar.pct}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-pct={bar.pct} style={{ width: '0%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;