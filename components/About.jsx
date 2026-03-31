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
    { value: '10+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '3', label: 'Continents' },
  ]

  return (
    <section id="about" className="w-full px-4 md:px-10 py-32 border-t border-zinc-900">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">

        {/* Left — label + stats */}
        <div className="md:col-span-4 flex flex-col justify-between gap-16">
          <div>
            <p className="text-zinc-600 text-xs uppercase tracking-widest font-semibold mb-4">About</p>
            <h2
              className="text-white font-black uppercase"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.04em', lineHeight: '0.9' }}
            >
              The Work.<br />The Vision.
            </h2>
            <div className="w-10 h-px bg-white mt-8" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-1 gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className="text-white font-black"
                  style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', letterSpacing: '-0.04em', lineHeight: '1' }}
                >
                  {s.value}
                </p>
                <p className="text-zinc-600 text-xs uppercase tracking-widest font-semibold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — bio + disciplines */}
        <div className="md:col-span-8 flex flex-col gap-12">
          <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-medium" style={{ letterSpacing: '-0.02em' }}>
            Placeholder — Ryan Palmieri is a creative director, producer, and strategist who builds at the intersection of culture, technology, and brand. His work spans global campaigns, documentary film, and emerging-tech platforms — always grounded in authentic storytelling and high-contrast creative vision.
          </p>

          <p className="text-zinc-500 text-base leading-relaxed">
            Placeholder — From directing branded content for Fortune 500 companies to producing independent film, Ryan brings a producer's instinct and a director's eye to every project. He's collaborated with brands including Samsung, Syngenta, DC, and the Ethereum Foundation — as well as emerging organizations redefining their industries.
          </p>

          {/* Disciplines */}
          <div className="border-t border-zinc-900 pt-10">
            <p className="text-zinc-600 text-xs uppercase tracking-widest font-semibold mb-6">Disciplines</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {disciplines.map((d) => (
                <div
                  key={d}
                  className="flex items-center gap-3 text-zinc-400 text-sm font-medium"
                >
                  <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
