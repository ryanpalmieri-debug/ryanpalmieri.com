const STEPS = [
  { id: '1', title: 'Discover', body: 'I start by understanding the product, audience, and core constraints — finding the angle that makes complex tech feel inevitable.' },
  { id: '2', title: 'Define',   body: 'I shape a clear narrative, brand strategy, and direction before execution. Strategy first. Always.' },
  { id: '3', title: 'Design',   body: 'Brand systems, campaign creative, content pipelines, and AI workflows — designed and built with precision.' },
  { id: '4', title: 'Deliver',  body: 'Polished assets, ongoing iteration, and operational support. The work doesn\'t stop at launch.' },
]

export default function SectionProcess() {
  return (
    <section style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: '100%', maxWidth: 'var(--container-max-width)',
        padding: '120px var(--container-padding-x)',
        display: 'flex', flexDirection: 'column', gap: 56,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
          <span style={labelStyle}>/Process</span>
          <span style={mutedLabelStyle}>(04)</span>
        </div>

        <h2 style={h2Style}>
          A process that&apos;s simple, purposeful, and adaptable.
        </h2>

        <div style={{ borderTop: '1px solid var(--color-silver)' }}>
          {STEPS.map((step) => (
            <div key={step.id} className="kanso-process-row" style={{
              display: 'grid', gridTemplateColumns: '120px 1fr 2fr', gap: 24,
              padding: '28px 0',
              borderBottom: '1px solid var(--color-silver)',
              alignItems: 'start',
            }}>
              <span style={{ fontSize: 40, fontWeight: 'var(--font-weight-medium)', lineHeight: 1, letterSpacing: '-1px', color: 'var(--color-silver-chalice)' }}>
                {step.id}
              </span>
              <h3 style={{ margin: 0, fontSize: 36, fontWeight: 'var(--font-weight-semibold)', lineHeight: 1.1, letterSpacing: '-1px', color: 'var(--color-cod-gray)' }}>
                {step.title}
              </h3>
              <p style={{
                margin: 0, maxWidth: 620,
                fontSize: 24, fontWeight: 'var(--font-weight-medium)',
                lineHeight: 1.35, letterSpacing: '-0.6px',
                color: 'var(--color-tundora)',
              }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .kanso-process-row { grid-template-columns: 1fr !important; gap: 12px !important; }
          .kanso-process-row h3 { font-size: 28px !important; }
          .kanso-process-row p { font-size: 16px !important; }
          .kanso-process-row > span:first-child { font-size: 28px !important; }
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
