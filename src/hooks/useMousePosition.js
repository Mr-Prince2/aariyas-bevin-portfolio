import { useState, useEffect } from 'react'

/**
 * Returns the live mouse position {x, y} updated on every mousemove.
 */
export function useMousePosition() {
  // Initialize to center of screen so cursor doesn't start at 0,0 or off-screen
  const [pos, setPos] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
  })

  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return pos
}