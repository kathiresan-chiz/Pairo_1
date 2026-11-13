import { useRef, useState, type KeyboardEvent } from 'react'
import { Check } from 'lucide-react'
import Button from './Button'
import AgentClock from './AgentClock'
import { solutionPath, solutions } from '../content/solutions'

// The twelve agentic solutions, shaped for the explorer.
const modules = solutions.map((s) => ({
  id: s.slug,
  icon: s.icon,
  name: s.name,
  agent: s.agent,
  detail: s.tagline,
  points: s.duties,
  to: solutionPath(s),
}))

// Tabbed view of the agentic solutions, with the agent clock: all twelve agents on one
// ring, threaded into the ledger, the selected one highlighted.
export default function ModuleExplorer() {
  const [activeId, setActiveId] = useState(modules[0].id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const active = modules.find((m) => m.id === activeId) ?? modules[0]

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    const index = modules.findIndex((m) => m.id === activeId)
    const next = modules[(index + keys[e.key] + modules.length) % modules.length]
    setActiveId(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-[300px_1fr]">
      <div
        role="tablist"
        aria-label="Agentic solutions"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {modules.map((m) => {
          const selected = m.id === activeId
          return (
            <button
              key={m.id}
              ref={(el) => {
                tabRefs.current[m.id] = el
              }}
              type="button"
              role="tab"
              id={`tab-${m.id}`}
              aria-selected={selected}
              aria-controls="module-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(m.id)}
              className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                selected ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-line hover:ring-brand/40'
              }`}
            >
              <m.icon className={`size-4 ${selected ? 'text-crimson' : 'text-brand'}`} aria-hidden="true" />
              {m.name}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id="module-panel"
        aria-labelledby={`tab-${active.id}`}
        className="grid items-center gap-10 rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-10 xl:grid-cols-2"
      >
        <div key={active.id} className="reveal is-visible">
          <span className="grid size-12 place-items-center rounded-2xl bg-seal text-navy">
            <active.icon className="size-5" aria-hidden="true" />
          </span>
          <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-brand-deep uppercase">{active.agent}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{active.name}</h3>
          <p className="mt-4 leading-relaxed text-muted">{active.detail}</p>
          <ul className="mt-6 grid gap-3">
            {active.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium">
                <span className="grid size-5 place-items-center rounded-full bg-brand/10 text-brand">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Button to={active.to} variant="outline" className="mt-8">
            Explore agent
          </Button>
        </div>
        <AgentClock agents={modules} activeId={active.id} onSelect={setActiveId} />
      </div>
    </div>
  )
}
