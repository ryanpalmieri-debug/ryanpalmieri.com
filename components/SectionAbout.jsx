const STATS = [
  '15+ Years experience',
  '50+ Brands launched',
  '700K+ Active users scaled',
  'Frontier tech focus',
]

export default function SectionAbout() {
  return (
    <section id="about" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: '100%',
        maxWidth: 'var(--container-max-width)',
        padding: '120px var(--container-padding-x)',
        display: 'flex', flexDirection: 'column', gap: 48,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
          <span style={labelStyle}>/About</span>
          <span style={mutedLabelStyle}>(02)</span>
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
              I&apos;m a senior marketing leader building brands at the intersection of culture, technology, and AI.
            </h2>

            <div className="kanso-about-row" style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {STATS.map((item) => (
                  <span key={item} style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    lineHeight: 'var(--line-height-sm)',
                    letterSpacing: 'var(--letter-spacing-sm)',
                    color: 'var(--color-tundora)',
                    whiteSpace: 'nowrap',
                  }}>/ {item}</span>
                ))}
              </div>
              <p style={{
                margin: 0, maxWidth: 420, textAlign: 'right',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: 'var(--line-height-sm)',
                letterSpacing: 'var(--letter-spacing-sm)',
                color: 'var(--color-tundora)',
              }}>
                I help frontier tech companies turn complex systems into brands that connect, differentiate, and drive growth.
              </p>
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
          .kanso-about-row p { text-align: left !important; }
        }
      `}</style>
    </section>
  )
}

const labelStyle = { fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-cod-gray)' }
const mutedLabelStyle = { ...labelStyle, color: 'var(--color-gray)' }
const h2Style = {
  margin: 0, maxWidth: 980,
  fontSize: 'var(--font-size-h2)',
  fontWeight: 'var(--font-weight-medium)',
  lineHeight: 'var(--line-height-h2)',
  letterSpacing: 'var(--letter-spacing-h2)',
  color: 'var(--color-cod-gray)',
}
