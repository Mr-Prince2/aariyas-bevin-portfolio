import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Cursor        from '@components/Cursor/Cursor'
import CyberGrid     from '@components/CyberGrid/CyberGrid'
import SakuraPetals  from '@components/SakuraPetals/SakuraPetals'
import Navbar        from '@components/Navbar/Navbar'
import ScrollProgress from '@components/ScrollProgress/ScrollProgress'
import Marquee       from '@components/Marquee/Marquee'
import Footer        from '@components/Footer/Footer'
import Hero          from '@sections/Hero/Hero'
import About         from '@sections/About/About'
import Skills        from '@sections/Skills/Skills'
import Projects      from '@sections/Projects/Projects'
import Divider       from '@sections/Divider/Divider'
import Contact       from '@sections/Contact/Contact'
import useFadeUp     from './hooks/useFadeUp'
import useTheme      from './hooks/useTheme'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import './styles/globals.css'

gsap.registerPlugin(ScrollTrigger);

function App() {
  useFadeUp();
  const { isLight } = useTheme();

  useEffect(() => {
    // Hide the default cursor site-wide
    document.body.style.cursor = 'none';

    // Initialize Lenis for smooth, cinematic scrolling with strict footer boundaries
    const lenis = new Lenis({
      duration: 1.0,
      lerp: 0.08,
      smoothWheel: true,
      overscroll: false, // Prevents scrolling past the footer boundary
      syncTouch: false,
      touchMultiplier: 1.0,
      wheelMultiplier: 1.0,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Keep Lenis dimensions tightly synchronized with GSAP ScrollTrigger
    const handleRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener('refresh', handleRefresh);

    // Refresh triggers once fonts & layouts settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      lenis.resize();
    }, 400);

    return () => { 
      document.body.style.cursor = '';
      clearTimeout(timer);
      ScrollTrigger.removeEventListener('refresh', handleRefresh);
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return (
    <div className="app">
      {/* ── Cyber Scroll Progress Bar (z-index 1001) ── */}
      <ScrollProgress />

      {/* ── Background layers (z-index 0–1) ── */}
      <CyberGrid />
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

      {/* ── Toast notifications (adapts to light/dark theme) ── */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background:    isLight ? '#ffffff' : 'var(--bg-card-solid, #121218)',
            color:         isLight ? '#050508' : 'var(--white, #ffffff)',
            border:        isLight ? '1px solid rgba(158,35,23,0.3)' : '1px solid rgba(192,57,43,0.4)',
            fontFamily:    'var(--font-mono, monospace)',
            fontSize:      '0.72rem',
            letterSpacing: '0.05em',
            boxShadow:     isLight ? '0 10px 25px rgba(0,0,0,0.08)' : '0 10px 25px rgba(0,0,0,0.5)',
          },
        }}
      />
    </div>
  );
}

export default App;