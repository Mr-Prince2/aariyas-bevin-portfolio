import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-copy">
        © {currentYear} Aariyas Bevin — Crafted with <span className="heart-accent">心</span> and code
      </div>
      <div className="footer-kanji">
        創造・美・技術
      </div>
    </footer>
  );
};

export default Footer;