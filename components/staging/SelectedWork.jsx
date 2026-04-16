'use client'

import { useEffect, useRef } from 'react'
import SectionLabel from './SectionLabel'

export default function SelectedWork({ works = [] }) {
  const sectionRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target) } }) },
      { threshold: 0.05 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const top9 = works.slice(0, 9)

  return (
    <section id="projects" ref={sectionRef} className="w-full bg-white text-black py-24 md:py-32 px-6 md:px-10 border-t border-black/[0.08]">
      <div className="max-w-[1400px] mx-auto">
        <div className="reveal mb-16">
          <SectionLabel className="mb-6">Selected Projects</SectionLabel>
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.025em] font-semibold text-black max-w-[900px]">Recent work across brand, film, and emerging tech.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-20">
          {top9.map((work, i) => (
            <a key={work._id || work.slug || i} href={`/work/${work.slug}`} className="group block reveal">
              <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden rounded-sm mb-5">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" style={{ backgroundImage: `url(${work.thumbnail})` }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-black/40 mb-2">{String(i + 1).padStart(2, '0')} / {work.category || 'Project'}</p>
                  <h3 className="text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.01em] font-medium text-black group-hover:text-black/60 transition-colors">{work.title}</h3>
                </div>
                <span className="text-[11px] text-black/40 shrink-0 mt-1">{work.year || ''}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-20 flex justify-center reveal">
          <a href="/all-work" className="inline-flex items-center gap-2 text-[14px] font-medium text-black bg-transparent border border-black/20 px-7 py-4 rounded-full hover:border-black hover:bg-black/[0.04] transition-colors">View All Work <span className="text-[15px]">&rarr;</span></a>
        </div>
      </div>
    </section>
  )
}
