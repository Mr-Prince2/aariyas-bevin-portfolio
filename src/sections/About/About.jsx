import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about">
      <div className="section-header fade-up">
        <span className="section-num">01 —</span>
        <h2 className="section-title">About Me</h2>
        <span className="section-title-jp">私について</span>
      </div>

      <div className="about-grid">
        <div className="about-text fade-up">
          <p>
            I'm <strong>Aariyas Bevin</strong>, a third-year B.Tech student in <em>Artificial Intelligence & Data Science</em>, where code meets creativity and logic dances with art.
          </p>
          <p>
            My world exists at the intersection of <strong>animated web development</strong> and <em>Japanese culture</em> — I believe interfaces should not just function, but breathe.
          </p>
          
          <div className="red-accent-line"></div>
          
          <p>
            Deeply influenced by the philosophy of <em>monozukuri</em> (ものづくり), I approach every project as a craft. From pixel-perfect UI to AI-powered systems, I build with intention.
          </p>
        </div>

        <div className="about-card fade-up">
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
            <span className="info-value accent">ものづくり</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;