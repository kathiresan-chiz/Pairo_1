import { useRef, useState, type KeyboardEvent } from 'react'
import { Check } from 'lucide-react'
import Button from './Button'
import { modules } from '../content/site'

// Tabbed view of the ERP modules, with an orbit diagram showing how the
// selected module connects to the rest of the platform.
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
        aria-label="ERP modules"
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
          <h3 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">{active.name}</h3>
          <p className="mt-4 leading-relaxed text-muted">{active.detail}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {active.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium">
                <span className="grid size-5 place-items-center rounded-full bg-brand/10 text-brand">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Button to="/services#modules" variant="outline" className="mt-8">
            See all capabilities
          </Button>
        </div>
        <ModuleOrbit activeId={active.id} onSelect={setActiveId} />
      </div>
    </div>
  )
}

interface ModuleOrbitProps {
  activeId: string
  onSelect: (id: string) => void
}

function ModuleOrbit({ activeId, onSelect }: ModuleOrbitProps) {
  const active = modules.find((m) => m.id === activeId) ?? modules[0]
  const others = modules.filter((m) => m.id !== activeId)
  const radius = 39
  const nodes = others.map((m, i) => {
    const angle = (i / others.length) * Math.PI * 2 - Math.PI / 2
    return { ...m, x: 50 + radius * Math.cos(angle), y: 50 + radius * Math.sin(angle) }
  })

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[400px]" aria-hidden="true">
      <div className="absolute inset-[11%] rounded-full border border-dashed border-brand/30" />
      <div className="absolute inset-[30%] rounded-full bg-seal-soft" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
        {nodes.map((n) => (
          <line
            key={n.id}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="#3A78C2"
            strokeOpacity="0.35"
            strokeWidth="0.4"
            strokeDasharray="1.5 2"
            className="animate-dash"
          />
        ))}
      </svg>
      <div className="absolute top-1/2 left-1/2 grid size-[28%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-navy-deep via-brand-deep to-brand text-white shadow-xl shadow-brand/30">
        <active.icon className="size-1/3" />
      </div>
      {nodes.map((n) => (
        <button
          key={n.id}
          type="button"
          tabIndex={-1}
          onClick={() => onSelect(n.id)}
          title={n.name}
          className="absolute grid size-[14%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-white text-brand-deep shadow-lg ring-1 shadow-navy/10 ring-line transition hover:scale-110 hover:text-crimson"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <n.icon className="size-1/2" />
        </button>
      ))}
    </div>
  )
}
