'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="nav">
        <div className="nav__inner">
          <Link href="/" className="nav__logo">
            RYAN.PALMIERI<span className="nav__logo-cursor" />
          </Link>

          <div className="nav__center">
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="nav__socials">
            <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="nav__social-btn" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z"/></svg>
            </a>
            <a href="https://x.com/ryanppalmieri" target="_blank" rel="noopener noreferrer" className="nav__social-btn" aria-label="X / Twitter">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z"/></svg>
            </a>
            <a href="mailto:ryanpalmieri@gmail.com" className="nav__social-btn" aria-label="Email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="0" /><path d="m22 7-10 5L2 7" /></svg>
            </a>
          </div>

          <button className="nav__hamburger" onClick={() => setOpen(true)} aria-label="Open menu">MENU</button>
        </div>
      </nav>

      <div className={`mobile-overlay ${open ? 'open' : ''}`}>
        <button className="mobile-overlay__close" onClick={() => setOpen(false)} aria-label="Close menu">[ X ]</button>
        <Link href="/work" onClick={() => setOpen(false)}>Work</Link>
        <Link href="/about" onClick={() => setOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
      </div>
    </>
  )
}
