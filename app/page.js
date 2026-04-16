import { client } from '../lib/sanity/client'
import { worksQuery } from '../lib/sanity/queries'
import { works as staticWorks } from '../data/works'
import { WorkCard } from '../components/WorkCard'
import { AnimateIn } from '../components/AnimateIn'

export const revalidate = 10

async function getWorks() {
  try {
    const data = await client.fetch(worksQuery)
    return data && data.length > 0 ? data : staticWorks
  } catch { return staticWorks }
}

export default async function HomePage() {
  const allWorks = await getWorks()
  const featured = allWorks.filter(w => w.featured).slice(0, 6)
  const displayed = featured.length >= 6 ? featured : allWorks.slice(0, 6)

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div>
          <h1 className="hero__headline">Brand strategist &amp;<br />creative director.</h1>
          <p className="hero__sub">I build brands for the machine age.</p>
        </div>
      </section>

      {/* Work grid */}
      <section className="home-grid">
        <div className="home-grid__header">
          <h2 className="home-grid__label">Selected Work</h2>
          <a href="/work" className="home-grid__viewall">View all &rarr;</a>
        </div>
        <div className="work-grid work-grid--3col">
          {displayed.map((p, i) => (
            <AnimateIn key={p._id || p.slug} delay={i * 80}>
              <WorkCard
                href={`/work/${p.slug}`}
                title={p.title}
                category={p.category}
                thumbnail={p.thumbnail}
              />
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="home-closing">
        <p className="home-closing__line">I build brands</p>
        <p className="home-closing__line home-closing__line--right">for the machine age.</p>
      </section>
    </main>
  )
}
