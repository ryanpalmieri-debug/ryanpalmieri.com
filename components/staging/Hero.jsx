'use client'

import { useEffect, useRef } from 'react'
import SectionLabel from './SectionLabel'

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target) } }) },
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="top" ref={sectionRef} className="relative w-full bg-white text-black pt-[140px] md:pt-[180px] pb-24 md:pb-32 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="reveal mb-8"><SectionLabel>Solo Practitioner &mdash; Los Angeles</SectionLabel></div>
        <h1 className="reveal delay-1 text-[clamp(2.6rem,7vw,7rem)] leading-[1.02] tracking-[-0.035em] font-semibold text-black max-w-[1200px] mb-10">
          I build brands,<br />campaigns, and AI agents<br />for the machine age.
        </h1>
        <p className="reveal delay-2 text-[17px] md:text-[19px] leading-[1.55] text-black/60 max-w-[640px] mb-12">
          Brand strategist, marketing leader, and creative director developing narratives for technically complex, category-defining products at the intersection of culture and emerging tech.
        </p>
        <div className="reveal delay-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a href="#projects" className="inline-flex items-center justify-center gap-2 text-[14px] font-medium text-white bg-black px-7 py-4 rounded-full hover:bg-black/80 transition-colors">View Projects <span className="text-[15px]">&rarr;</span></a>
          <a href="mailto:ryanpalmieri@gmail.com" className="inline-flex items-center justify-center gap-2 text-[14px] font-medium text-black bg-transparent border border-black/20 px-7 py-4 rounded-full hover:border-black hover:bg-black/[0.04] transition-colors">Start a Project</a>
        </div>
      </div>
    </section>
  )
}
