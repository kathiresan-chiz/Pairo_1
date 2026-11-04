import type { ReactNode } from 'react'
import Reveal from './Reveal'

type Tone = 'dark' | 'light'

interface EyebrowProps {
  children: ReactNode
  tone?: Tone
  className?: string
}

export function Eyebrow({ children, tone = 'dark', className = '' }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase ${
        tone === 'light' ? 'text-seal/80' : 'text-brand-deep'
      } ${className}`}
    >
      <span className="h-px w-6 bg-crimson" aria-hidden="true" />
      {children}
    </span>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: ReactNode
  text?: string
  align?: 'left' | 'center'
  tone?: Tone
  className?: string
}

export default function SectionHeader({ eyebrow, title, text, align = 'left', tone = 'dark', className = '' }: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-4 text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl ${
          tone === 'light' ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${centered ? 'mx-auto' : ''} max-w-2xl ${tone === 'light' ? 'text-white/65' : 'text-muted'}`}>
          {text}
        </p>
      )}
    </Reveal>
  )
}
