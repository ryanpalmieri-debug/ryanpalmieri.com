'use client'
import { useState, useEffect, useRef } from 'react'
import { categories } from '../data/works'

function WorkCard({ work, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delayClass = index % 4 === 0 ? '' : index % 4 === 1 ? 'delay-1' : index % 4 === 2 ? 'delay-2' : 'delay-3'

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '3 / 4',
        backgroundColor: '#000000',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      {work.thumbnail && (
        <img
          src={work.thumbnail}
          alt={work.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'filter 0.8s cubic-bezier(0.40,0.24,0.40,1), transform 0.8s cubic-bezier(0.40,0.24,0.40,1)',
          }}
        />
      )}

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
          opacity: hovered ? 0.85 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.40,0.24,0.40,1)',
          pointerEvents: 'none',
        }}
      />

      {/* Year — top right */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.06em',
        }}
      >
        {work.year}
      </div>

      {/* Featured badge — top left */}
      {work.featured && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: '#ffffff',
            color: '#000000',
            fontSize: '11px',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '20px',
            letterSpacing: '0.04em',
          }}
        >
          ★ Featured
        </div>
      )}

      {/* Bottom content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px 20px',
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'transform 0.8s cubic-bezier(0.40,0.24,0.40,1)',
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '6px',
          }}
        >
          {work.category}
        </p>
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 400,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '6px',
          }}
        >
          {work.title}
        </h3>
        {work.client && (
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {work.client}
          </p>
        )}
      </div>
    </div>
  )
}

export default function WorkGallery({ works = [] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const headerRef = useRef(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filtered = activeCategory === 'All'
    ? works
    : works.filter(w => w.category === activeCategory)

  return (
    <section
      id="work"
      style={{
        backgroundColor: '#ffffff',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: 'clamp(24px, 6vw, 56px)',
        paddingRight: 'clamp(24px, 6vw, 56px)',
      }}
    >
      {/* Section header */}
      <div ref={headerRef} className="reveal" style={{ marginBottom: '48px' }}>
        <p
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '13px',
            color: '#3918A5',
            letterSpacing: '0.06em',
            marginBottom: '10px',
          }}
        >
          Selected Work
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(3rem, 7vw, 7rem)',
            color: '#000000',
            lineHeight: 1.0,
            letterSpacing: '-0.4px',
            marginBottom: '32px',
          }}
        >
          Work
        </h2>

        {/* Category filter pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((cat) => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '6px 16px',
                  borderRadius: '27px',
                  border: active ? 'none' : '1px solid rgba(0,0,0,0.15)',
                  backgroundColor: active ? '#000000' : 'transparent',
                  color: active ? '#ffffff' : 'rgba(74,74,74,0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* 2-col grid, gap-px with black bg so lines show */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          backgroundColor: '#000000',
        }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {filtered.map((work, i) => (
          <WorkCard key={work.id} work={work} index={i} />
        ))}
      </div>
    </section>
  )
}
