'use client'

import { useEffect, useRef } from 'react'

export default function FeaturedGrid({ works = [] }) {
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

  // Take the first 8 featured projects (or fall back to first 8 overall)
  const featured = works.filter((w) => w.featured)
  const displayed = featured.length >= 8 ? featured.slice(0, 8) : works.slice(0, 8)

  return (
    <section ref={sectionRef} className="w-full bg-white py-20 md:py-28 px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12 reveal">
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/50">
            Featured Work
          </p>
          <a
            href="/all-work"
            className="text-[13px] text-black border-b border-black/20 hover:border-black pb-0.5 transition-colors"
          >
            All work &rarr;
          </a>
        </div>

        {/* 8-item grid: 2 columns desktop, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 md:gap-y-20">
          {displayed.map((work, i) => (
            <a
              key={work._id || work.slug || i}
              href={`/work/${work.slug}`}
              className="group block reveal"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden mb-5">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${work.thumbnail})` }}
                />
                {/* Subtle dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Meta row */}
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-black/40 mb-2">
                    {String(i + 1).padStart(2, '0')} / {work.category || 'Project'}
                  </p>
                  <h3 className="text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.01em] font-medium text-black">
                    {work.title}
                  </h3>
                </div>
                <span className="text-[11px] text-black/40 shrink-0 mt-1">
                  {work.year || ''}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
