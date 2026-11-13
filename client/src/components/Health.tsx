import { AlertTriangle, Check, X } from 'lucide-react'
import { GlowCard } from './Dark'
import { healthCheck, type CheckStatus } from '../content/site'

const statusStyle: Record<CheckStatus, { icon: typeof Check; cls: string; label: string }> = {
  ok: { icon: Check, cls: 'bg-emerald-400/15 text-emerald-300', label: 'Clear' },
  warn: { icon: AlertTriangle, cls: 'bg-amber-400/15 text-amber-300', label: 'Warning' },
  fail: { icon: X, cls: 'bg-crimson/20 text-crimson', label: 'Problem' },
}

// Live Health Check: score ring, counts, the check list and the open problem.
export function HealthPanel({ className = '' }: { className?: string }) {
  const h = healthCheck
  const r = 42
  const circ = 2 * Math.PI * r

  return (
    <GlowCard glow="tr" className={`p-5 sm:p-7 ${className}`} role="figure" aria-label="Health Check overview (sample data)">
      <div className="flex flex-wrap items-center gap-6">
        <div className="relative size-28 shrink-0">
          <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="url(#hc-grad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(circ * h.score) / 100} ${circ}`}
            />
            <defs>
              <linearGradient id="hc-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#5448ff" />
                <stop offset="1" stopColor="#5ee0f2" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-content-center text-center">
            <span className="text-3xl leading-none font-semibold">{h.score}</span>
            <span className="text-[11px] text-white/55">health</span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-medium">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
            {h.live}
          </p>
          <p className="mt-1 text-xs text-white/50">{h.scope}</p>
          <ul className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
            <li className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-300">{h.counts.clear}</li>
            <li className="rounded-full bg-amber-400/15 px-3 py-1 text-amber-300">{h.counts.warnings}</li>
            <li className="rounded-full bg-crimson/20 px-3 py-1 text-crimson">{h.counts.problems}</li>
          </ul>
        </div>
      </div>

      <ul className="mt-6 divide-y divide-white/[0.07]">
        {h.checks.map((c) => {
          const s = statusStyle[c.status]
          return (
            <li key={c.name} className="flex items-center gap-3 py-2.5 text-sm">
              <span className={`grid size-6 shrink-0 place-items-center rounded-full ${s.cls}`}>
                <s.icon className="size-3.5" aria-hidden="true" />
                <span className="sr-only">{s.label}</span>
              </span>
              <span className="flex-1 text-white/85">{c.name}</span>
              <span className={`text-xs font-medium ${c.status === 'ok' ? 'text-white/45' : c.status === 'warn' ? 'text-amber-300' : 'text-crimson'}`}>
                {c.result}
              </span>
            </li>
          )
        })}
      </ul>

      <div className="mt-5 rounded-2xl bg-crimson/10 p-4 ring-1 ring-crimson/30">
        <p className="text-sm font-semibold text-crimson">{h.alert.title}</p>
        <p className="mt-1 text-sm text-white/75">{h.alert.text}</p>
        <span className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink">{h.alert.action}</span>
      </div>
    </GlowCard>
  )
}

// The custom-check builder card.
export function CustomCheckCard({ className = '' }: { className?: string }) {
  const b = healthCheck.custom.builder
  return (
    <GlowCard glow="bl" className={`p-5 sm:p-7 ${className}`} role="figure" aria-label="Custom check builder (sample data)">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">{b.title}</p>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70">{b.plans}</span>
      </div>
      <dl className="mt-5 grid gap-2">
        {b.fields.map((f) => (
          <div key={f.label} className="grid grid-cols-[88px_1fr] items-center gap-3 rounded-2xl bg-white/[0.05] px-4 py-3 ring-1 ring-white/10">
            <dt className="text-xs text-white/50">{f.label}</dt>
            <dd className="text-sm font-medium">{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 flex items-center gap-3 rounded-2xl bg-amber-400/10 px-4 py-3 text-sm ring-1 ring-amber-400/30">
        <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-xs font-bold text-ink">!</span>
        <span className="font-semibold text-amber-200">{b.result}</span>
      </p>
    </GlowCard>
  )
}
