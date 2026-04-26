function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2V12M2 7H12" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function SectionContact() {
  return (
    <section id="contact" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: '100%', maxWidth: 'var(--container-max-width)',
        padding: '120px var(--container-padding-x)',
        display: 'flex', flexDirection: 'column', gap: 48,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={labelStyle}>/Contact</span>
          <span style={mutedLabelStyle}>(06)</span>
        </div>

        <h2 style={h2Style}>
          Let&apos;s build something worth remembering.
        </h2>

        <div className="kanso-contact-row" style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 32,
          alignItems: 'end',
          paddingTop: 24,
          borderTop: '1px solid var(--color-silver)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-gray)' }}>
              Email
            </span>
            <a href="mailto:ryanpalmieri@gmail.com" style={{
              fontSize: 32, fontWeight: 'var(--font-weight-medium)',
              letterSpacing: '-0.72px', color: 'var(--color-cod-gray)',
              textDecoration: 'none',
            }}>ryanpalmieri@gmail.com</a>
          </div>
          <a href="mailto:ryanpalmieri@gmail.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            backgroundColor: 'var(--color-cod-gray)',
            borderRadius: 'var(--radius-pill)',
            padding: '12px 22px', textDecoration: 'none',
            fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-link)', color: 'var(--color-white)',
          }}>
            Get in touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2V12M2 7H12" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .kanso-contact-row { grid-template-columns: 1fr !important; }
            .kanso-contact-row a:first-of-type { font-size: 22px !important; }
          }
        `}</style>
      </div>
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
