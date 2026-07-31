import React, { useEffect, useRef, useState } from 'react'
import './Cursor.css'

function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  
  // 1. We use Refs for everything movement-related to avoid re-renders
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const ringPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // 2. Track mouse position without triggering useState
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    // 3. Handle hover detection
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .interactive')
      setIsHovered(!!target)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    // 4. The Animation Loop (Running at 60-120fps)
    const tick = () => {
      // Linear Interpolation (LERP) for the smooth lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.1
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.1
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }
      
      requestAnimationFrame(tick)
    }

    const raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(raf)
    }
  }, []) // Empty dependency array means this loop runs once and never restarts

  return (
    <div className="cursor-wrapper">
      <div 
        ref={dotRef}
        className={`cursor__dot ${isHovered ? 'cursor--hover' : ''}`} 
      />
      <div 
        ref={ringRef}
        className={`cursor__ring ${isHovered ? 'ring--hover' : ''}`} 
      />
    </div>
  )
}

export default Cursor