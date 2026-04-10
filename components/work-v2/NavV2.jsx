'use client'

import { useState } from 'react'

export default function NavV2({ active = 'Work' }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: 'Work', href: '/work-v2' },
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-white px-6 md:px-10 py-6 flex justify-between items-center">
      {/* Logo left */}
      <a href="/" className="text-[22px] font-semibold tracking-tight text-black">
        Ryan Palmieri<sup className="text-[12px] ml-0.5">®</sup>
      </a>

      {/* Pill buttons right */}
      <div className="hidden md:flex items-center gap-1">
        {links.map((l) => {
          const isActive = l.label === active
          return (
            <a
              key={l.label}
              href={l.href}
              className={`text-[14px] font-normal px-5 py-2 rounded-full border transition-colors ${
                isActive
                  ? 'border-black text-black'
                  : 'border-transparent text-black/60 hover:text-black'
              }`}
            >
              {l.label}
            </a>
          )
        })}
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-[14px] font-medium text-black"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 bg-white px-6 pt-8 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-[28px] font-semibold text-black"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
