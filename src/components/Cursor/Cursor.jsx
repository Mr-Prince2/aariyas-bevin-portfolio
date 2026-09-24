import React, { useEffect, useRef, useState } from 'react'
import './Cursor.css'

function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  // Movement refs to avoid unnecessary re-renders
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest(
        'a, button, .interactive, .skill-card, .project-card, .about-card, .reveal-word, input, textarea, label, [role="button"]'
      )
      setIsHovered(!!target)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    let rafId
    const tick = () => {
      // Fluid spring interpolation for outer follower ring
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }
      
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className={`cursor-wrapper ${isVisible ? 'cursor-visible' : ''}`} aria-hidden="true">
      <div 
        ref={dotRef}
        className={`cursor__dot ${isHovered ? 'cursor--hover' : ''} ${isClicking ? 'cursor--click' : ''}`} 
      />
      <div 
        ref={ringRef}
        className={`cursor__ring ${isHovered ? 'ring--hover' : ''} ${isClicking ? 'ring--click' : ''}`} 
      />
    </div>
  )
}

export default Cursor