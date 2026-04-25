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

function toCardCode(work, idx) {
  const slug = (work.slug || work.client || work.title || '').toString().replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 12)
  return `${String(idx + 1).padStart(2, '0')}_${slug || 'PROJECT'}`
}

export default async function WorkPage() {
  const works = await getWorks()

  return (
    <main>
      <div className="page-header">
        <p className="page-subtitle">ALL_WORK.SYS</p>
        <h1 className="page-title">Selected work.</h1>
      </div>

      <section className="work-list-section">
        <div className="work-list-grid">
          {works.map((w, i) => (
            <Link key={w._id || w.slug || i} href={`/work/${w.slug}`} className="work-card">
              <div className="work-card__head">
                <span className="work-card__head-title">{toCardCode(w, i)}</span>
                <span className="work-card__head-ctrls">
                  <span>[ ]</span>
                  <span>x</span>
                </span>
              </div>
              <div className="work-card__media">
                {w.thumbnail && <img src={w.thumbnail} alt={w.title} loading="lazy" />}
              </div>
              <div className="work-card__meta">
                <span className="work-card__meta-text">{w.category || w.client || 'PROJECT'}</span>
                <span className="work-card__meta-arrow">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
