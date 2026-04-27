import Link from 'next/link'

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProjectCard({ title, year, description, img, href = '#' }) {
  return (
    <Link href={href} className="auvra-project-card" style={{
      display: 'flex', flexDirection: 'column', gap: 14,
      textDecoration: 'none', color: 'var(--auvra-fg)',
    }}>
      <div style={{
        width: '100%', aspectRatio: '4 / 3',
        background: 'var(--auvra-line)', overflow: 'hidden',
      }}>
        {img && (
          <img
            src={img}
            alt={title}
            className="auvra-project-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 600ms ease' }}
          />
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline' }}>
        <span className="auvra-h3" style={{ fontSize: 20, fontWeight: 600 }}>{title}</span>
        <span style={{ fontFamily: 'var(--auvra-display)', fontSize: 13, color: 'var(--auvra-muted)', whiteSpace: 'nowrap' }}>{year}</span>
      </div>
      {description && (
        <span style={{ fontFamily: 'var(--auvra-display)', fontSize: 14, color: 'var(--auvra-muted)' }}>{description}</span>
      )}
      <style>{`
        .auvra-project-card:hover .auvra-project-img { transform: scale(1.02); }
      `}</style>
    </Link>
  )
}

export default function SectionProjects({ works = [] }) {
  const displayed = works.slice(0, 9)

  return (
    <section id="projects" className="auvra-section" style={{ scrollMarginTop: 'var(--nav-h)' }}>
      <div className="auvra-section-inner" style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <span className="auvra-eyebrow">Selected Projects</span>
            <h2 className="auvra-h2" style={{ maxWidth: '16ch' }}>Recent work, end&nbsp;to&nbsp;end.</h2>
          </div>
        </div>

        <div className="auvra-projects-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(24px, 3vw, 40px)', width: '100%',
        }}>
          {displayed.map((p) => (
            <ProjectCard
              key={p._id || p.slug}
              title={p.title || p.client || 'Project'}
              year={p.year || ''}
              description={p.category || p.client || ''}
              img={p.thumbnail}
              href={`/work/${p.slug}`}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          <Link href="/work" className="auvra-pill">
            View all work <Arrow />
          </Link>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .auvra-projects-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 640px) {
            .auvra-projects-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
