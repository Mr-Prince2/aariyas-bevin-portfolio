import React from 'react'
import './Button.css'


function Button({ children, variant = 'primary', href, onClick, type = 'button', fullWidth = false }) {
  const className = [
    'btn',
    'interactive', 
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