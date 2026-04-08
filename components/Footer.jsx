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
    <footer id="contact" ref={sectionRef} className="bg-[#0a0a0a] text-white w-full">
      {/* CTA section */}
      <div className="px-6 md:px-12 pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto w-full reveal">
          <p className="text-[13px] text-gray-500 font-medium tracking-wide uppercase mb-8">
            Contact
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.03em] leading-[1.1] text-white mb-12">
            If you have an idea in mind,<br className="hidden md:block" />
            we&apos;d like to hear about it.
          </h2>
          <a
            href="mailto:ryanpalmieri@gmail.com"
            className="group inline-flex items-center gap-3 text-[15px] text-gray-400 hover:text-white transition-colors"
          >
            ryanpalmieri@gmail.com
            <i className="ph ph-arrow-up-right text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
          </a>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="px-6 md:px-12 py-8 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left: nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-gray-500">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Right: social + copyright */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="flex gap-6 text-[13px] text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
            <p className="text-[12px] text-gray-600">
              &copy; 2024 Ryan Palmieri
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
