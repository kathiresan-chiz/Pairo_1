import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, HandCoins, Landmark, Moon, ReceiptText, ShieldCheck, Sun } from 'lucide-react'
import '@fontsource-variable/archivo/wdth.css'
import './hero-stage.css'
import LedgerLoop, { type HeroTheme } from './LedgerLoop'
import HeroWaves from './HeroWaves'
import ParrotIcon from './ParrotIcon'
import { openParrot } from '../lib/parrot'
import { demoLink, home } from '../content/site'

/*
 * Optional background clips (H.264 .mp4, muted, seamless loop, ideally under 4 MB)
 * in client/public. When one plays it replaces the rendered glass spheres; if it
 * is missing or fails, the spheres stay.
 */
const HERO_VIDEOS: Partial<Record<HeroTheme, string>> = {
  light: '/videos/hero-light.mp4',
  dark: '/videos/hero-dark.mp4',
}

const STORAGE_KEY = 'pairo-hero-theme'
const SWIPE_TO = demoLink

function readTheme(): HeroTheme {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark') return v
  } catch {
    /* storage unavailable */
  }
  return 'light'
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Questions the pill cycles through, each typed in turn.
const pillAsks = ["What's my bank balance?", 'Who owes us the most?', 'Is my 3B ready?', 'Send P&L to my CA']

function ParrotPill() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setI((n) => (n + 1) % pillAsks.length), 3200)
    return () => window.clearInterval(id)
  }, [])
  return (
    <button type="button" className="hs-parrot" onClick={openParrot} aria-label="Ask Parrot AI">
      <span className="hs-parrot__avatar" aria-hidden="true">
        <ParrotIcon tone="brand" className="hs-parrot__icon" />
        <span className="hs-parrot__dot" />
      </span>
      <span className="hs-parrot__text">
        <span className="hs-parrot__label">Parrot AI · online</span>
        <span key={i} className="hs-parrot__ask">“{pillAsks[i]}”</span>
      </span>
    </button>
  )
}

export default function HeroStage() {
  const [theme, setTheme] = useState<HeroTheme>(readTheme)
  const [switching, setSwitching] = useState(false)
  const [videoOk, setVideoOk] = useState<Partial<Record<HeroTheme, boolean>>>({})
  const timers = useRef<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  // The hero fills the screen below the sticky navbar, so track the navbar's height.
  useLayoutEffect(() => {
    const header = document.querySelector('header')
    const section = sectionRef.current
    if (!header || !section) return
    const set = () => section.style.setProperty('--nav-h', `${header.offsetHeight}px`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(header)
    return () => ro.disconnect()
  }, [])
  const dark = theme === 'dark'

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Dim and blur the whole stage, swap the theme while it is dark, then bring it back.
  const toggleTheme = () => {
    if (switching) return
    const next: HeroTheme = dark ? 'light' : 'dark'
    if (prefersReducedMotion()) return setTheme(next)
    setSwitching(true)
    timers.current.push(
      window.setTimeout(() => setTheme(next), 420),
      window.setTimeout(() => setSwitching(false), 470),
    )
  }

  const video = HERO_VIDEOS[theme]

  return (
    <section ref={sectionRef} className="hs container-x pt-3 pb-6" data-theme={theme} data-switching={switching ? '' : undefined}>
      <div className="hs-frame">
        <div className="hs-screen">
          <LedgerLoop theme={theme} className="hs-bg" />
          <HeroWaves theme={theme} className="hs-waves" />
          {video && videoOk[theme] !== false && (
            <video
              key={video}
              className={`hs-bg object-cover transition-opacity duration-700 ${videoOk[theme] ? 'opacity-100' : 'opacity-0'}`}
              src={video}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              onPlaying={() => setVideoOk((v) => ({ ...v, [theme]: true }))}
              onError={() => setVideoOk((v) => ({ ...v, [theme]: false }))}
            />
          )}

          {/* Headline */}
          <div className="hs-copy">
            <h1 className="hs-title">
              {home.title.map((line, i) => (
                <span key={line} className="hs-line">
                  <span style={{ animationDelay: `${0.35 + i * 0.12}s` }}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="hs-lead hs-in" style={{ animationDelay: '0.75s' }}>
              {home.lead}
            </p>
          </div>

          {/* Glass cards */}
          <div className="hs-cards">
            <div className="hs-card hs-in" style={{ animationDelay: '0.55s' }}>
              <h2 className="hs-card__title">
                {home.liveAgent.label}
                <br />
                {home.liveAgent.status}
              </h2>
              <p className="hs-card__text">
                {home.liveAgent.event} — {home.liveAgent.detail} ✓
              </p>
              <div className="hs-card__row">
                <Link to="/solutions" className="hs-pill">
                  See the agents
                </Link>
                <span className="hs-faces" aria-hidden="true">
                  {agentIcons.map((Icon, i) => (
                    <span key={i} className="hs-agent">
                      <Icon />
                    </span>
                  ))}
                </span>
              </div>
            </div>
            <div className="hs-card hs-card--b hs-in" style={{ animationDelay: '0.65s' }}>
              <h2 className="hs-card__title">
                Migrated in 3 days.
                <br />
                Live in 2 weeks.
              </h2>
              <p className="hs-card__text">
                {home.onboardingStats.map((st) => `${st.value} ${st.label}`).join(' · ')}
              </p>
              <Link to={demoLink} className="hs-pill">
                Book a demo
              </Link>
            </div>
          </div>

          <SwipeToStart />
        </div>

        {/* Top-left tab: brand + theme switch */}
        <div className="hs-tab hs-tab--tl">
          <span className="hs-brand">
            PairO
            <br />
            Agentic ERP
          </span>
          <button
            type="button"
            className="hs-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
            aria-pressed={dark}
          >
            <span className="hs-toggle__knob">
              {dark ? <Moon key="moon" aria-hidden="true" /> : <Sun key="sun" aria-hidden="true" />}
            </span>
          </button>
        </div>

        {/* Top-right tab: Parrot AI, live (opens the chat in the corner) */}
        <div className="hs-tab hs-tab--tr">
          <ParrotPill />
        </div>

        {/* Bottom-centre tab: main call to action */}
        <div className="hs-tab hs-tab--b">
          <Link to="/parrot-ai" className="hs-cta">
            See Parrot AI in action
          </Link>
        </div>
      </div>
    </section>
  )
}

// The agents shown on the "at work" card: Banking, Bills, Collections, Audit.
const agentIcons = [Landmark, ReceiptText, HandCoins, ShieldCheck]

// Drag the knob to the end of the track (or press it) to book a demo.
function SwipeToStart() {
  const navigate = useNavigate()
  const track = useRef<HTMLDivElement>(null)
  const knob = useRef<HTMLButtonElement>(null)
  const drag = useRef<{ start: number; moved: boolean } | null>(null)
  const [x, setX] = useState(0)
  const [max, setMax] = useState(1)
  const [dragging, setDragging] = useState(false)
  const [done, setDone] = useState(false)

  const go = () => {
    if (done) return
    setDone(true)
    window.setTimeout(() => navigate(SWIPE_TO), 320)
  }

  const onDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const t = track.current!.getBoundingClientRect()
    const k = knob.current!.getBoundingClientRect()
    setMax(t.width - k.width - (k.left - t.left) * 2)
    drag.current = { start: e.clientX, moved: false }
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = drag.current
    if (!d) return
    const nx = Math.max(0, Math.min(max, e.clientX - d.start))
    if (nx > 4) d.moved = true
    setX(nx)
  }
  const onUp = () => {
    const d = drag.current
    if (!d) return
    drag.current = null
    setDragging(false)
    if (!d.moved || x > max * 0.8) {
      setX(max)
      go()
    } else setX(0)
  }

  return (
    <div
      ref={track}
      className="hs-swipe hs-in"
      style={{ animationDelay: '0.6s' }}
      data-dragging={dragging ? '' : undefined}
    >
      <span className="hs-swipe__fill" style={{ width: `calc(${x}px + var(--knob) + var(--inset) * 2)` }} />
      <button
        ref={knob}
        type="button"
        className="hs-swipe__knob"
        style={{ transform: `translateX(${x}px)` }}
        aria-label="Book a demo"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        // Keyboard activation (pointer presses are handled on release above)
        onClick={(e) => {
          if (e.detail === 0) go()
        }}
      >
        <ChevronRight aria-hidden="true" />
      </button>
      <span className="hs-swipe__label" style={{ opacity: done ? 0 : Math.max(0, 1 - (x / max) * 1.3) }}>
        Swipe to book a demo
      </span>
    </div>
  )
}
