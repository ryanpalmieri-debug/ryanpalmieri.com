'use client'
import { useState } from 'react'
import { categories } from '../data/works'

const WorkCard = ({ work, size = 'default' }) => {
  const [hovered, setHovered] = useState(false)

  const aspectClass =
    size === 'large' ? 'aspect-[4/3]' :
    size === 'wide'  ? 'aspect-[16/9]' :
    size === 'tall'  ? 'aspect-[3/4]' :
    'aspect-square'

  return (
    <div
      className={`relative group bg-zinc-900 overflow-hidden cursor-pointer ${aspectClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={work.thumbnail}
        alt={work.title}
        className="w-full h-full object-cover transition-all duration-700"
        style={{
          filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          opacity: hovered ? 1 : 0.7,
        }}
      />

      {/* Content */}
      <div
        className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex justify-between items-end transition-transform duration-500"
        style={{ transform: hovered ? 'translateY(0)' : 'translateY(8px)' }}
      >
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-2">
            {work.category} — {work.year}
          </p>
          <h3
            className="text-white font-black uppercase leading-none"
            style={{
              fontSize: size === 'large' || size === 'wide' ? 'clamp(1.5rem, 3vw, 3rem)' : 'clamp(1.1rem, 2vw, 1.75rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {work.title}
          </h3>
          {(size === 'large' || size === 'wide') && (
            <p
              className="text-zinc-400 text-sm mt-3 leading-relaxed hidden md:block transition-opacity duration-500"
              style={{ opacity: hovered ? 1 : 0 }}
            >
              {work.summary}
            </p>
          )}
        </div>

        {/* Arrow */}
        <div
          className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(0.8)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Featured badge */}
      {work.featured && (
        <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          Featured
        </div>
      )}
    </div>
  )
}

export default function WorkGallery({ works = [] }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? works
    : works.filter(w => w.category === activeCategory)

  return (
    <section id="work" className="w-full px-4 md:px-6 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
        <div>
          <p className="text-zinc-600 text-xs uppercase tracking-widest font-semibold mb-3">Selected Work</p>
          <h2
            className="text-white font-black uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', letterSpacing: '-0.04em', lineHeight: '0.9' }}
          >
            Work
          </h2>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
        {filtered.map((work, i) => {
          // Alternate layout: first item large, every 5th wide, rest default/square
          const mod = i % 5
          let size = 'default'
          let colSpan = 'col-span-1 md:col-span-2'

          if (mod === 0) { size = 'large'; colSpan = 'col-span-1 md:col-span-2' }
          else if (mod === 1) { size = 'large'; colSpan = 'col-span-1 md:col-span-2' }
          else if (mod === 2) { size = 'default'; colSpan = 'col-span-1' }
          else if (mod === 3) { size = 'default'; colSpan = 'col-span-1' }
          else if (mod === 4) { size = 'wide'; colSpan = 'col-span-1 md:col-span-4' }

          return (
            <div key={work.id} className={colSpan}>
              <WorkCard work={work} size={size} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
