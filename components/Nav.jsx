'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav className="nav">
        <div className="nav__inner">
          <Link href="/" className="nav__name">Ryan Palmieri</Link>
          <ul className="nav__links">
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <button className="nav__hamburger" onClick={() => setOpen(true)}>MENU</button>
        </div>
      </nav>
      <div className={`mobile-overlay ${open ? 'open' : ''}`}>
        <button className="mobile-overlay__close" onClick={() => setOpen(false)}>&times;</button>
        <Link href="/work" onClick={() => setOpen(false)}>Work</Link>
        <Link href="/about" onClick={() => setOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
      </div>
    </>
  )
}
