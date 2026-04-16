export default function SectionLabel({ children, className = '' }) {
  return (
    <p className={`text-[12px] uppercase tracking-[0.18em] text-black/50 ${className}`}>
      [ {children} ]
    </p>
  )
}
