'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
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
      className="relative w-full h-screen overflow-hidden bg-black text-white flex flex-col"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop)',
          filter: 'brightness(0.5)',
        }}
      />

      {/* Giant overlay text — staggered layout, light weight */}
      <div className="relative z-10 flex-1 flex items-center px-6 md:px-10">
        <div
          className="w-full uppercase text-white leading-[0.85] tracking-[-0.04em] font-extralight reveal"
          style={{ fontSize: 'clamp(3.4rem, 12vw, 13.6rem)' }}
        >
          <div className="text-left">RYAN</div>
          <div className="text-right">PALMIERI</div>
        </div>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 px-6 md:px-10 pb-8">
        {/* Description */}
        <p className="text-[14px] leading-relaxed max-w-[340px] mb-10 reveal delay-1">
          A <span className="text-white/70">[Senior Marketer, Brand Strategist, Creative Director]</span> building brands at the intersection of culture and code.
        </p>

        {/* Bottom row descriptors */}
        <div className="flex flex-col md:flex-row justify-between gap-4 text-[13px] font-normal reveal delay-2">
          <div>
            <p>Based in Los Angeles</p>
            <p className="text-white/60">available worldwide</p>
          </div>
          <div>
            <p>Strategy, Storytelling,</p>
            <p className="text-white/60">Creative</p>
          </div>
        </div>
      </div>
    </section>
  )
}
