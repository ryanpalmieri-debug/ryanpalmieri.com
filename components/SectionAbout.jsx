export default function SectionAbout() {
  return (
    <section id="about" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: '100%',
        maxWidth: 'var(--container-max-width)',
        padding: '120px var(--container-padding-x)',
        display: 'flex', flexDirection: 'column', gap: 48,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <span style={labelStyle}>/About</span>
        </div>

        <div className="kanso-about-grid">
          {/* Headshot column */}
          <div className="kanso-about-photo">
            <img
              src="/headshot.png"
              alt="Ryan Palmieri"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Copy column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <h2 style={h2Style}>
              I turn complex technology into brands people understand, trust, and remember.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 720 }}>
              <p style={paragraphStyle}>
                I&apos;m a senior marketing and brand leader with experience across AI infrastructure, Web3, entertainment, and global campaigns — from early-stage positioning to enterprise-scale launch.
              </p>
              <p style={paragraphStyle}>
                I started in film and commercial production, where I learned to build stories under real constraints with real stakes. That craft is still the foundation — I just apply it to technically complex products that need a human story before they can scale.
              </p>
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
              <a
                href="/ryan-palmieri-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={primaryBtnStyle}
              >
                View Resume
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ryan-palmieri-715190213/"
                target="_blank"
                rel="noopener noreferrer"
                style={secondaryBtnStyle}
              >
                LinkedIn
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .kanso-about-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 64px;
          align-items: start;
        }
        .kanso-about-photo {
          width: 100%;
          aspect-ratio: 4 / 5;
          background: var(--color-gallery);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .kanso-about-grid { grid-template-columns: 1fr; gap: 32px; }
          .kanso-about-photo { max-width: 320px; }
        }
      `}</style>
    </section>
  )
}

const labelStyle = {
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  letterSpacing: 'var(--letter-spacing-sm)',
  color: 'var(--color-cod-gray)',
}
const h2Style = {
  margin: 0, maxWidth: 980,
  fontSize: 'var(--font-size-h2)',
  fontWeight: 'var(--font-weight-medium)',
  lineHeight: 'var(--line-height-h2)',
  letterSpacing: 'var(--letter-spacing-h2)',
  color: 'var(--color-cod-gray)',
}
const paragraphStyle = {
  margin: 0,
  fontSize: 17,
  fontWeight: 400,
  lineHeight: 1.7,
  letterSpacing: '-0.2px',
  color: 'var(--color-tundora)',
}
const primaryBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  background: 'var(--color-cod-gray)',
  color: 'var(--color-white)',
  padding: '12px 22px',
  borderRadius: 'var(--radius-pill)',
  textDecoration: 'none',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  letterSpacing: 'var(--letter-spacing-link)',
}
const secondaryBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  background: 'transparent',
  color: 'var(--color-cod-gray)',
  padding: '12px 22px',
  borderRadius: 'var(--radius-pill)',
  border: '1px solid var(--color-cod-gray)',
  textDecoration: 'none',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)',
  letterSpacing: 'var(--letter-spacing-link)',
}
