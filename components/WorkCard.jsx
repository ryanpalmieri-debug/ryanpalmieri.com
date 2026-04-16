import Link from 'next/link'

export function WorkCard({ href, title, category, thumbnail }) {
  return (
    <Link href={href} className="work-card">
      <div className="work-card__media">
        <img src={thumbnail} alt={title} className="work-card__thumb" />
      </div>
      <div className="work-card__info">
        <span className="work-card__title">{title}</span>
        <span className="work-card__category">{category}</span>
      </div>
    </Link>
  )
}
