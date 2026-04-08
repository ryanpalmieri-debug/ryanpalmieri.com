'use client'

import { useEffect, useRef } from 'react'
import { clients } from '../data/works'

export default function Collaborators() {
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

  // Unique clients only (no duplicates from marquee data)
  const uniqueClients = [...new Set(clients)]

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 w-full bg-white">
      <div className="max-w-[1600px] mx-auto w-full">
        <p className="text-[13px] text-gray-400 font-medium tracking-wide uppercase mb-16 reveal">
          Collaborators
        </p>

        <p className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[-0.02em] leading-[1.4] text-black reveal delay-100">
          {uniqueClients.map((client, i) => (
            <span key={client}>
              <span className="hover:text-gray-400 transition-colors duration-300 cursor-pointer">
                {client}
              </span>
              {i < uniqueClients.length - 1 && (
                <span className="text-gray-300">, </span>
              )}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
