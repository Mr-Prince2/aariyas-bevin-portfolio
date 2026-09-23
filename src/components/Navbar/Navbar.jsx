import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={isScrolled ? 'nav-scrolled' : ''}>
      <a href="#hero" className="nav-logo" onClick={() => setIsOpen(false)}>
        A<span>•</span>B
      </a>

      {/* Hamburger icon */}
      <div className={`hamburger ${isOpen ? 'toggle' : ''}`} onClick={toggleMenu} aria-label="Toggle navigation menu">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

      {/* Links */}
      <ul className={`nav-links ${isOpen ? 'nav-open' : ''}`}>
        <li>
          <a 
            href="#about" 
            className={activeSection === 'about' ? 'active' : ''} 
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
        </li>
        <li>
          <a 
            href="#skills" 
            className={activeSection === 'skills' ? 'active' : ''} 
            onClick={() => setIsOpen(false)}
          >
            Skills
          </a>
        </li>
        <li>
          <a 
            href="#projects" 
            className={activeSection === 'projects' ? 'active' : ''} 
            onClick={() => setIsOpen(false)}
          >
            Projects
          </a>
        </li>
        <li>
          <a 
            href="#contact" 
            className={activeSection === 'contact' ? 'active' : ''} 
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </li>
      </ul>

      <div className="nav-kanji">ビン</div>
    </nav>
  );
};

export default Navbar;