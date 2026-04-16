'use client'

import { useEffect, useRef } from 'react'

export default function Footer() {
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
    <footer ref={sectionRef} className="w-full bg-[#0a0a0a] text-white">
      {/* Big CTA */}
      <div className="px-6 md:px-10 pt-24 md:pt-36 pb-20 md:pb-28 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto reveal">
          <p className="text-[12px] uppercase tracking-[0.18em] text-white/40 mb-8">[ Contact ]</p>
          <h2 className="text-[clamp(2.5rem,7vw,7rem)] leading-[0.98] tracking-[-0.035em] font-semibold text-white mb-12 max-w-[1100px]">
            Let&apos;s build<br />something together.
          </h2>
          <a href="mailto:ryanpalmieri@gmail.com" className="inline-flex items-center gap-3 text-[15px] md:text-[17px] text-white/80 border-b border-white/30 hover:border-white hover:text-white pb-1 transition-colors">
            ryanpalmieri@gmail.com <span className="text-[18px]">&rarr;</span>
          </a>
        </div>
      </div>
      {/* Footer columns */}
      <div className="px-6 md:px-10 py-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <p className="text-[16px] font-semibold text-white mb-3">Ryan Palmieri<sup className="text-[10px] ml-0.5">&reg;</sup></p>
            <p className="text-[13px] text-white/50 leading-relaxed max-w-[220px]">Brand strategist, creative director, and AI builder based in Los Angeles.</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 mb-4">Navigate</p>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              <li><a href="#top" className="text-white/70 hover:text-white transition-colors">Home</a></li>
              <li><a href="#projects" className="text-white/70 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#about" className="text-white/70 hover:text-white transition-colors">About</a></li>
              <li><a href="#studio" className="text-white/70 hover:text-white transition-colors">Studio</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 mb-4">Connect</p>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              <li><a href="mailto:ryanpalmieri@gmail.com" className="text-white/70 hover:text-white transition-colors">Email</a></li>
              <li><a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://x.com/ryanppalmieri" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">X / Twitter</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 mb-4">Info</p>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              <li className="text-white/70">Los Angeles, CA</li>
              <li><a href="/ryan-palmieri-resume.pdf" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">Resume &rarr;</a></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom strip */}
      <div className="border-t border-white/10 px-6 md:px-10 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-[12px] text-white/40">
          <p>&copy; {new Date().getFullYear()} Ryan Palmieri. All rights reserved.</p>
          <p>Crafted in Los Angeles.</p>
        </div>
      </div>
    </footer>
  )
}
