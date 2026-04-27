const FAQS = [
  {
    q: 'What kinds of projects do you take on?',
    a: 'Lorem ipsum placeholder — describe ideal engagement types, scope ranges, and the kind of partner you work best with.',
  },
  {
    q: 'How do you typically structure engagements?',
    a: 'Lorem ipsum placeholder — outline project-based vs retainer, kickoff process, and typical timeline expectations.',
  },
  {
    q: 'Do you work solo or with a team?',
    a: 'Lorem ipsum placeholder — describe the solo practice and how trusted collaborators are pulled in when scope calls for it.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Lorem ipsum placeholder — give a range from focused sprint to full brand build and how timelines get defined.',
  },
  {
    q: 'How do we get started?',
    a: 'Lorem ipsum placeholder — explain the intake / discovery call flow and what to expect in the first two weeks.',
  },
]

export default function SectionFAQs() {
  return (
    <section id="faqs" className="auvra-section">
      <div className="auvra-section-inner" style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span className="auvra-eyebrow">FAQs</span>
          <h2 className="auvra-h2" style={{ maxWidth: '18ch' }}>
            Common questions, straight answers.
          </h2>
        </div>

        <div style={{ borderTop: '1px solid var(--auvra-line)' }}>
          {FAQS.map((faq) => (
            <details key={faq.q} className="auvra-faq" style={{
              borderBottom: '1px solid var(--auvra-line)',
              padding: '24px 0',
            }}>
              <summary style={{
                listStyle: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
                fontFamily: 'var(--auvra-display)',
                fontSize: 'clamp(18px, 2vw, 22px)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--auvra-fg)',
              }}>
                <span>{faq.q}</span>
                <span className="auvra-faq-toggle" style={{ color: 'var(--auvra-muted)', fontSize: 22, lineHeight: 1, transition: 'transform 200ms ease' }}>+</span>
              </summary>
              <p className="auvra-body auvra-muted" style={{ margin: '14px 0 4px 0', maxWidth: 720 }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      <style>{`
        .auvra-faq[open] .auvra-faq-toggle { transform: rotate(45deg); }
        .auvra-faq summary::-webkit-details-marker { display: none; }
      `}</style>
    </section>
  )
}
