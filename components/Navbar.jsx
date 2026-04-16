'use client'
import { useState } from 'react'
import { ParenLink } from './ParenLink'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <ul className="navbar__links">
          <li><ParenLink href="/" size="name">Ryan Palmieri</ParenLink></li>
          <li><ParenLink href="/work">Work</ParenLink></li>
          <li><ParenLink href="/about">About</ParenLink></li>
          <li><ParenLink href="mailto:ryanpalmieri@gmail.com">Contact</ParenLink></li>
        </ul>
        <button
          className="navbar__hamburger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span /><span />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <button
          className="mobile-menu__close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >&times;</button>
        <ParenLink href="/" size="lg" onClick={() => setOpen(false)}>Ryan Palmieri</ParenLink>
        <ParenLink href="/work" size="lg" onClick={() => setOpen(false)}>Work</ParenLink>
        <ParenLink href="/about" size="lg" onClick={() => setOpen(false)}>About</ParenLink>
        <ParenLink href="mailto:ryanpalmieri@gmail.com" size="lg">Contact</ParenLink>
      </div>
    </>
  )
}
