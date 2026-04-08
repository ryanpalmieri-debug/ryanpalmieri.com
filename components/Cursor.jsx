'use client'
import { useEffect, useState } from 'react'

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }

    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovering(true)
    }
    const out = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovering(false)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [visible])

  return (
    <>
      {/* Dot */}
      <div
        className="fixed top-0 left-0 z-[9999] pointer-events-none transition-transform duration-75"
        style={{
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#282828',
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Ring */}
      <div
        className="fixed top-0 left-0 z-[9998] pointer-events-none transition-all duration-200"
        style={{
          transform: `translate(${pos.x - (hovering ? 20 : 14)}px, ${pos.y - (hovering ? 20 : 14)}px)`,
          width: hovering ? 40 : 28,
          height: hovering ? 40 : 28,
          borderRadius: '50%',
          border: '1px solid rgba(40,40,40,0.35)',
          opacity: visible ? 1 : 0,
          mixBlendMode: 'multiply',
        }}
      />
    </>
  )
}
