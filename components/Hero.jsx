'use client'
import { useState } from 'react'

export default function Hero() {
  const [imageHovered, setImageHovered] = useState(false)

  return (
    <section className="w-full min-h-screen flex flex-col justify-end px-4 md:px-6 pb-4 pt-24">
      {/* Massive headline */}
      <div className="mb-8">
        <h1
          className="font-black uppercase text-white leading-none"
          style={{
            fontSize: 'clamp(4.5rem, 14vw, 18rem)',
            lineHeight: '0.88',
            letterSpacing: '-0.04em',
          }}
        >
          Ryan<br />
          Palmieri
        </h1>
      </div>

      {/* Sub row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
        <p className="text-zinc-400 max-w-sm text-base md:text-lg leading-relaxed font-medium">
          Creative director, producer, and strategist working at the intersection of culture, brand, and film.
        </p>
        <div className="flex items-center gap-6 text-zinc-500 text-sm font-medium uppercase tracking-widest">
          <span>Based in LA</span>
          <span className="text-zinc-800">—</span>
          <span>Available Worldwide</span>
        </div>
      </div>

      {/* Hero image */}
      <div
        className="w-full relative overflow-hidden cursor-pointer"
        style={{ aspectRatio: '21/9' }}
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2942&auto=format&fit=crop"
          alt="Ryan Palmieri — Creative Direction"
          className="w-full h-full object-cover transition-all duration-700"
          style={{
            filter: imageHovered ? 'grayscale(0%)' : 'grayscale(100%)',
            transform: imageHovered ? 'scale(1.03)' : 'scale(1)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,0.6), transparent)',
            opacity: imageHovered ? 0.3 : 0.7,
          }}
        />
        {/* Pill badge */}
        <div className="absolute bottom-5 right-5 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs font-semibold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Open to Projects
        </div>
      </div>
    </section>
  )
}
