import Link from 'next/link'

const SERVICES = [
  { id: '1', title: 'Brand Strategy' },
  { id: '2', title: 'Go-to-Market' },
  { id: '3', title: 'Creative Direction' },
  { id: '4', title: 'AI & Automation' },
]

function PlusIcon({ stroke = '#0A0A0A' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2V12M2 7H12" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-white)' }}>
              /Services
            </span>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-silver-chalice)' }}>
              (03)
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SERVICES.map((s) => (
                <h3 key={s.id} style={{
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
            <div className="kanso-services-numbers" style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end' }}>
              {SERVICES.map((s) => (
                <span key={s.id} style={{
                  fontSize: 56, fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 1, letterSpacing: '-1px', color: '#5C5C5E',
                }}>{s.id}</span>
              ))}
            </div>
          </div>

          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-pill)',
            padding: '10px 18px', textDecoration: 'none',
            fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-link)', color: 'var(--color-cod-gray)',
          }}>
            Start a project <PlusIcon />
          </Link>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .kanso-services-card { padding: 40px 28px !important; }
            .kanso-services-card h3 { font-size: 40px !important; }
            .kanso-services-numbers span { font-size: 38px !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
