'use client'

import { useEffect, useRef } from 'react'

const steps = [
  { num: '01', title: 'Discovery', description: 'Understanding the brand, audience, market context, and what success actually looks like. Every project starts with sharp questions.' },
  { num: '02', title: 'Ideation', description: 'Strategy, narrative, and creative concepts. Exploring multiple directions before committing to the one that resonates.' },
  { num: '03', title: 'Production', description: 'Designing, directing, and building the work. Hands-on execution with a focus on craft and detail at every step.' },
  { num: '04', title: 'Launch', description: 'Bringing the work into the world with rollout strategy, optimization, and iteration based on real signals.' },
]

export default function Process() {
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
    <section ref={sectionRef} className="w-full bg-[#0a0a0a] text-white py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="reveal mb-16">
          <p className="text-[12px] uppercase tracking-[0.18em] text-white/50 mb-6">[ My Process ]</p>
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.025em] font-semibold text-white max-w-[900px]">From first conversation to launch.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
          {steps.map((step) => (
            <div key={step.num} className="reveal bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-6 min-h-[280px]">
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] font-mono text-white/40 tracking-wider">{step.num}</span>
                <span className="w-2 h-2 rounded-full bg-white/30" />
              </div>
              <h3 className="text-[24px] font-semibold tracking-[-0.015em] text-white">{step.title}</h3>
              <p className="text-[14px] leading-[1.6] text-white/60">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
