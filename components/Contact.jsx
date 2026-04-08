'use client'
import { useState, useEffect, useRef } from 'react'

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(0,0,0,0.15)',
  padding: '10px 0',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '16px',
  lineHeight: '20px',
  color: '#000000',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const labelStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'rgba(74,74,74,0.5)',
  display: 'block',
  marginBottom: '6px',
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const headlineRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)

  useEffect(() => {
    const targets = [headlineRef, formRef, infoRef]
    const observers = targets.map((ref, i) => {
      const el = ref.current
      if (!el) return null
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); io.unobserve(el) } },
        { threshold: 0.08 }
      )
      io.observe(el)
      return io
    })
    return () => observers.forEach(io => io && io.disconnect())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const socials = [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
  ]

  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        paddingTop: '100px',
        paddingBottom: '80px',
        paddingLeft: 'clamp(24px, 6vw, 56px)',
        paddingRight: 'clamp(24px, 6vw, 56px)',
      }}
    >
      {/* Headline */}
      <div ref={headlineRef} className="reveal">
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(3rem, 7vw, 8rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.4px',
            color: '#000000',
            marginBottom: '40px',
          }}
        >
          Let&apos;s build<br />something<br />together.
        </h2>
        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(0,0,0,0.1)',
            marginBottom: '64px',
          }}
        />
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        {/* Left — info */}
        <div ref={infoRef} className="reveal delay-1">
          {/* Email */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ ...labelStyle, marginBottom: '10px' }}>Email</p>
            <a
              href="mailto:ryan@ryanpalmieri.com"
              className="link-line"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px',
                lineHeight: '20px',
                color: '#000000',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(0,0,0,0.2)',
                paddingBottom: '2px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#606060')}
              onMouseLeave={e => (e.currentTarget.style.color = '#000000')}
            >
              ryan@ryanpalmieri.com
            </a>
          </div>

          {/* Socials */}
          <div>
            <p style={{ ...labelStyle, marginBottom: '14px' }}>Follow</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(74,74,74,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#606060')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(74,74,74,0.5)')}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div ref={formRef} className="reveal delay-2">
          {submitted ? (
            <div>
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: 1.1,
                  color: '#000000',
                }}
              >
                Message received.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <label style={labelStyle} htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.15)')}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.15)')}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.15)')}
                />
              </div>

              <div>
                <button
                  type="submit"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#000000',
                    background: 'transparent',
                    border: '1px solid #777777',
                    borderRadius: '20px',
                    padding: '10px 28px',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                    letterSpacing: '0.04em',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#000000'
                    e.currentTarget.style.color = '#ffffff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#000000'
                  }}
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
