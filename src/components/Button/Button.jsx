import React from 'react'
import './Button.css'

/**
 * Shared button / link component.
 * variant: 'primary' (crimson fill) | 'secondary' (ghost gold)
 * If href is provided, renders an <a> tag, otherwise a <button>.
 */
function Button({ children, variant = 'primary', href, onClick, type = 'button', fullWidth = false }) {
  const className = [
    'btn',
    'interactive', // <--- Add this to trigger the Gold Cursor state
    `btn--${variant}`,
    fullWidth ? 'btn--full' : '',
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button