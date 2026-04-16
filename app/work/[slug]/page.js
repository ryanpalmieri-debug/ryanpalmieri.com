import { works as staticWorks } from '../../../data/works'
import { client } from '../../../lib/sanity/client'
import { WorkCard } from '../../../components/WorkCard'

export const revalidate = 10

async function getWork(slug) {
  try {
    const { workBySlugQuery } = await import('../../../lib/sanity/queries')
    const data = await client.fetch(workBySlugQuery, { slug })
    if (data) return data
  } catch {}
  return staticWorks.find(w => w.slug === slug) || null
}

async function getOtherWorks(slug) {
  try {
    const all = await client.fetch(`*[_type == "work" && slug.current != $slug] | order(order asc)[0...2] { _id, title, "slug": slug.current, category, "thumbnail": thumbnail.asset->url }`, { slug })
    if (all?.length) return all
  } catch {}
  return staticWorks.filter(w => w.slug !== slug).slice(0, 2)
}

function toPlayableEmbed(url) {
  if (!url) return null
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?title=1&byline=0&portrait=0`
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1`
  return null
}

export default async function ProjectPage({ params }) {
  const [project, others] = await Promise.all([
    getWork(params.slug),
    getOtherWorks(params.slug),
  ])

  if (!project) {
    return <main className="page-header"><h1 className="page-header__label">Project Not Found</h1></main>
  }

  const videoEmbed = toPlayableEmbed(project.videoUrl)

  return (
    <main>
      {/* Header */}
      <div className="project-header">
        <span className="project-header__category">{project.category}</span>
        <h1 className="project-header__title">{project.title}</h1>
      </div>

      {/* Video embed if available */}
      {videoEmbed && (
        <div style={{ padding: '0 var(--gutter)', marginBottom: 48 }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
            <iframe
              src={videoEmbed}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={project.title}
            />
          </div>
        </div>
      )}

      {/* Stills strip if images available */}
      {project.images && project.images.length > 0 && (
        <div className="project-slides">
          <div className="project-slides__track">
            {project.images.map((img, i) => (
              <img key={i} src={img} alt="" className="project-slide" />
            ))}
          </div>
        </div>
      )}

      {/* Thumbnail as hero if no video/images */}
      {!videoEmbed && (!project.images || project.images.length === 0) && project.thumbnail && (
        <div style={{ padding: '0 var(--gutter)', marginBottom: 48 }}>
          <img src={project.thumbnail} alt={project.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      {/* Metadata */}
      <div className="project-meta">
        {project.role && (
          <div className="meta-col">
            <span className="meta-col__label">Role</span>
            <span className="meta-col__value">{project.role}</span>
          </div>
        )}
        {project.client && (
          <div className="meta-col">
            <span className="meta-col__label">Client</span>
            <span className="meta-col__value">{project.client}</span>
          </div>
        )}
        {project.year && (
          <div className="meta-col">
            <span className="meta-col__label">Year</span>
            <span className="meta-col__value">{project.year}</span>
          </div>
        )}
        {project.category && (
          <div className="meta-col">
            <span className="meta-col__label">Category</span>
            <span className="meta-col__value">{project.category}</span>
          </div>
        )}
      </div>

      {/* Case study text — 2-column writeup */}
      {(project.summary || project.body) && (
        <div className="project-writeup">
          {project.summary && (
            <div className="writeup-section">
              <h3 className="writeup-section__label">Overview</h3>
              <p className="writeup-section__body">{project.summary}</p>
            </div>
          )}
          {project.body && (
            <div className="writeup-section">
              <h3 className="writeup-section__label">Details</h3>
              <div className="writeup-section__body">
                {typeof project.body === 'string' ? (
                  project.body.split('\n\n').filter(Boolean).map((para, i) => (
                    <p key={i} style={{ marginBottom: 16 }}>{para.trim()}</p>
                  ))
                ) : (
                  Array.isArray(project.body) && project.body.map((block, i) => {
                    if (block._type === 'block') {
                      return <p key={block._key || i} style={{ marginBottom: 16 }}>{block.children?.map(c => c.text).join('')}</p>
                    }
                    return null
                  })
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Other works */}
      {others.length > 0 && (
        <div className="other-works">
          <span className="other-works__label">Other Works</span>
          <div className="work-grid work-grid--2col">
            {others.map((p) => (
              <WorkCard
                key={p._id || p.slug}
                href={`/work/${p.slug}`}
                title={p.title}
                category={p.category}
                thumbnail={p.thumbnail}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

export function generateStaticParams() {
  return staticWorks.map(w => ({ slug: w.slug }))
}
