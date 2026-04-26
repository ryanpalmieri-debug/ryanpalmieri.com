import SectionAbout from '../../components/SectionAbout'
import SectionProcess from '../../components/SectionProcess'
import SectionContact from '../../components/SectionContact'

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
      <SectionAbout />

      <section style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%', maxWidth: 'var(--container-max-width)',
          padding: '0 var(--container-padding-x) 120px',
          display: 'flex', flexDirection: 'column', gap: 32,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-cod-gray)' }}>/Experience</span>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--color-gray)' }}>2009 — Present</span>
          </div>
          <ul style={{ listStyle: 'none', borderTop: '1px solid var(--color-silver)' }}>
            {experience.map((e) => (
              <li key={e.company + e.date} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                padding: '20px 0', borderBottom: '1px solid var(--color-silver)',
                flexWrap: 'wrap', gap: 8,
              }}>
                <div>
                  <span style={{ fontSize: 18, fontWeight: 'var(--font-weight-semibold)', letterSpacing: '-0.4px', color: 'var(--color-cod-gray)' }}>{e.title}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.42px', color: 'var(--color-tundora)' }}> — {e.company}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: '-0.42px', color: 'var(--color-gray)' }}>{e.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionProcess />
      <SectionContact />
    </main>
  )
}
