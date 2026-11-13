import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { Eyebrow } from '../components/SectionHeader'
import CtaBanner from '../components/CtaBanner'
import { DarkPanel, GlowCard, RefStrip } from '../components/Dark'
import { compliance, demoLink, globalCta } from '../content/site'

export default function Compliance() {
  const c = compliance
  const panels: Record<string, ReactNode> = {
    gst: <GstPanel />,
    tds: <TdsPanel />,
    books: <AuditPanel />,
    msme: <MsmePanel />,
  }

  return (
    <>
      <Seo title="Statutory compliance, built in · GST, TDS, Companies Act, MSME · PairO" description={c.lead} path="/compliance" />

      <section className="container-x pt-14 pb-12 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <Reveal>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl 2xl:text-7xl">{c.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{c.lead}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <li key={t} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium ring-1 ring-line">
                  <Check className="size-3.5 text-brand" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button to={demoLink}>Book a demo</Button>
            </div>
          </Reveal>
          <Reveal delay={120} variant="rise">
            <Calendar />
          </Reveal>
        </div>
      </section>

      <DarkPanel>
        <div>
          <RefStrip items={c.refs.map((r) => ({ name: r.name, sub: r.act }))} />
        </div>

        <div className="mt-14 grid gap-16">
          {c.acts.map((a, i) => (
            <div key={a.id} id={a.id} className="grid scroll-mt-28 gap-8 lg:grid-cols-2 lg:items-center">
              <div className={i % 2 ? 'lg:order-2' : ''}>
                <p className="text-sm font-semibold text-seal-bright">{a.num}</p>
                <p className="mt-3 text-sm text-white/55">{a.act}</p>
                <h2 className="mt-1 text-3xl font-medium tracking-tight sm:text-4xl">{a.name}</h2>
                <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                  {a.steps.map((st, k) => (
                    <li key={st} className="flex items-center gap-2">
                      <span className="flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 ring-1 ring-white/10">
                        <span className="text-xs text-white/45">{k + 1}</span>
                        {st}
                      </span>
                      {k < a.steps.length - 1 && <span className="text-white/30" aria-hidden="true">→</span>}
                    </li>
                  ))}
                </ol>
                <ul className="mt-6 grid gap-2">
                  {a.tags.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-white/80">
                      <Check className="size-4 text-seal-bright" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>{panels[a.id]}</div>
            </div>
          ))}
        </div>
      </DarkPanel>

      <section className="container-x pt-6">
        <p className="rounded-2xl bg-seal-soft px-5 py-4 text-sm text-navy ring-1 ring-seal">{c.footnote}</p>
      </section>

      <CtaBanner title={globalCta.title} primary={globalCta.primary} secondary={globalCta.secondary} />
    </>
  )
}

function Calendar() {
  const cal = compliance.calendar
  const cells = [...Array(cal.firstWeekday).fill(null), ...Array.from({ length: cal.days }, (_, i) => i + 1)]
  return (
    <GlowCard glow="b" className="p-5 sm:p-7" role="figure" aria-label={`${cal.title}, ${cal.month}`}>
      <div className="flex items-center justify-between">
        <p className="font-semibold">{cal.title}</p>
        <span className="text-sm text-white/55">{cal.month}</span>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-1 text-center text-xs">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="py-1 text-white/40">
            {d}
          </span>
        ))}
        {cells.map((d, i) => {
          const due = d ? cal.due[d] : undefined
          return (
            <span
              key={i}
              className={`flex aspect-square flex-col items-center justify-center rounded-xl text-sm ${
                due ? 'bg-gradient-to-br from-[#5448ff] to-brand font-semibold' : d ? 'bg-white/[0.04]' : ''
              }`}
            >
              {d}
              {due && <span className="text-[9px] font-medium text-white/85">{due}</span>}
            </span>
          )
        })}
      </div>
      <ul className="mt-5 grid gap-2 border-t border-white/10 pt-5 text-sm sm:grid-cols-2">
        {cal.legend.map((l) => (
          <li key={l.label} className="flex justify-between gap-3 rounded-xl bg-white/[0.05] px-3 py-2">
            <span className="text-white/75">{l.label}</span>
            <span className="font-semibold">{l.date}</span>
          </li>
        ))}
      </ul>
    </GlowCard>
  )
}

function PanelCard({ title, badge, children }: { title: string; badge?: string; children?: ReactNode }) {
  return (
    <GlowCard glow="br" className="p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold">{title}</p>
        {badge && <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">{badge}</span>}
      </div>
      {children}
    </GlowCard>
  )
}

function GstPanel() {
  const p = compliance.gstPanel
  return (
    <PanelCard title={p.title} badge={p.badge}>
      <div className="mt-6">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">{p.meter.label}</span>
          <span className="font-semibold">{p.meter.value}</span>
        </div>
        <span className="mt-2 block h-2 overflow-hidden rounded-full bg-white/10">
          <span className="block h-full rounded-full bg-gradient-to-r from-[#5448ff] to-seal-bright" style={{ width: `${p.meter.pct * 100}%` }} />
        </span>
      </div>
      <p className="mt-5 text-sm text-white/60">{p.caption}</p>
    </PanelCard>
  )
}

function TdsPanel() {
  const p = compliance.tdsPanel
  return (
    <PanelCard title={p.title} badge={p.badge}>
      <div className="mt-6 grid gap-2" aria-hidden="true">
        {[80, 64, 72].map((w, i) => (
          <span key={i} className="flex items-center justify-between rounded-xl bg-white/[0.05] px-4 py-3">
            <span className="h-2 rounded-full bg-white/15" style={{ width: `${w * 0.5}%` }} />
            <span className="h-2 w-12 rounded-full bg-seal-bright/40" />
          </span>
        ))}
      </div>
      <p className="mt-5 text-sm text-white/60">{p.caption}</p>
    </PanelCard>
  )
}

function AuditPanel() {
  const p = compliance.auditTrail
  return (
    <PanelCard title={p.title}>
      <ol className="mt-6 grid gap-3 border-l border-white/15 pl-5">
        {p.events.map((e) => (
          <li key={e.time} className="relative text-sm">
            <span className="absolute top-1.5 -left-[25px] size-2.5 rounded-full bg-seal-bright" aria-hidden="true" />
            <span className="text-xs text-white/45">{e.time}</span>
            <p>
              <span className="font-semibold">{e.action}</span> <span className="text-white/65">{e.detail}</span>
            </p>
          </li>
        ))}
      </ol>
      <ul className="mt-6 grid gap-1 border-t border-white/10 pt-4 text-xs text-white/55">
        {p.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </PanelCard>
  )
}

function MsmePanel() {
  const p = compliance.msmePanel
  return (
    <PanelCard title={p.title}>
      <div className="mt-6 flex items-center gap-6">
        <p className="text-center">
          <span className="block text-5xl leading-none font-medium">{p.countdown.value}</span>
          <span className="text-xs text-white/55">{p.countdown.label}</span>
        </p>
        <ul className="grid flex-1 gap-2 text-sm">
          {p.suppliers.map((s) => (
            <li key={s.name} className="flex justify-between gap-3 rounded-xl bg-white/[0.05] px-3 py-2">
              <span>{s.name}</span>
              <span className={s.late ? 'font-semibold text-crimson' : 'text-white/60'}>{s.day}</span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="mt-6 grid gap-1 border-t border-white/10 pt-4 text-xs text-white/55">
        {p.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </PanelCard>
  )
}
