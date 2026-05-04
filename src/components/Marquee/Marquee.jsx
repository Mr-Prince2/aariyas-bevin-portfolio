import React from 'react'
import { marqueeItems } from '@data'
import './Marquee.css'

function Marquee() {
  // Duplicate items so the loop is seamless
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {items.map((item, i) => (
          <span
            key={i}
            className={`marquee__item ${item.accent ? 'marquee__item--accent' : ''}`}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee