import { useEffect, useState } from 'react'
import { ArrowRight, Check, FileSpreadsheet, Paperclip, Sparkles } from 'lucide-react'
import Reveal from './Reveal'
import { GlowCard } from './Dark'
import ParrotChat from './ParrotChat'
import type { Solution, VisualRow } from '../content/solutions'

const toneCls: Record<NonNullable<VisualRow['tone']>, string> = {
  ok: 'bg-emerald-50 text-emerald-700',
  warn: 'bg-amber-50 text-amber-700',
  fail: 'bg-crimson/10 text-[#c23a56]',
  info: 'bg-seal text-navy',
}
const barCls: Record<NonNullable<VisualRow['tone']>, string> = {
  ok: 'from-brand-deep to-brand-soft',
  warn: 'from-amber-500 to-amber-300',
  fail: 'from-[#c23a56] to-crimson',
  info: 'from-brand-deep to-brand-soft',
}

/* ---------------------------------------------------------------- Agent live */

// The agent at work: name, step counter, the workflow and the latest event.
export function AgentLive({ s }: { s: Solution }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setStep((v) => (v + 1) % s.workflow.length), 1800)
    return () => window.clearInterval(id)
  }, [s.workflow.length])

  return (
    <GlowCard glow="bl" className="p-6 sm:p-8" role="figure" aria-label={`${s.agent} at work (illustration)`}>
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-medium">
          <span className="size-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
          {s.agent} · live
        </p>
        <span className="text-xs text-white/50">Step 1 of {s.workflow.length}</span>
      </div>
      <ol className="mt-6 flex gap-2">
        {s.workflow.map((w, i) => (
          <li key={w} className="flex-1">
            <span
              className={`block h-1.5 rounded-full transition-colors duration-500 ${i <= step ? 'bg-gradient-to-r from-[#5448ff] to-seal-bright' : 'bg-white/10'}`}
            />
            <span className={`mt-2 block text-[11px] sm:text-xs ${i === step ? 'text-white' : 'text-white/45'}`}>
              {i + 1} {w}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10">
          <s.icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-white/50">{s.agent}</p>
          <p className="truncate text-sm font-medium">{s.status}</p>
        </div>
        <span className="grid size-7 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
          <Check className="size-4" aria-hidden="true" />
        </span>
      </div>
    </GlowCard>
  )
}

/* ---------------------------------------------------------------- Data visual */

// Small illustrative screen for "Key capabilities".
export function DataVisual({ v }: { v: Solution['visual'] }) {
  if (v.chat) return <ParrotChat messages={v.chat} glow="brand" />
  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8" role="figure" aria-label={`${v.title} (sample data)`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold">{v.title}</p>
        {v.badge && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{v.badge}</span>}
      </div>

      {v.rows && (
        <ul className="mt-5 grid gap-2">
          {v.rows.map((r, i) => (
            <li key={i} className="rounded-2xl bg-mist px-4 py-3">
              <div className="flex items-center justify-between gap-3 text-sm">
                {r.label ? (
                  <span className="font-medium">
                    {r.label}
                    {r.detail && <span className="ml-2 font-normal text-muted">{r.detail}</span>}
                  </span>
                ) : (
                  <span className="h-2 w-28 rounded-full bg-line" aria-hidden="true" />
                )}
                {r.status ? (
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${toneCls[r.tone ?? 'info']}`}>{r.status}</span>
                ) : (
                  <span className="font-semibold tabular-nums">{r.value}</span>
                )}
              </div>
              {r.pct !== undefined && (
                <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-line">
                  <span className={`block h-full rounded-full bg-gradient-to-r ${barCls[r.tone ?? 'info']}`} style={{ width: `${r.pct * 100}%` }} />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {v.meter && (
        <div className="mt-5 rounded-2xl bg-mist px-4 py-3">
          <div className="flex flex-wrap justify-between gap-2 text-sm">
            <span className="text-muted">{v.meter.label}</span>
            <span className="font-semibold">{v.meter.value}</span>
          </div>
          <span className="mt-2 block h-2 overflow-hidden rounded-full bg-line">
            <span className="block h-full rounded-full bg-gradient-to-r from-brand-deep to-brand-soft" style={{ width: `${v.meter.pct * 100}%` }} />
          </span>
        </div>
      )}

      {!v.rows && !v.meter && !v.actions && (
        <div className="mt-5 grid gap-2" aria-hidden="true">
          {[90, 72, 84, 60].map((w, i) => (
            <span key={i} className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
              <span className="h-2 rounded-full bg-line" style={{ width: `${w * 0.5}%` }} />
              <span className="h-2 w-14 rounded-full bg-brand/20" />
            </span>
          ))}
        </div>
      )}

      {v.actions && (
        <div className="mt-5 rounded-2xl bg-mist p-4">
          <span className="block h-2 w-1/2 rounded-full bg-line" aria-hidden="true" />
          <span className="mt-2 block h-2 w-1/3 rounded-full bg-line" aria-hidden="true" />
          <div className="mt-4 flex gap-2 text-xs font-semibold">
            {v.actions.map((a, i) => (
              <span key={a} className={`rounded-full px-4 py-2 ${i === 0 ? 'bg-ink text-white' : 'ring-1 ring-line'}`}>
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {v.footer && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-seal px-4 py-3 text-sm text-navy">
          <span className="flex items-center gap-2 font-semibold">
            <Check className="size-4" aria-hidden="true" />
            {v.footer.label}
          </span>
          {v.footer.value && <span className="font-medium">{v.footer.value}</span>}
        </div>
      )}
      {v.caption && <p className="mt-4 text-xs text-muted">{v.caption}</p>}
    </div>
  )
}

/* ---------------------------------------------------------------- Steps */

// Numbered steps joined by the brand gradient line (as in the original "How it works").
export function StepRow({ steps }: { steps: { title: string; label?: string; text?: string; flag?: string }[] }) {
  const cols = { 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6' }[steps.length] ?? 'md:grid-cols-4'
  return (
    <ol className={`relative mt-12 grid gap-6 md:gap-4 ${cols}`}>
      <span
        className="absolute top-7 right-[8%] left-[8%] hidden h-px bg-gradient-to-r from-brand via-brand-deep to-crimson md:block"
        aria-hidden="true"
      />
      {steps.map((step, i) => (
        <Reveal as="li" key={`${step.title}-${i}`} delay={i * 90} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
          <span className="relative grid size-14 shrink-0 place-items-center rounded-full bg-white text-sm font-semibold text-navy ring-1 ring-line">
            {step.label ?? `0${i + 1}`}
          </span>
          <div>
            <h3 className="text-lg font-semibold md:mt-5">{step.title}</h3>
            {step.text && <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>}
            {step.flag && <span className="mt-2 inline-block rounded-full bg-crimson px-2.5 py-0.5 text-xs font-semibold text-white">{step.flag}</span>}
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

/* ---------------------------------------------------------------- Flagship */

export function FlagshipPanel({ panel }: { panel: Solution['flagship']['panel'] }) {
  return (
    <GlowCard glow="br" className="p-6 sm:p-8">
      <p className="text-xs font-semibold tracking-[0.16em] text-seal-bright/80 uppercase">{panel.label}</p>
      <p className="mt-3 text-xl font-semibold">{panel.title}</p>
      {panel.lines && (
        <ul className="mt-3 grid gap-1 text-sm text-white/65">
          {panel.lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      )}
      {panel.message && (
        <div className="mt-5 rounded-2xl bg-white p-4 text-ink">
          <p className="text-sm font-semibold">{panel.message.subject}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{panel.message.body}</p>
          <span className="mt-3 inline-block rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white">{panel.message.pay}</span>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
            <Paperclip className="size-3.5" aria-hidden="true" />
            {panel.message.attachment}
          </p>
        </div>
      )}
      {panel.actions && (
        <div className="mt-4 flex gap-2 text-xs font-semibold">
          {panel.actions.map((a, i) => (
            <span key={a} className={`rounded-full px-4 py-2 ${i === 0 ? 'bg-white text-ink' : 'ring-1 ring-white/20'}`}>
              {a}
            </span>
          ))}
        </div>
      )}
      <ul className="mt-6 grid gap-2.5 border-t border-white/10 pt-6 text-sm">
        {panel.facts.map((f) => (
          <li key={f} className="flex gap-3">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/10 text-seal-bright">
              <Check className="size-3" aria-hidden="true" />
            </span>
            <span className="text-white/80">{f}</span>
          </li>
        ))}
      </ul>
    </GlowCard>
  )
}

export function Outcomes({ title, items }: { title: string; items: { title: string; text: string }[] }) {
  return (
    <div className="mt-14">
      <h3 className="text-xs font-semibold tracking-[0.2em] text-brand-deep uppercase">{title}</h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((o, i) => (
          <Reveal as="li" key={o.title} delay={i * 80} className="rounded-[1.75rem] bg-white p-6 ring-1 ring-line">
            <span className="grid size-9 place-items-center rounded-full bg-seal text-navy">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
            <p className="mt-5 font-semibold">{o.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{o.text}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}

/* ---------------------------------------------------------- Manual vs agent */

export function ManualVsAgent({ s }: { s: Solution }) {
  const { manual: m, agentWay: a } = s
  return (
    <>
      <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        <Reveal className="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">How it is done today</p>
            <span className="rounded-full bg-crimson/10 px-3 py-1 text-xs font-semibold text-[#c23a56]">{m.time}</span>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-line">
            <p className="flex items-center gap-2 bg-mist px-4 py-2 text-xs font-medium text-muted">
              <FileSpreadsheet className="size-3.5 text-emerald-600" aria-hidden="true" />
              {m.file}
            </p>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-t border-line text-muted">
                  {m.columns.map((c) => (
                    <th key={c} scope="col" className="px-3 py-2 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {m.rows.map((r, i) => (
                  <tr key={i} className="border-t border-line">
                    {r.map((c, j) => (
                      <td key={j} className={`px-3 py-2 ${j === r.length - 1 ? 'font-semibold text-[#c23a56]' : ''}`}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ol className="mt-5 grid gap-2 text-sm">
            {m.tasks.map(([t, min], i) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-mist text-xs font-semibold text-muted">{i + 1}</span>
                <span className="flex-1">{t}</span>
                <span className="text-xs font-medium text-muted tabular-nums">{min}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="grid place-items-center" aria-hidden="true">
          <span className="grid size-12 place-items-center rounded-full bg-ink text-white lg:rotate-0">
            <ArrowRight className="size-5 rotate-90 lg:rotate-0" />
          </span>
        </div>

        <Reveal delay={120} className="h-full">
          <GlowCard glow="b" className="h-full p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-seal-bright/80 uppercase">
                <Sparkles className="size-3.5" aria-hidden="true" />
                {a.label}
              </p>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">{a.time}</span>
            </div>
            <p className="mt-1 text-sm text-white/55">How your agent handles it</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {a.kpis.map((k) => (
                <div key={k.label} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <p className="text-xs text-white/55">{k.label}</p>
                  <p className="mt-1 text-2xl font-semibold">{k.value}</p>
                  {k.delta && <p className="text-xs font-medium text-emerald-300">{k.delta}</p>}
                </div>
              ))}
            </div>
            <ol className="mt-5 grid gap-2 text-sm">
              {a.tasks.map(([t, mode], i) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold">{i + 1}</span>
                  <span className="flex-1 text-white/85">{t}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      mode === 'auto' ? 'bg-white/10 text-white/70' : 'bg-crimson text-white'
                    }`}
                  >
                    {mode}
                  </span>
                </li>
              ))}
            </ol>
          </GlowCard>
        </Reveal>
      </div>

      <ul className="mt-4 grid gap-4 sm:grid-cols-3">
        {a.results.map(([value, label], i) => (
          <Reveal as="li" key={label} delay={i * 80} className="rounded-[1.75rem] bg-white p-6 ring-1 ring-line">
            <p className="text-3xl font-semibold tracking-tight text-brand-deep">{value}</p>
            <p className="mt-1 text-sm text-muted">{label}</p>
          </Reveal>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">{a.note}</p>
    </>
  )
}
