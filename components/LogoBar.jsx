const LOGO_FILES = [
  'logo-bw-03.png',
  'logo-bw-04.png',
  'logo-bw-05.png',
  'logo-bw-06.png',
  'logo-bw-07.png',
  'logo-bw-08.png',
  'logo-bw-09.png',
  'logo-bw-11.png',
  'logo-bw-12.png',
  'logo-01.png',
  'devspot.png',
  'OKX.png',
  'protocollabs.png',
  'ens.png',
  'fc.png',
  'ionet.png',
  'EVM_v1.png',
  'mp.png',
  'xologo.png',
]

const LOGO_HEIGHT = 32

export default function LogoBar() {
  const logos = [...LOGO_FILES, ...LOGO_FILES]

  return (
    <section className="auvra-section">
      <div className="auvra-section-inner" style={{
        paddingTop: 'clamp(48px, 6vw, 80px)',
        paddingBottom: 'clamp(48px, 6vw, 80px)',
        display: 'flex', flexDirection: 'column', gap: 32,
        borderTop: '1px solid var(--auvra-line)',
        borderBottom: '1px solid var(--auvra-line)',
      }}>
        <span className="auvra-eyebrow">Selected Clients</span>

        <div style={{
          width: '100%',
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}>
          <div className="kanso-marquee" style={{
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
                    filter: 'grayscale(100%)',
                    opacity: 0.65,
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
