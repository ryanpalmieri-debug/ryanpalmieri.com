import { works as staticWorks } from '../../../data/works'
import { client } from '../../../lib/sanity/client'

export const revalidate = 10

async function getWork(slug) {
  try {
    const { workBySlugQuery } = await import('../../../lib/sanity/queries')
    const data = await client.fetch(workBySlugQuery, { slug })
    if (data) return data
  } catch {}
  return staticWorks.find(w => w.slug === slug) || null
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
  const project = await getWork(params.slug)
  if (!project) {
    return <main className="page-header"><h1 className="page-title">Not Found</h1></main>
  }

  const videoEmbed = toPlayableEmbed(project.videoUrl)

  return (
    <main>
      {/* Hero */}
      <section className="project-hero">
        <div className="project-hero__media">
          <img src={project.thumbnail} alt={project.title} />
        </div>
        <div className="project-hero__title">
          <h1>{project.title}</h1>
        </div>
      </section>

      {/* Metadata */}
      <div className="project-meta">
        {project.role && (
          <div className="meta-field">
            <span className="meta-field__label">Role</span>
            <span className="meta-field__value">{project.role}</span>
          </div>
        )}
        {project.client && (
          <div className="meta-field">
            <span className="meta-field__label">Client</span>
            <span className="meta-field__value">{project.client}</span>
          </div>
        )}
        {project.year && (
          <div className="meta-field">
            <span className="meta-field__label">Year</span>
            <span className="meta-field__value">{project.year}</span>
          </div>
        )}
        {project.category && (
          <div className="meta-field">
            <span className="meta-field__label">Category</span>
            <span className="meta-field__value">{project.category}</span>
          </div>
        )}
      </div>

      {/* Video embed */}
      {videoEmbed && (
        <div style={{ padding: '4px var(--gutter)', marginBottom: '4px' }}>
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

      {/* Summary */}
      {project.summary && (
        <div style={{ padding: '48px var(--gutter)', maxWidth: '800px' }}>
          <p style={{ fontSize: 'clamp(16px, 2vw, 22px)', lineHeight: 1.6, textTransform: 'none' }}>
            {project.summary}
          </p>
        </div>
      )}

      {/* Body text */}
      {project.body && (
        <div style={{ padding: '0 var(--gutter) 48px', maxWidth: '800px' }}>
          {typeof project.body === 'string' ? (
            project.body.split('\n\n').filter(Boolean).map((para, i) => (
              <p key={i} style={{ fontSize: '16px', lineHeight: 1.7, textTransform: 'none', marginBottom: '16px', color: 'var(--color-gray-mid)' }}>
                {para.trim()}
              </p>
            ))
          ) : (
            Array.isArray(project.body) && project.body.map((block, i) => {
              if (block._type === 'block') {
                return (
                  <p key={block._key || i} style={{ fontSize: '16px', lineHeight: 1.7, textTransform: 'none', marginBottom: '16px', color: 'var(--color-gray-mid)' }}>
                    {block.children?.map(child => child.text).join('')}
                  </p>
                )
              }
              return null
            })
          )}
        </div>
      )}

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <div className="project-gallery">
          {project.images.map((img, i) => (
            <div key={i} className="gallery-image">
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export function generateStaticParams() {
  return staticWorks.map(w => ({ slug: w.slug }))
}
