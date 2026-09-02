import { works as staticWorks } from '../../data/works'
import { client } from '../../lib/sanity/client'
import { worksQuery } from '../../lib/sanity/queries'
import { WorkCard } from '../../components/SectionProjects'
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

export default async function WorkPage() {
  const works = await getWorks()
  return (
    <main style={{ width: '100%', backgroundColor: 'var(--color-white)' }}>
      <section style={{ width: '100%' }}>
        <div className="o-container" style={{
          paddingTop: 'clamp(48px, 6vw, 96px)',
          paddingBottom: 'var(--section-pad-y)',
          display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 5vw, 72px)',
        }}>
          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3vw, 48px)' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', gap: 16,
                paddingTop: 20, borderTop: '1px solid var(--color-black)',
              }}>
                <span className="o-label"><sup style={{ color: 'var(--color-ink-50)', marginRight: 4 }}>(01)</sup> All Work</span>
                <span className="o-label o-label--muted">{works.length} Projects</span>
              </div>
              <h1 className="o-display" style={{ margin: 0, fontSize: 'var(--size-display-lg)' }}>
                Selected work<br />&amp; case studies
              </h1>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="o-work-grid">
              {works.map((w, i) => <WorkCard key={w._id || w.slug} work={w} index={i} />)}
            </div>
          </FadeIn>
        </div>
      </section>
      <SectionContact />
    </main>
  )
}
