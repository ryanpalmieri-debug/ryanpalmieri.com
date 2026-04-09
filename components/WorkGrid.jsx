'use client'

import { useEffect, useRef } from 'react'

export default function WorkGrid({ works = [] }) {
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
      { threshold: 0.05 }
    )
    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="w-full bg-white py-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header row */}
        <div className="flex justify-between items-start mb-16 reveal">
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1] tracking-[-0.03em] text-black">
            Selected<br />Work
          </h2>
          <a
            href="#"
            className="text-[14px] text-black font-medium border-b border-black pb-0.5 hover:opacity-60 transition-opacity mt-2"
          >
            View all work
          </a>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work, i) => (
            <a
              key={work._id || work.id}
              href={`/work/${work.slug}`}
              className={`group relative overflow-hidden bg-gray-100 reveal ${i < 3 ? `delay-${i + 1}` : ''}`}
              style={{ aspectRatio: i === 0 || i === 3 ? '4/3' : '3/4' }}
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                style={{ backgroundImage: `url(${work.thumbnail})` }}
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
              {/* Title centered on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-white text-lg md:text-xl font-medium tracking-tight">
                  {work.client || work.title.split(':')[0].split('—')[0].trim()}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
