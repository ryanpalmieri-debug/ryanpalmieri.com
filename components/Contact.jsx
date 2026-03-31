'use client'
import { useState } from 'react'

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Wire up to form service (Formspree, Resend, etc.) later
    setSubmitted(true)
  }

  const socials = [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
  ]

  return (
    <section id="contact" className="w-full border-t border-zinc-900">
      {/* Big CTA heading */}
      <div className="px-4 md:px-6 pt-24 pb-16 border-b border-zinc-900">
        <h2
          className="font-black uppercase text-white"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 14rem)',
            letterSpacing: '-0.04em',
            lineHeight: '0.88',
          }}
        >
          Let's<br />Build<br />Something.
        </h2>
      </div>

      {/* Form + info row */}
      <div className="px-4 md:px-10 py-24 grid grid-cols-1 md:grid-cols-12 gap-16 max-w-screen-xl mx-auto">

        {/* Left — info */}
        <div className="md:col-span-4 flex flex-col gap-10">
          <div>
            <p className="text-zinc-600 text-xs uppercase tracking-widest font-semibold mb-3">Email</p>
            <a
              href="mailto:ryan@ryanpalmieri.com"
              className="text-white text-lg font-medium link-hover hover:text-zinc-300 transition-colors"
            >
              ryan@ryanpalmieri.com
            </a>
          </div>

          <div>
            <p className="text-zinc-600 text-xs uppercase tracking-widest font-semibold mb-4">Socials</p>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 text-sm font-medium link-hover hover:text-white transition-colors flex items-center gap-2 group"
                >
                  {s.label}
                  <svg
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                  >
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="md:col-span-7 md:col-start-6">
          {submitted ? (
            <div className="flex flex-col gap-4 justify-center h-full">
              <p
                className="text-white font-black uppercase"
                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.04em', lineHeight: '0.9' }}
              >
                Message<br />Received.
              </p>
              <p className="text-zinc-500 text-base">I'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-600 text-xs uppercase tracking-widest font-semibold">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                    className="bg-transparent border-b border-zinc-800 py-3 text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-600 text-xs uppercase tracking-widest font-semibold">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                    className="bg-transparent border-b border-zinc-800 py-3 text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-zinc-600 text-xs uppercase tracking-widest font-semibold">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                  className="bg-transparent border-b border-zinc-800 py-3 text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <p className="text-zinc-600 text-xs">I typically respond within 24 hours.</p>
                <button
                  type="submit"
                  className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2 group"
                >
                  Send
                  <svg
                    className="group-hover:translate-x-0.5 transition-transform"
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                  >
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H3.5M9.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
