import { ParenLink } from './ParenLink'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <ParenLink href="/" size="sm">Ryan Palmieri</ParenLink>
        <ParenLink href="mailto:ryanpalmieri@gmail.com" size="sm">ryanpalmieri@gmail.com</ParenLink>
      </div>
      <hr className="footer__divider" />
      <div className="footer__bottom">
        <span>&copy; 2026 Ryan Palmieri. All rights reserved.</span>
      </div>
    </footer>
  )
}
