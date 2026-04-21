import WorkRow from '../components/WorkRow'
import Ticker from '../components/Ticker'
import FadeIn from '../components/FadeIn'

const selectedWork = [
  { num: '01', title: 'The First Autonomous AI Phone', client: 'Gaia x Samsung', slug: 'gaia-samsung', thumbnail: '/work/gaia-token2049.png' },
  { num: '02', title: 'First Autonomous Agents Hackathon', client: 'Gaia', slug: 'agents-hackathon', thumbnail: '/work/gaia-builder-day.png' },
  { num: '03', title: 'Brand & Growth Strategy 2025', client: 'Gaia', slug: 'gaia-2025', thumbnail: '/work/gaia-token2049.png' },
  { num: '04', title: 'DC Visionnaires', client: 'Warner Bros / DC Comics', slug: 'dc-visionnaires', thumbnail: '/work/dc-visionnaires.png' },
  { num: '05', title: 'RWA Protocol Marketing', client: '4K Protocol', slug: '4k-protocol', thumbnail: '/work/4k-protocol.jpg' },
  { num: '06', title: 'Nike Swim Campaign', client: 'Nike', slug: 'nike-swim', thumbnail: '/work/nike-swim.png' },
]

const disciplines = [
  { num: '01', name: 'Brand Strategy' },
  { num: '02', name: 'Go-to-Market' },
  { num: '03', name: 'Creative Direction' },
  { num: '04', name: 'Content Systems' },
  { num: '05', name: 'Developer Marketing' },
  { num: '06', name: 'AI & Automation' },
]

export default function HomePage() {
  return (
    <main>
      <section className="content hero">
        <FadeIn>
          <h1 className="hero__headline">I&apos;m a marketing<br />multi-tool.</h1>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="hero__body">
            I build brands, write the narrative, run the team, and execute the campaign, usually for products that don&apos;t fit into any existing category. The last few years: AI infrastructure, Web3, autonomous agents, decentralized networks. Before that, a decade inside production for Nike, Apple, Samsung, and DC Comics.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="hero__links">
            <a href="/work">View Work &rarr;</a>
            <a href="/contact">Get in touch &rarr;</a>
          </div>
        </FadeIn>
      </section>

      <Ticker />

      <section className="content" style={{ marginBottom: 80 }}>
        <FadeIn><h2 className="section-label">Selected Work</h2></FadeIn>
        {selectedWork.map((w, i) => (
          <FadeIn key={w.slug} delay={i * 60}>
            <WorkRow num={w.num} title={w.title} client={w.client} slug={w.slug} thumbnail={w.thumbnail} />
          </FadeIn>
        ))}
      </section>

      <section className="content" style={{ marginBottom: 120 }}>
        <FadeIn><h2 className="section-label">What I Do</h2></FadeIn>
        {disciplines.map((d, i) => (
          <FadeIn key={d.num} delay={i * 60}>
            <div className="disc-row">
              <span className="disc-row__num">{d.num}</span>
              <span>{d.name}</span>
            </div>
          </FadeIn>
        ))}
      </section>
    </main>
  )
}
