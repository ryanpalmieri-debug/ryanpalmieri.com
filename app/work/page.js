import { client } from '../../lib/sanity/client'
import { worksQuery } from '../../lib/sanity/queries'
import { works as staticWorks } from '../../data/works'
import { AnimateIn } from '../../components/AnimateIn'

export const revalidate = 10

async function getWorks() {
  try {
    const data = await client.fetch(worksQuery)
    return data && data.length > 0 ? data : staticWorks
  } catch {
    return staticWorks
  }
}

export default async function WorkPage() {
  const allWorks = await getWorks()
  const featured = allWorks.filter(p => p.featured).slice(0, 4)
  const displayFeatured = featured.length >= 4 ? featured : allWorks.slice(0, 4)

  return (
    <main>
      <div className="page-header">
        <h1 className="page-title">Work</h1>
        <p className="page-description">
          Selected projects across brand strategy, campaign, content, and AI.
        </p>
      </div>

      {/* 2x2 Featured Grid */}
      <section style={{ padding: '0 var(--gutter) 80px' }}>
        <h2 className="section-label">Selected Works</h2>
        <div className="featured-grid__items">
          {displayFeatured.map((p) => (
            <AnimateIn key={p._id || p.slug}>
              <a href={`/work/${p.slug}`} className="featured-card">
                <div className="featured-card__media">
                  <img src={p.thumbnail} alt={p.title} />
                  <div className="featured-card__overlay">
                    <span className="featured-card__title paren-link">
                      <span className="paren-open">(</span>
                      {p.title}
                      <span className="paren-close">)</span>
                    </span>
                  </div>
                </div>
              </a>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Full list */}
      <div className="work-list" style={{ padding: '0 var(--gutter)' }}>
        {allWorks.map((p, i) => (
          <AnimateIn key={p._id || p.slug} delay={i * 60}>
            <a href={`/work/${p.slug}`} className="work-list__item paren-link">
              <span className="work-list__title">
                <span className="paren-open">(</span>
                {p.title}
                <span className="paren-close">)</span>
              </span>
              <span className="work-list__client">{p.client}</span>
              <span className="work-list__category">{p.category}</span>
            </a>
          </AnimateIn>
        ))}
      </div>
    </main>
  )
}
