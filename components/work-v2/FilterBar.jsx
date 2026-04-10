'use client'

import { useState } from 'react'

const filterGroups = {
  sector: ['Technology', 'Culture', 'Sports', 'Film', 'Music', 'Web3', 'Social'],
  expertise: ['Strategy', 'Brand Identity', 'Creative Direction', 'Film & Production', 'Campaigns', 'Content Systems', 'AI & Automation', 'Marketing'],
}

export default function FilterBar({ activeFilters, setActiveFilters }) {
  const [openGroup, setOpenGroup] = useState(null)

  const toggleFilter = (group, value) => {
    setActiveFilters((prev) => {
      const current = prev[group] || []
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...prev, [group]: next }
    })
  }

  const clearAll = () => setActiveFilters({ sector: [], expertise: [] })

  const totalActive = Object.values(activeFilters).flat().length

  return (
    <div className="border-t border-b border-black/10 py-6 mb-12">
      <div className="flex flex-wrap items-start gap-8">
        {Object.entries(filterGroups).map(([group, options]) => (
          <div key={group} className="flex-1 min-w-[240px]">
            <button
              onClick={() => setOpenGroup(openGroup === group ? null : group)}
              className="text-[11px] font-medium uppercase tracking-wider text-black/50 hover:text-black transition-colors mb-3 flex items-center gap-2"
            >
              {group}
              <span className="text-black/30">
                {openGroup === group ? '−' : '+'}
              </span>
            </button>

            {openGroup === group && (
              <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                  const isActive = activeFilters[group]?.includes(option)
                  return (
                    <button
                      key={option}
                      onClick={() => toggleFilter(group, option)}
                      className={`text-[12px] rounded-full px-3 py-1.5 border transition-colors ${
                        isActive
                          ? 'bg-black text-white border-black'
                          : 'border-black/15 text-black/60 hover:border-black/40'
                      }`}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}

        {totalActive > 0 && (
          <button
            onClick={clearAll}
            className="text-[12px] text-black/50 hover:text-black transition-colors border-b border-black/20 hover:border-black pb-0.5"
          >
            Clear {totalActive} {totalActive === 1 ? 'filter' : 'filters'}
          </button>
        )}
      </div>
    </div>
  )
}
