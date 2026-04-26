'use client'
import { useState } from 'react'
import Link from 'next/link'

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
          <Link href="/" style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.42px', color: 'var(--color-cod-gray)', textDecoration: 'none' }}>
            ryan palmieri
          </Link>
          <div style={{ display: 'flex', gap: 32 }} className="kanso-nav-desktop">
            <Link href="/work" style={navLinkStyle}>/Work</Link>
            <Link href="/about" style={navLinkStyle}>/About</Link>
            <Link href="/contact" style={navLinkStyle}>/Contact</Link>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="kanso-nav-mobile"
            style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 500, color: 'var(--color-cod-gray)', cursor: 'pointer' }}
            aria-label="Open menu"
          >Menu</button>
        </div>
      </nav>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--color-white)', zIndex: 200,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px', gap: 24,
        }}>
          <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Close</button>
          <Link href="/work" onClick={() => setOpen(false)} style={mobileLinkStyle}>/Work</Link>
          <Link href="/about" onClick={() => setOpen(false)} style={mobileLinkStyle}>/About</Link>
          <Link href="/contact" onClick={() => setOpen(false)} style={mobileLinkStyle}>/Contact</Link>
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
  fontSize: 14, fontWeight: 500, letterSpacing: '-0.42px',
  color: 'var(--color-cod-gray)', textDecoration: 'none',
}
const mobileLinkStyle = {
  fontSize: 36, fontWeight: 600, letterSpacing: '-1px',
  color: 'var(--color-cod-gray)', textDecoration: 'none',
}
