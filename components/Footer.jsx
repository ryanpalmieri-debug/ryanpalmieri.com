export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__col">
          <span className="footer__label">Socials</span>
          <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://x.com/ryanppalmieri" target="_blank" rel="noopener noreferrer">Twitter / X</a>
        </div>
        <div className="footer__col">
          <span className="footer__label">Work</span>
          <a href="/work">All Projects</a>
        </div>
        <div className="footer__col">
          <span className="footer__label">Let&apos;s Talk</span>
          <a href="mailto:ryanpalmieri@gmail.com">ryanpalmieri@gmail.com</a>
        </div>
        <div className="footer__col">
          <span className="footer__label">About</span>
          <a href="/about">About Me</a>
        </div>
      </div>
    </footer>
  )
}
