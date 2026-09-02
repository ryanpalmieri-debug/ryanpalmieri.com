export default function SectionAbout() {
  return (
    <section id="about" style={{ width: '100%' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(56px, 6vw, 96px)',
        paddingBottom: 'var(--section-pad-y)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 4vw, 64px)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 16,
          paddingTop: 20, borderTop: '1px solid var(--color-ink-12)',
        }}>
          <span className="o-label"><sup style={{ color: 'var(--color-ink-50)', marginRight: 4 }}>(03)</sup> About</span>
          <span className="o-label o-label--muted">Los Angeles, CA</span>
        </div>

        <h2 className="o-display" style={{
          margin: 0,
          maxWidth: '18em',
          fontSize: 'var(--size-display-md)',
          lineHeight: 1.08,
          color: 'var(--color-black)',
        }}>
          I turn complex technology into brands people understand,
          trust, and remember.
        </h2>

        <div className="o-about-grid">
          {/* Headshot column */}
          <div className="o-about-photo">
            <img
              src="/headshot.png"
              alt="Ryan Palmieri"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%)' }}
            />
          </div>

          {/* Copy column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
              <p style={paragraphStyle}>
                I&apos;m a senior marketing and brand leader with experience across AI infrastructure, Web3, entertainment, and global campaigns — from early-stage positioning to enterprise-scale launch.
              </p>
              <p style={paragraphStyle}>
                I started in film and commercial production, where I learned to build stories under real constraints with real stakes. That craft is still the foundation — I just apply it to technically complex products that need a human story before they can scale.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <a
                href="/ryan-palmieri-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="o-link"
              >Resume ↗</a>
              <a
                href="https://www.linkedin.com/in/ryan-palmieri-715190213/"
                target="_blank"
                rel="noopener noreferrer"
                className="o-link"
              >LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .o-about-grid {
          display: grid;
          grid-template-columns: minmax(260px, 380px) 1fr;
          gap: clamp(32px, 4vw, 72px);
          align-items: stretch;
        }
        .o-about-photo {
          width: 100%;
          aspect-ratio: 4 / 5;
          background: #111;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .o-about-grid { grid-template-columns: 1fr; }
          .o-about-photo { max-width: 340px; }
        }
      `}</style>
    </section>
  )
}

const paragraphStyle = {
  margin: 0,
  fontSize: 17,
  fontWeight: 400,
  lineHeight: 1.7,
  letterSpacing: '-0.01em',
  color: 'var(--color-ink-70)',
}
