const STEPS = [
  { id: '01', title: 'Discover', body: 'I start by understanding the product, audience, and core constraints — finding the angle that makes complex tech feel inevitable.' },
  { id: '02', title: 'Define',   body: 'I shape a clear narrative, brand strategy, and direction before execution. Strategy first. Always.' },
  { id: '03', title: 'Design',   body: 'Brand systems, campaign creative, content pipelines, and AI workflows — designed and built with precision.' },
  { id: '04', title: 'Deliver',  body: 'Polished assets, ongoing iteration, and operational support. The work doesn\'t stop at launch.' },
]

export default function SectionProcess() {
  return (
    <section style={{ width: '100%' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(56px, 6vw, 96px)',
        paddingBottom: 'var(--section-pad-y)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 4vw, 64px)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 16,
          paddingTop: 20, borderTop: '1px solid var(--color-ink-12)',
        }}>
          <span className="o-label"><sup style={{ color: 'var(--color-ink-50)', marginRight: 4 }}>(03)</sup> Process</span>
          <span className="o-label o-label--muted">How I work</span>
        </div>

        <h2 className="o-display" style={{
          margin: 0, maxWidth: '16em',
          fontSize: 'var(--size-display-md)',
          lineHeight: 1.08,
        }}>
          A process that&apos;s simple, purposeful, and adaptable.
        </h2>

        <div>
          {STEPS.map((step) => (
            <div key={step.id} className="o-process-row">
              <span className="o-label o-label--muted">({step.id})</span>
              <h3 className="o-display" style={{ margin: 0, fontSize: 'clamp(24px, 2.4vw, 40px)', lineHeight: 1 }}>
                {step.title}
              </h3>
              <p style={{
                margin: 0, maxWidth: 560,
                fontSize: 16, fontWeight: 400,
                lineHeight: 1.6, letterSpacing: '-0.01em',
                color: 'var(--color-ink-70)',
              }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .o-process-row {
          display: grid;
          grid-template-columns: 100px 1fr 2fr;
          gap: 24px;
          padding: 28px 0;
          border-top: 1px solid var(--color-ink-12);
          align-items: start;
        }
        .o-process-row:last-child {
          border-bottom: 1px solid var(--color-ink-12);
        }
        @media (max-width: 900px) {
          .o-process-row { grid-template-columns: 1fr; gap: 12px; }
        }
      `}</style>
    </section>
  )
}
