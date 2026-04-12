'use client'

import { useEffect, useRef } from 'react'
import { toEmbedUrl } from '../lib/video'

export default function WorkDetail({ work }) {
  const sectionRef = useRef(null)
  const embedUrl = toEmbedUrl(work.videoUrl)

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

  // For the embed, strip background=1 so user gets full controls
  function toPlayableEmbed(url) {
    if (!url) return null

    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=0&title=1&byline=0&portrait=0`
    }

    const ytMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    )
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`
    }

    return null
  }

  const playableUrl = toPlayableEmbed(work.videoUrl)

  return (
    <div ref={sectionRef} className="min-h-screen bg-white text-black">
      {/* Back nav */}
      <div className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/5 px-6 md:px-10 py-5 flex justify-between items-center">
        <a href="/" className="text-[14px] font-medium tracking-tight text-black hover:opacity-50 transition-opacity">
          &larr; Back
        </a>
        <a href="/" className="font-serif text-[18px] tracking-[-0.01em] text-black hover:opacity-60 transition-opacity">
          <span className="italic font-normal">Ryan</span>{' '}
          <span className="font-medium">Palmieri</span>
        </a>
      </div>

      {/* Hero — video embed if available, otherwise thumbnail image */}
      <div className="pt-[56px]">
        {playableUrl ? (
          <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
            <iframe
              src={playableUrl}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={work.title}
            />
          </div>
        ) : work.thumbnail ? (
          <div
            className="w-full h-[60vh] md:h-[70vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${work.thumbnail})` }}
          />
        ) : null}
      </div>

      {/* Content */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-20">
        {/* Title + meta */}
        <div className="mb-16 reveal">
          <h1 className="font-serif text-4xl md:text-6xl tracking-[-0.03em] leading-[1.05] mb-8">
            <span className="italic font-normal">{work.title}</span>
          </h1>
          <div className="flex flex-wrap gap-x-12 gap-y-4 text-[14px] text-black/50">
            {work.client && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 mb-1">Client</p>
                <p className="text-black">{work.client}</p>
              </div>
            )}
            {work.year && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 mb-1">Year</p>
                <p className="text-black">{work.year}</p>
              </div>
            )}
            {work.role && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 mb-1">Role</p>
                <p className="text-black">{work.role}</p>
              </div>
            )}
            {work.category && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-black/30 mb-1">Category</p>
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

        {/* Body — handles both Sanity rich text blocks and plain string from static data */}
        {work.body && (
          <div className="mb-16 reveal">
            {typeof work.body === 'string' ? (
              work.body.split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-black/70 mb-4">
                  {para.trim()}
                </p>
              ))
            ) : (
              Array.isArray(work.body) && work.body.map((block, i) => {
                if (block._type === 'block') {
                  return (
                    <p key={block._key || i} className="text-[15px] leading-relaxed text-black/70 mb-4">
                      {block.children?.map(child => child.text).join('')}
                    </p>
                  )
                }
                return null
              })
            )}
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

        {/* Prev/next navigation */}
        <div className="mt-24 pt-10 border-t border-black/10 flex justify-between items-center reveal">
          <a href="/" className="text-[13px] text-black/50 hover:text-black transition-colors">
            &larr; All projects
          </a>
          <a href="/all-work" className="text-[13px] text-black/50 hover:text-black transition-colors">
            View archive &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
