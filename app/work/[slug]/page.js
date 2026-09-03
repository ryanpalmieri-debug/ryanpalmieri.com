import Link from 'next/link'
import { works as staticWorks } from '../../../data/works'
import { client } from '../../../lib/sanity/client'
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
  const disciplines = (p.category || '').split(/[,/&]+/).map(s => s.trim()).filter(Boolean)

  return (
    <main style={{ width: '100%', background: 'var(--paper)' }}>
      {/* HERO */}
      <section style={{ width: '100%' }}>
        <div className="o-container" style={{
          paddingTop: 'clamp(40px, 5vw, 80px)',
          paddingBottom: 'clamp(28px, 3vw, 48px)',
          display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3vw, 44px)',
        }}>
          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3vw, 40px)' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', gap: 16,
                paddingBottom: 6, borderBottom: '1px solid var(--ink-15)',
              }}>
                <Link href="/work" className="o-label" style={{ textDecoration: 'none' }}>← All Work</Link>
                <span className="o-label o-label--muted">Case Study</span>
              </div>

              <h1 className="o-display" style={{ margin: 0, fontSize: 'var(--size-display-lg)', maxWidth: '13em' }}>{p.title}</h1>

              {p.summary && (
                <p style={{
                  margin: 0, maxWidth: 620,
                  fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.55,
                  letterSpacing: '-0.01em', color: 'var(--ink-70)',
                }}>{p.summary}</p>
              )}

              <div className="o-case-meta">
                <MetaCol label="Scope" value={p.category || '—'} />
                <MetaCol label="Client" value={p.client || '—'} />
                <MetaCol label="Role" value={p.role || '—'} />
                <MetaCol label="Year" value={p.year || '—'} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* HERO MEDIA — artboard card */}
      <section style={{ width: '100%' }}>
        <div className="o-container" style={{ paddingBottom: 'clamp(40px, 5vw, 80px)' }}>
          <div className="o-card">
            <div className="o-card-media" style={{ aspectRatio: '16 / 9' }}>
              {embed ? (
                <iframe src={embed} style={{ width: '100%', height: '100%', border: 0 }} allow="fullscreen; picture-in-picture" allowFullScreen title={p.title} loading="lazy" />
              ) : (p.heroImage || p.thumbnail) ? (
                <img src={p.heroImage || p.thumbnail} alt={p.title} />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      {paras.length > 0 && (
        <section style={{ width: '100%' }}>
          <div className="o-container" style={{ paddingBottom: 'var(--section-pad-y)' }}>
            <div className="o-case-body" style={{ paddingTop: 24, borderTop: '1px solid var(--ink-15)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span className="o-tag">About the project</span>
                {(disciplines.length ? disciplines : ['Brand & Marketing']).map(d => (
                  <span key={d} className="o-label o-label--muted" style={{ fontWeight: 500 }}>{d}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 720 }}>
                {paras.map((text, i) => (
                  <p key={i} style={{ margin: 0, fontSize: 17, lineHeight: 1.65, letterSpacing: '-0.01em', color: 'var(--ink)' }}>{text}</p>
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
          display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 4vw, 56px)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24,
            paddingBottom: 6, borderBottom: '1px solid var(--ink-15)',
          }}>
            <span className="o-label"><span style={{ color: 'var(--orange)' }}>◆</span>&nbsp; Next Projects</span>
            <Link href="/work" className="o-link">All Work →</Link>
          </div>
          <div className="o-next-grid">
            {[nextOne, nextTwo].filter(Boolean).map(n => (
              <Link key={n.slug} href={`/work/${n.slug}`} className="o-grid-card">
                <div className="o-card">
                  <div className="o-card-media" style={{ aspectRatio: '4 / 3' }}>
                    {n.thumbnail && <img src={n.thumbnail} alt={n.title} loading="lazy" />}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span className="o-tag">{n.title || n.client}</span>
                  <div className="o-meta-row" style={{ borderBottom: 'none' }}>
                    <span>{n.category || n.client || ''}</span>
                    <span>{n.year || '—'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionContact />

      <style>{`
        .o-case-meta {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          padding-top: 22px;
          border-top: 1px solid var(--ink-15);
        }
        .o-case-body {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: clamp(32px, 4vw, 64px);
          align-items: start;
        }
        .o-next-grid, .o-grid-card { }
        .o-next-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 3vw, 56px);
        }
        .o-grid-card { display: flex; flex-direction: column; gap: 16px; text-decoration: none; color: var(--ink); }
        @media (max-width: 860px) {
          .o-case-meta { grid-template-columns: 1fr 1fr; }
          .o-case-body { grid-template-columns: 1fr; gap: 18px; }
        }
        @media (max-width: 640px) {
          .o-next-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}

function MetaCol({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span className="o-label o-label--muted">{label}</span>
      <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)' }}>{value}</span>
    </div>
  )
}
