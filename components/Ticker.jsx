'use client'

const names = ['Nike', 'Samsung', 'Gaia', 'DC Comics', 'Apple', 'Warner Bros', '4K Protocol', 'John Mayer', 'Sony Music']

export default function Ticker() {
  const items = [...names, ...names, ...names]
  return (
    <div className="ticker">
      <div className="ticker__track">
        {items.map((name, i) => (
          <span key={i} className="ticker__item">{name} &middot;</span>
        ))}
      </div>
    </div>
  )
}
