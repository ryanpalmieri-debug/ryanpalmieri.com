'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const elRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    const delays = [500, 650, 800, 950]
    const timers = elRefs.map((ref, i) =>
      setTimeout(() => {
        if (ref.current) ref.current.classList.add('visible')
      }, delays[i])
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '80px',
        paddingLeft: 'clamp(24px, 6vw, 80px)',
        paddingRight: 'clamp(24px, 6vw, 80px)',
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative large text — hidden on mobile */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-2vw',
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          fontSize: 'clamp(6rem, 18vw, 20rem)',
          fontWeight: 700,
          color: '#000000',
          opacity: 0.04,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
        className="hidden md:block"
      >
        Direction
      </div>

      {/* Content */}
      <div style={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <p
          ref={elRefs[0]}
          className="reveal delay-1"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '13px',
            color: 'rgba(74,74,74,0.5)',
            marginBottom: '20px',
            letterSpacing: '0.02em',
          }}
        >
          Creative Director — Los Angeles
        </p>

        {/* Headline */}
        <h1
          ref={elRefs[1]}
          className="reveal delay-2"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.4px',
            color: '#000000',
            marginBottom: '28px',
          }}
        >
          Film, brand &amp; strategy /&nbsp;<em>at the intersection</em>&nbsp;/ of culture.
        </h1>

        {/* Subtext */}
        <p
          ref={elRefs[2]}
          className="reveal delay-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '16px',
            lineHeight: '20px',
            color: 'rgba(74,74,74,0.5)',
            marginBottom: '36px',
            maxWidth: '520px',
          }}
        >
          Creative director, producer, and strategist. I build campaigns, films, and brands that don&apos;t follow the brief — they set it.
        </p>

        {/* CTA links */}
        <div
          ref={elRefs[3]}
          className="reveal delay-4"
          style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
        >
          <a
            href="#work"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px',
              lineHeight: '20px',
              color: '#000000',
              textDecoration: 'none',
              borderBottom: '1px solid #000000',
              paddingBottom: '2px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#606060')}
            onMouseLeave={e => (e.currentTarget.style.color = '#000000')}
          >
            View Work
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px',
              lineHeight: '20px',
              color: 'rgba(74,74,74,0.5)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#606060')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(74,74,74,0.5)')}
          >
            Say Hi ☺
          </a>
        </div>
      </div>
    </section>
  )
}
