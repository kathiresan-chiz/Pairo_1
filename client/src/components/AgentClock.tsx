import { useEffect, useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import ParrotIcon from './ParrotIcon'

export interface ClockAgent {
  id: string
  name: string
  agent: string
  icon: LucideIcon
}

interface AgentClockProps {
  agents: ClockAgent[]
  activeId: string
  onSelect: (id: string) => void
}

const TICKS = 60
const TAU = Math.PI * 2
// Geometry as fractions of the diagram's size: the threads start on the outer ring, and
// each agent rides its thread a little way in.
const THREAD_R = 0.47
const BEAD_U = 0.17

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/*
 * "Agents at work, 24×7": twelve threads, one per agent, swirl from the outer ring into
 * Parrot AI at the centre, and the ring turns once a minute like a seconds hand. Each
 * agent rides its thread as a bead and sends a pulse of work inward, the selected agent's
 * brightest. The threads draw in when the diagram scrolls into view.
 */
export default function AgentClock({ agents, activeId, onSelect }: AgentClockProps) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const beads = useRef<(HTMLButtonElement | null)[]>([])
  const activeIndex = Math.max(0, agents.findIndex((a) => a.id === activeId))
  const activeRef = useRef(activeIndex)

  useEffect(() => {
    activeRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    const box = wrap.current
    const cv = canvas.current
    const ctx = cv?.getContext('2d')
    if (!box || !cv || !ctx) return
    const still = reducedMotion()
    const geo = { size: 0, dpr: 1 }

    // A point on thread i at u (0 = the outer ring, 1 = the centre). `wave` scales the
    // ripple that travels along the thread.
    const threadPoint = (i: number, rot: number, t: number, u: number, wave = 1) => {
      const { size } = geo
      const c = size / 2
      const a = (i / TICKS) * TAU - Math.PI / 2 + rot
      const r = size * THREAD_R
      const px = c + r * Math.cos(a)
      const py = c + r * Math.sin(a)
      // Every thread bows the same way, so the bundle swirls; each sways as a whole too.
      const twist = 0.85 + 0.22 * Math.sin(t * 0.55 + i * 0.37)
      const qx = c + r * 0.56 * Math.cos(a + twist)
      const qy = c + r * 0.56 * Math.sin(a + twist)
      const ex = c + size * 0.012 * Math.cos(i * 1.7 + t * 0.3)
      const ey = c + size * 0.012 * Math.sin(i * 1.3 + t * 0.3)
      const v = 1 - u
      const x = v * v * px + 2 * v * u * qx + u * u * ex
      const y = v * v * py + 2 * v * u * qy + u * u * ey
      if (!wave) return [x, y]
      // A wave rolls along the thread from the agent to the centre, pinned at both ends.
      const dx = 2 * v * (qx - px) + 2 * u * (ex - qx)
      const dy = 2 * v * (qy - py) + 2 * u * (ey - qy)
      const len = Math.hypot(dx, dy) || 1
      const off =
        size * 0.026 * wave * Math.sin(Math.PI * u) * Math.sin(TAU * 1.7 * u - t * 2.4 + i * 0.9)
      return [x + (-dy / len) * off, y + (dx / len) * off]
    }

    const state = { drawStart: -1, lastT: 0 }

    const frame = (now: number) => {
      const { size, dpr } = geo
      const t = now / 1000
      state.lastT = now
      const date = new Date()
      const sec = date.getSeconds() + date.getMilliseconds() / 1000
      const rot = -(sec / 60) * TAU

      if (state.drawStart < 0) state.drawStart = still ? -100 : t
      const elapsed = t - state.drawStart
      const active = activeRef.current

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, size, size)
      ctx.lineCap = 'round'

      // Only the agents' threads: every fifth position round the ring
      for (let i = 0; i < TICKS; i += 5) {
        // Draw in from the ring to the centre, one thread after another.
        const prog = Math.min(1, Math.max(0, (elapsed - (i / 5) * 0.07) / 0.9))
        const isActive = i / 5 === active
        const wave = still ? 0.6 : isActive ? 1.35 : 1

        // Agents ride their thread as beads (shown once their thread has drawn past them)
        const bead = beads.current[i / 5]
        if (bead) {
          const [bx, by] = threadPoint(i, rot, t, BEAD_U, wave)
          bead.style.translate = `${bx}px ${by}px`
          bead.style.opacity = prog > BEAD_U ? '1' : '0'
        }
        if (prog <= 0) continue

        const steps = 64
        ctx.beginPath()
        for (let k = 0; k <= steps; k++) {
          const [x, y] = threadPoint(i, rot, t, (k / steps) * prog, wave)
          if (k === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        if (isActive) {
          const [x0, y0] = threadPoint(i, rot, t, 0)
          const g = ctx.createLinearGradient(x0, y0, size / 2, size / 2)
          g.addColorStop(0, '#3a78c2')
          g.addColorStop(1, '#fd6e88')
          ctx.strokeStyle = g
          ctx.lineWidth = 1.7
          ctx.shadowColor = 'rgba(58,120,194,0.55)'
          ctx.shadowBlur = 8
        } else {
          ctx.strokeStyle = 'rgba(27,74,140,0.4)'
          ctx.lineWidth = 1
          ctx.shadowBlur = 0
        }
        ctx.stroke()
        ctx.shadowBlur = 0

        // A pulse of work travelling in from each agent to the ledger
        if (prog >= 1 && !still) {
          const speed = isActive ? 0.42 : 0.2
          const u = BEAD_U + (((t * speed + (i / TICKS) * 3.7) % 1) * (1 - BEAD_U))
          const [x, y] = threadPoint(i, rot, t, u, wave)
          const fade = Math.sin(((u - BEAD_U) / (1 - BEAD_U)) * Math.PI)
          ctx.beginPath()
          ctx.arc(x, y, isActive ? 2.6 : 1.6, 0, TAU)
          ctx.fillStyle = isActive ? `rgba(253,110,136,${0.35 + 0.65 * fade})` : `rgba(58,120,194,${0.55 * fade})`
          if (isActive) {
            ctx.shadowColor = 'rgba(253,110,136,0.8)'
            ctx.shadowBlur = 10
          }
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      // Clear a soft disc so the parrot reads cleanly over the bundle
      const c = size / 2
      const halo = ctx.createRadialGradient(c, c, 0, c, c, size * 0.21)
      halo.addColorStop(0, 'rgba(255,255,255,0.97)')
      halo.addColorStop(0.55, 'rgba(255,255,255,0.78)')
      halo.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = halo
      ctx.fillRect(c - size * 0.21, c - size * 0.21, size * 0.42, size * 0.42)
    }

    const resize = () => {
      geo.size = box.clientWidth
      geo.dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(geo.size * geo.dpr)
      cv.height = Math.round(geo.size * geo.dpr)
      box.style.setProperty('--s', `${geo.size}px`)
      frame(state.lastT || performance.now()) // resizing clears the canvas: redraw at once
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(box)

    // Run only while on screen; with reduced motion, redraw once a second.
    const run = { raf: 0, timer: 0, visible: false }
    const loop = (now: number) => {
      frame(now)
      if (run.visible) run.raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => {
      run.visible = e.isIntersecting
      cancelAnimationFrame(run.raf)
      window.clearInterval(run.timer)
      if (!run.visible) return
      if (still) {
        frame(performance.now())
        run.timer = window.setInterval(() => frame(performance.now()), 1000)
      } else run.raf = requestAnimationFrame(loop)
    })
    io.observe(box)

    return () => {
      io.disconnect()
      ro.disconnect()
      cancelAnimationFrame(run.raf)
      window.clearInterval(run.timer)
    }
  }, [])

  const active = agents[activeIndex]

  return (
    <div ref={wrap} className="agent-clock relative mx-auto aspect-square w-full max-w-[460px]">
      <canvas ref={canvas} className="absolute inset-0 size-full" aria-hidden="true" />

      {/* The agents, riding their threads (placed each frame) */}
      <div className="absolute inset-0" aria-hidden="true">
        {agents.slice(0, 12).map((ag, k) => (
          <button
            key={ag.id}
            ref={(el) => {
              beads.current[k] = el
            }}
            type="button"
            tabIndex={-1}
            title={ag.name}
            onClick={() => onSelect(ag.id)}
            className="ac-agent"
            data-on={k === activeIndex ? '' : undefined}
          >
            <ag.icon className="size-[46%]" />
          </button>
        ))}
      </div>

      {/* Centre: Parrot AI, the AI behind every agent, and the selected agent */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p key={active.id} className="ac-agent-name stage-in">
            <active.icon className="size-[1.1em]" aria-hidden="true" />
            {active.agent}
          </p>
          <span className="ac-parrot">
            <ParrotIcon tone="brand" title="Parrot AI" className="h-auto w-full" />
          </span>
          <p className="ac-sub">Parrot AI · at work 24×7</p>
        </div>
      </div>
    </div>
  )
}
