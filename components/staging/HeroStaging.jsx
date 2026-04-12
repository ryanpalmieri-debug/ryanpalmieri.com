'use client'

import { useEffect, useRef } from 'react'

// Drop a file at /public/hero.mp4 to override the background.
// Otherwise a dark image is used as fallback.
const HERO_VIDEO = '/hero.mp4'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop'

export default function HeroStaging() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    // Attempt to autoplay; if the file doesn't exist, fall back silently
    // to the background image by hiding the <video>.
    const v = videoRef.current
    if (!v) return
    const onError = () => {
      v.style.display = 'none'
    }
    v.addEventListener('error', onError)
    // Try to play (some browsers need an explicit call)
    v.play().catch(() => {})
    return () => v.removeEventListener('error', onError)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black text-white overflow-hidden"
    >
      {/* Fallback image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          filter: 'brightness(0.5)',
        }}
      />

      {/* Background video (hidden on error) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ filter: 'brightness(0.5)' }}
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Giant serif wordmark — letters touch edges */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-6 pointer-events-none">
        <h1
          className="font-serif font-normal text-white text-center w-full reveal"
          style={{
            fontSize: 'clamp(4.5rem, 22vw, 26rem)',
            lineHeight: '0.82',
            letterSpacing: '-0.045em',
            fontStretch: 'expanded',
          }}
        >
          <span className="block">RYAN</span>
          <span className="block italic font-light" style={{ marginTop: '-0.08em' }}>
            Palmieri
          </span>
        </h1>
      </div>

      {/* Top-of-hero label */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 reveal delay-1">
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/60">
          Brand Strategy · Creative Direction · AI Builder
        </p>
      </div>

      {/* Bottom meta row */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 z-10 flex justify-between items-end reveal delay-2">
        <div className="text-[11px] md:text-[12px] text-white/70 space-y-1">
          <p>Los Angeles · Worldwide</p>
          <p className="text-white/40">© {new Date().getFullYear()}</p>
        </div>
        <div className="text-[11px] md:text-[12px] text-right text-white/70 space-y-1">
          <p>Scroll to explore</p>
          <p className="text-white/40">↓</p>
        </div>
      </div>
    </section>
  )
}
