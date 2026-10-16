const AREAS = [
  {
    id: '01',
    title: 'Brand & Positioning',
    items: ['Category strategy', 'Positioning', 'Messaging', 'Narrative', 'Brand architecture'],
  },
  {
    id: '02',
    title: 'Marketing & GTM',
    items: ['Go-to-market', 'Integrated marketing', 'Launch strategy', 'Content strategy', 'Partnerships', 'Community / audience'],
  },
  {
    id: '03',
    title: 'Creative Leadership',
    items: ['Creative direction', 'Campaign development', 'Storytelling', 'Content development', 'Visual direction', 'Production leadership'],
  },
  {
    id: '04',
    title: 'AI-Native Systems',
    items: ['Agent workflows', 'Research systems', 'Content operations', 'Creative technology', 'AI-assisted production', 'Marketing automation'],
  },
]

export default function SectionOperatingRange() {
  return (
    <section style={{ width: '100%', background: 'var(--green)', color: 'var(--paper-on-black)' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(56px, 7vw, 112px)',
        paddingBottom: 'clamp(56px, 7vw, 112px)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 4vw, 64px)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 16,
          paddingBottom: 6, borderBottom: '1px solid var(--paper-on-black-15)',
        }}>
          <span className="o-label o-label--paper">◆&nbsp; Operating Range</span>
          <span className="o-label o-label--paper-muted">Executive scope</span>
        </div>

        <h2 className="o-display" style={{
          margin: 0, maxWidth: '14em',
          fontSize: 'var(--size-display-md)', color: 'var(--paper-on-black)',
        }}>
          From positioning to production.
        </h2>

        <div className="o-range-grid">
          {AREAS.map((a) => (
            <div key={a.id} className="o-range-col">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, paddingBottom: 14, borderBottom: '1px solid var(--paper-on-black-15)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--paper-on-black-60)' }}>{a.id}</span>
                <h3 className="o-display" style={{ margin: 0, fontSize: 'clamp(17px, 1.5vw, 22px)', color: 'var(--paper-on-black)' }}>{a.title}</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, marginTop: 16 }}>
                {a.items.map((it) => (
                  <li key={it} style={{ fontSize: 14, lineHeight: 1.4, letterSpacing: '-0.01em', color: 'var(--paper-on-black-60)' }}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .o-range-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(24px, 3vw, 48px);
        }
        @media (max-width: 900px) {
          .o-range-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 520px) {
          .o-range-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
