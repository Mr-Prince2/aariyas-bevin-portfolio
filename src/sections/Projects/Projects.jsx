import React from 'react';
import { projects } from '../../data'; 
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects">
      <div className="section-header fade-up">
        <span className="section-num">03 //</span>
        <h2 className="section-title">Projects</h2>
        <span className="hud-tag">
          <span className="hud-tag-dot" />
          SYS.REPOS // SELECTED
        </span>
        <span className="section-title-jp">作品</span>
      </div>

      <div className="projects-grid">
        {projects?.map((project, index) => (
          <div 
            key={project.id} 
            className={`project-card cyber-card ${project.featured ? 'project-featured' : ''} fade-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
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
                {project.id < 10 ? `0${project.id}` : project.id} {project.featured && '/ FEATURED_SYSTEM'}
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
                {project.github && project.github !== '#' && (
                  <a 
                    href={project.github} 
                    className="project-link btn-primary interactive" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub
                  </a>
                )}

                {project.demo && project.demo !== '#' && (
                  <a 
                    href={project.demo} 
                    className="project-link btn-secondary interactive" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
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