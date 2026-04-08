import { clients } from '../data/works'

export default function LogoBar() {
  // Duplicate for seamless marquee loop
  const items = [...clients, ...clients]

  return (
    <div
      style={{
        borderTop: '1px solid rgba(0,0,0,0.08)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        paddingTop: '14px',
        paddingBottom: '14px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          animation: 'marquee 28s linear infinite',
          whiteSpace: 'nowrap',
          minWidth: 'max-content',
        }}
      >
        {items.map((client, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0' }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(74,74,74,0.4)',
                padding: '0 28px',
                cursor: 'default',
              }}
            >
              {client}
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                backgroundColor: 'rgba(74,74,74,0.2)',
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
