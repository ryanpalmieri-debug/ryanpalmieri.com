export default function SectionAbout() {
  return (
    <section id="about" className="auvra-section" style={{ scrollMarginTop: 'var(--nav-h)' }}>
      <div className="auvra-section-inner" style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
        <span className="auvra-eyebrow">About</span>

        <div className="auvra-about-grid">
          <div className="auvra-about-photo">
            <img
              src="/headshot.png"
              alt="Ryan Palmieri"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <h2 className="auvra-h2" style={{ maxWidth: '18ch' }}>
              I turn complex technology into brands people understand.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 640 }}>
              <p className="auvra-body">
                I&apos;m a senior marketing and brand leader working across AI infrastructure, Web3, entertainment, and global campaigns —
                from early-stage positioning to enterprise-scale launch.
              </p>
              <p className="auvra-body">
                I started in film and commercial production, where I learned to build stories under real constraints with real stakes.
                That craft is still the foundation — I just apply it to technically complex products that need a human story before they can scale.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
              <a href="/ryan-palmieri-resume.pdf" target="_blank" rel="noopener noreferrer" className="auvra-pill">
                View Resume <Arrow />
              </a>
              <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="auvra-pill auvra-pill--ghost">
                LinkedIn <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .auvra-about-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 80px;
          align-items: start;
        }
        .auvra-about-photo {
          width: 100%;
          aspect-ratio: 4 / 5;
          background: var(--auvra-line);
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .auvra-about-grid { grid-template-columns: 1fr; gap: 32px; }
          .auvra-about-photo { max-width: 320px; }
        }
      `}</style>
    </section>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
