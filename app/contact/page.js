import { AnimateIn } from '../../components/AnimateIn'

export const metadata = { title: 'Contact — Ryan Palmieri' }

export default function ContactPage() {
  return (
    <main className="contact-page">
      <AnimateIn>
        <div className="contact-item">
          <span className="contact-item__label">send an email</span>
          <a href="mailto:ryanpalmieri@gmail.com" className="contact-item__link">
            RYANPALMIERI@GMAIL.COM
          </a>
        </div>
      </AnimateIn>

      <AnimateIn delay={100}>
        <div className="contact-item">
          <span className="contact-item__label">connect</span>
          <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="contact-item__link">
            LinkedIn
          </a>
        </div>
      </AnimateIn>

      <AnimateIn delay={200}>
        <div className="contact-item">
          <span className="contact-item__label">follow</span>
          <a href="https://x.com/ryanppalmieri" target="_blank" rel="noopener noreferrer" className="contact-item__link">
            Twitter / X
          </a>
        </div>
      </AnimateIn>
    </main>
  )
}
