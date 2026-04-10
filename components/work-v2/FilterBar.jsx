'use client'

const filterGroups = {
  Outcome: [
    'Accelerate Early Traction',
    'Bridge to Mainstream',
    'Lead Emergent Categories',
    'Evolve & Extend Brand Equity',
    'Activate Brand-Led Innovation',
  ],
  Sector: [
    'Technology',
    'Culture',
    'Sports',
    'Film',
    'Music',
    'Web3',
    'Social',
  ],
  Expertise: [
    'Strategy',
    'Brand Identity',
    'Creative Direction',
    'Film & Production',
    'Campaigns',
    'Content Systems',
    'AI & Automation',
  ],
  Theme: [
    'Emergent Technologies',
    'Human Wellbeing',
    'Energy Independence',
    'Nature Reimagined',
    'Cultural Expression',
    'Societal Futures',
  ],
}

export default function FilterBar({ activeFilters, setActiveFilters }) {
  const toggleFilter = (group, value) => {
    const key = group.toLowerCase()
    setActiveFilters((prev) => {
      const current = prev[key] || []
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...prev, [key]: next }
    })
  }

  const clearAll = () =>
    setActiveFilters({ outcome: [], sector: [], expertise: [], theme: [] })

  const totalActive = Object.values(activeFilters).flat().length
  const isAllActive = totalActive === 0

  return (
    <div className="py-10 border-b border-black/10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
        {/* All indicator — leftmost column */}
        <div className="flex items-start md:items-start">
          <button
            onClick={clearAll}
            className="flex items-center gap-2 text-[15px] font-normal text-black hover:opacity-60 transition-opacity"
          >
            <span
              className={`inline-block w-[7px] h-[7px] rounded-full ${
                isAllActive ? 'bg-black' : 'bg-black/20'
              }`}
            />
            All
          </button>
        </div>

        {/* Four filter columns */}
        {Object.entries(filterGroups).map(([group, options]) => {
          const key = group.toLowerCase()
          return (
            <div key={group}>
              <h4 className="text-[15px] font-semibold text-black mb-5">
                {group}
              </h4>
              <ul className="flex flex-col gap-[6px]">
                {options.map((option) => {
                  const isActive = activeFilters[key]?.includes(option)
                  return (
                    <li key={option}>
                      <button
                        onClick={() => toggleFilter(group, option)}
                        className={`text-left text-[15px] transition-colors leading-snug ${
                          isActive
                            ? 'text-black font-medium'
                            : 'text-black/30 hover:text-black/70'
                        }`}
                      >
                        {option}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
