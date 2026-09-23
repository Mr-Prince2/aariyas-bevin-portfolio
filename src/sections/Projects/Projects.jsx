import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data'; 
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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
        duration: 0.8,
        ease: 'power3.out',
      });

      // 2. Staggered project cards reveal
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 60,
          scale: 0.95,
          stagger: 0.15,
          duration: 0.85,
          ease: 'power2.out',
        });

        // 3D Card tilt effect on hover
        cards.forEach((card) => {
          const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(card, {
              rotationY: x * 0.04,
              rotationX: -y * 0.04,
              transformPerspective: 900,
              duration: 0.3,
              ease: 'power1.out',
            });
            const thumbBg = card.querySelector('.project-thumb-bg');
            if (thumbBg) {
              gsap.to(thumbBg, {
                x: -x * 0.05,
                y: -y * 0.05,
                duration: 0.4,
                ease: 'power1.out',
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotationY: 0,
              rotationX: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
            const thumbBg = card.querySelector('.project-thumb-bg');
            if (thumbBg) {
              gsap.to(thumbBg, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
              });
            }
          };

          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseleave', handleMouseLeave);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="section-header" ref={headerRef}>
        <span className="section-num">03 //</span>
        <h2 className="section-title">Projects</h2>
        <span className="section-title-jp">作品</span>
      </div>

      <div className="projects-grid" ref={gridRef}>
        {projects?.map((project) => (
          <div 
            key={project.id} 
            className={`project-card cyber-card ${project.featured ? 'project-featured' : ''}`}
          >
            {/* Dynamic Card Background Gradient pulled directly from data */}
            <div className="project-thumb">
              <div 
                className="project-thumb-bg" 
                style={{ background: project.gradient }}
              />
              <div className="project-thumb-scanlines" />
              <div className="project-thumb-icon">{project.icon}</div>
              <div className="project-thumb-num">
                {project.id < 10 ? `0${project.id}` : project.id} {project.featured && '/ FEATURED'}
              </div>
            </div>

            <div className="project-body">
              <div className="project-category">{project.category}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
              
              <div className="project-stack">
                {project.stack?.map(tech => (
                  <span key={tech} className="stack-pill">{tech}</span>
                ))}
              </div>

              <div className="project-links">
                {project.github && project.github !== '#' ? (
                  <a 
                    href={project.github} 
                    className="project-link btn-primary interactive" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub repository`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub
                  </a>
                ) : (
                  <span 
                    className="project-link btn-primary is-disabled"
                    aria-disabled="true"
                    title="GitHub link not available"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub
                  </span>
                )}

                {project.demo && project.demo !== '#' ? (
                  <a 
                    href={project.demo} 
                    className="project-link btn-secondary interactive" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                ) : (
                  <span 
                    className="project-link btn-secondary is-disabled"
                    aria-disabled="true"
                    title="Live demo not available"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;