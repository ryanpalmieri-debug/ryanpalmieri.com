import { clients } from '../data/works'

export default function LogoBar() {
  return (
    <section className="w-full border-t border-b border-zinc-900 py-5 overflow-hidden">
      <div className="flex items-center gap-0 w-full">
        {/* Scrolling track — duplicated for seamless loop */}
        <div className="flex items-center gap-0 animate-marquee whitespace-nowrap" style={{ minWidth: 'max-content' }}>
          {clients.map((client, i) => (
            <span key={i} className="flex items-center gap-10 px-10">
              <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em] hover:text-zinc-300 transition-colors cursor-default">
                {client}
              </span>
              <span className="text-zinc-800 text-lg select-none">×</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
