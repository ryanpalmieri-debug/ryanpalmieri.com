import NavStaging from '../../components/staging/NavStaging'
import FooterStaging from '../../components/staging/FooterStaging'
import { clients } from '../../data/works'

export const metadata = {
  title: 'About — Ryan Palmieri',
  description: 'Brand strategist, creative director, and AI builder based in Los Angeles.',
}

export default function AboutPage() {
  const uniqueClients = [...new Set(clients)]

  return (
    <>
      <NavStaging />
      <main className="pt-[56px] bg-white text-black">
        {/* Top large statement */}
        <section className="px-6 md:px-8 pt-24 md:pt-32 pb-20">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-[11px] uppercase tracking-[0.18em] text-black/50 mb-8">
              About
            </p>
            <h1 className="text-[clamp(2.2rem,5vw,5rem)] leading-[1.1] tracking-[-0.03em] font-medium max-w-[900px]">
              I build brands for the machine age. It&apos;s fun.
            </h1>
          </div>
        </section>

        {/* Two column bio */}
        <section className="px-6 md:px-8 pb-24 border-t border-black/10 pt-20">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
            {/* Left: photo */}
            <div>
              <div
                className="w-full aspect-[4/5] bg-gray-100 bg-cover bg-center"
                style={{ backgroundImage: 'url(/headshot.png)' }}
              />
            </div>

            {/* Right: copy */}
            <div className="flex flex-col gap-8 max-w-[560px]">
              <p className="text-[17px] leading-[1.6] text-black/80">
                Ryan Palmieri is a brand strategist, marketing leader, and creative director developing narratives for technically complex, category-defining products. His work spans frontier tech, Web3, documentary film, and global campaigns for companies including Gaia, Samsung, DC Comics, and Nike.
              </p>
              <p className="text-[17px] leading-[1.6] text-black/60">
                Based in Los Angeles, working worldwide. Currently focused on the intersection of brand, AI, and emerging media.
              </p>

              {/* Meta block */}
              <div className="mt-6 grid grid-cols-2 gap-6 pt-8 border-t border-black/10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-black/40 mb-2">Location</p>
                  <p className="text-[14px] text-black">Los Angeles, CA</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-black/40 mb-2">Availability</p>
                  <p className="text-[14px] text-black">Worldwide</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-black/40 mb-2">Experience</p>
                  <a
                    href="/ryan-palmieri-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-black border-b border-black/30 hover:border-black pb-0.5"
                  >
                    Download resume
                  </a>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-black/40 mb-2">Contact</p>
                  <a
                    href="mailto:ryanpalmieri@gmail.com"
                    className="text-[14px] text-black border-b border-black/30 hover:border-black pb-0.5"
                  >
                    ryanpalmieri@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disciplines */}
        <section className="px-6 md:px-8 py-24 border-t border-black/10">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-[11px] uppercase tracking-[0.18em] text-black/50 mb-12">
              Disciplines
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-20 max-w-[900px]">
              {[
                { num: '01', title: 'Brand Strategy', desc: 'Positioning, identity systems, cultural relevance defined with intention.' },
                { num: '02', title: 'Creative Direction', desc: 'End-to-end creative vision across campaigns, content, and platforms.' },
                { num: '03', title: 'Film & Production', desc: 'Directing branded content, documentaries, and campaign films.' },
                { num: '04', title: 'Campaigns & Partnerships', desc: 'Integrated campaigns connecting brands to culture and community.' },
                { num: '05', title: 'Content Systems', desc: 'Scalable content strategy and editorial frameworks.' },
                { num: '06', title: 'AI & Automation', desc: 'Intelligent systems, agents, and pipelines designed for scale.' },
              ].map((d) => (
                <div key={d.num} className="border-t border-black/15 pt-6">
                  <p className="text-[11px] text-black/40 mb-3">{d.num}</p>
                  <h3 className="text-[22px] font-medium tracking-[-0.01em] mb-3">{d.title}</h3>
                  <p className="text-[14px] text-black/60 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients / logos */}
        <section className="px-6 md:px-8 py-20 border-t border-black/10">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-[11px] uppercase tracking-[0.18em] text-black/50 mb-12">
              Selected Clients
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-6 gap-x-8">
              {uniqueClients.map((c) => (
                <div
                  key={c}
                  className="text-[12px] uppercase tracking-wide text-black/40 hover:text-black/80 transition-colors"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterStaging />
    </>
  )
}
