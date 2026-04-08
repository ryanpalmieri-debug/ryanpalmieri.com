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
      {/* Brand logos grid — ABOVE the copy */}
      <div className="px-6 md:px-10 pt-32 pb-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-b border-black/10 pb-12">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center reveal">
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

      {/* Main content area */}
      <div className="px-6 md:px-10 pt-12 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: large statement */}
            <div className="reveal">
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-bold leading-[1.15] tracking-[-0.03em] text-black">
                I cut through the noise to build brand narratives that actually resonate.
              </h2>
            </div>

            {/* Right: photo + info */}
            <div className="reveal delay-1">
              {/* Photo */}
              <div
                className="w-full aspect-[3/4] bg-gray-100 bg-cover bg-center mb-8"
                style={{
                  backgroundImage: 'url(/headshot.png)',
                }}
              />

              {/* Info block */}
              <div className="border-t border-black pt-6">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                  <p className="text-[14px] text-black font-normal shrink-0">
                    [ Experience ]
                  </p>
                  <div className="max-w-[380px]">
                    <p className="text-[14px] text-black/70 leading-relaxed mb-8">
                      Ryan Palmieri is a brand strategist and creative director who builds at the intersection of culture, technology, and emerging media. His work spans global campaigns, documentary film, frontier-tech platforms, and AI agent systems — always grounded in the story beneath the product.
                    </p>
                    <a
                      href="/ryan-palmieri-resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-black font-medium border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
                    >
                      Experience
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
