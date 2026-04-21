import FadeIn from '../../components/FadeIn'

export const metadata = { title: 'Contact — Ryan Palmieri' }

export default function ContactPage() {
  return (
    <main className="content contact">
      <FadeIn>
        <h1>Let&apos;s talk.</h1>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="contact__item">
          <p className="contact__label">Email</p>
          <a href="mailto:ryanpalmieri@gmail.com" className="contact__link">ryanpalmieri@gmail.com</a>
        </div>
      </FadeIn>

      <FadeIn delay={150}>
        <div className="contact__item">
          <p className="contact__label">LinkedIn</p>
          <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="contact__link">linkedin.com/in/ryan-palmieri</a>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <p className="contact__note">
          Open to Head of Marketing, VP Marketing, and Creative Director roles. Remote preferred.
        </p>
      </FadeIn>
    </main>
  )
}
