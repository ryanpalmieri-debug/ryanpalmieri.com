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
  if (!p) return (
    <main style={{ padding: '120px var(--container-padding-x)', maxWidth: 'var(--container-max-width)', margin: '0 auto' }}>
      <h1>Project not found</h1>
    </main>
  )
  const embed = toEmbed(p.videoUrl)
  const idx = staticWorks.findIndex(w => w.slug === params.slug)
  const next = staticWorks[(idx + 1) % staticWorks.length]

  return (
    <main style={{ width: '100%' }}>
      <div style={{ width: '100%', maxWidth: 'var(--container-max-width)', margin: '0 auto', padding: '80px var(--container-padding-x) 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, marginBottom: 24 }}>
          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-cod-gray)' }}>/{p.category}</span>
          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-gray)' }}>{p.year}</span>
        </div>
        <h1 style={{
          margin: 0,
          fontSize: 'var(--font-size-h2)',
          fontWeight: 'var(--font-weight-medium)',
          lineHeight: 'var(--line-height-h2)',
          letterSpacing: 'var(--letter-spacing-h2)',
          color: 'var(--color-cod-gray)',
          marginBottom: 8,
        }}>{p.title}</h1>
        <p style={{ fontSize: 'var(--font-size-h3)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-tundora)' }}>{p.client}</p>
      </div>

      <div style={{ width: '100%', maxWidth: 'var(--container-max-width)', margin: '0 auto', padding: '0 var(--container-padding-x) 40px' }}>
        <div style={{ width: '100%', maxWidth: 960, margin: '0 auto' }}>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#1a1a1a' }}>
            {embed ? (
              <iframe src={embed} style={{ width: '100%', height: '100%', border: 0 }} allow="fullscreen; picture-in-picture" allowFullScreen title={p.title} loading="lazy" />
            ) : p.thumbnail ? (
              <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : null}
          </div>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 'var(--container-max-width)', margin: '0 auto', padding: '40px var(--container-padding-x) 80px' }}>
        <div className="kanso-work-detail" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }}>
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 24, borderTop: '1px solid var(--color-silver)' }}>
            {p.role && <MetaItem label="Role" value={p.role} />}
            {p.client && <MetaItem label="Client" value={p.client} />}
            {p.year && <MetaItem label="Year" value={p.year} />}
            {p.category && <MetaItem label="Category" value={p.category} />}
          </aside>

          <div style={{ paddingTop: 24, borderTop: '1px solid var(--color-silver)' }}>
            {p.summary && (
              <>
                <SectionLabel>Overview</SectionLabel>
                <p style={bodyStyle}>{p.summary}</p>
              </>
            )}

            {p.body && (
              <>
                <SectionLabel>Details</SectionLabel>
                {typeof p.body === 'string'
                  ? p.body.split('\n\n').filter(Boolean).map((para, i) => <p key={i} style={bodyStyle}>{para.trim()}</p>)
                  : Array.isArray(p.body)
                  ? p.body.map((block, i) => block._type === 'block' ? <p key={block._key || i} style={bodyStyle}>{block.children?.map(c => c.text).join('')}</p> : null)
                  : null
                }
              </>
            )}

            {next && (
              <a href={`/work/${next.slug}`} style={{
                display: 'block', marginTop: 64, padding: '24px 0',
                borderTop: '1px solid var(--color-silver)',
                fontSize: 'var(--font-size-sm)', fontWeight: 500,
                letterSpacing: 'var(--letter-spacing-link)',
                color: 'var(--color-cod-gray)', textDecoration: 'none',
              }}>
                Next project: {next.title} →
              </a>
            )}
          </div>
        </div>
        <style>{`
          .kanso-section-label:first-child { margin-top: 0 !important; }
          @media (max-width: 768px) {
            .kanso-work-detail { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </div>
    </main>
  )
}

function SectionLabel({ children }) {
  return <h3 className="kanso-section-label" style={{ margin: '40px 0 12px', fontSize: 'var(--font-size-sm)', fontWeight: 700, letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-gray)', textTransform: 'uppercase' }}>{children}</h3>
}
function MetaItem({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', color: 'var(--color-gray)', textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-cod-gray)' }}>{value}</span>
    </div>
  )
}
const bodyStyle = { fontSize: 17, lineHeight: 1.8, fontWeight: 400, color: 'var(--color-cod-gray)', marginBottom: 14, maxWidth: 720 }

export function generateStaticParams() {
  return staticWorks.map(w => ({ slug: w.slug }))
}
