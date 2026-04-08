import { useEffect, useRef } from 'react'

export default function About() {
  const disciplines = [
    'Creative Direction',
    'Brand Strategy',
    'Film & Production',
    'Campaign Development',
    'Content Systems',
    'Creative Partnerships',
  ]

  const stats = [
    { value: '10+', label: 'Years' },
    { value: '50+', label: 'Projects' },
    { value: '3', label: 'Continents' },
  ]

  const refs = {
    label: useRef(null),
    headline: useRef(null),
    bio1: useRef(null),
    bio2: useRef(null),
    stats: useRef(null),
    disciplines: useRef(null),
  }

  useEffect(() => {
    const observe = (ref) => {
      const el = ref.current
      if (!el) return
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); io.unobserve(el) } },
        { threshold: 0.12 }
      )
      io.observe(el)
      return io
    }
    const observers = Object.values(refs).map(observe)
    return () => observers.forEach(io => io && io.disconnect())
  }, [])

  return (
    <section
      id="about"
      style={{
        backgroundColor: '#ffffff',
        paddingTop: '100px',
        paddingBottom: '100px',
        paddingLeft: 'clamp(24px, 6vw, 56px)',
        paddingRight: 'clamp(24px, 6vw, 56px)',
      }}
    >
      <div style={{ maxWidth: '900px' }}>
        {/* Label */}
        <p
          ref={refs.label}
          className="reveal"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '13px',
            color: '#3918A5',
            letterSpacing: '0.06em',
            marginBottom: '16px',
          }}
        >
          About
        </p>

        {/* Headline */}
        <h2
          ref={refs.headline}
          className="reveal delay-1"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.4px',
            color: '#000000',
            marginBottom: '0',
          }}
        >
          The work.<br />The vision.
        </h2>

        {/* Divider */}
        <div
          style={{
            width: '40px',
            height: '1px',
            backgroundColor: '#000000',
            marginTop: '32px',
            marginBottom: '32px',
          }}
        />

        {/* Bio 1 */}
        <p
          ref={refs.bio1}
          className="reveal"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '16px',
            lineHeight: '20px',
            color: '#000000',
            marginBottom: '24px',
          }}
        >
          Placeholder — Ryan Palmieri is a creative director, producer, and strategist who builds at the intersection of culture, technology, and brand. His work spans global campaigns, documentary film, and emerging-tech platforms — always grounded in authentic storytelling.
        </p>

        {/* Bio 2 */}
        <p
          ref={refs.bio2}
          className="reveal delay-2"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '16px',
            lineHeight: '20px',
            color: 'rgba(74,74,74,0.5)',
            marginBottom: '56px',
          }}
        >
          Placeholder — From directing branded content for Fortune 500 companies to producing independent film, Ryan brings a producer&apos;s instinct and a director&apos;s eye to every project.
        </p>

        {/* Stats row */}
        <div
          ref={refs.stats}
          className="reveal delay-3"
          style={{
            display: 'flex',
            gap: '56px',
            marginBottom: '56px',
            flexWrap: 'wrap',
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '3.5rem',
                  fontWeight: 400,
                  color: '#000000',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(74,74,74,0.5)',
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Disciplines */}
        <div
          ref={refs.disciplines}
          className="reveal delay-4"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px 40px',
            }}
          >
            {disciplines.map((d) => (
              <div
                key={d}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(74,74,74,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(74,74,74,0.3)',
                    flexShrink: 0,
                  }}
                />
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
