import React from 'react';
import './Projects.css';

const Projects = () => {
  const projectData = [
    {
      id: "01",
      featured: true,
      category: "⚡ Final Year Project",
      title: "Tharani Sengol",
      desc: "THARANI SENGOL is a comprehensive, government-integrated digital platform engineered to combat illegal mining and unauthorized earth transportation. By leveraging GPS tracking, geo-fencing technology, and automated compliance verification, the system ensures that every phase of excavation and transit aligns strictly with government-issued permits.",
      stack: ["YOLOv9", "ResNet-50", "MiDaS", "FastAPI", "React.js", "Leaflet.js", "PostGIS", "Jetson Nano"],
      icon: "道",
      thumbClass: "project-thumb-1"
    },
    {
      id: "02",
      category: "AI Finance Tracker (Web App)",
      title: "Kuber",
      desc: "An intelligent finance tracking application that uses AI to provide insights and recommendations.",
      stack: ["Next.js", "Clerk", "Prisma", "Supabase", "Arcject", "Inngest", "Resend", "Gemini API"],
      icon: "知",
      thumbClass: "project-thumb-2"
    },
    {
      id: "03",
      category: "Project • 3",
      title: "Project 3 title",
      desc: "Project 3 description goes here. This is a placeholder for the third project in the portfolio. It can be about any topic, such as a web app, a machine learning model, or a data visualization.",
      stack: ["React.js", "Three.js", "CSS3D", "Gamification"],
      icon: "語",
      thumbClass: "project-thumb-3"
    },
    {
      id: "04",
      category: "Project • 4",
      title: "Project 4 title",
      desc: "Project 4 description goes here. This is a placeholder for the fourth project in the portfolio. It can be about any topic, such as a web app, a machine learning model, or a data visualization.",
      stack: ["JavaScript", "Chart.js", "localStorage", "CSS"],
      icon: "円",
      thumbClass: "project-thumb-4"
    },
    {
      id: "05",
      category: "Project • 5",
      title: "Project 5 title",
      desc: "Project 5 description goes here. This is a placeholder for the fifth project in the portfolio. It can be about any topic, such as a web app, a machine learning model, or a data visualization.",
      stack: ["JavaScript", "Web Speech API", "AI APIs", "CSS Animations"],
      icon: "鳥",
      thumbClass: "project-thumb-5"
    },
    {
      id: "06",
      category: "Project • 6",
      title: "Project 6 title",
      desc: "Project 6 description goes here. This is a placeholder for the sixth project in the portfolio. It can be about any topic, such as a web app, a machine learning model, or a data visualization.",
      stack: ["HTML5", "CSS3", "JavaScript", "Anime Theme"],
      icon: "教",
      thumbClass: "project-thumb-6"
    }
  ];

  return (
    <section id="projects">
      <div className="section-header fade-up">
        <span className="section-num">03 —</span>
        <h2 className="section-title">Projects</h2>
        <span className="section-title-jp">作品</span>
      </div>

      <div className="projects-grid">
        {projectData.map((project, index) => (
          <div 
            key={project.id} 
            className={`project-card ${project.featured ? 'project-featured' : ''} fade-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`project-thumb ${project.thumbClass}`}>
              <div className={`project-thumb-bg ${project.thumbClass}`}></div>
              <div className="project-thumb-icon">{project.icon}</div>
              <div className="project-thumb-num">
                {project.id} {project.featured && '/ Featured'}
              </div>
            </div>

            <div className="project-body">
              <div className="project-category">{project.category}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
              
              <div className="project-stack">
                {project.stack.map(tech => (
                  <span key={tech} className="stack-pill">{tech}</span>
                ))}
              </div>

              <div className="project-links">
                <a href="#" className="project-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  GitHub
                </a>
                <a href="#" className="project-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;