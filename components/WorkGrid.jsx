'use client'

import { useEffect, useRef } from 'react'
import { works } from '../data/works'

export default function WorkGrid() {
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
    <section id="work" ref={sectionRef} className="py-32 px-6 md:px-12 w-full bg-white">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="flex items-center justify-between mb-20 reveal">
          <h2 className="text-3xl md:text-4xl tracking-tight font-medium">Selected Work</h2>
          <div className="hidden md:flex gap-2">
            <span className="text-sm text-gray-500">2022</span>
            <span className="text-sm text-gray-300">&mdash;</span>
            <span className="text-sm text-black font-medium">Present</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          {works.map((work, i) => (
            <div
              key={work.id}
              className={`group cursor-pointer reveal ${i % 2 === 1 ? 'md:mt-32' : ''}`}
            >
              <div className="overflow-hidden bg-gray-100 rounded-lg aspect-[4/3] relative">
                <div
                  className="w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${work.thumbnail})`,
                  }}
                />
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-medium tracking-tight mb-2">{work.title}</h3>
                  <p className="text-gray-500 text-sm">{work.category}{work.client ? ` / ${work.client}` : ''}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300 shrink-0 ml-4">
                  <i className="ph ph-arrow-up-right text-lg"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 flex justify-center reveal">
          <button className="px-8 py-4 rounded-full border border-black/10 hover:border-black hover:bg-black hover:text-white transition-all duration-300 font-medium text-sm tracking-wide">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}
