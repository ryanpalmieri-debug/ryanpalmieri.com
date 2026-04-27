'use client'
import { useState } from 'react'
import Link from 'next/link'

const NAV_FONT = 17 // bumped from 14 by ~20%

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 'var(--nav-h)', background: 'var(--color-white)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '100%', maxWidth: 'var(--container-max-width)',
          padding: '0 var(--container-padding-x)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/" aria-label="Ryan Palmieri — Home" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'Inter, sans-serif',
            fontSize: 28,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-1px',
            color: 'var(--color-cod-gray)',
            textDecoration: 'none',
          }}>
            <span style={{ color: 'var(--color-silver-chalice)', fontWeight: 600 }}>[</span>
            <span>rp</span>
            <span style={{ color: 'var(--color-silver-chalice)', fontWeight: 600 }}>]</span>
          </Link>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="kanso-nav-desktop">
            <Link href="/work" style={navLinkStyle}>/Work</Link>
            <a href="/#about" style={navLinkStyle}>/About</a>
            <a href="mailto:ryanpalmieri@gmail.com" style={navLinkStyle}>/Contact</a>
            <a
              href="https://www.linkedin.com/in/ryan-palmieri-715190213/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={iconLinkStyle}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z"/></svg>
            </a>
            <a
              href="https://x.com/ryanppalmieri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              style={iconLinkStyle}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z"/></svg>
            </a>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="kanso-nav-mobile"
            style={{ background: 'none', border: 'none', fontSize: NAV_FONT, fontWeight: 500, color: 'var(--color-cod-gray)', cursor: 'pointer' }}
            aria-label="Open menu"
          >Menu</button>
        </div>
      </nav>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--color-white)', zIndex: 200,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px', gap: 24,
        }}>
          <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', fontSize: 17, fontWeight: 500, cursor: 'pointer' }}>Close</button>
          <Link href="/work" onClick={() => setOpen(false)} style={mobileLinkStyle}>/Work</Link>
          <a href="/#about" onClick={() => setOpen(false)} style={mobileLinkStyle}>/About</a>
          <a href="mailto:ryanpalmieri@gmail.com" onClick={() => setOpen(false)} style={mobileLinkStyle}>/Contact</a>
          <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
            <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 22, color: 'var(--color-cod-gray)', textDecoration: 'none' }}>LinkedIn</a>
            <a href="https://x.com/ryanppalmieri" target="_blank" rel="noopener noreferrer" style={{ fontSize: 22, color: 'var(--color-cod-gray)', textDecoration: 'none' }}>X</a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .kanso-nav-desktop { display: none !important; }
        }
        @media (min-width: 769px) {
          .kanso-nav-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}

const navLinkStyle = {
  fontSize: NAV_FONT, fontWeight: 500, letterSpacing: '-0.5px',
  color: 'var(--color-cod-gray)', textDecoration: 'none',
}
const iconLinkStyle = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--color-cod-gray)', textDecoration: 'none',
}
const mobileLinkStyle = {
  fontSize: 36, fontWeight: 600, letterSpacing: '-1px',
  color: 'var(--color-cod-gray)', textDecoration: 'none',
}
