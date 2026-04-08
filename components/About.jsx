'use client'

import { useEffect, useRef } from 'react'
import { clients } from '../data/works'

export default function About() {
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

  const uniqueClients = [...new Set(clients)]

  return (
    <section id="about" ref={sectionRef} className="w-full bg-white">
      {/* Top area: large statement */}
      <div className="px-6 md:px-10 pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Large bold statement */}
          <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-bold leading-[1.15] tracking-[-0.03em] text-black max-w-[900px] mb-24 reveal">
            A quiet framework for brand work, shaped by strategy, pacing, and editorial restraint.
          </h2>

          {/* Right-aligned info block */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 md:justify-end reveal delay-1">
            <div className="md:w-auto">
              <div className="border-t border-black pt-6 mb-6 md:hidden"></div>
              <p className="text-[14px] text-black font-normal mb-6">
                [ Visual Framework ]
              </p>
            </div>
            <div className="max-w-[380px]">
              <div className="border-t border-black pt-6 mb-6 hidden md:block"></div>
              <p className="text-[14px] text-black/70 leading-relaxed mb-8">
                Ryan Palmieri is a creative director, producer, and strategist building at the intersection of culture, technology, and brand. His work spans global campaigns, documentary film, and emerging-tech platforms — always grounded in authentic storytelling.
              </p>
              <a
                href="#work"
                className="text-[14px] text-black font-medium border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
              >
                About the studio
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Brand logos grid */}
      <div className="px-6 md:px-10 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-t border-black/10 pt-12">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center reveal delay-2">
              {uniqueClients.map((client) => (
                <div
                  key={client}
                  className="flex items-center justify-center h-12 text-[13px] font-medium text-black/40 tracking-wide uppercase hover:text-black/80 transition-colors"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
