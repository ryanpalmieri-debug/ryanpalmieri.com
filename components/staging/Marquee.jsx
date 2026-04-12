'use client'

const items = [
  'Featured Work',
  'Brand Strategy',
  'Creative Direction',
  'Film & Production',
  'Campaigns',
  'AI & Automation',
  'Content Systems',
  'Available 2025',
]

export default function Marquee() {
  // Duplicate for seamless loop
  const loop = [...items, ...items]

  return (
    <section className="w-full bg-white py-10 md:py-16 border-b border-black/[0.08] overflow-hidden">
      <div className="relative flex whitespace-nowrap">
        <div className="flex items-center gap-14 animate-marquee-staging">
          {loop.map((item, i) => (
            <div key={i} className="flex items-center gap-14 shrink-0">
              <span
                className="font-serif text-black whitespace-nowrap"
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
                  lineHeight: '1',
                  letterSpacing: '-0.02em',
                  fontStyle: i % 2 === 0 ? 'normal' : 'italic',
                  fontWeight: i % 2 === 0 ? 500 : 400,
                }}
              >
                {item}
              </span>
              <span className="text-[2rem] md:text-[3rem] text-black/15 select-none font-serif">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
