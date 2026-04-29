import Link from 'next/link'

function ArrowIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
        <span style={{ fontSize: 'var(--font-size-h3)', fontWeight: 'var(--font-weight-semibold)', lineHeight: 'var(--line-height-h3)', letterSpacing: 'var(--letter-spacing-h3)', color: 'var(--color-cod-gray)' }}>
          {title}
        </span>
        <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--line-height-sm)', letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-tundora)' }}>
          {description}
        </span>
      </div>
    </Link>
  )
}

export default function SectionProjects({ works = [] }) {
  // Show first 6 in a 3x2 grid
  const displayed = works.slice(0, 6)

  return (
    <section style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: '100%',
        maxWidth: 'var(--container-max-width)',
        padding: '120px var(--container-padding-x)',
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
          width: '100%',
        }}>
          <span className="kanso-label" style={{ alignSelf: 'flex-end' }}>/Selected Work</span>
          <Link href="/work" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            backgroundColor: 'var(--color-gallery)',
            borderRadius: 'var(--radius-pill)',
            /* 15% bigger button — was 8/20px, now ~11/26px text 16px */
            padding: '11px 26px',
            textDecoration: 'none',
            fontSize: 16,
            fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-link)',
            color: 'var(--color-cod-gray)',
          }}>
            View all work <ArrowIcon size={16} />
          </Link>
        </div>

        <div className="kanso-projects-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          width: '100%',
        }}>
          {displayed.map((p) => (
            <ProjectCard
              key={p._id || p.slug}
              title={p.title || p.client || 'Project'}
              description={p.category || p.client || ''}
              img={p.thumbnail}
              href={`/work/${p.slug}`}
            />
          ))}
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .kanso-projects-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 640px) {
            .kanso-projects-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
