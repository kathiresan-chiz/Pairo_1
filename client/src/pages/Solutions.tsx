import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Paperclip } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import CtaBanner from '../components/CtaBanner'
import { DarkPanel, GiantWord, GlowCard, MetricCard, type Glow } from '../components/Dark'
import { solutionPath, solutions, solutionsHub } from '../content/solutions'
import { globalCta } from '../content/site'

const glows: Glow[] = ['bl', 'b', 'br']

export default function Solutions() {
  const hub = solutionsHub
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [entries, setEntries] = useState(0)

  // Watch the agents work in turn: each one posts to the ledger as it finishes.
  useEffect(() => {
    if (hovering || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % solutions.length)
      setEntries((n) => n + 1)
    }, 2200)
    return () => window.clearInterval(id)
  }, [hovering])

  return (
    <>
      <Seo
        title="Agentic solutions | A dedicated agent for every module · PairO"
        description={hub.lead}
        path="/solutions"
      />

      <PageHero eyebrow={hub.eyebrow} title={hub.title} text={hub.lead} />

      {/* 12 agents · 1 ledger · 0 re-entry */}
      <DarkPanel>
        <div className="relative">
          <GiantWord className="-mb-[0.32em]">Agents</GiantWord>
          <div className="relative grid gap-3 sm:grid-cols-3">
            {hub.stats.map((st, i) => (
              <MetricCard
                key={st.label}
                label={st.label}
                value={st.value}
                variant={i === 0 ? 'stripes' : 'fill'}
                fill={[0.62, 0.36, 0.48][i]}
              />
            ))}
          </div>
        </div>

        {/* The agents */}
        <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-2xl font-medium tracking-tight sm:text-3xl">
            <span className="tabular-nums">{entries.toLocaleString('en-IN')}</span>{' '}
            <span className="text-white/55">{hub.ledgerLabel}</span>
          </p>
          <p className="text-sm text-white/45">{hub.hint}</p>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" onMouseLeave={() => setHovering(false)}>
          {solutions.map((s, i) => {
            const on = i === active
            return (
              <li key={s.slug} onMouseEnter={() => (setHovering(true), setActive(i))}>
                <GlowCard
                  as={Link}
                  to={solutionPath(s)}
                  glow={glows[i % 3]}
                  active={on}
                  className="group flex h-full min-h-[250px] flex-col p-6 transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between text-xs text-white/55">
                    <span className="flex items-center gap-2">
                      <span className={`size-1.5 rounded-full ${on ? 'animate-pulse bg-emerald-400' : 'bg-white/30'}`} aria-hidden="true" />
                      {s.agent} · live
                    </span>
                    <span className="font-semibold">{s.num}</span>
                  </div>
                  <h2 className="mt-8 text-xl font-medium">{s.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{s.summary}</p>
                  <p
                    className={`mt-4 flex items-center gap-2 text-sm font-medium text-seal-bright transition-all duration-500 ${
                      on ? 'opacity-100' : 'translate-y-1 opacity-0'
                    }`}
                    aria-hidden={!on}
                  >
                    <Check className="size-4" aria-hidden="true" />
                    {s.result}
                  </p>
                  <span className="mt-auto flex items-center gap-1 pt-6 text-sm font-semibold">
                    Explore agent
                    <ArrowUpRight className="arrow-turn size-4" aria-hidden="true" />
                  </span>
                </GlowCard>
              </li>
            )
          })}
        </ul>
      </DarkPanel>

      <AlsoBuiltIn />

      <CtaBanner title={globalCta.title} primary={globalCta.primary} secondary={globalCta.secondary} />
    </>
  )
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-2 text-sm">
      {items.map((p) => (
        <li key={p} className="flex gap-2">
          <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
          {p}
        </li>
      ))}
    </ul>
  )
}

function Plan({ children }: { children: string }) {
  return <p className="mt-6 inline-block rounded-full bg-seal px-3 py-1 text-xs font-semibold text-navy">{children}</p>
}

function AlsoBuiltIn() {
  const { extras } = solutionsHub
  const { teamChat: tc, consolidation: co, reports: rp } = extras
  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeader eyebrow={extras.eyebrow} title={extras.title} />
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {/* Team chat */}
        <Reveal className="flex flex-col rounded-[2rem] bg-white p-7 ring-1 ring-line">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-deep uppercase">{tc.label}</p>
          <h3 className="mt-3 text-xl font-semibold">{tc.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{tc.text}</p>
          <div className="mt-6 grid grid-cols-[118px_1fr] overflow-hidden rounded-2xl bg-mist text-xs" role="figure" aria-label="Team chat (sample data)">
            <ul className="grid content-start gap-1 border-r border-line p-2">
              {tc.channels.map((c, i) => (
                <li key={c} className={`rounded-lg px-2 py-1.5 leading-tight ${i === 1 ? 'bg-white font-semibold' : 'text-muted'}`}>
                  {c}
                </li>
              ))}
            </ul>
            <ul className="grid gap-2 p-3">
              {tc.messages.map((m) => (
                <li key={m.who} className="rounded-xl bg-white p-2.5">
                  <p className="text-[10px] text-muted">{m.who}</p>
                  {m.text && <p className="mt-0.5">{m.text}</p>}
                  {m.chip && <span className="mt-1 inline-block rounded-full bg-seal px-2 py-0.5 text-[10px] font-semibold text-navy">{m.chip}</span>}
                  {m.attachment && (
                    <span className="mt-0.5 flex items-center gap-1 font-medium">
                      <Paperclip className="size-3" aria-hidden="true" />
                      {m.attachment}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Points items={tc.points} />
          <div className="mt-auto">
            <Plan>{tc.plan}</Plan>
          </div>
        </Reveal>

        {/* Consolidation */}
        <Reveal delay={100} className="flex flex-col rounded-[2rem] bg-white p-7 ring-1 ring-line">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-deep uppercase">{co.label}</p>
          <h3 className="mt-3 text-xl font-semibold">{co.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{co.text}</p>
          <div className="mt-6 grid gap-2 text-xs" role="figure" aria-label="Inter-company eliminations (sample data)">
            <div className="grid grid-cols-2 gap-2">
              {co.pairs.map((p) => (
                <div key={p.company} className="rounded-2xl bg-mist p-3">
                  <p className="font-semibold">{p.company}</p>
                  {p.entries.map((e) => (
                    <p key={e} className={`mt-1 ${e === 'exception' ? 'font-semibold text-[#c23a56]' : 'text-muted'}`}>
                      {e}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-ink p-3 text-white">
              <p className="font-semibold">{co.tb.title}</p>
              <dl className="mt-2 grid gap-1">
                {co.tb.rows.map(([k, v], i) => (
                  <div key={k} className={`flex justify-between ${i === co.tb.rows.length - 1 ? 'border-t border-white/15 pt-1 font-semibold' : 'text-white/70'}`}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Points items={co.points} />
          <div className="mt-auto">
            <Plan>{co.plan}</Plan>
          </div>
        </Reveal>

        {/* Reports in plain language */}
        <Reveal delay={200} className="flex flex-col rounded-[2rem] bg-white p-7 ring-1 ring-line">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-deep uppercase">{rp.label}</p>
          <h3 className="mt-3 text-xl font-semibold">{rp.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{rp.text}</p>
          <div className="mt-6 rounded-2xl bg-mist p-3 text-xs" role="figure" aria-label="Report builder (sample data)">
            <ul className="flex flex-wrap gap-1.5">
              {rp.chips.map((c) => (
                <li key={c} className="rounded-full bg-white px-2.5 py-1 font-medium ring-1 ring-line">
                  {c}
                </li>
              ))}
            </ul>
            <table className="mt-3 w-full text-left">
              <thead>
                <tr className="text-muted">
                  {rp.columns.map((c) => (
                    <th key={c} scope="col" className="py-1 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rp.rows.map((r) => (
                  <tr key={r[0]} className="border-t border-line">
                    {r.map((c, j) => (
                      <td key={j} className={`py-1.5 ${j === 2 ? 'text-right font-semibold' : ''}`}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Points items={rp.points} />
          <div className="mt-auto">
            <Plan>{rp.plan}</Plan>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
