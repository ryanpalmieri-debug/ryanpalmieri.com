const DISCIPLINES = [
  { num: '01', title: 'Brand Strategy',            body: 'Positioning, narrative, and identity systems for products that need a human story before they can scale.' },
  { num: '02', title: 'GTM & Campaigns',           body: 'Launch plans, integrated campaigns, and partnership marketing — built to move audiences and metrics.' },
  { num: '03', title: 'Content Production',        body: 'Film, photo, and editorial pipelines from concept through delivery, drawn from a decade in commercial production.' },
  { num: '04', title: 'Custom AI Agent Production', body: 'Designing and shipping AI agents that produce, distribute, and evaluate content as part of the team.' },
  { num: '05', title: 'Creative Direction',        body: 'A single point of taste across brand, product, and campaign — keeping the work coherent end to end.' },
]

export default function SectionDisciplines() {
  return (
    <section id="disciplines" className="auvra-section" style={{ scrollMarginTop: 'var(--nav-h)' }}>
      <div className="auvra-section-inner" style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span className="auvra-eyebrow">Disciplines</span>
          <h2 className="auvra-h2" style={{ maxWidth: '20ch' }}>
            A studio of one, working across five disciplines.
          </h2>
        </div>

        <div style={{ borderTop: '1px solid var(--auvra-line)' }}>
          {DISCIPLINES.map((d) => (
            <div
              key={d.num}
              className="auvra-disc-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 2fr',
                gap: 32,
                padding: '32px 0',
                borderBottom: '1px solid var(--auvra-line)',
                alignItems: 'baseline',
              }}
            >
              <span style={{
                fontFamily: 'var(--auvra-display)', fontSize: 14, fontWeight: 500,
                letterSpacing: '0.02em', color: 'var(--auvra-muted)',
              }}>{d.num}</span>
              <h3 className="auvra-h3">{d.title}</h3>
              <p className="auvra-body auvra-muted" style={{ maxWidth: 620 }}>{d.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .auvra-disc-row { grid-template-columns: 1fr !important; gap: 8px !important; padding: 24px 0 !important; }
        }
      `}</style>
    </section>
  )
}
