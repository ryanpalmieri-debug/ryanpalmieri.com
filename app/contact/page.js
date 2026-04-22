import FadeIn from '../../components/FadeIn'

export const metadata = { title: 'Contact — Ryan Palmieri' }

export default function ContactPage() {
  return (
    <main className="contact-page">
      <FadeIn>
        <h1>Let&apos;s talk.</h1>
      </FadeIn>

      <FadeIn delay={80}>
        <div className="contact-item">
          <p className="contact-label">Email</p>
          <a href="mailto:ryanpalmieri@gmail.com" className="contact-link">ryanpalmieri@gmail.com</a>
        </div>
      </FadeIn>

      <FadeIn delay={120}>
        <div className="contact-item">
          <p className="contact-label">LinkedIn</p>
          <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="contact-link">linkedin.com/in/ryan-palmieri</a>
        </div>
      </FadeIn>

      <FadeIn delay={160}>
        <p className="contact-note">
          Open to Head of Marketing, VP Marketing, and Creative Director roles. Remote preferred.
        </p>
      </FadeIn>
    </main>
  )
}
