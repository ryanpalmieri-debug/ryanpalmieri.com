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
      className="min-h-screen flex flex-col justify-end px-6 md:px-12 pt-32 pb-16 w-full"
    >
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Main statement */}
        <h1 className="text-[clamp(2.2rem,5.5vw,5.5rem)] leading-[1.1] tracking-[-0.03em] font-light text-black mb-16 reveal">
          A{' '}
          <span className="inline-flex items-center gap-2">
            <span className="text-gray-400">[</span>
            <span className="font-normal">Creative Director</span>
            <span className="text-gray-400">]</span>
          </span>{' '}
          building brands
          <br className="hidden md:block" />
          for{' '}
          <span className="inline-flex items-center gap-2">
            <span className="text-gray-400">[</span>
            <span className="font-normal">Culture</span>
            <span className="text-gray-400">]</span>
          </span>{' '}
          and{' '}
          <span className="inline-flex items-center gap-2">
            <span className="text-gray-400">[</span>
            <span className="font-normal">Technology</span>
            <span className="text-gray-400">]</span>
          </span>{' '}
          <br className="hidden md:block" />
          in the machine age.
        </h1>

        {/* Bottom row: location + descriptor */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 reveal delay-100">
          <div className="flex flex-col gap-1">
            <p className="text-[13px] text-gray-400 font-medium tracking-wide">
              Los Angeles
            </p>
          </div>
          <p className="text-[13px] text-gray-400 font-medium tracking-wide max-w-sm text-right hidden md:block">
            Brand strategy, marketing, and creative direction at the intersection of culture and code.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/10 mt-8"></div>
      </div>
    </section>
  )
}
