import Link from 'next/link'

const HOME_COPY = {
  headline: ['I work where marketing, brand, creative', <br key="br" />, ' and emerging technology meet.'],
  paragraphs: [
    'I’m a senior marketing and brand leader with experience across AI infrastructure, Web3, entertainment and global campaigns. I’ve built positioning, go-to-market strategies, campaigns, partnerships and content systems — while spending much of my career producing and shaping the creative work itself.',
    'That combination is especially useful when the product is new, technically complex or still defining its category. I build brands for products people don’t have language for yet.',
  ],
}

const FULL_COPY = {
  headline: ['I work where marketing, brand, creative', <br key="br" />, ' and emerging technology meet.'],
  paragraphs: [
    'I started in film, television and commercial production, where ideas have to survive budgets, deadlines, audiences and the realities of making things. That experience still shapes how I lead marketing and creative today.',
    'I moved from production into brand, then into global marketing and go-to-market leadership — increasingly focused on AI, decentralized infrastructure and products creating categories that did not exist a few years earlier.',
    'Today I work across brand, marketing, creative and AI-enabled systems. The connective tissue is the same: understanding something complicated, finding the human story inside it, and building the system that gets that story into the world.',
  ],
}

export default function SectionAbout({ variant = 'home' }) {
  const copy = variant === 'full' ? FULL_COPY : HOME_COPY
  return (
    <section id="about" style={{ width: '100%', background: 'var(--paper)' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(48px, 6vw, 96px)',
        paddingBottom: 'var(--section-pad-y)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 4vw, 56px)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 16,
          paddingBottom: 6, borderBottom: '1px solid var(--ink-15)',
        }}>
          <span className="o-label"><span style={{ color: 'var(--orange)' }}>◆</span>&nbsp; About</span>
          <span className="o-label o-label--muted">Los Angeles, CA</span>
        </div>

        <h2 className="o-display" style={{
          margin: 0, maxWidth: '15em',
          fontSize: 'var(--size-display-md)',
          color: 'var(--ink)',
        }}>
          {copy.headline}
        </h2>

        <div className="o-about-grid">
          <div className="o-card" style={{ alignSelf: 'start' }}>
            <div className="o-card-media" style={{ aspectRatio: '4 / 5' }}>
              <img src="/headshot.png" alt="Ryan Palmieri" style={{ filter: 'grayscale(100%)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 620 }}>
              {copy.paragraphs.map((p, i) => (
                <p key={i} style={paragraphStyle}>{p}</p>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {variant === 'home' && <Link href="/about" className="o-link">More About Ryan →</Link>}
              <a href="/ryan-palmieri-resume.pdf" target="_blank" rel="noopener noreferrer" className="o-link">Resume ↗</a>
              <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="o-link">LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .o-about-grid {
          display: grid;
          grid-template-columns: minmax(240px, 360px) 1fr;
          gap: clamp(28px, 4vw, 64px);
          align-items: start;
        }
        @media (max-width: 860px) {
          .o-about-grid { grid-template-columns: 1fr; }
          .o-about-grid > .o-card { max-width: 340px; }
        }
      `}</style>
    </section>
  )
}

const paragraphStyle = {
  margin: 0, fontSize: 16, fontWeight: 400,
  lineHeight: 1.65, letterSpacing: '-0.01em', color: 'var(--ink-70)',
}
