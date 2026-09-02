export default function SectionContact() {
  return (
    <section id="contact" style={{ width: '100%', background: 'var(--color-black)', color: 'var(--color-white)' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(72px, 8vw, 140px)',
        paddingBottom: 'clamp(72px, 8vw, 140px)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 5vw, 72px)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 16,
          paddingTop: 20, borderTop: '1px solid var(--color-paper-15)',
        }}>
          <span className="o-label o-label--paper"><sup style={{ color: 'var(--color-paper-50)', marginRight: 4 }}>(04)</sup> Contact</span>
          <span className="o-label o-label--paper-muted">Open to new work</span>
        </div>

        <h2 className="o-display" style={{
          margin: 0,
          fontSize: 'var(--size-display-lg)',
          color: 'var(--color-white)',
          maxWidth: '12em',
        }}>
          Let&apos;s build something worth remembering.
        </h2>

        <div>
          <a href="mailto:ryanpalmieri@gmail.com" className="o-contact-email o-display">
            ryanpalmieri@gmail.com&nbsp;↗
          </a>
        </div>
      </div>

      <style>{`
        .o-contact-email {
          display: inline-block;
          font-size: clamp(20px, 3.2vw, 44px);
          color: var(--color-white);
          text-decoration: none;
          border-bottom: 1px solid var(--color-paper-50);
          padding-bottom: 8px;
          transition: border-color 400ms ease, opacity 400ms ease;
          overflow-wrap: anywhere;
        }
        .o-contact-email:hover {
          border-color: var(--color-white);
          opacity: 0.8;
        }
      `}</style>
    </section>
  )
}
