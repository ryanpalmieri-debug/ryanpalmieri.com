import Link from 'next/link'
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

function paragraphsFromBody(body) {
  if (!body) return []
  if (typeof body === 'string') return body.split('\n\n').map(s => s.trim()).filter(Boolean)
  if (Array.isArray(body)) {
    return body
      .map(b => (b && b._type === 'block' ? (b.children || []).map(c => c.text).join('') : ''))
      .map(s => s.trim())
      .filter(Boolean)
  }
  return []
}

const SECTION_NAMES = ['Challenge', 'Solution', 'Conclusion', 'Impact', 'Reflection']

export default async function ProjectPage({ params }) {
  const p = await getWork(params.slug)
  if (!p) return (
    <main style={{ padding: '120px var(--container-padding-x)', maxWidth: 'var(--container-max-width)', margin: '0 auto' }}>
      <h1>Project not found</h1>
    </main>
  )

  const embed = toEmbed(p.videoUrl)
  const paras = paragraphsFromBody(p.body)
  const sections = paras.slice(0, 3).map((text, i) => ({
    name: SECTION_NAMES[i] || `Section`,
    num: String(i + 1).padStart(2, '0'),
    text,
  }))
  const idx = staticWorks.findIndex(w => w.slug === params.slug)
  const nextOne = staticWorks[(idx + 1) % staticWorks.length]
  const nextTwo = staticWorks[(idx + 2) % staticWorks.length]

  return (
    <main style={{ width: '100%' }}>
      {/* HERO */}
      <section style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: 'var(--container-max-width)',
          padding: '80px var(--container-padding-x) 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}>
          <h1 style={{
            margin: 0,
            fontSize: 'var(--font-size-h1)',
            fontWeight: 'var(--font-weight-semibold)',
            lineHeight: 1,
            letterSpacing: 'var(--letter-spacing-h1)',
            color: 'var(--color-cod-gray)',
          }}>{p.title}.</h1>

          {p.summary && (
            <p style={{
              margin: 0,
              maxWidth: 720,
              fontSize: 20,
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: '-0.3px',
              color: 'var(--color-tundora)',
            }}>{p.summary}</p>
          )}

          {/* META ROW */}
          <div className="kanso-case-meta" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr) auto',
            gap: 24,
            alignItems: 'flex-end',
            paddingTop: 24,
            borderTop: '1px solid var(--color-silver)',
          }}>
            <MetaItem label="Scope" value={p.category || '—'} />
            <MetaItem label="Client" value={p.client || '—'} />
            <MetaItem label="Role" value={p.role || '—'} />
            <MetaItem label="Year" value={p.year || '—'} />
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 22px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--color-cod-gray)',
                color: 'var(--color-white)',
                fontSize: 14, fontWeight: 500,
                textDecoration: 'none',
                letterSpacing: 'var(--letter-spacing-link)',
              }}>
                Live preview
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* HERO MEDIA — constrained smaller per design direction */}
      <section style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: 'var(--container-max-width)',
          padding: '0 var(--container-padding-x) 80px',
          display: 'flex', justifyContent: 'center',
        }}>
          <div style={{
            width: '100%',
            maxWidth: 900,
            aspectRatio: '16/9',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            background: '#1a1a1a',
          }}>
            {embed ? (
              <iframe src={embed} style={{ width: '100%', height: '100%', border: 0 }} allow="fullscreen; picture-in-picture" allowFullScreen title={p.title} loading="lazy" />
            ) : p.thumbnail ? (
              <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : null}
          </div>
        </div>
      </section>

      {/* BODY SECTIONS */}
      {sections.length > 0 && (
        <section style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%',
            maxWidth: 'var(--container-max-width)',
            padding: '40px var(--container-padding-x) 120px',
            display: 'flex', flexDirection: 'column', gap: 96,
          }}>
            {sections.map((s) => {
              const sentences = s.text.split(/(?<=[.!?])\s+/).filter(Boolean)
              const lead = sentences[0] || s.text
              const rest = sentences.slice(1).join(' ')
              return (
                <div key={s.num} className="kanso-case-section" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: 64,
                  alignItems: 'start',
                  paddingTop: 32,
                  borderTop: '1px solid var(--color-silver)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: '-0.2px',
                      color: 'var(--color-cod-gray)',
                    }}>{s.name}</h3>
                    <span style={{
                      fontSize: 13, fontWeight: 500, color: 'var(--color-gray)', letterSpacing: '0.05em',
                    }}>({s.num})</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 760 }}>
                    <p style={{
                      margin: 0,
                      fontSize: 'clamp(28px, 3.2vw, 44px)',
                      fontWeight: 500,
                      lineHeight: 1.2,
                      letterSpacing: '-1px',
                      color: 'var(--color-cod-gray)',
                    }}>{lead}</p>
                    {rest && (
                      <p style={{
                        margin: 0,
                        fontSize: 17,
                        fontWeight: 400,
                        lineHeight: 1.7,
                        letterSpacing: '-0.2px',
                        color: 'var(--color-tundora)',
                      }}>{rest}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* NEXT PROJECTS */}
      <section style={{ width: '100%', display: 'flex', justifyContent: 'center', borderTop: '1px solid var(--color-silver)' }}>
        <div style={{
          width: '100%',
          maxWidth: 'var(--container-max-width)',
          padding: '80px var(--container-padding-x) 120px',
          display: 'flex', flexDirection: 'column', gap: 48,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
            <span className="kanso-label">/Latest Projects</span>
            <Link href="/work" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: 'var(--color-gallery)',
              borderRadius: 'var(--radius-pill)',
              padding: '11px 26px',
              textDecoration: 'none',
              fontSize: 16, fontWeight: 500,
              letterSpacing: 'var(--letter-spacing-link)',
              color: 'var(--color-cod-gray)',
            }}>
              View all work
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="kanso-case-next-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}>
            {[nextOne, nextTwo].filter(Boolean).map((n) => (
              <Link key={n.slug} href={`/work/${n.slug}`} style={{
                display: 'flex', flexDirection: 'column', gap: 12,
                backgroundColor: 'var(--color-gallery)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                padding: '6px 6px 12px 6px',
                textDecoration: 'none',
              }}>
                <div style={{
                  width: '100%',
                  aspectRatio: '745 / 559',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  background: '#1a1a1a',
                }}>
                  {n.thumbnail && (
                    <img src={n.thumbnail} alt={n.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: 'var(--font-size-h3)', fontWeight: 700,
                      lineHeight: 'var(--line-height-h3)', letterSpacing: 'var(--letter-spacing-h3)',
                      color: 'var(--color-cod-gray)',
                    }}>{n.title || n.client || 'Project'}</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-cod-gray)' }}>{n.year}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-tundora)' }}>{n.category || n.client || ''}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .kanso-case-meta { grid-template-columns: 1fr 1fr !important; }
          .kanso-case-section { grid-template-columns: 1fr !important; gap: 24px !important; }
          .kanso-case-next-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}

function MetaItem({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', color: 'var(--color-gray)', textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-cod-gray)' }}>{value}</span>
    </div>
  )
}

export function generateStaticParams() {
  return staticWorks.map(w => ({ slug: w.slug }))
}
