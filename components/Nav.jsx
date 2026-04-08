'use client'

import { useEffect, useRef } from 'react'

export default function Nav() {
  const navRef = useRef(null)
  const lastScrollRef = useRef(0)

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

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 mix-blend-difference text-white py-6 px-6 md:px-12 transition-transform duration-500"
    >
      <div className="flex justify-between items-center max-w-[1600px] mx-auto w-full">
        <a href="#" className="text-xl font-medium tracking-tight">
          Ryan Palmieri
        </a>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
          <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
          <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
        </div>
        <button className="md:hidden text-white">
          <i className="ph ph-list text-2xl"></i>
        </button>
      </div>
    </nav>
  )
}
