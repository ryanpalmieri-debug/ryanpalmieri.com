export default function SectionAbout() {
  return (
    <section id="about" style={{ width: '100%', background: 'var(--paper)' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(48px, 6vw, 96px)',
        paddingBottom: 'var(--section-pad-y)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 4vw, 56px)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 16,
          paddingBottom: 6, borderBottom: '1px solid var(--ink-15)',
        }}>
          <span className="o-label"><span style={{ color: 'var(--orange)' }}>◆</span>&nbsp; About</span>
          <span className="o-label o-label--muted">Los Angeles, CA</span>
        </div>

        <h2 className="o-display" style={{
          margin: 0, maxWidth: '15em',
          fontSize: 'var(--size-display-md)',
          color: 'var(--ink)',
        }}>
          I turn complex technology into brands people
          understand, <span style={{ color: 'var(--orange)' }}>trust, and remember.</span>
        </h2>

        <div className="o-about-grid">
          <div className="o-card" style={{ alignSelf: 'start' }}>
            <div className="o-card-media" style={{ aspectRatio: '4 / 5' }}>
              <img src="/headshot.png" alt="Ryan Palmieri" style={{ filter: 'grayscale(100%)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 620 }}>
              <p style={paragraphStyle}>
                I&apos;m a senior marketing and brand leader with experience across AI infrastructure, Web3, entertainment, and global campaigns — from early-stage positioning to enterprise-scale launch.
              </p>
              <p style={paragraphStyle}>
                I started in film and commercial production, where I learned to build stories under real constraints with real stakes. That craft is still the foundation — I just apply it to technically complex products that need a human story before they can scale.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              <a href="/ryan-palmieri-resume.pdf" target="_blank" rel="noopener noreferrer" className="o-link">Resume ↗</a>
              <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="o-link">LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .o-about-grid {
          display: grid;
          grid-template-columns: minmax(240px, 360px) 1fr;
          gap: clamp(28px, 4vw, 64px);
          align-items: start;
        }
        @media (max-width: 860px) {
          .o-about-grid { grid-template-columns: 1fr; }
          .o-about-grid > .o-card { max-width: 340px; }
        }
      `}</style>
    </section>
  )
}

const paragraphStyle = {
  margin: 0, fontSize: 16, fontWeight: 400,
  lineHeight: 1.65, letterSpacing: '-0.01em', color: 'var(--ink-70)',
}
