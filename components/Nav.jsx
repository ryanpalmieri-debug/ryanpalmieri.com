'use client'
import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Projects', href: '/#projects' },
  { label: 'About',    href: '/#about' },
  { label: 'Studio',   href: '/#disciplines' },
  { label: 'Contact',  href: 'mailto:ryanpalmieri@gmail.com' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 'var(--nav-h)', background: 'var(--auvra-bg)',
        borderBottom: '1px solid var(--auvra-line)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '100%', maxWidth: 'var(--container-max-width)',
          padding: '0 var(--container-padding-x)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/" aria-label="Ryan Palmieri — Home" style={{
            fontFamily: 'var(--auvra-display)',
            fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em',
            color: 'var(--auvra-fg)', textDecoration: 'none',
          }}>
            Ryan Palmieri
          </Link>

          <div className="auvra-nav-desktop" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={navLinkStyle}>{l.label}</a>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="auvra-nav-mobile"
            style={{ background: 'none', border: 'none', fontFamily: 'var(--auvra-display)', fontSize: 15, fontWeight: 500, color: 'var(--auvra-fg)', cursor: 'pointer' }}
            aria-label="Open menu"
          >Menu</button>
        </div>
      </nav>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--auvra-bg)', zIndex: 200,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px', gap: 24,
        }}>
          <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', fontFamily: 'var(--auvra-display)', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>Close</button>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={mobileLinkStyle}>{l.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .auvra-nav-desktop { display: none !important; }
        }
        @media (min-width: 821px) {
          .auvra-nav-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}

const navLinkStyle = {
  fontFamily: 'var(--auvra-display)',
  fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em',
  color: 'var(--auvra-fg)', textDecoration: 'none',
}
const mobileLinkStyle = {
  fontFamily: 'var(--auvra-display)',
  fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em',
  color: 'var(--auvra-fg)', textDecoration: 'none',
}
