import WorkRow from '../../components/WorkRow'
import FadeIn from '../../components/FadeIn'
import { works as staticWorks } from '../../data/works'
import { client } from '../../lib/sanity/client'
import { worksQuery } from '../../lib/sanity/queries'

export const revalidate = 10
export const metadata = { title: 'Work — Ryan Palmieri', description: 'Selected case studies across brand, campaign, film, and AI.' }

async function getWorks() {
  try {
    const data = await client.fetch(worksQuery)
    return data?.length > 0 ? data : staticWorks
  } catch { return staticWorks }
}

export default async function WorkPage() {
  const allWorks = await getWorks()

  return (
    <main>
      <div className="content page-header">
        <FadeIn><h1 className="page-title">Work</h1></FadeIn>
      </div>
      <section className="content">
        {allWorks.map((w, i) => (
          <FadeIn key={w._id || w.slug} delay={i * 50}>
            <WorkRow
              num={String(i + 1).padStart(2, '0')}
              title={w.title}
              client={w.client}
              slug={w.slug}
              thumbnail={w.thumbnail}
            />
          </FadeIn>
        ))}
      </section>
    </main>
  )
}
