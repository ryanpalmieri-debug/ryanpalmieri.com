'use client'

import { useEffect, useRef, useState } from 'react'
import { toEmbedUrl } from '../../lib/video'

export default function FeaturedStack({ works = [] }) {
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

  const featured = works.filter((w) => w.featured)
  const displayed = featured.length >= 8 ? featured.slice(0, 8) : works.slice(0, 8)

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white"
    >
      {/* Section label */}
      <div className="px-6 md:px-10 py-12 md:py-16 border-b border-black/10 reveal">
        <div className="max-w-[1600px] mx-auto flex items-end justify-between">
          <div>
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-black/40 mb-4">
              Selected Work — 2025
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,5rem)] leading-[0.95] tracking-[-0.02em] text-black">
              <span className="italic font-normal">Recent</span>{' '}
              <span className="font-medium">projects.</span>
            </h2>
          </div>
          <a
            href="/all-work"
            className="hidden md:inline-block text-[12px] uppercase tracking-[0.15em] text-black border-b border-black/20 hover:border-black pb-0.5 transition-colors"
          >
            View archive →
          </a>
        </div>
      </div>

      {/* Project sections — stacked, each full-bleed */}
      <div className="flex flex-col">
        {displayed.map((work, i) => (
          <ProjectTeaser key={work._id || work.slug || i} work={work} index={i} />
        ))}
      </div>

      {/* Mobile archive link */}
      <div className="md:hidden px-6 py-10 border-t border-black/10">
        <a
          href="/all-work"
          className="text-[12px] uppercase tracking-[0.15em] text-black border-b border-black/20 pb-0.5"
        >
          View archive →
        </a>
      </div>
    </section>
  )
}

function ProjectTeaser({ work, index }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const embedUrl = toEmbedUrl(work.videoUrl)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setInView(entry.isIntersecting))
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const num = String(index + 1).padStart(2, '0')

  return (
    <a
      ref={ref}
      href={`/work/${work.slug}`}
      className="group relative block w-full border-b border-black/10 overflow-hidden"
      style={{ height: 'clamp(70vh, 85vh, 900px)' }}
    >
      {/* Background media — video iframe if available, otherwise still image */}
      <div className="absolute inset-0 bg-black">
        {embedUrl && inView ? (
          <div className="absolute inset-0 pointer-events-none">
            <iframe
              src={embedUrl}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                // Cover the section while preserving 16:9 video
                width: 'max(100vw, calc(100vh * 16 / 9))',
                height: 'max(56.25vw, 100vh)',
                minWidth: '100%',
                minHeight: '100%',
                border: 0,
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={work.title}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${work.thumbnail})` }}
          />
        )}
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
      </div>

      {/* Text overlay */}
      <div className="relative h-full w-full px-6 md:px-10 py-12 md:py-16 flex flex-col justify-between text-white pointer-events-none">
        {/* Top row: number + category */}
        <div className="flex justify-between items-start">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/70">
            {num} / {work.category || 'Project'}
          </p>
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/70">
            {work.year}
          </p>
        </div>

        {/* Bottom: title + meta */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h3
            className="font-serif font-normal max-w-[900px] text-white"
            style={{
              fontSize: 'clamp(2rem, 6vw, 5.5rem)',
              lineHeight: '0.98',
              letterSpacing: '-0.025em',
            }}
          >
            {work.title}
          </h3>
          <div className="text-[11px] md:text-[12px] text-white/70 md:text-right space-y-1 shrink-0">
            {work.client && <p>{work.client}</p>}
            {work.role && <p className="text-white/50">{work.role}</p>}
          </div>
        </div>
      </div>
    </a>
  )
}
