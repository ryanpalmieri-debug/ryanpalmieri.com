'use client'

import { useState, useMemo } from 'react'
import ProjectCard from './ProjectCard'
import FilterBar from './FilterBar'

export default function WorkGridV2({ works = [] }) {
  const [activeFilters, setActiveFilters] = useState({
    sector: [],
    expertise: [],
  })

  const filtered = useMemo(() => {
    return works.filter((w) => {
      // Sector: if any filters set, project sector must match one
      if (activeFilters.sector.length > 0) {
        if (!w.sector || !activeFilters.sector.includes(w.sector)) return false
      }
      // Expertise: if any filters set, project must have at least one matching expertise
      if (activeFilters.expertise.length > 0) {
        if (!w.expertise || !w.expertise.some((e) => activeFilters.expertise.includes(e))) {
          return false
        }
      }
      return true
    })
  }, [works, activeFilters])

  return (
    <section className="w-full bg-white pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Page header */}
        <div className="mb-16">
          <p className="text-[11px] text-black/40 font-medium uppercase tracking-wider mb-6">
            Work
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-black mb-8 max-w-[900px]">
            Selected projects.
            <br />
            Filtered by intent.
          </h1>
          <p className="text-[18px] text-black/60 leading-relaxed max-w-[640px]">
            A living archive of brand strategy, creative direction, and AI-native builds — filterable by sector and expertise.
          </p>
        </div>

        {/* Filter bar */}
        <FilterBar activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

        {/* Results count */}
        <div className="mb-6 text-[12px] text-black/40 uppercase tracking-wider">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-black/40">
            No projects match these filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0">
            {filtered.map((work) => (
              <ProjectCard key={work._id || work.slug} work={work} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
