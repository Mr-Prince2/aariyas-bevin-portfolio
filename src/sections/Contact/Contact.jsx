import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

// ─── EmailJS config ────────────────────────────────────────────────────────
// Replace these three values with your own from https://emailjs.com
// Then add them to your .env file as shown below:
//
//   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
//   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
//   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
//
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// ──────────────────────────────────────────────────────────────────────────

const INITIAL_FORM = { from_name: '', from_email: '', message: '' };

// Submission status: 'idle' | 'loading' | 'success' | 'error'
const STATUS = {
  IDLE:    'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR:   'error',
};

const Contact = () => {
  const formRef                 = useRef(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status,   setStatus]   = useState(STATUS.IDLE);
  const [errMsg,   setErrMsg]   = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear any previous error when the user starts typing again
    if (status === STATUS.ERROR) setStatus(STATUS.IDLE);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.from_name.trim() || !formData.from_email.trim() || !formData.message.trim()) {
      setStatus(STATUS.ERROR);
      setErrMsg('Please fill in all fields before sending.');
      return;
    }

    // Simple email format check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email);
    if (!emailOk) {
      setStatus(STATUS.ERROR);
      setErrMsg('Please enter a valid email address.');
      return;
    }

    setStatus(STATUS.LOADING);

    try {
      // EmailJS sends the form using the template variables:
      //   {{from_name}}    → formData.name
      //   {{from_email}}   → formData.email
      //   {{message}}      → formData.message
      //   {{to_name}}      → "Aariyas" (set in template or pass below)
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );

      setStatus(STATUS.SUCCESS);
      setFormData(INITIAL_FORM);

      // Reset success message after 6 seconds so the form is ready again
      setTimeout(() => setStatus(STATUS.IDLE), 6000);

    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus(STATUS.ERROR);
      setErrMsg('Something went wrong. Please try again or email me directly.');
    }
  };

  const isLoading = status === STATUS.LOADING;

  return (
    <>
      <section id="contact">
        <div className="section-header fade-up">
          <span className="section-num">04 —</span>
          <h2 className="section-title">Contact</h2>
          <span className="section-title-jp">連絡</span>
        </div>

        <div className="contact-inner">

          {/* ── Left: copy + links ── */}
          <div className="contact-left fade-up">
            <h3 className="contact-headline">
              Let&rsquo;s build something <em>beautiful</em> together.
            </h3>
            <p className="contact-sub">
              Whether it&rsquo;s a creative web project, an AI collaboration, or just a
              conversation about anime and Japanese culture — I&rsquo;m always open to connect.
            </p>

            <div className="contact-links">
              <a href="mailto:aariyasbevin@gmail.com" className="contact-item">
                <div className="contact-item-icon">✉</div>
                <span className="contact-item-text">aariyasbevin@gmail.com</span>
              </a>

              <a
                href="https://github.com/Mr-Prince2"
                target="_blank"
                rel="noreferrer"
                className="contact-item"
              >
                <div className="contact-item-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span className="contact-item-text">github.com/Mr-Prince2</span>
              </a>
            </div>
          </div>

          {/* ── Right: form ── */}
          <form
            ref={formRef}
            className="contact-form-side fade-up fade-up-delay-2"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Hidden field — lets you know it came from the portfolio */}
            <input type="hidden" name="portfolio_source" value="aariyas-portfolio" />

            <div className="form-group">
              <label className="form-label" htmlFor="cf-name">Your Name</label>
              <input
                id="cf-name"
                type="text"
                name="from_name"
                className="form-input"
                placeholder="Yamamoto Taro"
                value={formData.from_name}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="cf-email">Email</label>
              <input
                id="cf-email"
                type="email"
                name="from_email"
                className="form-input"
                placeholder="hello@example.com"
                value={formData.from_email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                name="message"
                className="form-input"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            {/* ── Feedback banners ── */}
            {status === STATUS.SUCCESS && (
              <div className="form-feedback form-feedback--success">
                <span className="form-feedback__icon">✓</span>
                Message sent! I&rsquo;ll get back to you soon 🎴
              </div>
            )}

            {status === STATUS.ERROR && (
              <div className="form-feedback form-feedback--error">
                <span className="form-feedback__icon">✕</span>
                {errMsg}
              </div>
            )}

            <button
              type="submit"
              className={`btn-primary btn-submit ${isLoading ? 'btn-submit--loading' : ''}`}
              disabled={isLoading || status === STATUS.SUCCESS}
              style={{ width: '100%', cursor: isLoading ? 'not-allowed' : 'pointer' }}
            >
              {isLoading ? (
                <>
                  <span className="btn-spinner" />
                  Sending…
                </>
              ) : status === STATUS.SUCCESS ? (
                '✓ Sent!'
              ) : (
                'Send Message →'
              )}
            </button>
          </form>

        </div>
      </section>
    </>
  );
};

export default Contact;