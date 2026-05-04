import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section id="contact">
        <div className="section-header fade-up">
          <span className="section-num">04 —</span>
          <h2 className="section-title">Contact</h2>
          <span className="section-title-jp">連絡</span>
        </div>

        <div className="contact-inner">
          <div className="contact-left fade-up">
            <h3 className="contact-headline">
              Let's build something <em>beautiful</em> together.
            </h3>
            <p className="contact-sub">
              Whether it's a creative web project, an AI collaboration, or just a 
              conversation about anime and Japanese culture — I'm always open to connect.
            </p>

            <div className="contact-links">
              <a href="mailto:aariyas@example.com" className="contact-item">
                <div className="contact-item-icon">✉</div>
                <span className="contact-item-text">aariyasbevin@gmail.com</span>
              </a>
              <a href="https://github.com/Mr-Prince2" target="_blank" rel="noreferrer" className="contact-item">
                <div className="contact-item-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span className="contact-item-text">github.com/aariyas-bevin</span>
              </a>
              {/* <a href="https://linkedin.com/in/aariyas-bevin" target="_blank" rel="noreferrer" className="contact-item">
                <div className="contact-item-icon">in</div>
                <span className="contact-item-text">linkedin.com/in/aariyas-bevin</span>
              </a> */}
            </div>
          </div>

          <form className="contact-form-side fade-up fade-up-delay-2" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input 
                type="text" 
                name="name"
                className="form-input" 
                placeholder="Yamamoto Taro"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                name="email"
                className="form-input" 
                placeholder="hello@example.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea 
                name="message"
                className="form-input" 
                placeholder="Tell me about your project..."
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', cursor: 'pointer' }}>
              Send Message →
            </button>
          </form>
        </div>
      </section>
{/* 
      <footer>
        <span className="footer-copy">© {new Date().getFullYear()} AARIYAS BEVIN. ALL RIGHTS RESERVED.</span>
        <span className="footer-kanji">不磨</span>
      </footer> */}
    </>
  );
};

export default Contact;