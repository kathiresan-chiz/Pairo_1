import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import LiquidFill from './LiquidFill'

const variants = {
  dark: 'bg-ink text-white',
  light: 'bg-white text-ink',
  outline: 'bg-white/60 text-ink ring-1 ring-ink/15 hover:text-white',
  ghost: 'text-white ring-1 ring-white/30 hover:text-ink',
}

// Colour that pours across the button on hover.
const fills = {
  dark: 'bg-brand',
  light: 'bg-seal',
  outline: 'bg-ink',
  ghost: 'bg-white',
}

const circles = {
  dark: 'bg-white text-ink',
  light: 'bg-ink text-white',
  outline: 'bg-ink text-white group-hover:bg-white group-hover:text-ink',
  ghost: 'bg-white text-ink group-hover:bg-ink group-hover:text-white',
}

interface ButtonProps {
  to?: string
  href?: string
  variant?: keyof typeof variants
  arrow?: boolean
  className?: string
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}

// Pill button with the circular arrow used across the brand references.
export default function Button({
  to,
  href,
  variant = 'dark',
  arrow = true,
  className = '',
  children,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const cls = `group relative isolate inline-flex items-center justify-between gap-3 overflow-hidden rounded-full text-sm font-semibold transition-colors duration-500 disabled:opacity-60 ${
    arrow ? 'py-1.5 pr-1.5 pl-5' : 'px-5 py-3'
  } ${variants[variant]} ${className}`

  const content = (
    <>
      <LiquidFill className={fills[variant]} />
      <span>{children}</span>
      {arrow && (
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-500 ${circles[variant]}`}
        >
          <ArrowUpRight className="arrow-turn size-4" aria-hidden="true" />
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {content}
      </a>
    )
  }
  return (
    <button type={type} disabled={disabled} className={cls} onClick={onClick}>
      {content}
    </button>
  )
}
