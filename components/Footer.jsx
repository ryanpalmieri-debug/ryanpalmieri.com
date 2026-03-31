'use client'
import { useState } from 'react'

export default function Footer() {
  const [hovered, setHovered] = useState(false)

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-zinc-900 px-4 md:px-10 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Brand */}
        <a
          href="#"
          className="font-black text-sm uppercase transition-colors"
          style={{ letterSpacing: '-0.04em', color: hovered ? '#ffffff' : '#27272a' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Ryan Palmieri
        </a>

        <p className="text-zinc-700 text-xs font-medium">
          © {new Date().getFullYear()} Ryan Palmieri. All rights reserved.
        </p>

        <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-zinc-600">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IG</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LI</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TW</a>
        </div>
      </div>
    </footer>
  )
}
