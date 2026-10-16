import Link from 'next/link'
import { works } from '../data/works'

/* Hands-on creative background — reveal after the marketing case + AI system.
   Uses the strongest existing visual projects. */
const CREATIVE_SLUGS = ['nike-boxing', 'dc-visionnaires', 'john-mayer-tour', 'we-live-outside']

export default function SectionCreative() {
  const projects = CREATIVE_SLUGS
    .map((slug) => works.find((w) => w.slug === slug))
    .filter(Boolean)

  return (
    <section style={{ width: '100%', background: 'var(--paper)' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(56px, 7vw, 112px)',
        paddingBottom: 'var(--section-pad-y)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 4vw, 64px)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 16,
          paddingBottom: 6, borderBottom: '1px solid var(--ink-15)',
        }}>
          <span className="o-label"><span style={{ color: 'var(--orange)' }}>◆</span>&nbsp; Creative Depth</span>
          <span className="o-label o-label--muted">Film · Branded · Directing</span>
        </div>

        <div className="o-creative-head">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 className="o-display" style={{ margin: 0, fontSize: 'var(--size-display-md)', color: 'var(--ink)' }}>
              I still make things.
            </h2>
            <p style={{
              margin: 0, fontSize: 'clamp(16px, 1.4vw, 20px)', fontWeight: 500,
              lineHeight: 1.4, letterSpacing: '-0.01em', color: 'var(--orange)',
            }}>
              It&apos;s why my strategies survive contact with production.
            </p>
          </div>
          <p style={{
            margin: 0, maxWidth: 520,
            fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.6,
            letterSpacing: '-0.01em', color: 'var(--ink-70)',
          }}>
            My background spans film, television, branded content, directing, producing
            and editing. That craft shapes how I lead creative teams, evaluate ideas and
            build campaigns — because I understand what happens between the brief and the
            finished work.
          </p>
        </div>

        <div className="o-creative-grid">
          {projects.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="o-grid-card">
              <div className="o-card">
                <div className="o-card-media" style={{ aspectRatio: '4 / 3' }}>
                  {p.thumbnail && <img src={p.thumbnail} alt={p.title} loading="lazy" />}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span className="o-tag">{p.title}</span>
                <div className="o-meta-row" style={{ borderBottom: 'none', paddingTop: 0 }}>
                  <span>{p.category}</span>
                  <span>{p.year || '—'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div>
          <Link href="/work" className="o-link">Explore Creative Work →</Link>
        </div>
      </div>

      <style>{`
        .o-creative-head {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: clamp(28px, 4vw, 64px);
          align-items: end;
        }
        .o-creative-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(20px, 2vw, 32px);
        }
        .o-grid-card { display: flex; flex-direction: column; gap: 14px; text-decoration: none; color: var(--ink); }
        .o-creative-grid .o-meta-row { border-top: none; }
        @media (max-width: 1024px) {
          .o-creative-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 860px) {
          .o-creative-head { grid-template-columns: 1fr; gap: 20px; align-items: start; }
        }
        @media (max-width: 520px) {
          .o-creative-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
