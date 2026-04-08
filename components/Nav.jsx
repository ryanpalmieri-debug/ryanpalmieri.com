'use client'

import { useEffect, useRef, useState } from 'react'

export default function Nav() {
  const navRef = useRef(null)
  const lastScrollRef = useRef(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      if (!navRef.current) return
      if (currentScroll > lastScrollRef.current && currentScroll > 100) {
        navRef.current.style.transform = 'translateY(-100%)'
      } else {
        navRef.current.style.transform = 'translateY(0)'
      }
      lastScrollRef.current = currentScroll
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/5 transition-transform duration-500"
      >
        <div className="flex justify-between items-center max-w-[1600px] mx-auto w-full px-6 md:px-12 py-5">
          <a href="#" className="text-[15px] font-medium tracking-tight text-black">
            Ryan Palmieri
          </a>
          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] font-medium text-gray-500 hover:text-black transition-colors tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </div>
          <button
            className="md:hidden text-black text-[13px] font-medium tracking-wide"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-4xl font-light tracking-tight text-black"
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
