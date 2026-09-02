export default function SectionHero() {
  return (
    <section style={{ width: '100%' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(48px, 7vw, 120px)',
        paddingBottom: 'clamp(48px, 6vw, 96px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(40px, 5vw, 72px)',
      }}>
        {/* Meta row */}
        <div className="o-hero-meta">
          <span className="o-label o-label--muted">Ryan Palmieri — Brand &amp; Marketing Leader</span>
          <span className="o-label o-label--muted o-hero-meta-mid">Los Angeles, CA</span>
          <span className="o-label o-label--muted">Available for select work</span>
        </div>

        {/* Headline */}
        <h1 className="o-display" style={{
          margin: 0,
          fontSize: 'var(--size-display-xl)',
          color: 'var(--color-black)',
        }}>
          Brands for the<br />
          machine age<sup style={{ fontSize: '0.32em', fontWeight: 500, verticalAlign: 'super' }}>®</sup>
        </h1>

        {/* Intro + scroll cue */}
        <div className="o-hero-bottom">
          <p style={{
            margin: 0,
            maxWidth: 560,
            fontSize: 'clamp(16px, 1.3vw, 19px)',
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
            color: 'var(--color-ink-70)',
          }}>
            I turn frontier technology — AI infrastructure, Web3, entertainment —
            into brands people understand, trust, and remember. From early-stage
            positioning to enterprise-scale launch.
          </p>
          <span className="o-label o-label--muted" aria-hidden="true">Scroll ↓</span>
        </div>
      </div>

      <style>{`
        .o-hero-meta {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding-top: 20px;
          border-top: 1px solid var(--color-black);
        }
        .o-hero-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 32px;
        }
        @media (max-width: 768px) {
          .o-hero-meta-mid { display: none; }
          .o-hero-bottom span { display: none; }
        }
      `}</style>
    </section>
  )
}
