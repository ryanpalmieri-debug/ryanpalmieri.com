import ContactBlock from '../../components/ContactBlock'

export const metadata = { title: 'Contact — Ryan Palmieri' }

export default function ContactPage() {
  return (
    <main className="contact-page">
      <div style={{ marginBottom: 16 }}>
        <p className="page-subtitle">CONTACT.EXE</p>
        <h1 className="page-title">Let&apos;s connect.</h1>
      </div>
      <div style={{ marginTop: 48 }}>
        <ContactBlock />
      </div>
    </main>
  )
}
