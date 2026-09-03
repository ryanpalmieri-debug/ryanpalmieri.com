export default function SectionContact() {
  return (
    <section id="contact" style={{ width: '100%', background: 'var(--orange)', color: 'var(--black)' }}>
      <div className="o-container" style={{
        paddingTop: 'clamp(64px, 8vw, 128px)',
        paddingBottom: 'clamp(64px, 8vw, 128px)',
        display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 4vw, 56px)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 16,
          paddingBottom: 6, borderBottom: '1px solid rgba(10,10,8,0.25)',
        }}>
          <span className="o-label" style={{ color: 'var(--black)' }}>◆&nbsp; Contact</span>
          <span className="o-label" style={{ color: 'rgba(10,10,8,0.6)' }}>Open to new work</span>
        </div>

        <h2 className="o-display" style={{
          margin: 0, fontSize: 'var(--size-display-lg)', color: 'var(--black)', maxWidth: '12em',
        }}>
          Let&apos;s build something worth remembering.
        </h2>

        <a href="mailto:ryanpalmieri@gmail.com" className="o-contact-email o-display">
          ryanpalmieri@gmail.com&nbsp;↗
        </a>
      </div>

      <style>{`
        .o-contact-email {
          display: inline-block;
          font-size: clamp(22px, 3.4vw, 52px);
          text-transform: none;
          letter-spacing: -0.02em;
          color: var(--black);
          text-decoration: none;
          border-bottom: 2px solid var(--black);
          padding-bottom: 6px;
          overflow-wrap: anywhere;
          transition: opacity 260ms ease;
        }
        .o-contact-email:hover { opacity: 0.65; }
      `}</style>
    </section>
  )
}
