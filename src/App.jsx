import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Cursor        from '@components/Cursor/Cursor'
import KatakanaRain  from '@components/KatakanaRain/KatakanaRain'
import SakuraPetals  from '@components/SakuraPetals/SakuraPetals'
import Navbar        from '@components/Navbar/Navbar'
import Marquee       from '@components/Marquee/Marquee'
import Footer        from '@components/Footer/Footer'
import Hero          from '@sections/Hero/Hero'
import About         from '@sections/About/About'
import Skills        from '@sections/Skills/Skills'
import Projects      from '@sections/Projects/Projects'
import Divider       from '@sections/Divider/Divider'
import Contact       from '@sections/Contact/Contact'
import './App.css'
import './styles/globals.css'

function App() {
  useEffect(() => {
    // Hide the default cursor site-wide
    document.body.style.cursor = 'none'
    return () => { document.body.style.cursor = '' }
  }, [])

  return (
    <div className="app">
      {/* ── Background layers (z-index 0–1) ── */}
      <KatakanaRain />
      <SakuraPetals />

      {/* ── Custom cursor (z-index 9998–9999) ── */}
      <Cursor />

      {/* ── Navigation (z-index 100) ── */}
      <Navbar />

      {/* ── Page content (z-index 2) ── */}
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Divider />
        <Contact />
      </main>

      <Footer />

      {/* ── Toast notifications ── */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background:  'var(--ash)',
            color:       'var(--white)',
            border:      '1px solid rgba(192,57,43,0.4)',
            fontFamily:  'var(--font-mono)',
            fontSize:    '0.72rem',
            letterSpacing: '0.05em',
          },
        }}
      />
    </div>
  )
}

export default App