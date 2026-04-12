'use client'

export default function FooterStaging() {
  return (
    <footer className="w-full bg-black text-white">
      {/* Top CTA area */}
      <div className="px-6 md:px-8 pt-24 md:pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-8">
            Contact
          </p>
          <h2 className="font-serif text-[clamp(2.8rem,7vw,7.5rem)] leading-[0.92] tracking-[-0.03em] mb-12">
            <span className="italic font-normal">Let&apos;s build</span>
            <br />
            <span className="font-medium">together.</span>
          </h2>
          <a
            href="mailto:ryanpalmieri@gmail.com"
            className="inline-flex items-center gap-3 text-[15px] text-white/80 border-b border-white/30 hover:border-white pb-0.5 transition-colors"
          >
            ryanpalmieri@gmail.com &rarr;
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 md:px-8 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[12px] text-white/40">
          <div className="flex flex-wrap gap-6">
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/all-work" className="hover:text-white transition-colors">All Work</a>
            <a href="mailto:ryanpalmieri@gmail.com" className="hover:text-white transition-colors">Email</a>
            <a href="https://www.linkedin.com/in/ryan-palmieri-715190213/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://x.com/ryanppalmieri" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>
          </div>
          <p>&copy; {new Date().getFullYear()} Ryan Palmieri</p>
        </div>
      </div>
    </footer>
  )
}
