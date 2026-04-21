import Link from 'next/link'

export default function WorkRow({ num, title, client, slug, thumbnail }) {
  return (
    <Link href={`/work/${slug}`} className="work-row">
      <div className="work-row__left">
        <span className="work-row__num">{num}</span>
        <div className="work-row__content">
          <div className="work-row__title">{title}</div>
          <div className="work-row__client">{client}</div>
        </div>
      </div>
      {thumbnail ? (
        <img src={thumbnail} alt={title} className="work-row__thumb" width={120} height={80} loading="lazy" />
      ) : (
        <div className="work-row__thumb" />
      )}
    </Link>
  )
}
