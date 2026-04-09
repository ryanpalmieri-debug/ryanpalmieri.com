'use client'

import { useEffect, useRef } from 'react'

export default function WorkDetail({ work }) {
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
    <div ref={sectionRef} className="min-h-screen bg-white text-black">
      {/* Back nav */}
      <div className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/5 px-6 md:px-10 py-5 flex justify-between items-center">
        <a href="/#work" className="text-[14px] font-medium tracking-tight text-black hover:opacity-50 transition-opacity">
          &larr; Back
        </a>
        <span className="text-[14px] font-medium tracking-tight text-black">
          Ryan Palmieri
        </span>
      </div>

      {/* Hero image */}
      {work.thumbnail && (
        <div
          className="w-full h-[60vh] md:h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${work.thumbnail})` }}
        />
      )}

      {/* Content */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-20">
        {/* Title + meta */}
        <div className="mb-16 reveal">
          <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.1] mb-8">
            {work.title}
          </h1>
          <div className="flex flex-wrap gap-x-12 gap-y-4 text-[14px] text-black/50">
            {work.client && (
              <div>
                <p className="text-[12px] uppercase tracking-wide text-black/30 mb-1">Client</p>
                <p className="text-black">{work.client}</p>
              </div>
            )}
            {work.year && (
              <div>
                <p className="text-[12px] uppercase tracking-wide text-black/30 mb-1">Year</p>
                <p className="text-black">{work.year}</p>
              </div>
            )}
            {work.role && (
              <div>
                <p className="text-[12px] uppercase tracking-wide text-black/30 mb-1">Role</p>
                <p className="text-black">{work.role}</p>
              </div>
            )}
            {work.category && (
              <div>
                <p className="text-[12px] uppercase tracking-wide text-black/30 mb-1">Category</p>
                <p className="text-black">{work.category}</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {work.summary && (
          <div className="mb-16 reveal">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-black/70">
              {work.summary}
            </p>
          </div>
        )}

        {/* Body (Sanity rich text) */}
        {work.body && work.body.length > 0 && (
          <div className="mb-16 reveal">
            {work.body.map((block, i) => {
              if (block._type === 'block') {
                return (
                  <p key={block._key || i} className="text-[15px] leading-relaxed text-black/70 mb-4">
                    {block.children?.map(child => child.text).join('')}
                  </p>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Project images */}
        {work.images && work.images.length > 0 && (
          <div className="flex flex-col gap-6 mb-16">
            {work.images.map((img, i) => (
              <div
                key={i}
                className="w-full aspect-[16/10] bg-gray-100 bg-cover bg-center reveal"
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
        )}

        {/* External link */}
        {work.link && (
          <div className="reveal">
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-black font-medium border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
            >
              View project &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
