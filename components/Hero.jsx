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
      { threshold: 0.15 }
    )

    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 w-full relative"
    >
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="max-w-5xl">
          <p className="text-gray-500 font-medium tracking-wide text-sm uppercase mb-8 reveal">
            Based in Los Angeles, available worldwide
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[1.05] tracking-tighter font-semibold text-black reveal delay-100">
            Building brands{' '}
            <br className="hidden md:block" />
            for the machine{' '}
            <br className="hidden md:block" />
            age.
          </h1>

          <div className="mt-20 flex flex-col md:flex-row gap-12 md:items-end justify-between reveal delay-200">
            <p className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed font-light">
              Brand Strategy, Marketing, &amp; Creative at the intersection of culture and code.
            </p>
            <a
              href="#work"
              className="group flex items-center gap-4 pb-2 border-b border-black/20 hover:border-black transition-colors w-max"
            >
              <span className="text-sm font-medium uppercase tracking-widest">Explore Work</span>
              <i className="ph ph-arrow-down text-lg group-hover:translate-y-1 transition-transform"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
