'use client'
import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="navbar__name">Ryan Palmieri</Link>
        <ul className="navbar__links">
          <li><Link href="/work">Works</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact" className="navbar__cta">Let&apos;s Talk</Link></li>
        </ul>
        <button className="navbar__hamburger" onClick={() => setOpen(true)} aria-label="Open menu">MENU</button>
      </nav>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <button className="mobile-menu__close" onClick={() => setOpen(false)} aria-label="Close menu">&times;</button>
        <Link href="/work" onClick={() => setOpen(false)}>Works</Link>
        <Link href="/about" onClick={() => setOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setOpen(false)}>Let&apos;s Talk</Link>
      </div>
    </>
  )
}
