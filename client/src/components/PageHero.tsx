import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { Eyebrow } from './SectionHeader'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  text?: string
  children?: ReactNode
}

// Inner-page hero: oversized headline on the left, short supporting copy on the right.
export default function PageHero({ eyebrow, title, text, children }: PageHeroProps) {
  return (
    <section className="container-x pt-14 pb-12 sm:pt-20">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-end">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl 2xl:text-7xl">
            {title}
          </h1>
        </Reveal>
        {text && (
          <Reveal delay={120}>
            <p className="max-w-md text-lg leading-relaxed text-muted lg:pb-3">{text}</p>
          </Reveal>
        )}
      </div>
      {children}
    </section>
  )
}
