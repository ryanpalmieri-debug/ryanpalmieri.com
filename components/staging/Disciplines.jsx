'use client'

import { useEffect, useRef } from 'react'
import SectionLabel from './SectionLabel'

const disciplines = [
  { num: '01', title: 'Brand Strategy', description: 'Positioning, narrative, and identity systems for technically complex products. Defining what a brand stands for and how it lives in culture.', capabilities: ['Positioning', 'Narrative', 'Identity Systems', 'Naming'] },
  { num: '02', title: 'GTM / Campaigns', description: 'End-to-end go-to-market strategy and integrated campaign design that connects brands with culture, community, and code.', capabilities: ['GTM Strategy', 'Launch Campaigns', 'Partnerships', 'Activations'] },
  { num: '03', title: 'Content Production', description: 'Branded content, documentary, and editorial film production grounded in authentic storytelling and visual craft.', capabilities: ['Direction', 'Documentary', 'Branded Film', 'Editorial'] },
  { num: '04', title: 'Custom AI Agent Production', description: 'Designing and building intelligent agent systems for brands. From concept to production-ready pipelines.', capabilities: ['Agent Design', 'Pipelines', 'Integrations', 'Evaluation'] },
  { num: '05', title: 'Creative Direction', description: 'End-to-end creative vision across campaigns, content, and platforms. Every detail considered, every frame intentional.', capabilities: ['Art Direction', 'Visual Systems', 'Creative Leadership', 'Production Oversight'] },
]

export default function Disciplines() {
  const sectionRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target) } }) },
      { threshold: 0.05 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="studio" ref={sectionRef} className="w-full bg-white text-black py-24 md:py-32 px-6 md:px-10 border-t border-black/[0.08]">
      <div className="max-w-[1400px] mx-auto">
        <div className="reveal mb-16">
          <SectionLabel className="mb-6">Disciplines</SectionLabel>
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.025em] font-semibold text-black max-w-[900px]">What I do, and how I do it.</h2>
        </div>
        <div className="flex flex-col">
          {disciplines.map((d) => (
            <div key={d.num} className="reveal group border-t border-black/10 py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start hover:bg-black/[0.015] transition-colors px-2 md:px-4">
              <div className="md:col-span-1 text-[12px] uppercase tracking-[0.15em] text-black/40">{d.num}</div>
              <div className="md:col-span-3"><h3 className="text-[24px] md:text-[28px] font-semibold tracking-[-0.015em] text-black">{d.title}</h3></div>
              <div className="md:col-span-5"><p className="text-[15px] leading-[1.6] text-black/60">{d.description}</p></div>
              <div className="md:col-span-3 flex flex-wrap gap-2">
                {d.capabilities.map((c) => (<span key={c} className="text-[11px] text-black/60 border border-black/15 rounded-full px-3 py-1">{c}</span>))}
              </div>
            </div>
          ))}
          <div className="border-t border-black/10" />
        </div>
        <div className="mt-16 flex justify-start reveal">
          <a href="mailto:ryanpalmieri@gmail.com" className="inline-flex items-center gap-2 text-[14px] font-medium text-white bg-black px-7 py-4 rounded-full hover:bg-black/80 transition-colors">Start a Project <span className="text-[15px]">&rarr;</span></a>
        </div>
      </div>
    </section>
  )
}
