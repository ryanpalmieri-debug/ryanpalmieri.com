'use client'

import { useEffect, useRef } from 'react'

export default function Footer() {
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
    <footer id="contact" ref={sectionRef} className="w-full">
      {/* CTA section — full-bleed image */}
      <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-white overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2948&auto=format&fit=crop)',
            filter: 'brightness(0.35) saturate(0.8)',
          }}
        />
        {/* Tint overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 reveal">
          <h2 className="text-[clamp(2rem,4vw,4rem)] font-bold leading-[1.2] tracking-[-0.02em] mb-8">
            If you have an idea in mind,
            <br />
            we&apos;d like to hear about it.
          </h2>
          <a
            href="mailto:ryanpalmieri@gmail.com"
            className="text-[15px] font-medium border-b border-white/60 pb-1 hover:border-white transition-colors"
          >
            Start a conversation
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black text-white px-6 md:px-10 py-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-white/50">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="flex gap-6 text-[13px] text-white/50">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
            <p className="text-[12px] text-white/30">
              &copy; 2025 Ryan Palmieri
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
