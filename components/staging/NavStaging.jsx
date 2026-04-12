'use client'

import { useState } from 'react'

export default function NavStaging() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-black/[0.06]">
      <div className="h-[56px] flex items-center justify-between px-6 md:px-8">
        {/* Left: About + All Work */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          <a
            href="/about"
            className="text-[13px] text-black hover:opacity-50 transition-opacity"
          >
            About
          </a>
          <a
            href="/all-work"
            className="text-[13px] text-black hover:opacity-50 transition-opacity"
          >
            All Work
          </a>
        </div>

        {/* Center: Wordmark */}
        <div className="flex-1 flex justify-center">
          <a
            href="/"
            className="font-serif text-[20px] tracking-[-0.01em] text-black hover:opacity-60 transition-opacity"
          >
            <span className="italic font-normal">Ryan</span>{' '}
            <span className="font-medium">Palmieri</span>
          </a>
        </div>

        {/* Right: Social icons */}
        <div className="hidden md:flex items-center justify-end gap-5 flex-1">
          <a
            href="mailto:ryanpalmieri@gmail.com"
            aria-label="Email"
            className="text-black hover:opacity-50 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 5L2 7" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/ryan-palmieri-715190213/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-black hover:opacity-50 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://x.com/ryanppalmieri"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X / Twitter"
            className="text-black hover:opacity-50 transition-opacity"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[13px] font-medium text-black flex-1 text-right"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[56px] bg-white px-6 pt-10 pb-8 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <a href="/about" className="text-[28px] font-semibold tracking-tight text-black" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="/all-work" className="text-[28px] font-semibold tracking-tight text-black" onClick={() => setMenuOpen(false)}>
              All Work
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:ryanpalmieri@gmail.com" className="text-[13px] text-black/60">Email</a>
            <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="text-[13px] text-black/60">LinkedIn</a>
            <a href="https://x.com/ryanppalmieri" target="_blank" rel="noopener noreferrer" className="text-[13px] text-black/60">X</a>
          </div>
        </div>
      )}
    </nav>
  )
}
