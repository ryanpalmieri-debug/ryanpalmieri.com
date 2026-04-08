'use client'
export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(0,0,0,0.08)',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      {/* Left — copyright */}
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px',
          color: 'rgba(74,74,74,0.4)',
        }}
      >
        &copy;2025 Ryan Palmieri
      </span>

      {/* Center — back to top */}
      <a
        href="#"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px',
          color: 'rgba(74,74,74,0.4)',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#000000')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(74,74,74,0.4)')}
      >
        Nowhere to go but up! &uarr;
      </a>

      {/* Right — social links */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {[
          { label: 'IG', href: 'https://instagram.com' },
          { label: 'LI', href: 'https://linkedin.com' },
          { label: 'TW', href: 'https://twitter.com' },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              color: 'rgba(74,74,74,0.4)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#000000')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(74,74,74,0.4)')}
          >
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
