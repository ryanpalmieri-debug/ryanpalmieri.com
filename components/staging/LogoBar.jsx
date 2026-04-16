'use client'

import { clients } from '../../data/works'

export default function LogoBar() {
  const uniqueClients = [...new Set(clients)]
  const loop = [...uniqueClients, ...uniqueClients]

  return (
    <section className="w-full bg-white py-16 md:py-20 border-t border-b border-black/[0.08] overflow-hidden">
      <div className="relative flex whitespace-nowrap">
        <div className="flex items-center gap-16 animate-marquee-staging">
          {loop.map((client, i) => (
            <div key={i} className="flex items-center gap-16 shrink-0">
              <span className="text-[18px] md:text-[22px] font-medium text-black/35 tracking-tight whitespace-nowrap">{client}</span>
              <span className="text-[10px] text-black/15 select-none">&bull;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
