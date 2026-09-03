import Link from 'next/link'
import { works as staticWorks } from '../../data/works'
import { client } from '../../lib/sanity/client'
import { worksQuery } from '../../lib/sanity/queries'
import SectionContact from '../../components/SectionContact'
import FadeIn from '../../components/FadeIn'

export const revalidate = 10
export const metadata = { title: 'Work — Ryan Palmieri' }

async function getWorks() {
  try {
    const data = await client.fetch(worksQuery)
    return data?.length > 0 ? data : staticWorks
  } catch { return staticWorks }
}

function WorkCard({ work }) {
  return (
    <Link href={`/work/${work.slug}`} className="o-grid-card">
      <div className="o-card">
        <div className="o-card-media" style={{ aspectRatio: '4 / 3' }}>
          {work.thumbnail && <img src={work.thumbnail} alt={work.title} loading="lazy" />}
        </div>
      </div>
      <div className="o-grid-card-meta">
        <span className="o-tag">{work.title || work.client}</span>
        <div className="o-meta-row" style={{ borderBottom: 'none' }}>
          <span>{work.category || work.client || ''}</span>
          <span>{work.year || '—'}</span>
        </div>
      </div>
    </Link>
  )
}

export default async function WorkPage() {
  const works = await getWorks()
  return (
    <main style={{ width: '100%', backgroundColor: 'var(--paper)' }}>
      <section style={{ width: '100%' }}>
        <div className="o-container" style={{
          paddingTop: 'clamp(40px, 5vw, 88px)',
          paddingBottom: 'var(--section-pad-y)',
          display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 4vw, 64px)',
        }}>
          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3vw, 44px)' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', gap: 16,
                paddingBottom: 6, borderBottom: '1px solid var(--ink-15)',
              }}>
                <span className="o-label"><span style={{ color: 'var(--orange)' }}>◆</span>&nbsp; All Work</span>
                <span className="o-label o-label--muted">{works.length} Projects</span>
              </div>
              <h1 className="o-display" style={{ margin: 0, fontSize: 'var(--size-display-lg)' }}>
                Selected work<br />&amp; <span style={{ color: 'var(--orange)' }}>case studies</span>
              </h1>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="o-work-grid">
              {works.map((w) => <WorkCard key={w._id || w.slug} work={w} />)}
            </div>
          </FadeIn>
        </div>
      </section>
      <SectionContact />

      <style>{`
        .o-work-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 3vw, 56px);
          row-gap: clamp(40px, 4vw, 72px);
        }
        .o-grid-card { display: flex; flex-direction: column; gap: 16px; text-decoration: none; color: var(--ink); }
        .o-grid-card-meta { display: flex; flex-direction: column; gap: 12px; }
        @media (max-width: 720px) {
          .o-work-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
