import Link from 'next/link'
import LocalTime from './LocalTime'

export default function Footer() {
  return (
    <footer style={{ width: '100%', background: 'var(--black)', color: 'var(--paper-on-black)' }}>
      <div className="o-container" style={{
        display: 'flex', flexDirection: 'column',
        gap: 'clamp(40px, 5vw, 72px)',
        paddingTop: 'clamp(40px, 4vw, 64px)',
        paddingBottom: 24,
      }}>
        <div className="o-footer-cols">
          <div className="o-footer-col">
            <span className="o-label o-label--paper-muted">Sitemap</span>
            <Link href="/work" className="o-footer-link">Work</Link>
            <Link href="/about" className="o-footer-link">About</Link>
            <a href="mailto:ryanpalmieri@gmail.com" className="o-footer-link">Contact</a>
          </div>
          <div className="o-footer-col">
            <span className="o-label o-label--paper-muted">Socials</span>
            <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="o-footer-link">LinkedIn ↗</a>
            <a href="https://x.com/ryanppalmieri" target="_blank" rel="noopener noreferrer" className="o-footer-link">X ↗</a>
          </div>
          <div className="o-footer-col o-footer-col--right">
            <span className="o-label o-label--paper-muted">Local Time</span>
            <span className="o-footer-link" style={{ fontVariantNumeric: 'tabular-nums' }}><LocalTime /></span>
            <span className="o-label o-label--paper-muted" style={{ marginTop: 2 }}>Los Angeles, CA</span>
          </div>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div className="o-display o-footer-wordmark" aria-hidden="true">
            Ryan Palmieri<sup style={{ fontSize: '0.32em', verticalAlign: 'super' }}>®</sup>
          </div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 16, flexWrap: 'wrap',
          paddingTop: 18, borderTop: '1px solid var(--paper-on-black-15)',
        }}>
          <span className="o-label o-label--paper-muted">© 2026 Ryan Palmieri. All rights reserved.</span>
          <span className="o-label o-label--paper-muted">Brand — Marketing — Strategy</span>
        </div>
      </div>

      <style>{`
        .o-footer-cols {
          display: grid;
          grid-template-columns: repeat(3, auto);
          justify-content: space-between;
          gap: 40px;
        }
        .o-footer-col { display: flex; flex-direction: column; gap: 9px; }
        .o-footer-col--right { text-align: right; }
        .o-footer-link {
          font-family: var(--font-body);
          font-size: 14px; font-weight: 400; letter-spacing: -0.01em;
          color: var(--paper-on-black); text-decoration: none;
          transition: color 240ms ease;
        }
        a.o-footer-link:hover { color: var(--orange); }
        .o-footer-wordmark {
          font-size: clamp(48px, 13vw, 240px);
          line-height: 0.9;
          white-space: nowrap;
          color: var(--paper-on-black);
          text-align: center;
        }
        @media (max-width: 620px) {
          .o-footer-cols { grid-template-columns: 1fr 1fr; }
          .o-footer-col--right { text-align: left; }
        }
      `}</style>
    </footer>
  )
}
