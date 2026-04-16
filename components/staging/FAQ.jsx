'use client'

import { useEffect, useRef, useState } from 'react'
import SectionLabel from './SectionLabel'

const faqs = [
  { q: 'What kinds of projects do you take on?', a: 'I work with founders, brands, and studios on brand strategy, creative direction, content production, and AI agent systems. Project scope ranges from focused engagements to full launches.' },
  { q: 'How do you typically structure engagements?', a: 'Most engagements run as project-based scopes or monthly retainers. We start with a discovery call to align on goals, scope, and timeline before any commitment.' },
  { q: 'Do you work solo or with a team?', a: 'I work as a solo practitioner and pull in trusted collaborators (designers, directors, engineers) when a project calls for it.' },
  { q: 'What does the process look like?', a: 'Discovery, ideation, production, launch. Every project starts with sharp questions and ends with measurable outcomes. Detailed timeline and milestones agreed upfront.' },
  { q: 'How long does a typical project take?', a: 'Anywhere from 2 weeks for a focused sprint to 3+ months for a full brand build. We define the timeline together based on scope and goals.' },
  { q: 'How do we get started?', a: 'Send a note with a brief about your project, timeline, and goals. I respond to all inquiries within 48 hours.' },
]

export default function FAQ() {
  const sectionRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target) } }) },
      { threshold: 0.05 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-white text-black py-24 md:py-32 px-6 md:px-10 border-t border-black/[0.08]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 reveal">
            <SectionLabel className="mb-6">FAQ</SectionLabel>
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.025em] font-semibold text-black mb-8">Common questions, straight answers.</h2>
            <p className="text-[15px] leading-[1.65] text-black/60 max-w-[400px]">Have something not covered here? Send me a note and I&apos;ll get back within 48 hours.</p>
            <a href="mailto:ryanpalmieri@gmail.com" className="inline-flex items-center gap-2 mt-8 text-[14px] font-medium text-black border-b border-black/30 hover:border-black pb-0.5 transition-colors">Get in touch &rarr;</a>
          </div>
          <div className="lg:col-span-7 reveal delay-1">
            <div className="flex flex-col">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i
                return (
                  <div key={i} className="border-t border-black/10 last:border-b">
                    <button onClick={() => setOpenIndex(isOpen ? -1 : i)} className="w-full flex items-center justify-between gap-6 py-6 text-left group">
                      <span className="text-[16px] md:text-[18px] font-medium text-black group-hover:text-black/60 transition-colors">{faq.q}</span>
                      <span className={`shrink-0 text-[20px] text-black/40 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0 pb-0'}`}>
                      <p className="text-[15px] leading-[1.65] text-black/60 max-w-[560px]">{faq.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
