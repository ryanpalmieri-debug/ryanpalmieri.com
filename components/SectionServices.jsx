const SERVICES = [
  { title: 'Brand Strategy' },
  { title: 'Go-to-Market' },
  { title: 'Creative Direction' },
  { title: 'AI & Automation' },
]

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2V12M2 7H12" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function SectionServices() {
  return (
    <section id="services" style={{ width: '100%', display: 'flex', justifyContent: 'center', scrollMarginTop: 'var(--nav-h)' }}>
      <div style={{
        width: '100%', maxWidth: 'var(--container-max-width)',
        padding: '80px var(--container-padding-x)',
      }}>
        <div className="kanso-services-card" style={{
          backgroundColor: 'var(--color-cod-gray)',
          borderRadius: 'var(--radius-md)',
          padding: '72px 80px',
          display: 'flex', flexDirection: 'column', gap: 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-white)' }}>
              /Services
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SERVICES.map((s) => (
              <h3 key={s.title} style={{
                margin: 0,
                fontSize: 58,
                fontWeight: 'var(--font-weight-semibold)',
                lineHeight: 1.08,
                letterSpacing: '-1.6px',
                color: 'var(--color-white)',
              }}>
                {s.title}
              </h3>
            ))}
          </div>

          <a href="mailto:ryanpalmieri@gmail.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-pill)',
            padding: '10px 18px', textDecoration: 'none',
            fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-link)', color: 'var(--color-cod-gray)',
          }}>
            Learn more <PlusIcon />
          </a>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .kanso-services-card { padding: 40px 28px !important; }
            .kanso-services-card h3 { font-size: 40px !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
