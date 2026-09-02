import Link from 'next/link'
import { works as staticWorks } from '../../../data/works'
import { client } from '../../../lib/sanity/client'
import { WorkCard } from '../../../components/SectionProjects'
import SectionContact from '../../../components/SectionContact'
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

function MetaItem({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span className="o-label o-label--muted">{label}</span>
      <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em' }}>{value}</span>
    </div>
  )
}

export default async function ProjectPage({ params }) {
  const p = await getWork(params.slug)
  if (!p) return (
    <main className="o-container" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <h1 className="o-display" style={{ fontSize: 'var(--size-display-md)' }}>Project not found</h1>
    </main>
  )

  const embed = toEmbed(p.videoUrl)
  let paras = paragraphsFromBody(p.body)
  if (paras.length === 0 && p.summary) paras = [p.summary]
  const idx = staticWorks.findIndex(w => w.slug === params.slug)
  const nextOne = staticWorks[(idx + 1) % staticWorks.length]
  const nextTwo = staticWorks[(idx + 2) % staticWorks.length]

  return (
    <main style={{ width: '100%' }}>
      {/* HERO */}
      <section style={{ width: '100%' }}>
        <div className="o-container" style={{
          paddingTop: 'clamp(48px, 6vw, 96px)',
          paddingBottom: 'clamp(32px, 4vw, 56px)',
          display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3vw, 48px)',
        }}>
          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3vw, 48px)' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', gap: 16,
                paddingTop: 20, borderTop: '1px solid var(--color-black)',
              }}>
                <Link href="/work" className="o-label" style={{ textDecoration: 'none' }}>← All Work</Link>
                <span className="o-label o-label--muted">Case Study</span>
              </div>

              <h1 className="o-display" style={{
                margin: 0,
                fontSize: 'var(--size-display-lg)',
                maxWidth: '14em',
              }}>{p.title}</h1>

              {p.summary && (
                <p style={{
                  margin: 0, maxWidth: 640,
                  fontSize: 'clamp(16px, 1.3vw, 19px)', fontWeight: 400,
                  lineHeight: 1.6, letterSpacing: '-0.01em',
                  color: 'var(--color-ink-70)',
                }}>{p.summary}</p>
              )}

              {/* META ROW */}
              <div className="o-case-meta">
                <MetaItem label="Scope" value={p.category || '—'} />
                <MetaItem label="Client" value={p.client || '—'} />
                <MetaItem label="Role" value={p.role || '—'} />
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="o-link" style={{ alignSelf: 'end' }}>
                    Live Preview ↗
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* HERO MEDIA */}
      <section style={{ width: '100%' }}>
        <div className="o-container" style={{ paddingBottom: 'clamp(48px, 6vw, 96px)' }}>
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            overflow: 'hidden',
            background: '#111',
          }}>
            {embed ? (
              <iframe src={embed} style={{ width: '100%', height: '100%', border: 0 }} allow="fullscreen; picture-in-picture" allowFullScreen title={p.title} loading="lazy" />
            ) : (p.heroImage || p.thumbnail) ? (
              <img src={p.heroImage || p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : null}
          </div>
        </div>
      </section>

      {/* BODY */}
      {paras.length > 0 && (
        <section style={{ width: '100%' }}>
          <div className="o-container" style={{ paddingBottom: 'var(--section-pad-y)' }}>
            <div className="o-case-body" style={{ paddingTop: 24, borderTop: '1px solid var(--color-ink-12)' }}>
              <span className="o-label o-label--muted">About the project</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 720 }}>
                {paras.map((text, i) => (
                  <p key={i} style={{
                    margin: 0,
                    fontSize: 17, fontWeight: 400,
                    lineHeight: 1.7, letterSpacing: '-0.01em',
                    color: 'var(--color-black)',
                  }}>{text}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* NEXT PROJECTS */}
      <section style={{ width: '100%' }}>
        <div className="o-container" style={{
          paddingBottom: 'var(--section-pad-y)',
          display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 4vw, 64px)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24,
            paddingTop: 20, borderTop: '1px solid var(--color-ink-12)',
          }}>
            <span className="o-label">Next Projects</span>
            <Link href="/work" className="o-link">All Work →</Link>
          </div>
          <div className="o-work-grid">
            {[nextOne, nextTwo].filter(Boolean).map((n, i) => (
              <WorkCard key={n.slug} work={n} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SectionContact />

      <style>{`
        .o-case-meta {
          display: grid;
          grid-template-columns: repeat(3, 1fr) auto;
          gap: 24px;
          align-items: start;
          padding-top: 24px;
          border-top: 1px solid var(--color-ink-12);
        }
        .o-case-body {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .o-case-meta { grid-template-columns: 1fr 1fr; }
          .o-case-body { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>
    </main>
  )
}
