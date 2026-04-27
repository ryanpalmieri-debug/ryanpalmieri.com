export default function SectionHero() {
  return (
    <section className="auvra-section" style={{ paddingTop: 24 }}>
      <div className="auvra-section-inner" style={{
        paddingTop: 'clamp(80px, 14vw, 180px)',
        paddingBottom: 'clamp(64px, 10vw, 140px)',
        display: 'flex', flexDirection: 'column', gap: 48,
      }}>
        <span className="auvra-eyebrow">Ryan Palmieri — Studio</span>

        <h1 className="auvra-h1" style={{ maxWidth: '14ch' }}>
          Brands for the<br />machine age.
        </h1>

        <p className="auvra-lede" style={{ maxWidth: '52ch', color: 'var(--auvra-muted)', margin: 0 }}>
          A solo practice in brand strategy, creative direction, and AI-native production —
          turning complex technology into stories people understand, trust, and remember.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <a href="#projects" className="auvra-pill">
            See selected work
            <Arrow />
          </a>
          <a href="mailto:ryanpalmieri@gmail.com" className="auvra-pill auvra-pill--ghost">
            Start a project
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
