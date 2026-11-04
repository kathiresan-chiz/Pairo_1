import Reveal from './Reveal'
import Button from './Button'
import { Eyebrow } from './SectionHeader'
import { aiCapabilities } from '../content/site'

interface AiSectionProps {
  id?: string
  eyebrow?: string
  title: string
  text?: string
}

// Matte navy panel: a large statement, then the capabilities as an index grid.
// Each bar uses the capability's `fill` from content, or its position in the list.
export default function AiSection({ id, eyebrow = 'AI intelligence', title, text }: AiSectionProps) {
  const total = aiCapabilities.length

  return (
    <section id={id} className="container-x py-6">
      <div className="rounded-[2.5rem] bg-navy px-6 py-16 text-white sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        <Reveal className="max-w-4xl">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h2 className="mt-6 text-3xl leading-[1.1] font-medium tracking-[-0.03em] text-balance sm:text-5xl">{title}</h2>
          {text && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">{text}</p>}
        </Reveal>

        <div className="mt-16 grid gap-x-16 gap-y-14 md:grid-cols-2 lg:mt-20">
          {aiCapabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={(i % 2) * 120}>
              <div className="flex items-start gap-6">
                <p className="shrink-0 text-5xl leading-none font-medium tracking-[-0.04em] tabular-nums sm:text-6xl">
                  {String(i + 1).padStart(2, '0')}
                  <span className="text-xl text-seal/50 sm:text-2xl">/{String(total).padStart(2, '0')}</span>
                </p>
                <div className="pt-1">
                  <h3 className="font-semibold">{cap.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/65">{cap.text}</p>
                </div>
              </div>
              <SegmentBar fill={cap.fill ?? (i + 1) / total} />
            </Reveal>
          ))}

          <Reveal delay={120} className="flex flex-col justify-between gap-6 border-t border-white/15 pt-8 md:border-t-0 md:pt-0">
            <p className="max-w-sm text-xl leading-snug font-medium text-balance">
              Every capability works on your own PAIRO data, inside the modules your teams already use.
            </p>
            <div>
              <Button to="/contact?intent=demo" variant="light">
                See it in a demo
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// Solid seal block followed by fine vertical segments, as in the brand reference.
function SegmentBar({ fill }: { fill: number }) {
  return (
    <div className="mt-6 flex h-9 overflow-hidden" aria-hidden="true">
      <span className="segment-fill h-full bg-seal" style={{ width: `${fill * 100}%` }} />
      <span className="segment-rest h-full flex-1" />
    </div>
  )
}
