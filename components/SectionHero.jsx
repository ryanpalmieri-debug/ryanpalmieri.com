'use client'
import { useState, useEffect } from 'react'

/* Rotating hero portraits — cross-fades through this list on a timer.
   Swap or reorder these paths to change the sequence. */
const HERO_IMAGES = [
  '/headshot.png',
  '/work/nike-boxing.png',
  '/work/we-live-outside.png',
  '/work/contact-high.png',
]

const INTERVAL_MS = 2600

export default function SectionHero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (HERO_IMAGES.length < 2) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % HERO_IMAGES.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="o-hero">
      {/* Full-bleed rotating portrait */}
      <div className="o-hero-photo">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === 0 ? 'Ryan Palmieri' : ''}
            aria-hidden={i !== 0}
            className="o-hero-img"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
        <span className="o-hero-credit">Los Angeles</span>
      </div>

      {/* Poster-scale display type crossing into the greige */}
      <h1 className="o-display o-hero-type">
        Brand, Marketing<br />
        &amp; Creative<br />
        Strategy for the Machine Age<br />
        Los Angeles, California
      </h1>

      <style>{`
        .o-hero {
          position: relative;
          width: 100%;
          min-height: calc(100vh - var(--nav-h));
          background: var(--paper);
          overflow: hidden;
        }
        .o-hero-photo {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 46%;
          background: var(--black);
          overflow: hidden;
        }
        .o-hero-img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 20%;
          display: block;
          filter: grayscale(100%) contrast(1.05);
          transition: opacity 900ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .o-hero-credit {
          position: absolute;
          bottom: 14px; right: 16px;
          font-family: var(--font-body);
          font-size: 12px; font-weight: 500;
          color: var(--paper-on-black-60);
          z-index: 2;
        }
        .o-hero-type {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 92%;
          text-align: center;
          color: var(--orange);
          font-size: var(--size-hero);
          font-weight: 800;
          pointer-events: none;
        }
        @media (max-width: 860px) {
          .o-hero { min-height: 0; }
          .o-hero-photo {
            position: relative;
            width: 100%;
            aspect-ratio: 4 / 5;
            max-height: 62vh;
          }
          .o-hero-type {
            position: relative;
            top: auto; left: auto;
            transform: none;
            width: 100%;
            text-align: left;
            padding: clamp(24px, 6vw, 40px) var(--container-padding-x) clamp(40px, 8vw, 64px);
          }
        }
      `}</style>
    </section>
  )
}
