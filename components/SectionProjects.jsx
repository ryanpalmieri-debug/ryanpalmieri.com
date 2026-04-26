import Link from 'next/link'

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 12L12 2M12 2H5M12 2V9" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProjectCard({ title, year, description, img, href = '#' }) {
  return (
    <Link href={href} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      backgroundColor: 'var(--color-gallery)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      padding: '6px 6px 12px 6px',
      textDecoration: 'none',
    }}>
      <div style={{
        width: '100%',
        aspectRatio: '745 / 559',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        background: '#1a1a1a',
      }}>
        {img && (
          <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--font-size-h3)', fontWeight: 'var(--font-weight-semibold)', lineHeight: 'var(--line-height-h3)', letterSpacing: 'var(--letter-spacing-h3)', color: 'var(--color-cod-gray)' }}>
            {title}
          </span>
          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--line-height-sm)', letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-cod-gray)' }}>
            {year}
          </span>
        </div>
        <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--line-height-sm)', letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-tundora)' }}>
          {description}
        </span>
      </div>
    </Link>
  )
}

export default function SectionProjects({ works = [] }) {
  // Show first 6 projects
  const displayed = works.slice(0, 6)

  return (
    <section style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: '100%',
        maxWidth: 'var(--container-max-width)',
        padding: '120px var(--container-padding-x)',
        display: 'flex',
        flexDirection: 'column',
        gap: 80,
      }}>
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, marginBottom: 16 }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-cod-gray)' }}>
              /Selected Work
            </span>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-gray)' }}>
              (02)
            </span>
          </div>
          <h2 style={{
            margin: 0,
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-h2)',
            letterSpacing: 'var(--letter-spacing-h2)',
            color: 'var(--color-cod-gray)',
            marginBottom: 24,
          }}>
            Selected Work.
          </h2>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/work" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              backgroundColor: 'var(--color-gallery)',
              borderRadius: 'var(--radius-pill)',
              padding: '8px 20px',
              textDecoration: 'none',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: 'var(--letter-spacing-link)',
              color: 'var(--color-cod-gray)',
            }}>
              View all projects <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="kanso-projects-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          width: '100%',
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

        <style>{`
          @media (max-width: 768px) {
            .kanso-projects-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
