import FadeIn from '../../components/FadeIn'

export const metadata = { title: 'About — Ryan Palmieri' }

const experience = [
  { title: 'Head of Marketing (Contract)', company: 'DevSpot', date: '2026–Present' },
  { title: 'Head of Marketing', company: 'Gaia', date: '2024–2026' },
  { title: 'Director of Brand Marketing & Creative', company: '4K Protocol', date: '2021–2024' },
  { title: 'Director / Supervising Producer', company: 'Warner Bros / DC Comics', date: '2019–2020' },
  { title: 'Production Operations & Logistics', company: 'RadicalMedia', date: '2009–2019' },
]

export default function AboutPage() {
  return (
    <main>
      <section className="section" style={{ paddingTop: 140 }}>
        <div className="section__head">
          <span className="section__num">01</span>
          <span className="section__title">// About</span>
        </div>

        <FadeIn>
          <h1 className="about-statement">
            I&apos;m a marketing multi-tool. I build brands, write the narrative, run the team, and execute the campaign.
          </h1>
        </FadeIn>

        <FadeIn>
          <div className="about-bio">
            <p>
              The last few years: AI infrastructure, Web3, autonomous agents, decentralized networks. Before that, a decade inside production for Nike, Apple, Samsung, and DC Comics. None of which has anything to do with marketing but tells you something about how I think — I also play chess, hockey, and 3 instruments (4 if you include the recorder).
            </p>
            <p>
              If you&apos;re building something the market doesn&apos;t understand yet, that&apos;s usually where I do my best work.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="section section--border">
        <div className="section__head">
          <span className="section__num">02</span>
          <span className="section__title">// Experience</span>
        </div>
        <ul className="exp-list">
          {experience.map((e, i) => (
            <FadeIn key={e.company + e.date} delay={i * 50}>
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
      </section>

      <section className="section section--border">
        <div className="section__head">
          <span className="section__num">03</span>
          <span className="section__title">// Education</span>
        </div>
        <FadeIn>
          <p style={{ fontSize: 17, fontWeight: 400, marginBottom: 8 }}>BA Media Arts, Bloomsburg University</p>
          <p style={{ fontSize: 14, color: 'var(--muted)' }}>Member, Television Academy</p>
        </FadeIn>
      </section>
    </main>
  )
}
