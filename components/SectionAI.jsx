const AREAS = [
  {
    id: '01',
    title: 'Research & Intelligence',
    body: 'Agent-assisted research, competitive intelligence, synthesis and editorial planning that turn large amounts of information into usable marketing decisions.',
  },
  {
    id: '02',
    title: 'Content Systems',
    body: 'AI-enabled content workflows that turn a strong source idea into coordinated technical writing, demos, social content, video and distribution.',
  },
  {
    id: '03',
    title: 'Creative Technology',
    body: 'AI-assisted concept development, storyboarding, video prototyping, creative experimentation and production workflows that shorten the distance between idea and execution.',
  },
]

export default function SectionAI() {
  return (
    <section style={{ width: '100%', background: 'var(--black)', color: 'var(--paper-on-black)' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(64px, 8vw, 128px)',
        paddingBottom: 'clamp(64px, 8vw, 128px)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 4vw, 64px)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 16,
          paddingBottom: 6, borderBottom: '1px solid var(--paper-on-black-15)',
        }}>
          <span className="o-label o-label--paper"><span style={{ color: 'var(--orange)' }}>◆</span>&nbsp; AI-Native Marketing</span>
          <span className="o-label o-label--paper-muted">An emerging differentiator</span>
        </div>

        <div className="o-ai-head">
          <h2 className="o-display" style={{
            margin: 0, maxWidth: '12em',
            fontSize: 'var(--size-display-md)', color: 'var(--paper-on-black)',
          }}>
            Building the system behind the work.
          </h2>
          <p style={{
            margin: 0, maxWidth: 520,
            fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.6,
            letterSpacing: '-0.01em', color: 'var(--paper-on-black-60)',
          }}>
            The modern marketing team is becoming a system of people, agents and
            workflows. I design and operate AI-enabled systems for research, content,
            creative development and distribution — increasing what small teams can
            accomplish without turning the work into generic AI output.
          </p>
        </div>

        <div>
          {AREAS.map((a) => (
            <div key={a.id} className="o-ai-row">
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--orange)' }}>{a.id}</span>
              <h3 className="o-display" style={{ margin: 0, fontSize: 'clamp(22px, 2.4vw, 36px)', color: 'var(--paper-on-black)' }}>{a.title}</h3>
              <p style={{ margin: 0, maxWidth: 560, fontSize: 15, lineHeight: 1.6, letterSpacing: '-0.01em', color: 'var(--paper-on-black-60)' }}>{a.body}</p>
            </div>
          ))}
        </div>

        <p style={{
          margin: 0, maxWidth: 680,
          fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: 1.6,
          letterSpacing: '-0.01em', color: 'var(--paper-on-black-60)',
        }}>
          I increasingly operate as a creative technologist inside the marketing
          function — designing the workflows, agents and tools behind the work as
          well as the work itself.
        </p>
      </div>

      <style>{`
        .o-ai-head {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: clamp(28px, 4vw, 64px);
          align-items: end;
        }
        .o-ai-row {
          display: grid;
          grid-template-columns: 50px 1fr 2fr;
          gap: 24px;
          padding: 26px 0;
          border-top: 1px solid var(--paper-on-black-15);
          align-items: baseline;
        }
        .o-ai-row:last-child { border-bottom: 1px solid var(--paper-on-black-15); }
        @media (max-width: 860px) {
          .o-ai-head { grid-template-columns: 1fr; gap: 20px; align-items: start; }
          .o-ai-row { grid-template-columns: 1fr; gap: 10px; }
        }
      `}</style>
    </section>
  )
}
