'use client'

import { useEffect, useRef } from 'react'

const services = [
  {
    num: '00-1',
    title: 'Brand Strategy',
    desc: 'We shape the narrative before execution begins.\nPositioning, identity, and cultural relevance defined with intention.',
  },
  {
    num: '00-2',
    title: 'Film & Production',
    desc: 'Cinematic content built with restraint.\nShort-form, documentary, and branded films designed to hold attention.',
  },
  {
    num: '00-3',
    title: 'Creative Direction',
    desc: 'Leading vision across campaigns and platforms.\nEvery detail considered, every frame purposeful.',
  },
  {
    num: '00-4',
    title: 'Campaigns',
    desc: 'Integrated campaigns connecting brands to culture.\nStrategy, partnerships, and storytelling at scale.',
  },
  {
    num: '00-5',
    title: 'Content Systems',
    desc: 'Building editorial frameworks for modern brands.\nScalable content strategy and production pipelines.',
  },
]

export default function Services() {
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
    <section id="services" ref={sectionRef} className="w-full bg-white py-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header row */}
        <div className="flex justify-between items-start mb-20 reveal">
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1] tracking-[-0.03em] text-black">
            Our<br />Services
          </h2>
          <a
            href="#"
            className="text-[14px] text-black font-medium border-b border-black pb-0.5 hover:opacity-60 transition-opacity mt-2"
          >
            View service details
          </a>
        </div>

        {/* Services grid — first item centered, then 2-col with image center */}
        <div className="flex flex-col gap-20">
          {/* Row 1: Service 1 centered */}
          <div className="flex justify-center reveal">
            <ServiceBlock service={services[0]} />
          </div>

          {/* Row 2: Service 2 left, image center, Service 3 right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            <div className="reveal delay-1">
              <ServiceBlock service={services[1]} />
            </div>
            <div className="reveal delay-2 flex justify-center">
              <div
                className="w-full max-w-[400px] aspect-[3/4] bg-gray-100 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2869&auto=format&fit=crop)',
                }}
              />
            </div>
            <div className="reveal delay-3">
              <ServiceBlock service={services[2]} />
            </div>
          </div>

          {/* Row 3: Service 4 left, Service 5 right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-32">
            <div className="reveal">
              <ServiceBlock service={services[3]} />
            </div>
            <div className="reveal delay-1">
              <ServiceBlock service={services[4]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceBlock({ service }) {
  return (
    <div className="max-w-[420px]">
      <p className="text-[14px] text-black/50 font-normal mb-3">{service.num}</p>
      <p className="text-[14px] text-black font-medium mb-4">
        //{'  '}{service.title}
      </p>
      <p className="text-[14px] text-black/70 leading-relaxed whitespace-pre-line">
        {service.desc}
      </p>
      <div className="w-full h-px bg-black mt-6"></div>
    </div>
  )
}
