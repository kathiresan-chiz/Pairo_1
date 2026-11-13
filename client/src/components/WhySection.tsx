import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import Reveal from './Reveal'
import { Eyebrow } from './SectionHeader'
import { GlassCard, Highlight } from './Glass'
import GlassBubbles from './GlassBubbles'

// The panel's blue, passed to the bubbles so they refract the same colours.
const bubbleColors: [string, string] = ['#3A78C2', '#1B4A8C']

const panelBg =
  'radial-gradient(circle at 90% 0%, rgba(219,242,252,0.35), transparent 40%), linear-gradient(140deg, #3A78C2 0%, #2F6AB4 45%, #1B4A8C 100%)'

interface WhySectionProps {
  id?: string
  eyebrow: string
  title: ReactNode
  lead: ReactNode
  items: { icon: LucideIcon; title: string; text: string; highlight?: string; to?: string }[]
  children?: ReactNode
}

// Blue panel with the heading set into a tab cut from its top-left corner,
// and glass cards floating over drifting glass bubbles.
export default function WhySection({ id, eyebrow, title, lead, items, children }: WhySectionProps) {
  return (
    <section id={id} className="container-x scroll-mt-24 pb-20 sm:pb-28">
      {/* Top-left corner stays square: the heading tab covers it, and a rounded clip would show a seam */}
      <Reveal className="grain relative isolate overflow-hidden rounded-b-[2.5rem] lg:rounded-tr-[2.5rem]" style={{ background: panelBg }}>
        <GlassBubbles colors={bubbleColors} className="pointer-events-none absolute inset-0 -z-10 size-full" />

        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          <div className="relative rounded-b-[2rem] bg-mist pt-2 pr-4 pb-8 lg:rounded-br-[2.5rem] lg:rounded-bl-none lg:pr-12 lg:pb-14">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-5xl xl:text-6xl">{title}</h2>
            <span aria-hidden="true" className="inverted-corner absolute top-0 left-full hidden size-10 lg:block" />
            <span aria-hidden="true" className="inverted-corner absolute top-full left-0 hidden size-10 lg:block" />
          </div>

          <div className="flex flex-col gap-6 p-6 text-white sm:p-10 lg:pl-12">
            <div className="flex justify-end gap-2" aria-hidden="true">
              <span className="size-4 rounded-full bg-white/30" />
              <span className="size-4 rounded-full bg-white/50" />
              <span className="size-4 rounded-full bg-seal-bright" />
            </div>
            <div className="max-w-lg text-lg leading-relaxed font-medium sm:text-xl">{lead}</div>
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-8 lg:grid-cols-3 lg:p-10">
          {items.map((d, i) => (
            <Reveal key={d.title} variant="rise" delay={(i % 3) * 100} className="h-full">
              <GlassCard to={d.to} label={`Learn more: ${d.title}`}>
                <div className="flex h-full min-h-[240px] flex-col justify-between gap-10 text-white">
                  <span className="grid size-12 place-items-center rounded-2xl border border-white/30 bg-white/15">
                    <d.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{d.title}</h3>
                    <p className="mt-3 leading-relaxed text-white/85">
                      <Highlight text={d.text} phrase={d.highlight} />
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {children && <div className="px-4 pb-4 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">{children}</div>}
      </Reveal>
    </section>
  )
}
