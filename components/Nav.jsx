'use client'

import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const leftLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
  ]
  const rightLinks = [
    { label: 'Services', href: '#services' },
    { label: 'X', href: 'https://x.com/ryanppalmieri', external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ryan-palmieri-715190213/', external: true },
  ]

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-6 md:px-10 py-4 md:py-5 flex justify-between items-start text-white mix-blend-difference">
        {/* Left: name */}
        <a href="#" className="text-[14px] font-medium tracking-tight shrink-0">
          Ryan Palmieri
        </a>

        {/* Center: links in two columns */}
        <div className="hidden md:flex gap-x-32 text-[14px] font-normal">
          <div className="flex flex-col gap-1">
            {leftLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:opacity-50 transition-opacity">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {rightLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="hover:opacity-50 transition-opacity"
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: contact */}
        <a href="#contact" className="text-[14px] font-medium tracking-tight hidden md:block hover:opacity-50 transition-opacity">
          Contact
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[14px] font-medium"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black text-white flex flex-col justify-center px-8 md:hidden">
          <div className="flex flex-col gap-6">
            {[...leftLinks, ...rightLinks, { label: 'Contact', href: '#contact' }].map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-5xl font-bold tracking-tight"
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
