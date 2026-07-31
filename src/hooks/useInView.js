import { useState, useEffect, useRef } from 'react'

/**
 * Returns [ref, inView].
 * inView becomes true once the element crosses the threshold.
 * Set once:false to reset when element leaves viewport.
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options.once !== false) observer.unobserve(el)
        } else if (options.once === false) {
          setInView(false)
        }
      },
      { threshold: options.threshold ?? 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}