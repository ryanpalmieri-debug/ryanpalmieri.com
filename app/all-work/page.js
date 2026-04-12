import NavStaging from '../../components/staging/NavStaging'
import FooterStaging from '../../components/staging/FooterStaging'
import { client } from '../../lib/sanity/client'
import { worksQuery } from '../../lib/sanity/queries'
import { works as staticWorks } from '../../data/works'

export const revalidate = 10

export const metadata = {
  title: 'All Work — Ryan Palmieri',
}

async function getWorks() {
  try {
    const data = await client.fetch(worksQuery)
    return data && data.length > 0 ? data : staticWorks
  } catch {
    return staticWorks
  }
}

export default async function AllWorkPage() {
  const works = await getWorks()

  return (
    <>
      <NavStaging />
      <main className="pt-[56px] bg-white text-black">
        {/* Header */}
        <section className="px-6 md:px-8 pt-24 md:pt-32 pb-16">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-[11px] uppercase tracking-[0.18em] text-black/50 mb-8">
              All Work
            </p>
            <h1 className="font-serif text-[clamp(2.2rem,5.5vw,6rem)] leading-[0.98] tracking-[-0.03em] max-w-[1100px]">
              <span className="italic font-normal">A complete archive</span>
              <br />
              <span className="font-medium">of selected projects.</span>
            </h1>
          </div>
        </section>

        {/* Full grid of all works */}
        <section className="px-6 md:px-8 pb-24 border-t border-black/10 pt-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
              {works.map((work, i) => (
                <a
                  key={work._id || work.slug || i}
                  href={`/work/${work.slug}`}
                  className="group block"
                >
                  <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-4">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      style={{ backgroundImage: `url(${work.thumbnail})` }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-black/40 mb-1.5">
                        {String(i + 1).padStart(2, '0')} / {work.category || 'Project'}
                      </p>
                      <h3 className="text-[17px] leading-[1.3] tracking-[-0.01em] font-medium text-black">
                        {work.title}
                      </h3>
                    </div>
                    <span className="text-[11px] text-black/40 shrink-0 mt-1">
                      {work.year || ''}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterStaging />
    </>
  )
}
