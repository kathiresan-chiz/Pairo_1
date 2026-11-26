import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, LayoutGrid, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import SectionHeader, { Eyebrow } from '../components/SectionHeader'
import CtaBanner from '../components/CtaBanner'
import { DarkHeading, DarkPanel } from '../components/Dark'
import ParrotChat, { PromptChip } from '../components/ParrotChat'
import type { ChatMessage } from '../content/chat'
import { AgentLive, DataVisual, FlagshipPanel, ManualVsAgent, Outcomes, StepRow } from '../components/SolutionBlocks'
import { solutionBySlug, solutionPath, solutions, type Solution as SolutionData } from '../content/solutions'
import { demoLink, globalCta } from '../content/site'

export default function Solution() {
  const { slug } = useParams()
  const s = solutionBySlug(slug)
  if (!s) return <Navigate to="/solutions" replace />

  const index = solutions.indexOf(s)
  const prev = solutions[(index - 1 + solutions.length) % solutions.length]
  const next = solutions[(index + 1) % solutions.length]
  const f = s.flagship
  const timeline = f.steps.every((st) => !st.text)

  return (
    <>
      <Seo title={`${s.name} | PairO agentic ERP`} description={`${s.name}: ${s.tagline}`} path={solutionPath(s)} />

      {/* Hero */}
      <section className="container-x pt-14 pb-12 sm:pt-20">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link to="/solutions" className="hover:text-ink">
            Agentic solutions
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-ink">{s.name}</span>
        </nav>
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
          <Reveal>
            <Eyebrow>
              {s.num} · {s.agent}
            </Eyebrow>
            <h1 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl">{s.name}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{s.tagline}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <li key={t} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium ring-1 ring-line">
                  <Check className="size-3.5 text-brand" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={demoLink}>Book a demo</Button>
              <Button to="/pricing" variant="outline" arrow={false}>
                View packs
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120} variant="rise">
            <AgentLive s={s} />
          </Reveal>
        </div>
      </section>

      {/* What the agent takes care of + workflow */}
      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader eyebrow={`${s.agent} · live`} title="What your agent takes care of" />
            <ul className="mt-8 grid gap-3">
              {s.duties.map((d, i) => (
                <Reveal as="li" key={d} delay={i * 90} className="flex items-center gap-4 rounded-[1.5rem] bg-white p-5 ring-1 ring-line">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-seal text-navy">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{d}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={120} className="self-end rounded-[2rem] bg-ink p-7 text-white sm:p-9">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-seal/70 uppercase">
              <MessageCircle className="size-4" aria-hidden="true" />
              Ask Parrot AI
            </p>
            <ul className="mt-6 grid gap-3">
              {s.prompts.map((p) => (
                <li key={p} className="rounded-2xl bg-white/[0.06] px-5 py-4 text-lg ring-1 ring-white/10">
                  “{p}”
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-20">
          <SectionHeader eyebrow="The workflow" title={s.workflow.join(' → ')} />
          <StepRow steps={s.workflow.map((w) => ({ title: w }))} />
        </div>
      </section>

      {/* Key capabilities */}
      <section className="container-x pb-16 sm:pb-20">
        <SectionHeader eyebrow="Key capabilities" title={s.tagline} />
        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <ul className="grid gap-4">
            {s.capabilities.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 90} className="rounded-[2rem] bg-white p-7 ring-1 ring-line">
                <span className="text-sm font-semibold text-crimson">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{c.text}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={120}>
            <DataVisual v={s.visual} />
          </Reveal>
        </div>
      </section>

      {/* Flagship capability */}
      <DarkPanel>
        <DarkHeading eyebrow={f.eyebrow} title={f.title} align="left" />
        {timeline ? (
          <FlagshipTimeline key={s.slug} f={f} />
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
              <ol className="grid gap-3">
                {f.steps.map((st, i) => (
                  <li key={st.title} className="flex gap-4 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#5448ff] to-brand text-sm font-semibold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{st.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/60">{st.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            <div className="lg:sticky lg:top-28">
              <FlagshipPanel panel={f.panel} />
            </div>
          </div>
        )}
      </DarkPanel>

      <section className="container-x pb-16 sm:pb-20">
        <Outcomes title={f.outcomesTitle} items={f.outcomes} />
        <p className="mt-6 rounded-2xl bg-seal-soft px-5 py-4 text-sm leading-relaxed text-navy ring-1 ring-seal">{f.note}</p>
      </section>

      {/* Parrot AI for this module */}
      {s.chat && (
        <section className="container-x pb-16 sm:pb-20">
          <PromptedChat key={s.slug} name={s.name} prompts={s.prompts} chat={s.chat} />
        </section>
      )}

      {/* Manual effort vs agent */}
      <section className="container-x pb-6">
        <SectionHeader eyebrow="Manual effort vs your agent" title={s.compareTitle} />
        <ManualVsAgent s={s} />
      </section>

      {/* Previous / all / next */}
      <nav aria-label="Agentic solutions" className="container-x mt-14 grid gap-3 sm:grid-cols-3">
        <Link to={solutionPath(prev)} className="group flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold ring-1 ring-line hover:ring-brand/40">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          {prev.name}
        </Link>
        <Link to="/solutions" className="flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white">
          <LayoutGrid className="size-4" aria-hidden="true" />
          All agentic solutions
        </Link>
        <Link
          to={solutionPath(next)}
          className="group flex items-center justify-end gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold ring-1 ring-line hover:ring-brand/40"
        >
          {next.name}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </nav>

      <CtaBanner title={globalCta.title} primary={globalCta.primary} secondary={globalCta.secondary} />
    </>
  )
}

// Parrot AI block: click a prompt on the left to light up that exchange in the chat.
function PromptedChat({ name, prompts, chat }: { name: string; prompts: string[]; chat: ChatMessage[] }) {
  const [focus, setFocus] = useState<string | null>(null)
  return (
    <div className="grid gap-10 rounded-[2.5rem] bg-navy p-6 text-white sm:p-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
      <div>
        <SectionHeader eyebrow={`Parrot AI · ${name}`} title="Ask. Get answers straight from your books." tone="light" />
        <ul className="mt-8 grid gap-2">
          {prompts.map((p) => (
            <li key={p}>
              <PromptChip text={`“${p}”`} tone="dark" active={focus === p} onClick={() => setFocus((f) => (f === p ? null : p))} />
            </li>
          ))}
        </ul>
      </div>
      <ParrotChat messages={chat} focus={focus} />
    </div>
  )
}

const STAGE_MS = 3200

// Timeline flagship: the steps change automatically (or pick one), and the panel shows that step's message.
function FlagshipTimeline({ f }: { f: SolutionData['flagship'] }) {
  const [stage, setStage] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const tone = f.panel.stages?.[stage]?.tone

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const playing = inView && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => setStage((v) => (v + 1) % f.steps.length), STAGE_MS)
    return () => window.clearTimeout(id)
  }, [playing, stage, f.steps.length])

  return (
    <div
      ref={ref}
      className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start"
    >
      <div>
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Reminder timeline">
          {f.steps.map((st, i) => {
            const on = i === stage
            const done = i < stage
            return (
              <li key={st.title}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setStage(i)}
                  className={`stage-step relative w-full cursor-pointer overflow-hidden rounded-2xl px-4 py-5 text-center transition-all duration-500 ${
                    on
                      ? 'bg-brand text-white shadow-[0_18px_40px_-16px_rgba(58,120,194,0.8)] scale-[1.03]'
                      : 'bg-white text-ink ring-1 ring-line hover:ring-brand/50'
                  }`}
                >
                  <span className={`flex items-center justify-center gap-1 text-xs ${on ? 'text-seal' : 'text-muted'}`}>
                    {done ? <Check className="size-3 text-brand" aria-hidden="true" /> : null}0{i + 1}
                  </span>
                  <span className="mt-1 block text-lg font-semibold">{st.title}</span>
                  {f.panel.stages?.[i]?.message?.subject && (
                    <span className={`mt-0.5 block truncate text-xs ${on ? 'text-seal' : 'text-muted'}`}>
                      {f.panel.stages[i].message!.subject!.split(' · ')[0]}
                    </span>
                  )}
                  {on && (
                    <span
                      key={`p${stage}${playing}`}
                      className={`stage-progress absolute inset-x-0 bottom-0 h-1 origin-left bg-seal-bright ${playing ? '' : 'is-paused'}`}
                      style={{ animationDuration: `${STAGE_MS}ms` }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ol>
        {f.extra && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm ring-1 ring-line">
            <span className="text-muted">{f.extra.label}</span>
            <span key={tone} className="stage-in font-semibold text-brand-deep">
              {tone ?? f.extra.value}
            </span>
          </p>
        )}
      </div>
      <div className="lg:sticky lg:top-28">
        <FlagshipPanel panel={f.panel} stage={stage} />
      </div>
    </div>
  )
}
