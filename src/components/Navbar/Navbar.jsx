import React, { useState, useEffect } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
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

      {/* Right controls: Theme toggle & Kanji seal */}
      <div className="nav-right">
        <ThemeToggle />
        <div className="nav-kanji">ビン</div>

        {/* Hamburger icon for mobile */}
        <div 
          className={`hamburger ${isOpen ? 'toggle' : ''}`} 
          onClick={toggleMenu} 
          aria-label="Toggle navigation menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleMenu(); }}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;