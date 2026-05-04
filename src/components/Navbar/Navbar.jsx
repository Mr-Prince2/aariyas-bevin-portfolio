import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function for the hamburger[cite: 3]
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav>
      <a href="#hero" className="nav-logo" onClick={() => setIsOpen(false)}>
        A<span>•</span>B
      </a>

      {/* Hamburger icon: display controlled via CSS media query[cite: 4] */}
      <div className={`hamburger ${isOpen ? 'toggle' : ''}`} onClick={toggleMenu}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

      {/* Links: structure stays the same, behavior changes via CSS[cite: 1, 4] */}
      <ul className={`nav-links ${isOpen ? 'nav-open' : ''}`}>
        <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
        <li><a href="#skills" onClick={() => setIsOpen(false)}>Skills</a></li>
        <li><a href="#projects" onClick={() => setIsOpen(false)}>Projects</a></li>
        <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
      </ul>

      <div className="nav-kanji">ビン</div>
    </nav>
  );
};

export default Navbar;