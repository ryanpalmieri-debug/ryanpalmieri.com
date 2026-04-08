'use client'

import { useEffect, useRef } from 'react'

const services = [
  { num: '01', title: 'Brand Strategy', desc: 'Defining narrative, positioning, and identity systems for brands navigating culture and technology.' },
  { num: '02', title: 'Creative Direction', desc: 'Leading end-to-end creative vision across campaigns, content, and digital experiences.' },
  { num: '03', title: 'Film & Production', desc: 'Directing branded content, documentaries, and campaign films rooted in authentic storytelling.' },
  { num: '04', title: 'Campaigns & Partnerships', desc: 'Designing integrated campaigns that connect brands with culture, community, and code.' },
  { num: '05', title: 'Content Systems', desc: 'Building scalable content frameworks and editorial strategies for modern brand ecosystems.' },
]

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

  return (
    <>
      {/* Services section */}
      <section id="services" ref={sectionRef} className="py-24 px-6 md:px-12 w-full bg-white">
        <div className="max-w-[1600px] mx-auto w-full">
          <p className="text-[13px] text-gray-400 font-medium tracking-wide uppercase mb-16 reveal">
            Services
          </p>

          <div className="flex flex-col">
            {services.map((svc) => (
              <div
                key={svc.num}
                className="group border-t border-black/10 py-8 md:py-10 reveal"
              >
                <div className="flex items-start md:items-center gap-4 md:gap-8">
                  <span className="text-[13px] text-gray-300 font-medium tracking-wide w-8 shrink-0 pt-2 md:pt-0">
                    {svc.num}
                  </span>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between flex-1 gap-2 md:gap-8">
                    <h3 className="text-2xl md:text-3xl font-light tracking-tight text-black">
                      {svc.title}
                    </h3>
                    <p className="text-[14px] text-gray-400 font-normal max-w-md md:text-right">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-black/10"></div>
          </div>
        </div>
      </section>

      {/* About / Approach section */}
      <section id="about" className="py-24 px-6 md:px-12 w-full bg-[#fafafa]">
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="reveal">
              <p className="text-[13px] text-gray-400 font-medium tracking-wide uppercase mb-8">
                About
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-[-0.02em] text-black">
                A quiet framework for brand work, shaped by strategy, pacing, and editorial restraint.
              </p>
            </div>
            <div className="reveal delay-100">
              <p className="text-[15px] text-gray-500 leading-relaxed mb-6">
                Ryan Palmieri is a creative director, producer, and strategist building at the intersection of culture, technology, and brand. His work spans global campaigns, documentary film, and emerging-tech platforms — always grounded in authentic storytelling.
              </p>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                From directing branded content for Fortune 500 companies to producing independent film, Ryan brings a producer&apos;s instinct and a director&apos;s eye to every project. Based in Los Angeles, working worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
