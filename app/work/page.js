import Link from 'next/link'
import { works as staticWorks } from '../../data/works'
import { client } from '../../lib/sanity/client'
import { worksQuery } from '../../lib/sanity/queries'

export const revalidate = 10
export const metadata = { title: 'Work — Ryan Palmieri' }

async function getWorks() {
  try {
    const data = await client.fetch(worksQuery)
    return data?.length > 0 ? data : staticWorks
  } catch { return staticWorks }
}

function ProjectCard({ work }) {
  return (
    <Link href={`/work/${work.slug}`} style={{
      display: 'flex', flexDirection: 'column', gap: 12,
      backgroundColor: 'var(--color-gallery)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      padding: '6px 6px 12px 6px',
      textDecoration: 'none',
    }}>
      <div style={{
        width: '100%', aspectRatio: '745 / 559',
        borderRadius: 'var(--radius-sm)', overflow: 'hidden',
        background: '#1a1a1a',
      }}>
        {work.thumbnail && <img src={work.thumbnail} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 6px' }}>
        <span style={{ fontSize: 'var(--font-size-h3)', fontWeight: 'var(--font-weight-semibold)', letterSpacing: 'var(--letter-spacing-h3)', color: 'var(--color-cod-gray)' }}>{work.title}</span>
        <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-tundora)' }}>
          {work.category || work.client}
        </span>
      </div>
    </Link>
  )
}

export default async function WorkPage() {
  const works = await getWorks()
  return (
    <main style={{ width: '100%', backgroundColor: 'var(--color-white)' }}>
      <section style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%', maxWidth: 'var(--container-max-width)',
          padding: '120px var(--container-padding-x)',
          display: 'flex', flexDirection: 'column', gap: 64,
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-cod-gray)' }}>/All Work</span>
            </div>
          </div>
          <div className="kanso-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, width: '100%' }}>
            {works.map((w) => <ProjectCard key={w._id || w.slug} work={w} />)}
          </div>
          <style>{`
            @media (max-width: 1200px) {
              .kanso-projects-grid { grid-template-columns: repeat(3, 1fr) !important; }
            }
            @media (max-width: 900px) {
              .kanso-projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 600px) {
              .kanso-projects-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>
    </main>
  )
}
