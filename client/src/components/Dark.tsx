import { useState, type CSSProperties, type ElementType, type ReactNode } from 'react'
import Reveal from './Reveal'

// Building blocks styled after the dark-card references (glow cards, metric cards,
// gradient wordmark, reference strip). See .dark-panel / .glow-card in index.css.

export type Glow = 'bl' | 'br' | 'b' | 'tr' | 'brand' | 'sweep' | 'sweep-top' | 'none'

export function DarkPanel({ id, className = '', children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className="container-x scroll-mt-24 py-6">
      <Reveal className={`dark-panel px-5 py-14 sm:px-10 sm:py-20 lg:px-14 ${className}`}>{children}</Reveal>
    </section>
  )
}

interface GlowCardProps {
  glow?: Glow
  active?: boolean
  /** the glow sweeps left ↔ right (default); set false for a still glow */
  drift?: boolean
  as?: ElementType
  className?: string
  style?: CSSProperties
  children: ReactNode
  [key: string]: unknown
}

// Each card starts its sweep at a different point, so neighbours never move in step.
let sweepCount = 0

export function GlowCard({ glow = 'bl', active, drift = true, as: Tag = 'div', className = '', style, children, ...rest }: GlowCardProps) {
  const [delay] = useState(() => -((sweepCount++ % 6) * 1.15))
  const moving = drift && glow !== 'none'
  // Moving cards use the two-tone sweep glow, lit from the top or the bottom as before.
  const shown: Glow = !moving ? glow : glow === 'tr' || glow === 'sweep-top' ? 'sweep-top' : 'sweep'
  return (
    <Tag
      className={`glow-card ${moving ? 'glow-drift' : ''} ${className}`}
      data-glow={shown}
      data-active={active ? '' : undefined}
      style={moving ? ({ '--drift-delay': `${delay}s`, ...style } as CSSProperties) : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function DarkHeading({ eyebrow, title, text, align = 'center' }: { eyebrow?: string; title: ReactNode; text?: string; align?: 'left' | 'center' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className="text-xs font-semibold tracking-[0.2em] text-seal-bright/80 uppercase">{eyebrow}</p>}
      <h2 className="mt-4 text-3xl leading-[1.08] font-medium tracking-[-0.03em] text-balance sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{text}</p>}
    </div>
  )
}

// Sized to its letter count so long words still fit across the panel.
export function GiantWord({ children, className = '' }: { children: string; className?: string }) {
  const fontSize = `min(11.5rem, ${(76 / Math.max(children.length, 5)).toFixed(2)}vw)`
  return (
    <span
      aria-hidden="true"
      className={`giant-word text-center [mask-image:linear-gradient(#000_55%,transparent)] ${className}`}
      style={{ fontSize }}
    >
      {children}
    </span>
  )
}

interface MetricCardProps {
  label: string
  value: string
  sub?: string
  /** height of the fill, 0–1 */
  fill?: number
  variant?: 'fill' | 'stripes'
  className?: string
}

// Label at the top, the figure bottom-right over a gradient (or striped) block.
export function MetricCard({ label, value, sub, fill = 0.42, variant = 'fill', className = '' }: MetricCardProps) {
  return (
    <div className={`glow-card flex min-h-[220px] flex-col sm:min-h-[260px] ${className}`} data-glow="none">
      <p className="relative z-10 px-6 pt-7 text-center text-sm text-white/85 sm:text-base">{label}</p>
      <div
        className={`metric-bar absolute inset-x-0 bottom-0 ${variant === 'stripes' ? 'metric-stripes' : 'metric-fill rounded-t-[1.25rem]'}`}
        style={{ height: `${fill * 100}%` }}
        aria-hidden="true"
      />
      <div className="relative z-10 mt-auto flex items-end justify-between gap-3 px-6 pb-5">
        <span className="text-xs text-white/80">{sub}</span>
        <span className="metric-value text-4xl leading-none font-medium tracking-tight tabular-nums sm:text-5xl" data-value={value}>
          {value}
        </span>
      </div>
    </div>
  )
}

// A single pill holding a row of references, like a partner-logo strip.
export function RefStrip({ items }: { items: { name: string; sub?: string }[] }) {
  return (
    <ul className="grid gap-2 rounded-3xl p-3 ring-1 ring-white/10 sm:grid-cols-2 lg:flex lg:items-center lg:justify-around lg:rounded-full lg:px-6">
      {items.map((it) => (
        <li key={it.name} className="flex items-center justify-center gap-2 px-3 py-2 text-center">
          <span className="font-semibold tracking-tight">{it.name}</span>
          {it.sub && <span className="text-xs text-white/50">{it.sub}</span>}
        </li>
      ))}
    </ul>
  )
}
