import Link from 'next/link'

export function WorkCard({ work, index }) {
  return (
    <Link href={`/work/${work.slug}`} className="o-work-card">
      <div className="o-work-media" style={{ width: '100%', aspectRatio: '4 / 3' }}>
        {work.thumbnail && (
          <img src={work.thumbnail} alt={work.title} loading="lazy" />
        )}
      </div>
      <div className="o-work-card-meta">
        <span className="o-work-card-index">({String(index + 1).padStart(2, '0')})</span>
        <div className="o-work-card-text">
          <span className="o-work-card-title o-display">{work.title || work.client || 'Project'}</span>
          <span className="o-label o-label--muted">{work.category || work.client || ''}</span>
        </div>
        <span className="o-work-card-arrow" aria-hidden="true">↗</span>
      </div>
    </Link>
  )
}

export default function SectionProjects({ works = [] }) {
  const displayed = works.slice(0, 6)

  return (
    <section style={{ width: '100%' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(56px, 6vw, 96px)',
        paddingBottom: 'var(--section-pad-y)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(36px, 4vw, 64px)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: 24, paddingTop: 20, borderTop: '1px solid var(--color-ink-12)',
        }}>
          <span className="o-label"><sup style={{ color: 'var(--color-ink-50)', marginRight: 4 }}>(02)</sup> Selected Work</span>
          <Link href="/work" className="o-link">All Work →</Link>
        </div>

        <div className="o-work-grid">
          {displayed.map((p, i) => (
            <WorkCard key={p._id || p.slug} work={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
