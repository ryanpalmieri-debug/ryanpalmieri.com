import Link from 'next/link'

/* Large alternating case-study rows: black artboard card + metadata column */
export function WorkRow({ work, index, flip }) {
  const disciplines = (work.category || '').split(/[,/&]+/).map(s => s.trim()).filter(Boolean)
  return (
    <Link href={`/work/${work.slug}`} className={`o-work-row${flip ? ' o-work-row--flip' : ''}`}>
      <div className="o-card">
        <div className="o-card-media" style={{ aspectRatio: '4 / 3' }}>
          {work.thumbnail && <img src={work.thumbnail} alt={work.title} loading="lazy" />}
        </div>
      </div>

      <div className="o-work-meta">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="o-tag">{work.title || work.client}</span>
          {work.summary && (
            <p style={{
              margin: 0, maxWidth: 420,
              fontSize: 15, lineHeight: 1.5, letterSpacing: '-0.01em',
              color: 'var(--ink-70)',
            }}>{work.summary}</p>
          )}
        </div>

        <div style={{ marginTop: 24 }}>
          {(disciplines.length ? disciplines : ['Brand & Marketing']).map((d, i) => (
            <div key={d} className="o-meta-row">
              <span>{d}</span>
              {i === 0 && <span>{work.year || '—'}</span>}
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default function SectionProjects({ works = [] }) {
  const displayed = works.slice(0, 5)
  return (
    <section style={{ width: '100%', background: 'var(--paper)' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(48px, 6vw, 96px)',
        paddingBottom: 'var(--section-pad-y)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 5vw, 80px)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: 24, paddingBottom: 6, borderBottom: '1px solid var(--ink-15)',
        }}>
          <span className="o-label"><span style={{ color: 'var(--orange)' }}>◆</span>&nbsp; Selected Work</span>
          <Link href="/work" className="o-link">All Work →</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 6vw, 104px)' }}>
          {displayed.map((p, i) => (
            <WorkRow key={p._id || p.slug} work={p} index={i} flip={i % 2 === 1} />
          ))}
        </div>
      </div>

      <style>{`
        .o-work-row {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: clamp(28px, 4vw, 72px);
          align-items: center;
          text-decoration: none;
          color: var(--ink);
        }
        .o-work-row--flip .o-card { order: 2; }
        .o-work-row--flip .o-work-meta { order: 1; }
        .o-work-meta {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 860px) {
          .o-work-row { grid-template-columns: 1fr; gap: 20px; }
          .o-work-row--flip .o-card { order: 0; }
          .o-work-row--flip .o-work-meta { order: 0; }
        }
      `}</style>
    </section>
  )
}
