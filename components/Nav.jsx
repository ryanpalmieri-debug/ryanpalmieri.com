'use client'
import { useState } from 'react'
import Link from 'next/link'

const LINKS = [
  { href: '/work', label: 'Work', index: '01' },
  { href: '/about', label: 'About', index: '02' },
  { href: 'mailto:ryanpalmieri@gmail.com', label: 'Contact', index: '03' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 'var(--nav-h)',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-ink-12)',
        display: 'flex', alignItems: 'center',
      }}>
        <div className="o-container" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/" aria-label="Ryan Palmieri — Home" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-black)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            Ryan Palmieri<sup style={{ fontSize: '0.55em', fontWeight: 500, marginLeft: 1 }}>®</sup>
          </Link>

          <div className="o-nav-desktop" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {LINKS.map((l) => (
              l.href.startsWith('/')
                ? <Link key={l.label} href={l.href} className="o-nav-link">
                    <sup>({l.index})</sup> {l.label}
                  </Link>
                : <a key={l.label} href={l.href} className="o-nav-link">
                    <sup>({l.index})</sup> {l.label}
                  </a>
            ))}
            <a
              href="https://www.linkedin.com/in/ryan-palmieri-715190213/"
              target="_blank" rel="noopener noreferrer"
              className="o-nav-link"
            >LinkedIn ↗</a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="o-nav-mobile o-label"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Open menu"
          >Menu +</button>
        </div>
      </nav>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--color-black)', color: 'var(--color-white)',
          zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 var(--container-padding-x)', gap: 8,
        }}>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="o-label o-label--paper"
            style={{ position: 'absolute', top: 24, right: 'var(--container-padding-x)', background: 'none', border: 'none', cursor: 'pointer' }}
          >Close ×</button>

          {LINKS.map((l, i) => (
            l.href.startsWith('/')
              ? <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="o-menu-link o-display">
                  <span className="o-menu-index">({l.index})</span>{l.label}
                </Link>
              : <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="o-menu-link o-display">
                  <span className="o-menu-index">({l.index})</span>{l.label}
                </a>
          ))}

          <div style={{ display: 'flex', gap: 28, marginTop: 40 }}>
            <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="o-label o-label--paper-muted" style={{ textDecoration: 'none' }}>LinkedIn ↗</a>
            <a href="https://x.com/ryanppalmieri" target="_blank" rel="noopener noreferrer" className="o-label o-label--paper-muted" style={{ textDecoration: 'none' }}>X ↗</a>
          </div>
        </div>
      )}

      <style>{`
        .o-nav-link {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: var(--track-label);
          text-transform: uppercase;
          color: var(--color-black);
          text-decoration: none;
          transition: opacity 300ms ease;
        }
        .o-nav-link sup {
          font-size: 9px;
          color: var(--color-ink-50);
          margin-right: 2px;
        }
        .o-nav-link:hover { opacity: 0.45; }
        .o-menu-link {
          font-size: clamp(44px, 12vw, 80px);
          color: var(--color-white);
          text-decoration: none;
          line-height: 1.1;
        }
        .o-menu-index {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: var(--track-label);
          color: var(--color-paper-50);
          vertical-align: super;
          margin-right: 12px;
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
