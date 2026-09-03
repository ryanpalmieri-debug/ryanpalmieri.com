import SectionAbout from '../../components/SectionAbout'
import SectionProcess from '../../components/SectionProcess'
import SectionContact from '../../components/SectionContact'
import FadeIn from '../../components/FadeIn'

export const metadata = { title: 'About — Ryan Palmieri' }

const experience = [
  { title: 'Head of Marketing (Contract)', company: 'DevSpot', date: '2026 — Present' },
  { title: 'Head of Marketing', company: 'Gaia', date: '2024 — 2026' },
  { title: 'Director of Brand Marketing & Creative', company: '4K Protocol', date: '2021 — 2024' },
  { title: 'Director / Supervising Producer', company: 'Warner Bros / DC Comics', date: '2019 — 2020' },
  { title: 'Production Operations & Logistics', company: 'RadicalMedia', date: '2009 — 2019' },
]

export default function AboutPage() {
  return (
    <main style={{ width: '100%' }}>
      <FadeIn><SectionAbout /></FadeIn>

      <section style={{ width: '100%' }}>
        <div className="o-container" style={{
          paddingBottom: 'var(--section-pad-y)',
          display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3vw, 48px)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', gap: 16,
            paddingBottom: 6, borderBottom: '1px solid var(--ink-15)',
          }}>
            <span className="o-label"><span style={{ color: 'var(--orange)' }}>◆</span>&nbsp; Experience</span>
            <span className="o-label o-label--muted">2009 — Present</span>
          </div>
          <ul style={{ listStyle: 'none' }}>
            {experience.map((e, i) => (
              <li key={e.company + e.date} className="o-xp-row">
                <span className="o-label o-label--muted">({String(i + 1).padStart(2, '0')})</span>
                <div className="o-xp-main">
                  <span className="o-display" style={{ fontSize: 'clamp(18px, 1.8vw, 28px)', lineHeight: 1.1 }}>{e.title}</span>
                  <span className="o-label o-label--muted">{e.company}</span>
                </div>
                <span className="o-label o-label--muted" style={{ fontVariantNumeric: 'tabular-nums' }}>{e.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <style>{`
          .o-xp-row {
            display: grid;
            grid-template-columns: 60px 1fr auto;
            gap: 20px;
            align-items: baseline;
            padding: 22px 0;
            border-top: 1px solid var(--ink-15);
          }
          .o-xp-row:last-child { border-bottom: 1px solid var(--ink-15); }
          .o-xp-main {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          @media (max-width: 640px) {
            .o-xp-row { grid-template-columns: 1fr; gap: 8px; }
          }
        `}</style>
      </section>

      <FadeIn><SectionProcess /></FadeIn>
      <SectionContact />
    </main>
  )
}
