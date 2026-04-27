const STEPS = [
  { num: '01', title: 'Discovery',  body: 'Understand the product, audience, and constraints. Find the angle that makes the story feel inevitable.' },
  { num: '02', title: 'Ideation',   body: 'Shape narrative, brand strategy, and creative direction before execution. Strategy first, always.' },
  { num: '03', title: 'Production', body: 'Brand systems, campaigns, content, and AI workflows — designed and built with precision.' },
  { num: '04', title: 'Launch',     body: 'Polished delivery, ongoing iteration, and operational support. The work doesn\'t stop at ship.' },
]

export default function SectionProcess() {
  return (
    <section id="process" className="auvra-section">
      <div className="auvra-section-inner" style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span className="auvra-eyebrow">My Process</span>
          <h2 className="auvra-h2" style={{ maxWidth: '20ch' }}>
            Simple, purposeful, adaptable.
          </h2>
        </div>

        <div className="auvra-process-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(24px, 3vw, 48px)',
          borderTop: '1px solid var(--auvra-line)',
          paddingTop: 32,
        }}>
          {STEPS.map((s) => (
            <div key={s.num} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{
                fontFamily: 'var(--auvra-display)', fontSize: 14, fontWeight: 500,
                letterSpacing: '0.02em', color: 'var(--auvra-muted)',
              }}>{s.num}</span>
              <h3 className="auvra-h3">{s.title}</h3>
              <p className="auvra-body auvra-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .auvra-process-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .auvra-process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
