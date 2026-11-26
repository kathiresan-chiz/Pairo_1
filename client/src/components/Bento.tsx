import { useId, useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Light "bento" building blocks (first used by the onboarding board): soft white tiles,
// an infinity loop, and headlines with gradient figures.
//
// Animation hooks for content cards: .bh-ring (an SVG ring; data-from = its empty
// dash offset) fills, and .bh-seg bars grow from the left, once the board scrolls in.

// A lemniscate (∞) centred in a 240×120 box.
const INFINITY = 'M120 60 C 150 18, 214 18, 214 60 C 214 102, 150 102, 120 60 C 90 18, 26 18, 26 60 C 26 102, 90 102, 120 60 Z'

export function Tile({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`ob-tile rounded-[2rem] shadow-[0_24px_60px_-30px_rgba(7,45,89,0.25)] ring-1 ring-black/[0.04] ${className}`}>{children}</div>
}

// The infinity loop: drawn in on scroll (.ob-inf-path), with a light running round it.
export function InfinityLoop({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 240 120" className={`ob-infinity overflow-visible ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1b4a8c" />
          <stop offset=".5" stopColor="#3a78c2" />
          <stop offset="1" stopColor="#46b7d4" />
        </linearGradient>
        <filter id={`${id}-b`} x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <path d={INFINITY} fill="none" stroke="#7fb1f0" strokeOpacity=".55" strokeWidth="18" filter={`url(#${id}-b)`} />
      <path className="ob-inf-path" d={INFINITY} fill="none" stroke={`url(#${id}-g)`} strokeWidth="11" strokeLinecap="round" pathLength={1} />
      <path className="ob-inf-run" d={INFINITY} fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" pathLength={1} />
    </svg>
  )
}

// Shows the figures in a headline ("3 days", "12 agents") in the brand gradient.
export function GradientNumbers({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\d+\s+[\w-]+)/).map((p, i) =>
        /^\d/.test(p) ? (
          <span key={i} className="bg-gradient-to-r from-brand-deep via-brand to-[#46b7d4] bg-clip-text text-transparent">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  )
}

interface BentoHeroProps {
  eyebrow: string
  /** sentences become lines; "12 agents" style figures are shown in the gradient */
  title: string
  text?: string
  stats: { value: string; label: string }[]
  /** the content card on the left, specific to the page */
  aside: ReactNode
}

/*
 * The primary card of a light board: emblem tile + a wide headline card with
 * counting stat tiles and the infinity loop. Animates once as it scrolls in.
 */
export function BentoHero({ eyebrow, title, text, stats, aside }: BentoHeroProps) {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(el)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
      tl.from(q('.ob-tile'), { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.14 })
        .from(q('.ob-title-line'), { yPercent: 60, autoAlpha: 0, duration: 0.8, stagger: 0.12 }, 0.3)
        .fromTo(q('.ob-inf-path'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.5)
      animateContent(tl, q)
      q('.ob-count').forEach((value: HTMLElement, i: number) => {
        const text = value.dataset.value ?? ''
        const match = text.match(/\d+/)
        if (!match) return
        const counter = { n: 0 }
        value.textContent = text.replace(match[0], '0')
        tl.to(
          counter,
          {
            n: Number(match[0]),
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              value.textContent = text.replace(match[0], String(Math.round(counter.n)))
            },
          },
          0.8 + i * 0.2,
        )
      })
    })
    return () => mm.revert()
  }, [])

  const lines = title.split(/(?<=[.·])\s+/)

  return (
    <div ref={root} className="grid gap-4 sm:gap-5 lg:grid-cols-3">
      <Tile className="flex min-h-[280px] flex-col bg-white p-7">{aside}</Tile>

      <Tile className="relative overflow-hidden bg-white lg:col-span-2">
        <div className="grid h-full gap-6 sm:grid-cols-[1fr_minmax(0,0.6fr)]">
          <div className="flex flex-col p-7 sm:p-10">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-brand uppercase">
              <span className="h-px w-6 bg-brand" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 className="mt-5 text-4xl leading-[1.04] font-semibold tracking-[-0.035em] text-ink sm:text-5xl xl:text-[3.4rem]">
              {lines.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <span className="ob-title-line block">
                    <GradientNumbers text={line} />
                  </span>
                </span>
              ))}
            </h2>
            {text && <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{text}</p>}
            <dl className="mt-auto grid grid-cols-3 gap-3 pt-8">
              {stats.map((st) => (
                <div key={st.label} className="rounded-2xl bg-mist px-4 py-3">
                  <dd className="ob-count text-2xl font-semibold tracking-tight text-ink sm:text-3xl" data-value={st.value}>
                    {st.value}
                  </dd>
                  <dt className="mt-0.5 text-xs text-muted">{st.label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="ob-soft relative hidden min-h-[320px] place-items-center sm:grid">
            <InfinityLoop className="w-[86%] max-w-[340px]" />
          </div>
        </div>
      </Tile>
    </div>
  )
}

// Fills .bh-ring rings and grows .bh-seg bars inside a board's timeline.
export function animateContent(tl: gsap.core.Timeline, q: (sel: string) => Element[]) {
  q('.bh-ring').forEach((ring) => {
    tl.from(ring, { strokeDashoffset: Number((ring as SVGElement).dataset.from), duration: 1.6, ease: 'power2.inOut' }, 0.5)
  })
  tl.from(q('.bh-seg'), { scaleX: 0, transformOrigin: '0% 50%', duration: 0.5, ease: 'power2.out', stagger: 0.08 }, 0.6)
}
