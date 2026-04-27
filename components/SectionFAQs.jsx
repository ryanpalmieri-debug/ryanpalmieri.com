const FAQS = [
  { q: 'What kinds of projects do you take on?', a: 'I work with founders and product teams on brand strategy, creative direction, content systems, and AI agents. Project scope ranges from focused engagements to full launches.' },
  { q: 'How do you typically structure engagements?', a: 'Project-based scopes or monthly retainers. We start with a discovery call to align on goals, scope, and timeline before any commitment.' },
  { q: 'Do you work solo or with a team?', a: 'I work as a solo practitioner and pull in trusted collaborators (designers, directors, engineers) when a project calls for it.' },
  { q: 'How long does a typical project take?', a: 'Anywhere from 2 weeks for a focused sprint to 3+ months for a full brand build. Timeline is defined together based on scope.' },
]

export default function SectionFAQs() {
  return (
    <section style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: '100%', maxWidth: 'var(--container-max-width)',
        padding: '120px var(--container-padding-x)',
        display: 'flex', flexDirection: 'column', gap: 52,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={labelStyle}>/FAQs</span>
          <span style={mutedLabelStyle}>(05)</span>
        </div>

        <h2 style={h2Style}>Common questions, straight answers.</h2>

        <div style={{ borderTop: '1px solid var(--color-silver)' }}>
          {FAQS.map((faq) => (
            <details key={faq.q} style={{
              borderBottom: '1px solid var(--color-silver)',
              padding: '20px 0',
            }}>
              <summary style={{
                listStyle: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontSize: 'var(--font-size-h3)',
                fontWeight: 'var(--font-weight-semibold)',
                lineHeight: 'var(--line-height-h3)',
                letterSpacing: 'var(--letter-spacing-h3)',
                color: 'var(--color-cod-gray)',
              }}>
                {faq.q}
                <span style={{ color: 'var(--color-gray)', fontSize: 22, lineHeight: 1 }}>+</span>
              </summary>
              <p style={{
                margin: '10px 0 0 0', maxWidth: 980,
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: 1.5,
                letterSpacing: 'var(--letter-spacing-sm)',
                color: 'var(--color-tundora)',
              }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
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
