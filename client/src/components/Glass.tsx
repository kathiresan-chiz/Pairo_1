import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

// A "cell" shape: dark core with a blue/seal halo. Seen through frosted glass
// it reads like the soft abstract forms in the brand references.
function Cell({ className }: { className: string }) {
  return (
    <span
      className={`absolute rounded-full blur-[3px] ${className}`}
      style={{
        background:
          'radial-gradient(circle, #0E2547 0 26%, #1B4A8C 34%, #3A78C2 46%, rgba(159,220,250,0.9) 56%, rgba(58,120,194,0) 70%)',
      }}
    />
  )
}

// Abstract brand shapes that sit behind glass cards.
export function GlassBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Cell className="top-[30%] left-[8%] size-56" />
      <Cell className="top-[70%] -left-16 size-64" />
      <Cell className="top-[24%] right-[30%] size-44" />
      <Cell className="top-[52%] left-[44%] size-72" />
      <Cell className="right-[4%] bottom-[8%] size-60" />
      <span className="absolute top-[18%] right-[22%] size-56 rounded-full bg-crimson/45 blur-3xl" />
      <span className="absolute bottom-[4%] left-[22%] size-64 rounded-full bg-seal/50 blur-3xl" />
    </div>
  )
}

// Renders `text`, colouring the first occurrence of `phrase`.
export function Highlight({ text, phrase, className = 'text-seal-bright' }: { text: string; phrase?: string; className?: string }) {
  const i = phrase ? text.indexOf(phrase) : -1
  if (!phrase || i === -1) return text
  return (
    <>
      {text.slice(0, i)}
      <span className={className}>{phrase}</span>
      {text.slice(i + phrase.length)}
    </>
  )
}

// Frosted card with a notch in the top-right corner holding a round arrow link.
interface GlassCardProps {
  to?: string
  label?: string
  className?: string
  children: ReactNode
}

export function GlassCard({ to, label, className = '', children }: GlassCardProps) {
  return (
    <div className={`group relative h-full transition-transform duration-500 hover:-translate-y-1.5 ${className}`}>
      <div className={`glass ${to ? 'notch' : ''} h-full rounded-[2rem] p-7 sm:p-8`}>
        {children}
      </div>
      {to && (
        <Link
          to={to}
          aria-label={label}
          className="absolute top-0 right-0 grid size-14 place-items-center rounded-full bg-ink text-white"
        >
          <ArrowUpRight className="arrow-turn size-6" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
