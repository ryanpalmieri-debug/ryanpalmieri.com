'use client'

import { useEffect, useRef } from 'react'
import SectionLabel from './SectionLabel'

export default function About() {
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
    <section id="about" ref={sectionRef} className="w-full bg-white text-black py-24 md:py-32 px-6 md:px-10 border-t border-black/[0.08]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 reveal">
            <SectionLabel className="mb-8">About</SectionLabel>
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.025em] font-semibold text-black">
              I cut through the noise to build brand narratives that actually resonate.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pl-8 reveal delay-1">
            <div className="w-full max-w-[360px] aspect-[4/5] bg-gray-100 bg-cover bg-center mb-10 rounded-sm" style={{ backgroundImage: 'url(/headshot.png)' }} />
            <div className="max-w-[560px] space-y-6">
              <p className="text-[17px] leading-[1.65] text-black/80">
                I&apos;m a brand strategist, marketing leader, and creative director developing narratives for technically complex, category-defining products. My work spans frontier tech, Web3, documentary film, and global campaigns for companies including Gaia, Samsung, DC Comics, and Nike.
              </p>
              <p className="text-[17px] leading-[1.65] text-black/60">
                Based in Los Angeles, working worldwide. Currently focused on the intersection of brand, AI, and emerging media.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-black/10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-black/40 mb-2">Location</p>
                  <p className="text-[14px] text-black">Los Angeles, CA</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-black/40 mb-2">Availability</p>
                  <p className="text-[14px] text-black">Worldwide</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-black/40 mb-2">Experience</p>
                  <a href="/ryan-palmieri-resume.pdf" target="_blank" rel="noopener noreferrer" className="text-[14px] text-black border-b border-black/30 hover:border-black pb-0.5">Download resume &rarr;</a>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-black/40 mb-2">Contact</p>
                  <a href="mailto:ryanpalmieri@gmail.com" className="text-[14px] text-black border-b border-black/30 hover:border-black pb-0.5">Email me &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
