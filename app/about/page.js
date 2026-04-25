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
    <main>
      <div className="page-header">
        <p className="page-subtitle">ABOUT.SYS</p>
        <h1 className="page-title">A marketing multi-tool.</h1>
      </div>

      <section className="about-section" style={{ marginTop: 0 }}>
        <div className="about-panel">
          <div className="about-panel__head">
            <span className="panel__bar-title">PROFILE.TXT</span>
            <span className="panel__bar-controls">
              <span className="panel__bar-ctrl">_</span>
              <span className="panel__bar-ctrl">x</span>
            </span>
          </div>
          <div className="about-panel__body" style={{ gridTemplateColumns: '220px 1fr' }}>
            <div className="about-panel__photo">
              <img src="/headshot.png" alt="Ryan Palmieri" />
            </div>
            <div className="about-panel__copy">
              <h3>I build brands, write the narrative, run the team, and execute the campaign.</h3>
              <p>
                The last few years: AI infrastructure, Web3, autonomous agents, decentralized networks. Before that, a decade inside production for Nike, Apple, Samsung, and DC Comics. None of which has anything to do with marketing but tells you something about how I think — I also play chess, hockey, and 3 instruments (4 if you include the recorder).
              </p>
              <p>
                If you&apos;re building something the market doesn&apos;t understand yet, that&apos;s usually where I do my best work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-panel">
          <div className="about-panel__head">
            <span className="panel__bar-title">EXPERIENCE.LOG</span>
            <span className="panel__bar-title">2009 — PRESENT</span>
          </div>
          <div style={{ padding: 32 }}>
            <ul className="about-panel__list">
              {experience.map((e) => (
                <li key={e.company + e.date} className="about-panel__list-item">
                  <span className="about-panel__list-role">{e.title}</span>
                  <span className="about-panel__list-meta">{e.company.toUpperCase()} · {e.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-panel">
          <div className="about-panel__head">
            <span className="panel__bar-title">EDUCATION.TXT</span>
          </div>
          <div style={{ padding: 32 }}>
            <p className="about-panel__list-role" style={{ marginBottom: 8 }}>BA Media Arts, Bloomsburg University</p>
            <p className="about-panel__list-meta">Member, Television Academy</p>
          </div>
        </div>
      </section>
    </main>
  )
}
