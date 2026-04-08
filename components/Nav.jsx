'use client'
import { useState, useEffect } from 'react'

const navBtnStyle = {
  fontSize: '12px',
  fontWeight: 500,
  fontFamily: "'DM Sans', sans-serif",
  letterSpacing: '0.04em',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '6px 14px',
  borderRadius: '5px',
  transition: 'background 0.22s, color 0.22s, border-radius 0.22s',
  color: '#000000',
  textDecoration: 'none',
  display: 'inline-block',
}

function NavButton({ href, children, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...navBtnStyle,
        background: hov ? 'rgba(21,21,21,0.8)' : 'transparent',
        color: hov ? '#F1F1F1' : '#000000',
        borderRadius: hov ? '27px' : '5px',
      }}
    >
      {children}
    </a>
  )
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const leftLinks = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT', href: '#about' },
  ]
  const rightLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'SAY HI ☺', href: '#contact' },
  ]

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          height: '48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          {/* Left nav */}
          <nav
            className="hidden md:flex"
            style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }}
          >
            {leftLinks.map((l) => (
              <NavButton key={l.label} href={l.href}>{l.label}</NavButton>
            ))}
          </nav>

          {/* Center wordmark */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <a
              href="#"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontSize: '17px',
                fontWeight: 400,
                color: '#000000',
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              Ryan Palmieri
            </a>
          </div>

          {/* Right nav — desktop */}
          <nav
            className="hidden md:flex"
            style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'flex-end' }}
          >
            {rightLinks.map((l) => (
              <NavButton key={l.label} href={l.href}>{l.label}</NavButton>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              color: '#000000',
              letterSpacing: '0.04em',
            }}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      <div
        style={{
          position: 'fixed',
          top: '48px',
          left: 0,
          width: '100%',
          backgroundColor: '#ffffff',
          zIndex: 49,
          overflow: 'hidden',
          maxHeight: menuOpen ? '400px' : '0',
          transition: 'max-height 0.35s ease',
          borderBottom: menuOpen ? '1px solid rgba(0,0,0,0.06)' : 'none',
        }}
        className="md:hidden"
      >
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 24px 40px',
            gap: '12px',
          }}
        >
          {[...leftLinks, ...rightLinks].map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                fontWeight: 400,
                color: '#000000',
                textDecoration: 'none',
                lineHeight: 1.2,
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
