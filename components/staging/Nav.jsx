'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Home', href: '#top' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Studio', href: '#studio' },
  ]

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/85 backdrop-blur-md border-b border-black/5' : 'bg-transparent'}`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
        <a href="#top" className="text-[16px] md:text-[17px] font-semibold tracking-[-0.01em] text-black hover:opacity-60 transition-opacity">
          Ryan Palmieri<sup className="text-[10px] ml-0.5">&reg;</sup>
        </a>
        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-[14px] text-black/70 hover:text-black transition-colors">{l.label}</a>
          ))}
        </div>
        <a href="mailto:ryanpalmieri@gmail.com" className="hidden md:inline-flex items-center gap-2 text-[13px] font-medium text-white bg-black px-5 py-2.5 rounded-full hover:bg-black/80 transition-colors">
          Contact <span className="text-[14px]">&rarr;</span>
        </a>
        <button className="md:hidden text-[13px] font-medium text-black" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[68px] bg-white px-6 pt-10 pb-10 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="text-[32px] font-semibold tracking-[-0.02em] text-black">{l.label}</a>
            ))}
          </div>
          <a href="mailto:ryanpalmieri@gmail.com" className="inline-flex justify-center items-center gap-2 text-[14px] font-medium text-white bg-black py-4 rounded-full">Contact &rarr;</a>
        </div>
      )}
    </nav>
  )
}
