/**
 * LogoBar — full-width marquee that scrolls client logos.
 * Drop new logos into /public/logos/ and add the filename to LOGO_FILES.
 *
 * Each logo is wrapped in a fixed-height container so visual size is
 * uniform regardless of the source PNG dimensions.
 */

const LOGO_FILES = [
  'sony.png',
  'nike.png',
  'okx.png',
  'ens.png',
  'fc.png',
  'io.png',
  'evm.png',
  'linea.png',
  'PL.png',
  'DS.png',
  'XO.png',
  'gen.png',
  'gaia.png',
  'intuition.png',
  'recall.png',
  'kettle.png',
  'FXPX.png',
  'syn.png',
  'moonpay.png',
  '9dcc.png',
]

const LOGO_HEIGHT = 34 // visual height all logos conform to

export default function LogoBar() {
  const logos = [...LOGO_FILES, ...LOGO_FILES]

  return (
    <section style={{ width: '100%' }}>
      <div className="o-container" style={{
        paddingTop: 32,
        paddingBottom: 'clamp(48px, 5vw, 80px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingTop: 20, borderTop: '1px solid var(--color-ink-12)' }}>
          <span className="o-label"><sup style={{ color: 'var(--color-ink-50)', marginRight: 4 }}>(01)</sup> Previous Clients</span>
          <span className="o-label o-label--muted">2009 — Present</span>
        </div>

        <div style={{
          width: '100%',
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}>
          <div className="o-marquee" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 64,
            whiteSpace: 'nowrap',
            width: 'max-content',
          }}>
            {logos.map((file, i) => (
              <div
                key={i}
                aria-hidden="true"
                style={{
                  height: LOGO_HEIGHT,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <img
                  src={`/logos/${file}`}
                  alt=""
                  style={{
                    height: LOGO_HEIGHT,
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'grayscale(100%) contrast(1.1)',
                    opacity: 0.85,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
