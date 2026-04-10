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
    <section className="w-full bg-white py-8 md:py-12 border-b border-black/[0.08] overflow-hidden">
      <div className="relative flex whitespace-nowrap">
        <div className="flex items-center gap-12 animate-marquee-staging">
          {loop.map((item, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span className="text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-0.02em] text-black">
                {item}
              </span>
              <span className="text-[2rem] md:text-[3rem] text-black/20 select-none">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
