import FadeIn from '../../components/FadeIn'

export const metadata = { title: 'About — Ryan Palmieri', description: 'Marketing multi-tool. Brand strategy, creative direction, and AI systems for frontier tech.' }

const experience = [
  { title: 'Head of Marketing (Contract)', company: 'DevSpot', date: '2026–Present' },
  { title: 'Head of Marketing', company: 'Gaia', date: '2024–2026' },
  { title: 'Director of Brand Marketing & Creative', company: '4K Protocol', date: '2021–2024' },
  { title: 'Director / Supervising Producer', company: 'Warner Bros / DC Comics', date: '2019–2020' },
  { title: 'Production Operations & Logistics', company: 'RadicalMedia', date: '2009–2019' },
]

export default function AboutPage() {
  return (
    <main className="content">
      <div className="page-header">
        <FadeIn><h1 className="page-title">About</h1></FadeIn>
      </div>

      <FadeIn>
        <div className="about-bio">
          <p>
            I&apos;m a marketing multi-tool. I build brands, write the narrative, run the team, and execute the campaign, usually for products that don&apos;t fit into any existing category.
          </p>
          <p>
            The last few years: AI infrastructure, Web3, autonomous agents, decentralized networks. Before that, a decade inside production for Nike, Apple, Samsung, and DC Comics. None of which has anything to do with marketing but tells you something about how I think — I also play chess, hockey, and 3 instruments (4 if you include the recorder).
          </p>
          <p>
            If you&apos;re building something the market doesn&apos;t understand yet, that&apos;s usually where I do my best work.
          </p>
        </div>
      </FadeIn>

      {/* Experience */}
      <FadeIn>
        <h2 className="section-label">Experience</h2>
      </FadeIn>
      <ul className="exp-list">
        {experience.map((e, i) => (
          <FadeIn key={e.company + e.date} delay={i * 60}>
            <li className="exp-item">
              <div>
                <span className="exp-title">{e.title}</span>
                <span className="exp-company"> — {e.company}</span>
              </div>
              <span className="exp-date">{e.date}</span>
            </li>
          </FadeIn>
        ))}
      </ul>

      {/* Education */}
      <FadeIn>
        <div style={{ marginTop: 64 }}>
          <h2 className="section-label">Education</h2>
          <p style={{ fontSize: 16, color: 'var(--text)', marginBottom: 8 }}>BA Media Arts, Bloomsburg University</p>
          <p style={{ fontSize: 14, color: 'var(--muted)' }}>Member, Television Academy</p>
        </div>
      </FadeIn>
    </main>
  )
}
