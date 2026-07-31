import React from 'react'
import { motion } from 'framer-motion'
import './SectionHeader.css'


function SectionHeader({ num, title, titleJP }) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="section-header__num">{num} —</span>
      <h2 className="section-header__title">{title}</h2>
      <span className="section-header__jp" aria-hidden>{titleJP}</span>
    </motion.div>
  )
}

export default SectionHeader