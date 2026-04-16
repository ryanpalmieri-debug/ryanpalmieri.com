'use client'

import { useState, useEffect } from 'react'
import { WorkCard } from '../../components/WorkCard'
import { AnimateIn } from '../../components/AnimateIn'
import { works as staticWorks } from '../../data/works'

const CATEGORIES = ['All Works', 'Strategy & Brand', 'Film & Production', 'Campaigns & Partnerships', 'Branded Content']

export default function WorkPage() {
  const [active, setActive] = useState('All Works')
  const [projects, setProjects] = useState(staticWorks)

  // Try to load from Sanity client-side
  useEffect(() => {
    fetch(`https://k7b94oei.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent('*[_type == "work"] | order(order asc) { _id, title, "slug": slug.current, featured, category, client, year, "thumbnail": thumbnail.asset->url }')}`)
      .then(r => r.json())
      .then(data => { if (data.result?.length > 0) setProjects(data.result) })
      .catch(() => {})
  }, [])

  const filtered = active === 'All Works' ? projects : projects.filter(p => p.category === active)

  return (
    <main>
      <div className="page-header">
        <h1 className="page-header__label">All Works</h1>
      </div>

      <div className="filter-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-tab ${active === cat ? 'active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="work-grid work-grid--3col">
        {filtered.map((p, i) => (
          <AnimateIn key={p._id || p.slug} delay={i * 60}>
            <WorkCard
              href={`/work/${p.slug}`}
              title={p.title}
              category={p.category}
              thumbnail={p.thumbnail}
            />
          </AnimateIn>
        ))}
      </div>
    </main>
  )
}
