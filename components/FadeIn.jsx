'use client'
import { useEffect, useRef } from 'react'

export default function FadeIn({ children, delay = 0, className = '', style }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`fade-in ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  )
}
