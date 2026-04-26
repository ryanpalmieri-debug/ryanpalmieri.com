export default function Footer() {
  return (
    <footer style={{
      width: '100%', borderTop: '1px solid var(--color-silver)',
      padding: '32px var(--container-padding-x)',
      display: 'flex', justifyContent: 'center',
    }}>
      <div style={{
        width: '100%', maxWidth: 'var(--container-max-width)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap',
        fontSize: 13, fontWeight: 500, letterSpacing: '-0.42px',
        color: 'var(--color-tundora)',
      }}>
        <span>© 2026 Ryan Palmieri. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-tundora)', textDecoration: 'none' }}>LinkedIn</a>
          <a href="https://x.com/ryanppalmieri" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-tundora)', textDecoration: 'none' }}>X</a>
          <a href="mailto:ryanpalmieri@gmail.com" style={{ color: 'var(--color-tundora)', textDecoration: 'none' }}>Email</a>
        </div>
      </div>
    </footer>
  )
}
