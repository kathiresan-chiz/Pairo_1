import { useState } from 'react'
import { Check, LockKeyhole } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import ParrotReveal from '../components/ParrotReveal'
import SectionHeader from '../components/SectionHeader'
import CtaBanner from '../components/CtaBanner'
import { DarkHeading, DarkPanel, GlowCard, RefStrip, type Glow } from '../components/Dark'
import { ChatWithPrompts } from '../components/ParrotChat'
import { parrotPage, scenarios } from '../content/parrot'
import { demoLink, globalCta, parrotIntro } from '../content/site'

const glows: Glow[] = ['bl', 'b', 'br']

export default function ParrotAi() {
  const p = parrotPage
  const [current, setCurrent] = useState(0)

  return (
    <>
      <Seo title="Parrot AI | Your intelligent accounting assistant · PairO" description={p.lead} path="/parrot-ai" />

      {/* Hero: headline, then the cyber parrot (move over it to reveal the real bird), then the info row */}
      <section className="relative isolate flex h-[calc(100svh-4.5rem)] min-h-[640px] flex-col overflow-hidden">
        <div className="container-x relative z-10 pt-10 sm:pt-14">
          <span aria-hidden="true" className="absolute -top-1 text-sm text-muted sm:top-3">+</span>
          <h1 className="max-w-[18ch] text-4xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            {p.title.split(' ').map((w, i) => (
              <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className={`pr-letter inline-block ${i >= 2 ? 'text-brand' : ''}`} style={{ animationDelay: `${120 + i * 70}ms` }}>
                  {w}&nbsp;
                </span>
              </span>
            ))}
          </h1>
        </div>
        <div className="relative mt-2 min-h-0 flex-1">
          <ParrotReveal />
        </div>
      </section>
      <section className="container-x pb-6">
        <Reveal className="grid gap-8 border-t border-line pt-5 lg:grid-cols-4">
          <ul className="grid grid-cols-2 gap-3 text-xs font-semibold tracking-[0.16em] text-muted uppercase sm:grid-cols-4 lg:col-span-3">
            {p.tags.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-brand" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <div className="max-w-sm text-[15px] leading-relaxed text-muted">
            <p>{p.lead}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button to={demoLink}>Book a demo</Button>
              <Button href="#parrot-live" variant="outline" arrow={false}>
                See it in action
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Scenarios */}
      <section id="parrot-live" className="container-x scroll-mt-24 py-16 sm:py-20">
        <SectionHeader eyebrow="Parrot AI in action" title="Ask, draft, confirm — across text, voice and photo." text={p.scenariosHint} />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-start">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" role="tablist" aria-label="Parrot AI scenarios">
            {scenarios.map((sc, i) => {
              const on = i === current
              return (
                <button
                  key={sc.title}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="parrot-chat"
                  onClick={() => setCurrent(i)}
                  className={`flex flex-col rounded-[1.5rem] p-5 text-left transition-colors ${
                    on ? 'bg-ink text-white' : 'bg-white ring-1 ring-line hover:ring-brand/40'
                  }`}
                >
                  <span className={`text-xs font-semibold ${on ? 'text-crimson' : 'text-brand'}`}>0{i + 1}</span>
                  <span className="mt-3 font-semibold">{sc.title}</span>
                  <span className={`mt-1 text-sm ${on ? 'text-white/65' : 'text-muted'}`}>{sc.text}</span>
                  <span className={`mt-4 w-fit rounded-full px-3 py-1 text-xs ${on ? 'bg-white/10' : 'bg-mist'}`}>{sc.prompt}</span>
                </button>
              )
            })}
          </div>
          <div id="parrot-chat" role="tabpanel" className="lg:sticky lg:top-28">
            <ChatWithPrompts messages={scenarios[current].chat} playKey={current} className="min-h-[520px]" />
          </div>
        </div>
      </section>

      {/* Own model */}
      <DarkPanel>
        <DarkHeading eyebrow="Own model" title={p.footnote} />
        <div className="mt-10">
          <RefStrip items={p.tags.map((t) => ({ name: t }))} />
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="grid gap-4">
            {parrotIntro.features.slice(0, 3).map((f, i) => (
              <GlowCard key={f.title} glow={glows[i]} className="px-6 py-8 text-center">
                <h3 className="text-lg font-medium">{f.title}</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">{f.text}</p>
              </GlowCard>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <GlowCard glow="tr" className="grid flex-1 place-items-center p-10 text-center">
              <div>
                <span className="mx-auto grid size-28 place-items-center rounded-[2rem] bg-gradient-to-b from-white/15 to-white/[0.02] ring-1 ring-white/15 shadow-2xl shadow-[#5448ff]/30">
                  <LockKeyhole className="size-12" aria-hidden="true" />
                </span>
                <p className="mt-8 text-xl font-medium">{parrotIntro.features[3].title}</p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">No external AI, ever.</p>
              </div>
            </GlowCard>
            <Button to={demoLink} variant="outline" className="w-full">
              Book a demo
            </Button>
          </div>
        </div>
      </DarkPanel>

      <CtaBanner title={globalCta.title} primary={globalCta.primary} secondary={globalCta.secondary} />
    </>
  )
}
