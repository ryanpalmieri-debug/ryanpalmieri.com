export default function Footer() {
  return (
    <footer style={{
      width: '100%', borderTop: '1px solid var(--auvra-line)',
      padding: '40px var(--container-padding-x)',
      display: 'flex', justifyContent: 'center',
    }}>
      <div style={{
        width: '100%', maxWidth: 'var(--container-max-width)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap',
        fontFamily: 'var(--auvra-display)',
        fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em',
        color: 'var(--auvra-muted)',
      }}>
        <span>© 2026 Ryan Palmieri</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--auvra-fg)', textDecoration: 'none' }}>LinkedIn</a>
          <a href="https://x.com/ryanppalmieri" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--auvra-fg)', textDecoration: 'none' }}>X</a>
          <a href="mailto:ryanpalmieri@gmail.com" style={{ color: 'var(--auvra-fg)', textDecoration: 'none' }}>Email</a>
        </div>
      </div>
    </footer>
  )
}
