/**
 * LogoBar — full-width marquee that scrolls all client logos under the hero.
 * Drop new logos into /public/logos/ and add the filename to LOGO_FILES.
 */

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
  'logo-07.png',
  'logo-12.png',
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

export default function LogoBar() {
  const logos = [...LOGO_FILES, ...LOGO_FILES] // duplicate for seamless loop

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
        <span style={{
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: 'var(--letter-spacing-sm)',
          color: 'var(--color-cod-gray)',
        }}>
          /Previous Clients
        </span>

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
              <img
                key={i}
                src={`/logos/${file}`}
                alt=""
                aria-hidden="true"
                style={{
                  height: 36,
                  width: 'auto',
                  objectFit: 'contain',
                  flexShrink: 0,
                  filter: 'grayscale(100%)',
                  opacity: 0.75,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
