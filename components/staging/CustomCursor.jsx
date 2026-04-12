'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
      return
    }

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onLeave = () => setVisible(false)

    const onOver = (e) => {
      const t = e.target
      if (
        t.closest('a') ||
        t.closest('button') ||
        t.tagName === 'A' ||
        t.tagName === 'BUTTON'
      ) {
        setHover(true)
      } else {
        setHover(false)
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      {/* Outer ring */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference hidden md:block"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${hover ? 1.6 : 1})`,
          opacity: visible ? 1 : 0,
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
        }}
      >
        <div
          className="rounded-full border border-white"
          style={{
            width: '36px',
            height: '36px',
          }}
        />
      </div>

      {/* Inner dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference hidden md:block"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: '5px',
            height: '5px',
          }}
        />
      </div>
    </>
  )
}
