'use client'

import { useEffect, useRef, useState } from 'react'
import { works } from '../data/works'

export default function WorkGrid() {
  const sectionRef = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  // Show max 6 featured works
  const featured = works.filter(w => w.featured)
  const displayed = featured.length >= 4 ? featured : works.slice(0, 6)

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 w-full bg-white"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Section header */}
        <div className="flex items-center justify-between mb-16 reveal">
          <p className="text-[13px] text-gray-400 font-medium tracking-wide uppercase">
            Selected Work
          </p>
        </div>

        {/* Project list — large typography with hover image */}
        <div className="flex flex-col">
          {displayed.map((work, i) => (
            <a
              key={work.id}
              href="#"
              className="group block border-t border-black/10 py-8 md:py-10 reveal"
              onMouseEnter={() => setHoveredId(work.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.03em] text-black group-hover:text-gray-400 transition-colors duration-500">
                    {work.title.length > 40 ? work.client || work.title.split(':')[0] : work.title}
                  </h3>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <span className="text-[13px] text-gray-400 font-medium tracking-wide hidden md:block">
                    {work.category}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
                    <i className="ph ph-arrow-up-right text-lg"></i>
                  </div>
                </div>
              </div>
            </a>
          ))}
          {/* Bottom border */}
          <div className="border-t border-black/10"></div>
        </div>

        {/* View all */}
        <div className="mt-16 flex justify-start reveal">
          <a
            href="#"
            className="group flex items-center gap-3 text-[13px] font-medium text-gray-400 hover:text-black transition-colors tracking-wide"
          >
            View all work
            <i className="ph ph-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

        {/* Floating hover image */}
        {hoveredId && (
          <div
            className="fixed w-[300px] h-[200px] rounded-lg overflow-hidden pointer-events-none z-30 shadow-2xl hidden md:block"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y - 100,
              transition: 'opacity 0.3s ease',
            }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${works.find(w => w.id === hoveredId)?.thumbnail})`,
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
