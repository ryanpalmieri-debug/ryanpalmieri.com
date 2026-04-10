'use client'

import { useState, useMemo } from 'react'
import ProjectCard from './ProjectCard'
import FilterBar from './FilterBar'

export default function WorkGridV2({ works = [] }) {
  const [activeFilters, setActiveFilters] = useState({
    outcome: [],
    sector: [],
    expertise: [],
    theme: [],
  })

  const filtered = useMemo(() => {
    return works.filter((w) => {
      if (activeFilters.sector.length > 0) {
        if (!w.sector || !activeFilters.sector.includes(w.sector)) return false
      }
      if (activeFilters.expertise.length > 0) {
        if (!w.expertise || !w.expertise.some((e) => activeFilters.expertise.includes(e))) {
          return false
        }
      }
      if (activeFilters.outcome.length > 0) {
        if (!w.outcome || !activeFilters.outcome.includes(w.outcome)) return false
      }
      if (activeFilters.theme.length > 0) {
        if (!w.theme || !activeFilters.theme.includes(w.theme)) return false
      }
      return true
    })
  }, [works, activeFilters])

  return (
    <section className="w-full bg-white pb-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Filter bar — primary element, matches reference */}
        <FilterBar activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-black/40">
            No projects match these filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0 mt-0">
            {filtered.map((work) => (
              <ProjectCard key={work._id || work.slug} work={work} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
