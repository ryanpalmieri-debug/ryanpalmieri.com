import Link from 'next/link'

export default function SectionIntro() {
  return (
    <section style={{ width: '100%', background: 'var(--paper)' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(48px, 6vw, 88px)',
        paddingBottom: 'clamp(48px, 6vw, 88px)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3vw, 44px)',
      }}>
        {/* Supporting statement — important, subordinate to H1 */}
        <p className="o-intro-lead" style={{
          margin: 0, maxWidth: '16em',
          fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'none',
          fontSize: 'clamp(24px, 3vw, 46px)', lineHeight: 1.04, letterSpacing: '-0.02em',
          color: 'var(--ink)',
        }}>
          I build brands for products people don&apos;t have language for yet.
        </p>

        <div className="o-intro-grid">
          <p style={{
            margin: 0, maxWidth: 560,
            fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.6,
            letterSpacing: '-0.01em', color: 'var(--ink-70)',
          }}>
            I combine positioning, go-to-market, creative direction and AI-native
            marketing systems to turn complex products into brands people
            understand, trust and want.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
            <span className="o-label o-label--muted" style={{ lineHeight: 1.8 }}>
              Brand Strategy · Go-to-Market · Creative Direction · AI Systems
            </span>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              <Link href="/work" className="o-link">View Selected Work →</Link>
              <Link href="/about" className="o-link">About Ryan →</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .o-intro-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: clamp(28px, 4vw, 72px);
          align-items: end;
          padding-top: 24px;
          border-top: 1px solid var(--ink-15);
        }
        @media (max-width: 860px) {
          .o-intro-grid { grid-template-columns: 1fr; gap: 28px; align-items: start; }
        }
      `}</style>
    </section>
  )
}
