'use client'
import Link from 'next/link'

export function ParenLink({ href, children, size = 'md', external, className, onClick }) {
  const classes = `paren-link paren-link--${size} ${className ?? ''}`

  if (external || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        onClick={onClick}
      >
        <span className="paren-open">(</span>
        <span className="paren-text">{children}</span>
        <span className="paren-close">)</span>
      </a>
    )
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      <span className="paren-open">(</span>
      <span className="paren-text">{children}</span>
      <span className="paren-close">)</span>
    </Link>
  )
}
