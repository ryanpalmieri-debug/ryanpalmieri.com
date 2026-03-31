'use client'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #1f1f1f' : '1px solid transparent',
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-16">
        {/* Logo */}
        <a
          href="#"
          className="text-white font-black text-base uppercase tracking-tightest hover:opacity-70 transition-opacity"
          style={{ letterSpacing: '-0.04em' }}
        >
          RP
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors link-hover"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="mailto:ryan@ryanpalmieri.com"
          className="hidden md:flex items-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-colors"
        >
          Let's Talk
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H3.5M9.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden`}
        style={{ maxHeight: menuOpen ? '300px' : '0' }}
      >
        <div className="px-6 pb-8 pt-4 flex flex-col gap-6 border-t border-zinc-900">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl font-black uppercase"
              style={{ letterSpacing: '-0.04em' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:ryan@ryanpalmieri.com"
            className="text-zinc-500 text-sm font-medium mt-2"
          >
            ryan@ryanpalmieri.com
          </a>
        </div>
      </div>
    </header>
  )
}
