/**
 * SectionHero — large name + descriptor stack + logo ticker.
 * The name uses a black square accent block after the wordmark.
 * Logo ticker uses CSS marquee (kanso-marquee class) with edge mask.
 *
 * IMPORTANT: replace LOGOS with locally-hosted logo files.
 * Until then, text fallbacks render in place of logos.
 */

const DESCRIPTORS = ['Brand', 'Marketing', 'Creative', 'Strategy', 'Agentic Systems']

const LOGOS = [
  { label: 'Samsung' },
  { label: 'Nike' },
  { label: 'DC Comics' },
  { label: 'Warner Bros' },
  { label: 'Gaia' },
  { label: 'Sony Music' },
  { label: '4K Protocol' },
  { label: 'RadicalMedia' },
]

export default function SectionHero() {
  return (
    <section style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 140,
      paddingBottom: 80,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 'var(--container-max-width)',
        padding: '0 var(--container-padding-x)',
        display: 'flex',
        flexDirection: 'column',
        gap: 80,
      }}>
        {/* Headline row */}
        <div className="kanso-hero-row">
          <h1 style={{
            margin: 0,
            fontSize: 'var(--font-size-h1)',
            fontWeight: 'var(--font-weight-semibold)',
            lineHeight: '1',
            letterSpacing: 'var(--letter-spacing-h1)',
            color: 'var(--color-cod-gray)',
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.18em',
            flex: '1 1 auto',
            minWidth: 0,
          }}>
            <span>ryan palmieri</span>
            <span aria-hidden="true" style={{
              display: 'inline-block',
              width: '0.45em',
              height: '0.65em',
              background: 'var(--color-black)',
              flexShrink: 0,
            }} />
          </h1>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 0,
            flexShrink: 0,
          }}>
            {DESCRIPTORS.map((word) => (
              <p key={word} style={{
                margin: 0,
                fontSize: 'var(--font-size-body)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: 1.5,
                letterSpacing: 'var(--letter-spacing-body)',
                color: 'var(--color-boulder)',
                whiteSpace: 'nowrap',
                textAlign: 'right',
              }}>{word}</p>
            ))}
          </div>
        </div>

        {/* Logo ticker */}
        <div style={{
          width: '100%',
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}>
          <div className="kanso-marquee" style={{ display: 'flex', gap: 64, whiteSpace: 'nowrap', width: 'max-content' }}>
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span key={i} style={{
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '-0.4px',
                color: 'var(--color-tundora)',
                flexShrink: 0,
              }}>{logo.label}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .kanso-hero-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          width: 100%;
        }
        @media (max-width: 900px) {
          .kanso-hero-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 32px;
          }
          .kanso-hero-row > div {
            align-items: flex-start !important;
          }
          .kanso-hero-row p {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  )
}
