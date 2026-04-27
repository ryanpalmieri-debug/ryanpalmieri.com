export default function SectionContact() {
  return (
    <section id="contact" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: '100%', maxWidth: 'var(--container-max-width)',
        padding: '120px var(--container-padding-x)',
        display: 'flex', flexDirection: 'column', gap: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span style={labelStyle}>/Contact</span>
        </div>

        {/* Headline + CTA on the same row */}
        <div className="kanso-contact-head">
          <h2 style={h2Style}>
            Let&apos;s build something worth remembering.
          </h2>
          <a href="mailto:ryanpalmieri@gmail.com" className="kanso-contact-cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            backgroundColor: 'var(--color-cod-gray)',
            borderRadius: 'var(--radius-pill)',
            padding: '14px 24px', textDecoration: 'none',
            fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-link)', color: 'var(--color-white)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            Get in touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2V12M2 7H12" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .kanso-contact-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--color-silver);
        }
        @media (max-width: 768px) {
          .kanso-contact-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }
        }
      `}</style>
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
