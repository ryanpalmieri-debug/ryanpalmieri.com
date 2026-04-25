import Link from 'next/link'

const background = [
  { role: 'Head of Marketing', meta: 'GAIA · 2024 — 2026' },
  { role: 'Director, Brand & Creative', meta: '4K PROTOCOL · 2021 — 2024' },
  { role: 'Supervising Producer', meta: 'WARNER BROS / DC · 2019 — 2020' },
  { role: 'Production Operations', meta: 'RADICALMEDIA · 2009 — 2019' },
]

export default function AboutBlock() {
  return (
    <section className="about-section" id="about">
      <div className="about-panel">
        <div className="about-panel__head">
          <span className="panel__bar-title">ABOUT.SYS</span>
          <span className="panel__bar-title">SELECTED BACKGROUND</span>
        </div>

        <div className="about-panel__body">
          <div className="about-panel__photo">
            <img src="/headshot.png" alt="Ryan Palmieri" />
          </div>

          <div className="about-panel__copy">
            <h3>Senior marketing leader.<br />Strategist. Builder. Operator.</h3>
            <p>
              I build brands at the intersection of technology, culture, and experience. With a background in storytelling and a deep understanding of systems, I help companies turn complex ideas into brands that connect.
            </p>
            <p>Strategy first. Design always. Impact only.</p>
            <Link href="/about" className="about-panel__copy-link">
              READ MORE &rarr;
            </Link>
          </div>

          <div>
            <p className="about-panel__list-title">Background</p>
            <ul className="about-panel__list">
              {background.map((item) => (
                <li key={item.meta} className="about-panel__list-item">
                  <span className="about-panel__list-role">{item.role}</span>
                  <span className="about-panel__list-meta">{item.meta}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
