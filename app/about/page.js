import { ParenLink } from '../../components/ParenLink'
import { AnimateIn } from '../../components/AnimateIn'

const services = [
  'Brand Strategy',
  'Campaign & Creative Direction',
  'Content Systems & AI Workflows',
  'Go-To-Market Planning',
  'Web3 & Ecosystem Marketing',
  'Community & Growth',
]

const experience = [
  { name: 'Gaia', year: '2022–2026' },
  { name: '4K Protocol', year: '2021–2024' },
  { name: 'DevSpot', year: '2026' },
  { name: 'Samsung', year: 'Prior' },
  { name: 'Nike', year: 'Prior' },
  { name: 'DC Comics', year: 'Prior' },
]

export const metadata = {
  title: 'About — Ryan Palmieri',
}

export default function AboutPage() {
  return (
    <main>
      <div className="page-header">
        <AnimateIn>
          <h1 className="page-title">About</h1>
        </AnimateIn>
        <AnimateIn delay={100}>
          <p className="page-description">
            Senior marketing leader and brand strategist. I build brands, campaigns, and AI-powered content systems for frontier tech companies, Web3 protocols, and global consumer brands.
          </p>
        </AnimateIn>
      </div>

      {/* Hero image */}
      <AnimateIn delay={200}>
        <div className="about-hero-image">
          <img src="/headshot.png" alt="Ryan Palmieri" />
        </div>
      </AnimateIn>

      {/* Services */}
      <section className="about-section">
        <AnimateIn>
          <h3 className="section-label">What I Do</h3>
        </AnimateIn>
        <ul className="divider-list">
          {services.map((s, i) => (
            <AnimateIn key={s} delay={i * 60}>
              <li className="divider-list__item">{s}</li>
            </AnimateIn>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="about-section">
        <AnimateIn>
          <h3 className="section-label">Experience</h3>
        </AnimateIn>
        <ul className="clients-list">
          {experience.map((e, i) => (
            <AnimateIn key={e.name} delay={i * 60}>
              <li className="clients-list__item">
                <span className="clients-list__name">{e.name}</span>
                <span className="clients-list__year">{e.year}</span>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <AnimateIn>
        <div className="about-cta">
          <ParenLink href="mailto:ryanpalmieri@gmail.com" size="lg">
            Get In Touch
          </ParenLink>
        </div>
      </AnimateIn>
    </main>
  )
}
