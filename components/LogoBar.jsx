/**
 * LogoBar — full-width marquee that scrolls client logos under the hero.
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

const LOGO_HEIGHT = 40 // visual height all logos conform to

export default function LogoBar() {
  const logos = [...LOGO_FILES, ...LOGO_FILES]

  return (
    <section style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: 64 }}>
      <div style={{
        width: '100%',
        maxWidth: 'var(--container-max-width)',
        padding: '0 var(--container-padding-x)',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}>
        <span className="kanso-label">/Previous Clients</span>

        <div style={{
          width: '100%',
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}>
          <div className="kanso-marquee" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 56,
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
                    filter: 'grayscale(100%)',
                    opacity: 0.75,
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
