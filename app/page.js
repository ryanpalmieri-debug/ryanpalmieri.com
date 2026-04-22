import WorkRow from '../components/WorkRow'
import Ticker from '../components/Ticker'
import FadeIn from '../components/FadeIn'

const selectedWork = [
  { num: '01', title: 'The First Autonomous AI Phone', client: 'Gaia x Samsung', slug: 'gaia-samsung', year: '2024', thumbnail: '/work/gaia-token2049.png' },
  { num: '02', title: 'First Autonomous Agents Hackathon', client: 'Gaia', slug: 'agents-hackathon', year: '2024', thumbnail: '/work/gaia-builder-day.png' },
  { num: '03', title: 'Brand & Growth Strategy 2025', client: 'Gaia', slug: 'gaia-2025', year: '2025', thumbnail: '/work/gaia-token2049.png' },
  { num: '04', title: 'DC Visionnaires', client: 'Warner Bros / DC Comics', slug: 'dc-visionnaires', year: '2023', thumbnail: '/work/dc-visionnaires.png' },
  { num: '05', title: 'RWA Protocol Marketing', client: '4K Protocol', slug: '4k-protocol', year: '2021', thumbnail: '/work/4k-protocol.jpg' },
  { num: '06', title: 'Nike Swim Campaign', client: 'Nike', slug: 'nike-swim', year: '2023', thumbnail: '/work/nike-swim.png' },
]

const approach = [
  { num: '01', title: 'Discover & Define', desc: 'Understanding the product, market, and audience. Finding the angle that makes complicated technology feel inevitable.' },
  { num: '02', title: 'Build & Execute', desc: 'Brand systems, campaign creative, content pipelines, and go-to-market strategy — designed, produced, and shipped.' },
  { num: '03', title: 'Measure & Iterate', desc: 'Monitoring what works, cutting what doesn\'t, and continuously refining the strategy based on real signals.' },
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
      {/* ── Mega Hero ── */}
      <section className="mega-hero">
        <h1 className="mega-hero__name">Ryan Palmieri</h1>

        <div className="mega-hero__bar">
          <div className="mega-hero__bar-item">
            <span className="mega-hero__bar-icon">📍</span>
            <span className="mega-hero__bar-title">Based in Los Angeles,</span>
            <span className="mega-hero__bar-sub">California</span>
          </div>
          <div className="mega-hero__bar-item">
            <span className="mega-hero__bar-icon">🌐</span>
            <span className="mega-hero__bar-title">Available All Around</span>
            <span className="mega-hero__bar-sub">Worldwide</span>
          </div>
          <div className="mega-hero__bar-item">
            <span className="mega-hero__bar-icon">✓</span>
            <span className="mega-hero__bar-title">Head of Marketing</span>
            <span className="mega-hero__bar-sub">+ Creative Director</span>
          </div>
        </div>

        <div className="mega-hero__image">
          <img src="/headshot.png" alt="Ryan Palmieri" width={1400} height={788} />
        </div>
      </section>

      {/* ── Ticker ── */}
      <Ticker />

      {/* ── 01 Approach ── */}
      <section className="section section--border">
        <div className="section__head">
          <span className="section__num">01</span>
          <span className="section__title">// Approach</span>
        </div>
        <div className="approach-grid">
          {approach.map((a) => (
            <div key={a.num} className="approach-card">
              <div className="approach-card__num">{a.num}</div>
              <h3 className="approach-card__title">{a.title}</h3>
              <p className="approach-card__desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 02 Selected Work ── */}
      <section className="section section--border">
        <div className="section__head">
          <span className="section__num">02</span>
          <span className="section__title">// Selected Work</span>
        </div>
        {selectedWork.map((w) => (
          <FadeIn key={w.slug}>
            <WorkRow num={w.num} title={w.title} client={w.client} slug={w.slug} year={w.year} thumbnail={w.thumbnail} />
          </FadeIn>
        ))}
      </section>

      {/* ── 03 What I Do ── */}
      <section className="section section--border">
        <div className="section__head">
          <span className="section__num">03</span>
          <span className="section__title">// What I Do</span>
        </div>
        {disciplines.map((d) => (
          <div key={d.num} className="disc-row">
            <span className="disc-row__num">{d.num}</span>
            <span>{d.name}</span>
          </div>
        ))}
      </section>
    </main>
  )
}
