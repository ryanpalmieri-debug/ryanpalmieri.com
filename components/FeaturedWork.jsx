import Link from 'next/link'

function toCardCode(work, idx) {
  // 01_LOGICCHAIN format — derive from slug or client
  const slug = (work.slug || work.client || work.title || '')
    .toString()
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, 12)
  return `${String(idx + 1).padStart(2, '0')}_${slug || 'PROJECT'}`
}

export default function FeaturedWork({ works = [] }) {
  const featured = works.slice(0, 6)

  return (
    <section className="featured">
      <div className="featured__head">
        <span className="featured__head-left">FEATURED WORK.SYS</span>
        <Link href="/work" className="featured__head-right">VIEW ALL WORK &rarr;</Link>
      </div>

      <div className="featured__grid">
        {featured.map((w, i) => (
          <Link key={w._id || w.slug || i} href={`/work/${w.slug}`} className="work-card">
            <div className="work-card__head">
              <span className="work-card__head-title">{toCardCode(w, i)}</span>
              <span className="work-card__head-ctrls">
                <span>[ ]</span>
                <span>x</span>
              </span>
            </div>
            <div className="work-card__media">
              {w.thumbnail && (
                <img src={w.thumbnail} alt={w.title} loading="lazy" />
              )}
            </div>
            <div className="work-card__meta">
              <span className="work-card__meta-text">
                {w.category || w.client || 'PROJECT'}
              </span>
              <span className="work-card__meta-arrow">&rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
