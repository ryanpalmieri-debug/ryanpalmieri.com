'use client'

import { useEffect, useRef } from 'react'

export default function HeroStaging() {
  const sectionRef = useRef(null)

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
      className="relative w-full h-screen bg-black text-white overflow-hidden flex flex-col justify-end"
    >
      {/* Full-bleed background media */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop)',
          filter: 'brightness(0.55)',
        }}
      />

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Bottom content block */}
      <div className="relative z-10 px-6 md:px-8 pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          {/* Left: label + headline */}
          <div className="reveal">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/60 mb-6">
              Brand Strategy · Creative Direction · AI Builder
            </p>
            <h1 className="text-[clamp(2.8rem,7vw,7rem)] leading-[0.95] tracking-[-0.03em] font-medium">
              Building brands<br />for the machine age.
            </h1>
          </div>

          {/* Right: meta column */}
          <div className="reveal delay-1 md:text-right text-[12px] text-white/70 space-y-1 shrink-0">
            <p>Based in Los Angeles</p>
            <p className="text-white/50">Available worldwide</p>
          </div>
        </div>
      </div>
    </section>
  )
}
