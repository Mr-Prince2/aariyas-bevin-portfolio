import { useEffect, useRef } from 'react'

/**
 * Adds the class 'revealed' to the returned ref element
 * when it enters the viewport. Pair with a CSS transition
 * on .revealed to animate in.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          if (options.once !== false) observer.unobserve(el)
        }
      },
      { threshold: options.threshold ?? 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}