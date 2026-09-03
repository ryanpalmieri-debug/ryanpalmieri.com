'use client'
import { useState } from 'react'
import Link from 'next/link'

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: 'mailto:ryanpalmieri@gmail.com', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 'var(--nav-h)',
        background: 'var(--black)',
        color: 'var(--paper-on-black)',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          width: '100%',
          padding: '0 var(--container-padding-x)',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
        }}>
          <Link href="/" aria-label="Ryan Palmieri — Home" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 15, fontWeight: 800, textTransform: 'uppercase',
            letterSpacing: '0.01em', color: 'var(--paper-on-black)',
            textDecoration: 'none', justifySelf: 'start',
          }}>
            Ryan Palmieri<sup style={{ fontSize: '0.6em', marginLeft: 1 }}>®</sup>
          </Link>

          <div className="o-nav-desktop" style={{ display: 'flex', gap: 28, justifySelf: 'center' }}>
            {LINKS.map((l) => (
              l.href.startsWith('/')
                ? <Link key={l.label} href={l.href} className="o-nav-link">{l.label}</Link>
                : <a key={l.label} href={l.href} className="o-nav-link">{l.label}</a>
            ))}
          </div>

          <a
            href="https://www.linkedin.com/in/ryan-palmieri-715190213/"
            target="_blank" rel="noopener noreferrer"
            className="o-nav-link o-nav-desktop"
            style={{ justifySelf: 'end' }}
          >LinkedIn ↗</a>

          <button
            onClick={() => setOpen(true)}
            className="o-nav-mobile"
            style={{
              justifySelf: 'end', gridColumn: 3,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--paper-on-black)', fontFamily: 'var(--font-body)',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}
            aria-label="Open menu"
          >Menu +</button>
        </div>
      </nav>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--orange)', color: 'var(--black)',
          zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 var(--container-padding-x)', gap: 4,
        }}>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              position: 'absolute', top: 18, right: 'var(--container-padding-x)',
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--black)',
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}
          >Close ×</button>

          {LINKS.map((l) => (
            l.href.startsWith('/')
              ? <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="o-menu-link o-display">{l.label}</Link>
              : <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="o-menu-link o-display">{l.label}</a>
          ))}

          <div style={{ display: 'flex', gap: 24, marginTop: 36 }}>
            <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" style={socialStyle}>LinkedIn ↗</a>
            <a href="https://x.com/ryanppalmieri" target="_blank" rel="noopener noreferrer" style={socialStyle}>X ↗</a>
          </div>
        </div>
      )}

      <style>{`
        .o-nav-link {
          font-family: var(--font-body);
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--paper-on-black); text-decoration: none;
          transition: color 240ms ease;
        }
        .o-nav-link:hover { color: var(--orange); }
        .o-menu-link {
          font-size: clamp(44px, 13vw, 96px);
          color: var(--black); text-decoration: none; line-height: 1.02;
        }
        @media (max-width: 768px) {
          .o-nav-desktop { display: none !important; }
        }
        @media (min-width: 769px) {
          .o-nav-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}

const socialStyle = {
  fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
  letterSpacing: '0.06em', textTransform: 'uppercase',
  color: 'var(--black)', textDecoration: 'none',
}
