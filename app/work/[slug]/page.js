import { works as staticWorks } from '../../../data/works'
import { client } from '../../../lib/sanity/client'
import FadeIn from '../../../components/FadeIn'

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
  if (!p) return <main className="content page-header"><h1 className="page-title">Not Found</h1></main>

  const embed = toEmbed(p.videoUrl)
  const idx = staticWorks.findIndex(w => w.slug === params.slug)
  const next = staticWorks[(idx + 1) % staticWorks.length]

  return (
    <main className="content">
      {/* Header */}
      <div style={{ paddingTop: 140, marginBottom: 48 }}>
        <FadeIn>
          <span className="cs-category">{p.category}</span>
          <h1 className="cs-title">{p.title}</h1>
          <p className="cs-client">{p.client}{p.year ? ` — ${p.year}` : ''}</p>
        </FadeIn>
      </div>

      {/* Cover image */}
      {p.thumbnail && !embed && (
        <FadeIn>
          <img src={p.thumbnail} alt={p.title} className="cs-cover" width={900} height={506} loading="lazy" />
        </FadeIn>
      )}

      {/* Video */}
      {embed && (
        <FadeIn>
          <div className="cs-video">
            <iframe src={embed} allow="fullscreen; picture-in-picture" allowFullScreen title={p.title} loading="lazy" />
          </div>
        </FadeIn>
      )}

      {/* Meta */}
      <FadeIn>
        <div className="cs-meta">
          {p.role && <div className="cs-meta-item"><span className="cs-meta-label">Role</span><span className="cs-meta-value">{p.role}</span></div>}
          {p.client && <div className="cs-meta-item"><span className="cs-meta-label">Client</span><span className="cs-meta-value">{p.client}</span></div>}
          {p.year && <div className="cs-meta-item"><span className="cs-meta-label">Year</span><span className="cs-meta-value">{p.year}</span></div>}
          {p.category && <div className="cs-meta-item"><span className="cs-meta-label">Category</span><span className="cs-meta-value">{p.category}</span></div>}
        </div>
      </FadeIn>

      {/* Overview */}
      {p.summary && (
        <FadeIn>
          <h3 className="cs-section-label">Overview</h3>
          <p className="cs-body">{p.summary}</p>
        </FadeIn>
      )}

      {/* Body */}
      {p.body && (
        <FadeIn>
          <h3 className="cs-section-label">Details</h3>
          {typeof p.body === 'string' ? (
            p.body.split('\n\n').filter(Boolean).map((para, i) => (
              <p key={i} className="cs-body">{para.trim()}</p>
            ))
          ) : Array.isArray(p.body) ? (
            p.body.map((block, i) => {
              if (block._type === 'block') {
                return <p key={block._key || i} className="cs-body">{block.children?.map(c => c.text).join('')}</p>
              }
              return null
            })
          ) : null}
        </FadeIn>
      )}

      {/* Gallery */}
      {p.images?.length > 0 && (
        <FadeIn>
          <h3 className="cs-section-label">Gallery</h3>
          {p.images.map((img, i) => (
            <img key={i} src={img} alt="" style={{ width: '100%', marginBottom: 4, display: 'block' }} width={900} height={506} loading="lazy" />
          ))}
        </FadeIn>
      )}

      {/* Next */}
      {next && (
        <a href={`/work/${next.slug}`} className="cs-next">
          Next Project: {next.title} &rarr;
        </a>
      )}
    </main>
  )
}

export function generateStaticParams() {
  return staticWorks.map(w => ({ slug: w.slug }))
}
