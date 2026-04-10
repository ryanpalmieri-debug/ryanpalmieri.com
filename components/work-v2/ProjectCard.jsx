'use client'

export default function ProjectCard({ work }) {
  const sectorColors = {
    Technology: 'text-blue-600',
    Culture: 'text-purple-600',
    Sports: 'text-orange-600',
    Film: 'text-red-600',
    Music: 'text-pink-600',
    Web3: 'text-cyan-600',
    Social: 'text-green-600',
  }

  const sectorClass = sectorColors[work.sector] || 'text-black/60'

  return (
    <a
      href={`/work/${work.slug}`}
      className="group block border-t border-black/10 pt-8 pb-12 hover:bg-black/[0.02] transition-colors duration-300 px-4"
    >
      {/* Sector tag */}
      {work.sector && (
        <p className={`text-[11px] font-medium uppercase tracking-wider mb-4 ${sectorClass}`}>
          {work.sector}
        </p>
      )}

      {/* Title */}
      <h3 className="text-[28px] md:text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-black mb-3 max-w-[600px]">
        {work.title}
      </h3>

      {/* Tagline */}
      {work.tagline && (
        <p className="text-[16px] text-black/60 mb-5 max-w-[520px] leading-relaxed">
          {work.tagline}
        </p>
      )}

      {/* Expertise tags */}
      {work.expertise && work.expertise.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {work.expertise.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-black/50 border border-black/15 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Image */}
      {work.thumbnail && (
        <div className="w-full aspect-[16/9] bg-gray-100 overflow-hidden mb-6">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            style={{ backgroundImage: `url(${work.thumbnail})` }}
          />
        </div>
      )}

      {/* Metric + CTA */}
      <div className="flex justify-between items-end gap-4">
        <div className="flex-1">
          {work.metric && (
            <p className="text-[13px] text-black/70 font-medium">
              {work.metric}
            </p>
          )}
          {work.client && (
            <p className="text-[12px] text-black/40 mt-1">
              {work.client} {work.year && `· ${work.year}`}
            </p>
          )}
        </div>
        <span className="text-[13px] text-black font-medium border-b border-black/20 group-hover:border-black pb-0.5 transition-colors shrink-0">
          View case study &rarr;
        </span>
      </div>
    </a>
  )
}
