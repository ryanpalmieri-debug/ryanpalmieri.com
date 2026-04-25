import Link from 'next/link'

const background = [
  {
    logo: 'gaia',
    role: 'Head of Marketing',
    meta: 'Scaled active nodes from 80K to 700K+',
  },
  {
    logo: 'SAMSUNG',
    role: 'Global Brand Marketing Lead',
    meta: 'Digital & mobility',
  },
  {
    logo: 'Nike',
    role: 'Brand Marketing',
    meta: 'Global campaigns',
  },
  {
    logo: 'DC',
    role: 'Integrated Marketing',
    meta: 'Fan & brand experiences',
  },
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
            <h3>
              Senior marketing leader.<br />
              Strategist. Builder. Operator.<span className="hero__cursor" aria-hidden="true" />
            </h3>
            <p>
              I&apos;ve led marketing and brand for AI infrastructure and developer platforms, scaling from early stage to global impact.
            </p>
            <Link href="/about" className="about-panel__copy-link">
              READ MORE &rarr;
            </Link>
          </div>

          <div className="about-panel__bg-list">
            {background.map((item) => (
              <div key={item.logo} className="about-panel__bg-item">
                <span className="about-panel__bg-logo">{item.logo}</span>
                <div className="about-panel__bg-text">
                  <span className="about-panel__bg-role">{item.role}</span>
                  <span className="about-panel__bg-meta">{item.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
