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
      { threshold: 0.15 }
    )

    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <footer id="contact" ref={sectionRef} className="bg-[#0a0a0a] text-white py-32 px-6 md:px-12 w-full mt-auto">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col items-center text-center reveal">
        <p className="text-gray-400 uppercase tracking-widest text-sm font-medium mb-12">
          Have an idea?
        </p>
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mb-12 hover:text-gray-300 transition-colors cursor-pointer inline-block">
          Let&apos;s talk.
        </h2>

        <a
          href="mailto:ryanpalmieri@gmail.com"
          className="text-xl md:text-2xl border-b border-white/30 hover:border-white pb-2 transition-colors mb-32 inline-flex items-center gap-3"
        >
          ryanpalmieri@gmail.com
          <i className="ph ph-arrow-up-right"></i>
        </a>

        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-400 text-sm">
          <p>&copy; 2024 Ryan Palmieri. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
