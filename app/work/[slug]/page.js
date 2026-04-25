import { works as staticWorks } from '../../../data/works'
import { client } from '../../../lib/sanity/client'

export const revalidate = 10

function toEmbed(url) {
  if (!url) return null
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?title=1&byline=0&portrait=0`
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1`
  return null
}

async function getWork(slug) {
  try {
    const { workBySlugQuery } = await import('../../../lib/sanity/queries')
    const data = await client.fetch(workBySlugQuery, { slug })
    if (data) return data
  } catch {}
  return staticWorks.find(w => w.slug === slug) || null
}

export default async function ProjectPage({ params }) {
  const p = await getWork(params.slug)
  if (!p) return <main className="page-header"><h1 className="page-title">Not Found</h1></main>

  const embed = toEmbed(p.videoUrl)
  const idx = staticWorks.findIndex(w => w.slug === params.slug)
  const next = staticWorks[(idx + 1) % staticWorks.length]

  return (
    <main>
      <div className="cs-header">
        <span className="cs-category">{p.category}</span>
        <h1 className="cs-title">{p.title}</h1>
        <p className="cs-client">{p.client}{p.year ? ` // ${p.year}` : ''}</p>
      </div>

      <div className="cs-media">
        <div className="cs-media__inner">
          {embed ? (
            <iframe src={embed} allow="fullscreen; picture-in-picture" allowFullScreen title={p.title} loading="lazy" />
          ) : p.thumbnail ? (
            <img src={p.thumbnail} alt={p.title} loading="lazy" />
          ) : null}
        </div>
      </div>

      <div className="cs-body">
        <div className="cs-meta">
          {p.role && <div className="cs-meta-item"><span className="cs-meta-label">Role</span><span className="cs-meta-value">{p.role}</span></div>}
          {p.client && <div className="cs-meta-item"><span className="cs-meta-label">Client</span><span className="cs-meta-value">{p.client}</span></div>}
          {p.year && <div className="cs-meta-item"><span className="cs-meta-label">Year</span><span className="cs-meta-value">{p.year}</span></div>}
          {p.category && <div className="cs-meta-item"><span className="cs-meta-label">Category</span><span className="cs-meta-value">{p.category}</span></div>}
        </div>

        {p.summary && (
          <>
            <h3 className="cs-section-label">// Overview</h3>
            <p className="cs-paragraph">{p.summary}</p>
          </>
        )}

        {p.body && (
          <>
            <h3 className="cs-section-label">// Details</h3>
            {typeof p.body === 'string' ? (
              p.body.split('\n\n').filter(Boolean).map((para, i) => <p key={i} className="cs-paragraph">{para.trim()}</p>)
            ) : Array.isArray(p.body) ? (
              p.body.map((block, i) => block._type === 'block' ? <p key={block._key || i} className="cs-paragraph">{block.children?.map(c => c.text).join('')}</p> : null)
            ) : null}
          </>
        )}

        {next && (
          <a href={`/work/${next.slug}`} className="cs-next">
            NEXT_PROJECT &rarr; {next.title}
          </a>
        )}
      </div>
    </main>
  )
}

export function generateStaticParams() {
  return staticWorks.map(w => ({ slug: w.slug }))
}
