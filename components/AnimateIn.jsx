'use client'
import { useEffect, useRef } from 'react'

export function AnimateIn({ children, delay = 0, className }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms` }}>
      {children}
    </div>
  )
}
