const STATS = [
  '15+ Years experience',
  '50+ Brands launched',
  '700K+ Active users scaled',
  'Frontier tech focus',
]

export default function SectionAbout() {
  return (
    <section style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: '100%',
        maxWidth: 'var(--container-max-width)',
        padding: '120px var(--container-padding-x)',
        display: 'flex', flexDirection: 'column', gap: 48,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
          <span style={labelStyle}>/About</span>
          <span style={mutedLabelStyle}>(01)</span>
        </div>

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

        <div style={{
          width: '100%',
          aspectRatio: '1520 / 716',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(145deg, #d9d9d9 0%, #bcbcbc 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-white)',
            fontWeight: 'var(--font-weight-semibold)', fontSize: 28, letterSpacing: '-0.56px',
            textShadow: '0 1px 8px rgba(0,0,0,.35)',
          }}>
            Showreel coming soon
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
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
