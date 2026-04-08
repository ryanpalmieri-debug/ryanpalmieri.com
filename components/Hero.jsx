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

      {/* Giant overlay text */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <h1
          className="font-bold uppercase text-white text-center leading-[0.9] tracking-[-0.04em] reveal"
          style={{ fontSize: 'clamp(4rem, 14vw, 16rem)' }}
        >
          BUILDING<br />BRANDS
        </h1>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 px-6 md:px-10 pb-8">
        {/* Bracket description */}
        <p className="text-[14px] leading-relaxed max-w-[280px] mb-10 reveal delay-1" style={{ textAlign: 'justify' }}>
          A {'  '}
          <span className="text-white/70">[ Creative Director ]</span>{'  '}for{'  '}
          <span className="text-white/70">[ Culture ]</span>{'  '}and{'  '}
          <span className="text-white/70">[ Technology ]</span>{'  '}
          who builds brands{'  '}
          <span className="text-white/70">[ In The Machine Age ]</span>
        </p>

        {/* Bottom row descriptors */}
        <div className="flex flex-col md:flex-row justify-between gap-4 text-[13px] font-normal reveal delay-2">
          <div>
            <p>Based in Los Angeles</p>
            <p className="text-white/60">available worldwide</p>
          </div>
          <div>
            <p>Brand-led</p>
            <p className="text-white/60">creative studio</p>
          </div>
          <div>
            <p>Strategy, film,</p>
            <p className="text-white/60">and production</p>
          </div>
        </div>
      </div>
    </section>
  )
}
