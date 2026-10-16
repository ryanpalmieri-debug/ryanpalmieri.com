const STEPS = [
  { id: '01', title: 'Discover', body: 'I start by understanding the product, audience, and core constraints — finding the angle that makes complex tech feel inevitable.' },
  { id: '02', title: 'Define',   body: 'I shape a clear narrative, brand strategy, and direction before execution. Strategy first. Always.' },
  { id: '03', title: 'Design',   body: 'Brand systems, campaign creative, content pipelines, and AI workflows — designed and built with precision.' },
  { id: '04', title: 'Deliver',  body: 'Polished assets, ongoing iteration, and operational support. The work doesn\'t stop at launch.' },
]

export default function SectionProcess() {
  return (
    <section style={{ width: '100%', background: 'var(--green)', color: 'var(--paper-on-black)' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(56px, 7vw, 112px)',
        paddingBottom: 'clamp(56px, 7vw, 112px)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 4vw, 56px)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 16,
          paddingBottom: 6, borderBottom: '1px solid var(--paper-on-black-15)',
        }}>
          <span className="o-label o-label--paper">◆&nbsp; Process</span>
          <span className="o-label o-label--paper-muted">How I work</span>
        </div>

        <h2 className="o-display" style={{
          margin: 0, maxWidth: '15em',
          fontSize: 'var(--size-display-md)', color: 'var(--paper-on-black)',
        }}>
          A process that&apos;s simple, purposeful, and adaptable.
        </h2>

        <div>
          {STEPS.map((step) => (
            <div key={step.id} className="o-process-row">
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--paper-on-black-60)' }}>({step.id})</span>
              <h3 className="o-display" style={{ margin: 0, fontSize: 'clamp(24px, 2.6vw, 40px)', color: 'var(--paper-on-black)' }}>{step.title}</h3>
              <p style={{ margin: 0, maxWidth: 560, fontSize: 15, lineHeight: 1.6, letterSpacing: '-0.01em', color: 'var(--paper-on-black-60)' }}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .o-process-row {
          display: grid;
          grid-template-columns: 70px 1fr 2fr;
          gap: 24px;
          padding: 26px 0;
          border-top: 1px solid var(--paper-on-black-15);
          align-items: baseline;
        }
        .o-process-row:last-child { border-bottom: 1px solid var(--paper-on-black-15); }
        @media (max-width: 860px) {
          .o-process-row { grid-template-columns: 1fr; gap: 10px; }
        }
      `}</style>
    </section>
  )
}
