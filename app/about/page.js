import { AnimateIn } from '../../components/AnimateIn'

const disciplines = [
  'Brand Strategy',
  'Campaign & Creative Direction',
  'Content Systems & AI Workflows',
  'Go-To-Market Planning',
  'Web3 & Ecosystem Marketing',
  'Film & Production',
]

const experience = [
  { company: 'Gaia', date: '2022 — 2026' },
  { company: '4K Protocol', date: '2021 — 2024' },
  { company: 'DevSpot', date: '2026' },
  { company: 'Samsung', date: 'Prior' },
  { company: 'Nike', date: 'Prior' },
  { company: 'DC Comics', date: 'Prior' },
  { company: 'Warner Bros.', date: 'Prior' },
]

export const metadata = { title: 'About — Ryan Palmieri' }

export default function AboutPage() {
  return (
    <main>
      {/* Opening statement */}
      <section className="about-statement">
        <AnimateIn>
          <p className="statement-line">I believe every</p>
          <p className="statement-line">brand has a</p>
        </AnimateIn>
        <AnimateIn delay={100}>
          <div className="statement-image">
            <img src="/headshot.png" alt="Ryan Palmieri" />
          </div>
        </AnimateIn>
        <AnimateIn delay={200}>
          <p className="statement-line">story worth</p>
          <p className="statement-line statement-line--muted">telling well.</p>
        </AnimateIn>
      </section>

      {/* Bio */}
      <AnimateIn delay={100}>
        <div className="about-bio">
          <p>
            Ryan Palmieri is a senior marketing leader, brand strategist, and creative director. He builds brands, campaigns, and AI-powered content systems for frontier tech companies, Web3 protocols, and global consumer brands — including Gaia, Samsung, DC Comics, and Nike. Based in Los Angeles.
          </p>
        </div>
      </AnimateIn>

      {/* Disciplines */}
      <section className="about-disciplines">
        <AnimateIn>
          <span className="section-label">What I Do</span>
        </AnimateIn>
        <ul className="divider-list">
          {disciplines.map((d, i) => (
            <AnimateIn key={d} delay={i * 60}>
              <li>{d}</li>
            </AnimateIn>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="about-experience">
        <AnimateIn>
          <span className="section-label">Experience</span>
        </AnimateIn>
        <ul className="experience-list">
          {experience.map((e, i) => (
            <AnimateIn key={e.company} delay={i * 60}>
              <li className="experience-item">
                <span className="experience-item__company">{e.company}</span>
                <span className="experience-item__date">{e.date}</span>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </section>

      {/* Closing image */}
      <AnimateIn>
        <div className="about-closing-image">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop" alt="" />
        </div>
      </AnimateIn>
    </main>
  )
}
