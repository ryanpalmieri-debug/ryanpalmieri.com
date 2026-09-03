/**
 * LogoBar — full-width client logo marquee on a black band.
 * Drop new logos into /public/logos/ and add the filename to LOGO_FILES.
 */

const LOGO_FILES = [
  'sony.png', 'nike.png', 'okx.png', 'ens.png', 'fc.png', 'io.png',
  'evm.png', 'linea.png', 'PL.png', 'DS.png', 'XO.png', 'gen.png',
  'gaia.png', 'intuition.png', 'recall.png', 'kettle.png', 'FXPX.png',
  'syn.png', 'moonpay.png', '9dcc.png',
]

const LOGO_HEIGHT = 46

export default function LogoBar() {
  const logos = [...LOGO_FILES, ...LOGO_FILES]

  return (
    <section style={{ width: '100%', background: 'var(--black)', color: 'var(--paper-on-black)' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(56px, 6vw, 104px)',
        paddingBottom: 'clamp(56px, 6vw, 104px)',
        display: 'flex', flexDirection: 'column', gap: 44,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 16,
          paddingBottom: 6, borderBottom: '1px solid var(--paper-on-black-15)',
        }}>
          <span className="o-label o-label--paper"><span style={{ color: 'var(--orange)' }}>◆</span>&nbsp; Previous Clients</span>
          <span className="o-label o-label--paper-muted">2009 — Present</span>
        </div>

        <div style={{
          width: '100%', overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}>
          <div className="o-marquee" style={{
            display: 'flex', alignItems: 'center', gap: 84,
            whiteSpace: 'nowrap', width: 'max-content',
          }}>
            {logos.map((file, i) => (
              <div key={i} aria-hidden="true" style={{
                height: LOGO_HEIGHT, display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <img src={`/logos/${file}`} alt="" style={{
                  height: LOGO_HEIGHT, width: 'auto', objectFit: 'contain', display: 'block',
                  filter: 'grayscale(100%) brightness(0) invert(1)', opacity: 0.85,
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
