'use client'

import { useEffect, useRef, useState } from 'react'

const services = [
  {
    title: 'Brand Strategy',
    description: 'Positioning brands at the intersection of culture and technology, defining narratives that resonate in the machine age.',
  },
  {
    title: 'Creative Direction',
    description: 'Leading end-to-end creative vision across campaigns, content, and digital experiences.',
  },
  {
    title: 'Film & Production',
    description: 'Directing branded content, documentaries, and campaign films that tell authentic stories.',
  },
  {
    title: 'Campaigns & Partnerships',
    description: 'Designing and executing integrated campaigns that connect brands with culture and community.',
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

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

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 md:px-12 w-full bg-gray-50">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-5 reveal">
            <h2 className="text-3xl md:text-4xl tracking-tight font-medium mb-8">Approach</h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light mb-8 max-w-lg">
              I believe in building brands that are culturally aware, strategically grounded, and visually uncompromising. Every project starts with a clear point of view.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed font-light max-w-lg">
              Working closely with founders, creative teams, and cultural institutions, I help translate complex ideas into clear, engaging experiences that resonate with audiences and drive results.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 reveal delay-100">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className={`border-t border-gray-200 pt-8 mb-8 ${i === services.length - 1 ? 'border-b pb-8' : ''}`}
              >
                <div
                  className="flex justify-between items-center cursor-pointer group"
                  onClick={() => toggle(i)}
                >
                  <h3 className="text-2xl font-medium tracking-tight group-hover:text-gray-500 transition-colors">
                    {svc.title}
                  </h3>
                  <i className={`ph ${openIndex === i ? 'ph-minus' : 'ph-plus'} text-xl text-gray-400 group-hover:text-black transition-colors`}></i>
                </div>
                {openIndex === i && (
                  <p className="text-gray-500 mt-4 max-w-md">{svc.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
