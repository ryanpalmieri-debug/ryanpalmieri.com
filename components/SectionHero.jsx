const DESCRIPTORS = ['Brand', 'Marketing', 'Creative', 'Strategy', 'Agentic Systems']

export default function SectionHero() {

  return (
    <section style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 56,        // raised — was 140
      paddingBottom: 80,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 'var(--container-max-width)',
        padding: '0 var(--container-padding-x)',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}>
        {/* Headline row */}
        <div className="kanso-hero-row">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: '1 1 auto', minWidth: 0 }}>
            <h1 style={{
              margin: 0,
              fontSize: 'var(--font-size-h1)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: 1,
              letterSpacing: 'var(--letter-spacing-h1)',
              color: 'var(--color-cod-gray)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.18em',
            }}>
              <span>ryan palmieri</span>
              <span aria-hidden="true" className="kanso-blink" style={{
                display: 'inline-block',
                width: '0.45em',
                height: '0.65em',
                background: 'var(--color-black)',
                flexShrink: 0,
              }} />
            </h1>
            <h2 style={{
              margin: 0,
              fontSize: 'clamp(20px, 2vw, 28px)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 1.3,
              letterSpacing: '-0.6px',
              color: 'var(--color-tundora)',
            }}>
              I build brands for the machine age.
            </h2>
          </div>

          <div className="kanso-hero-descriptors" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            flexShrink: 0,
          }}>
            {DESCRIPTORS.map((word) => (
              <a
                key={word}
                href="mailto:ryanpalmieri@gmail.com"
                style={{
                  /* 10% smaller than --font-size-body (32px → 29px) */
                  fontSize: 29,
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 1.5,
                  letterSpacing: 'var(--letter-spacing-body)',
                  color: 'var(--color-boulder)',
                  whiteSpace: 'nowrap',
                  textAlign: 'right',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'color 200ms',
                }}
                className="kanso-descriptor"
              >{word}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .kanso-hero-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          width: 100%;
        }
        .kanso-descriptor:hover {
          color: var(--color-cod-gray) !important;
        }
        @keyframes kanso-blink {
          0%, 50%   { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        .kanso-blink {
          animation: kanso-blink 1.1s steps(2) infinite;
        }
        @media (max-width: 900px) {
          .kanso-hero-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 32px;
          }
          .kanso-hero-descriptors {
            align-items: flex-start !important;
          }
          .kanso-hero-descriptors a {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  )
}
