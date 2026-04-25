export default function ContactBlock() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-panel">
        <div className="contact-panel__head">
          <span className="panel__bar-title">CONTACT.EXE</span>
          <span className="panel__bar-controls">
            <span className="panel__bar-ctrl">_</span>
            <span className="panel__bar-ctrl">x</span>
          </span>
        </div>

        <div className="contact-panel__body">
          <div className="contact-panel__cta">
            <span className="contact-panel__cta-label">Ready to build something great?</span>
            <span className="contact-panel__cta-line">
              &gt; LET&apos;S CONNECT.<span className="contact-panel__cta-cursor" />
            </span>
          </div>

          <div className="contact-panel__info">
            <a href="mailto:ryanpalmieri@gmail.com" className="contact-panel__info-row">
              <svg className="contact-panel__info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" /><path d="m22 7-10 5L2 7" />
              </svg>
              ryanpalmieri@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="contact-panel__info-row">
              <svg className="contact-panel__info-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z"/>
              </svg>
              linkedin.com/in/ryan-palmieri
            </a>
            <span className="contact-panel__info-row" style={{ cursor: 'default' }}>
              <svg className="contact-panel__info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Remote / Worldwide
            </span>
          </div>

          <a href="mailto:ryanpalmieri@gmail.com" className="contact-panel__send">
            SEND MESSAGE <span>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
