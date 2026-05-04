import React, { useEffect, useRef } from 'react'
import './KatakanaRain.css'

function KatakanaRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // 1. Setup dimensions
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // 2. Setup characters and columns
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'
    const fontSize = 16
    let columns = Math.floor(width / fontSize)
    let drops = new Array(columns).fill(1)

    const draw = () => {

      // Instead of clearing the screen, we paint a translucent black rectangle.
      // This creates the "trail" effect behind falling characters.
      ctx.fillStyle = 'rgba(10, 10, 15, 0.03)' // Match your --ink color
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = '#c03a2b08' // Your --crimson color
      ctx.font = `${fontSize}px "Space Mono"`

      for (let i = 0; i < drops.length; i++) {
        const text = katakana.charAt(Math.floor(Math.random() * katakana.length))
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Reset drop to top after it hits the bottom randomly
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      columns = Math.floor(width / fontSize)
      drops = new Array(columns).fill(1)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="katakana-rain-canvas" />
}

export default KatakanaRain