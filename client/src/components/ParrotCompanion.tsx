import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowDownRight, X } from 'lucide-react'
import ParrotIcon from './ParrotIcon'
import { demoLink } from '../content/site'
import { PARROT_OPEN } from '../lib/parrot'
import { companionAnswers, companionFallback, companionScript } from '../content/companion'

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Parrot AI companion, docked bottom-right on every page.
 * On each page change (Layout remounts it) it flies up out of the bottom-right corner along a swooping path (wing flapping, sparkle trail), lands in the corner
 * and types a line for that page. Tap it to open a small chat with that page's questions
 * and the demo company's sample answers.
 */
export default function ParrotCompanion() {
  const { pathname } = useLocation()
  const { say: greeting, asks } = companionScript(pathname)
  const [flying, setFlying] = useState(false)
  const [landed, setLanded] = useState(0)
  const [bubble, setBubble] = useState('')
  const [count, setCount] = useState(0)
  const typed = bubble.slice(0, count)
  const show = (text: string) => {
    setBubble(text)
    setCount(reducedMotion() ? text.length : 0)
  }
  const [open, setOpen] = useState(false)
  const [asked, setAsked] = useState<string | null>(null)
  const [thinking, setThinking] = useState(false)

  const flyer = useRef<HTMLDivElement>(null)
  const dock = useRef<HTMLButtonElement>(null)
  const trail = useRef<HTMLDivElement>(null)
  const thinkTimer = useRef(0)

  // Fly in once, then greet.
  useEffect(() => {
    const f = flyer.current
    const d = dock.current
    if (reducedMotion() || !f || !d) {
      // No flight: just show the docked parrot, then greet.
      setLanded(1)
      const t = setTimeout(() => show(greeting), 600)
      return () => clearTimeout(t)
    }
    const run: { anim: Animation | null } = { anim: null }
    let raf = 0
    let greet = 0
    let done = false
    // Lands the parrot once: when the flight ends, or by the safety timer below if the
    // flight never finishes (e.g. the tab was in the background), so it never stays hidden.
    const land = () => {
      if (done) return
      done = true
      run.anim?.cancel()
      cancelAnimationFrame(raf)
      setFlying(false)
      setLanded((n) => n + 1)
      greet = window.setTimeout(() => show(greeting), 350)
    }
    const safety = window.setTimeout(land, 4200)
    const start = setTimeout(() => {
      const r = d.getBoundingClientRect()
      const w = window.innerWidth
      const h = window.innerHeight
      const ex = r.left + r.width / 2
      const ey = r.top + r.height / 2
      // From just outside the bottom-right corner: rise up and left in an arc, then drop into the dock.
      const lift = Math.min(260, h * 0.32)
      const path = `M ${w + 50} ${h + 40} C ${w - 40} ${h - lift}, ${ex - 150} ${ey - lift * 0.8}, ${ex} ${ey}`
      f.style.setProperty('offset-path', `path('${path}')`)
      setFlying(true)
      const anim = f.animate(
        [
          { offsetDistance: '0%', opacity: 0, transform: 'rotate(-16deg) scale(.8)' },
          { opacity: 1, offset: 0.12 },
          { transform: 'rotate(0deg) scale(1)', offset: 0.6 },
          { offsetDistance: '100%', opacity: 1, transform: 'rotate(14deg) scale(.85)' },
        ],
        { duration: 1700, easing: 'cubic-bezier(.4,.1,.3,1)', fill: 'forwards' },
      )
      let last = 0
      const tick = (t: number) => {
        if (t - last > 34 && trail.current) {
          last = t
          const b = f.getBoundingClientRect()
          const dot = document.createElement('span')
          dot.className = 'pc-trail'
          const size = 3 + Math.random() * 4
          dot.style.cssText = `left:${b.left + b.width * 0.15 + (Math.random() - 0.5) * 8}px;top:${b.top + b.height * 0.7 + (Math.random() - 0.5) * 8}px;width:${size}px;height:${size}px`
          dot.addEventListener('animationend', () => dot.remove())
          trail.current.appendChild(dot)
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      run.anim = anim
      anim.onfinish = land
    }, 900)
    return () => {
      clearTimeout(start)
      clearTimeout(safety)
      clearTimeout(greet)
      run.anim?.cancel()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once per mount; Layout remounts per page
  }, [])

  // Type the speech bubble, then let it rest and fade.
  useEffect(() => {
    if (!bubble) return
    const id = setInterval(() => setCount((c) => (c >= bubble.length ? c : c + 1)), 26)
    const hide = setTimeout(() => setBubble(''), 9000 + bubble.length * 26)
    return () => {
      clearInterval(id)
      clearTimeout(hide)
    }
  }, [bubble])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => () => clearTimeout(thinkTimer.current), [])

  // Opened from elsewhere on the page (e.g. the Parrot AI pill in the home hero).
  useEffect(() => {
    const onOpen = () => {
      setOpen(true)
      setBubble('')
    }
    window.addEventListener(PARROT_OPEN, onOpen)
    return () => window.removeEventListener(PARROT_OPEN, onOpen)
  }, [])

  function ask(q: string) {
    setAsked(q)
    setThinking(true)
    clearTimeout(thinkTimer.current)
    thinkTimer.current = window.setTimeout(() => setThinking(false), reducedMotion() ? 0 : 1100)
  }

  return (
    <>
      {/* sparkle trail + the flying parrot (decorative) */}
      <div ref={trail} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]" />
      <div
        ref={flyer}
        aria-hidden="true"
        className={`pc-flyer pointer-events-none fixed top-0 left-0 z-[60] w-16 opacity-0 md:w-20 ${flying ? 'parrot-flying' : 'hidden'}`}
      >
        <ParrotIcon tone="brand" className="block h-auto w-full drop-shadow-[0_10px_14px_rgba(27,74,140,0.3)]" />
      </div>

      <div className="fixed right-4 bottom-4 z-[60] flex flex-col items-end gap-3 md:right-6 md:bottom-6">
        {/* chat panel */}
        {open && (
          <div
            data-lenis-prevent
            role="dialog"
            aria-label="Parrot AI"
            className="pc-pop w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line bg-white text-ink shadow-[0_28px_56px_-24px_rgba(7,45,89,0.45)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <ParrotIcon tone="brand" className="h-7 w-auto" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Parrot AI</p>
                <p className="text-[11px] text-muted">The AI behind every agent · own model</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Parrot AI"
                className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-mist hover:text-ink"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-2 px-4 py-4 text-[13px]" aria-live="polite">
              {!asked && <p className="leading-relaxed text-brand-deep/90">{greeting}</p>}
              {asked && (
                <>
                  <p className="pc-pop ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-navy px-3 py-2 text-white">{asked}</p>
                  {thinking ? (
                    <p className="flex w-fit gap-1 rounded-2xl rounded-bl-md border border-line bg-mist px-3 py-3" aria-label="Parrot AI is thinking">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="pc-dot size-1.5 rounded-full bg-brand" style={{ animationDelay: `${d * 0.15}s` }} />
                      ))}
                    </p>
                  ) : (
                    <p className="pc-pop w-fit max-w-[90%] rounded-2xl rounded-bl-md border border-line bg-mist px-3 py-2 leading-relaxed">
                      {companionAnswers[asked] ?? companionFallback}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="border-t border-line px-4 py-3">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">Try asking</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {asks.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => ask(q)}
                    className={`rounded-lg border px-2.5 py-1 text-left text-[12px] transition-colors ${
                      asked === q ? 'border-navy bg-navy text-white' : 'border-line hover:border-brand hover:text-brand-deep'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-muted/80">Sample answers from a demo company.</p>
              <div className="mt-3 flex items-center justify-between gap-3 text-[12px]">
                <Link to="/parrot-ai" className="inline-flex items-center gap-1.5 font-medium hover:text-brand">
                  Everything I do <ArrowDownRight className="size-3.5" />
                </Link>
                <Link
                  to={demoLink}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-1.5 font-medium text-white transition-colors hover:bg-brand-deep"
                >
                  Try me in a demo <ArrowDownRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* speech bubble */}
        {bubble && !open && (
          <button
            type="button"
            onClick={() => {
              setOpen(true)
              setBubble('')
            }}
            className="pc-pop relative max-w-[min(260px,calc(100vw-6rem))] rounded-2xl rounded-br-md border border-line bg-white px-3.5 py-2.5 text-left text-[12.5px] leading-snug text-ink shadow-[0_16px_32px_-18px_rgba(7,45,89,0.45)] md:text-[13px]"
          >
            <span className="sr-only">Open Parrot AI: </span>
            {typed}
            <span aria-hidden="true" className={typed.length < bubble.length ? 'pc-caret' : 'hidden'}>
              ▍
            </span>
          </button>
        )}

        {/* the docked parrot */}
        <button
          ref={dock}
          type="button"
          onClick={() => {
            setOpen(!open)
            setBubble('')
          }}
          aria-label={open ? 'Close Parrot AI' : 'Ask Parrot AI'}
          aria-expanded={open}
          className={`pc-dock group relative grid size-16 place-items-center transition-opacity md:size-[72px] ${landed > 0 ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <span aria-hidden="true" className="pc-halo absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(200,230,250,0.95)_0%,rgba(200,230,250,0.55)_55%,transparent_72%)]" />
          <span aria-hidden="true" className="pc-ring absolute inset-1 rounded-full border border-brand/50" />
          <span aria-hidden="true" className="absolute inset-[6px] rounded-full border border-line bg-white shadow-[0_12px_28px_-12px_rgba(7,45,89,0.55)] transition-colors group-hover:border-brand/40" />
          <span aria-hidden="true" className="pc-ring pc-ring-2 absolute inset-1 rounded-full border border-brand/40" />
          <span key={landed} className="pc-land relative block w-[62%]">
            <span className="parrot-stand block">
              <ParrotIcon tone="brand" className="block h-auto w-full transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
            </span>
          </span>
          <span aria-hidden="true" className="absolute top-1.5 right-1.5 size-2.5 rounded-full border-2 border-white bg-brand" />
        </button>
      </div>
    </>
  )
}
