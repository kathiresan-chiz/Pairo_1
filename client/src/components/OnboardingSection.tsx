import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Database, Plus, Rocket, Scale, ShieldCheck, Sparkles, Users } from 'lucide-react'
import Button from './Button'
import monogram from '../assets/brand/monogram-white.png'
import { animateContent, GradientNumbers, InfinityLoop, Tile } from './Bento'
import { demoLink, home, onboarding } from '../content/site'

gsap.registerPlugin(ScrollTrigger)

// Where each figure counts from: 3 days and 2 weeks count up; Day 0 counts down
// from the 8-day close it replaces (see the Accounting page, "8 days → Day 0").
const countFrom: Record<string, number> = { '3 days': 0, '2 weeks': 0, 'Day 0': 8 }

const [migration, goLive, close] = home.onboardingStats
const [day1, day2, day3, weeks, live] = onboarding.timeline
const stepIcons = [Database, Scale, Check, Users, Rocket]

/*
 * Onboarding as a light, airy board. The headline card is the primary focus;
 * the cards around it are quieter, secondary panels.
 * On scroll-in: cards rise in turn, figures count, the infinity loop draws itself.
 */
export default function OnboardingSection() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(el)
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      })

      tl.from(q('.ob-tile'), { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.14 })
        .from(q('.ob-title-line'), { yPercent: 60, autoAlpha: 0, duration: 0.8, stagger: 0.12 }, 0.3)
        .fromTo(q('.ob-inf-path'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.5)
        .from(q('.ob-step'), { x: -16, autoAlpha: 0, duration: 0.5, stagger: 0.12 }, 0.9)
      animateContent(tl, q)

      q('.ob-count').forEach((value: HTMLElement, i: number) => {
        const text = value.dataset.value ?? ''
        const match = text.match(/\d+/)
        if (!match) return
        const counter = { n: countFrom[text] ?? 0 }
        value.textContent = text.replace(match[0], String(counter.n))
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

  const titleLines = onboarding.title.split(/(?<=\.)\s+/)

  return (
    <section ref={root} id="onboarding" className="container-x scroll-mt-24 py-10 sm:py-16">
      <div className="relative isolate">
        {/* soft ambient glow behind the board */}
        <span className="pointer-events-none absolute -top-10 left-[8%] -z-10 h-72 w-72 rounded-full bg-seal-bright/40 blur-[90px]" aria-hidden="true" />
        <span className="pointer-events-none absolute right-[5%] bottom-0 -z-10 h-80 w-80 rounded-full bg-brand/20 blur-[100px]" aria-hidden="true" />

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
          {/* Month-end close: before vs with PairO */}
          <Tile className="flex min-h-[300px] flex-col bg-white p-7">
            <CloseCompare />
          </Tile>

          {/* PRIMARY — the onboarding headline */}
          <Tile className="relative overflow-hidden bg-white lg:col-span-2">
            <div className="grid h-full gap-6 sm:grid-cols-[1fr_minmax(0,0.62fr)]">
              <div className="flex flex-col p-7 sm:p-10">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-brand uppercase">
                  <span className="h-px w-6 bg-brand" aria-hidden="true" />
                  {onboarding.eyebrow}
                </p>
                <h2 className="mt-5 text-4xl leading-[1.04] font-semibold tracking-[-0.035em] text-ink sm:text-5xl xl:text-[3.6rem]">
                  {titleLines.map((line) => (
                    <span key={line} className="block overflow-hidden pb-[0.06em]">
                      <span className="ob-title-line block">
                        <GradientNumbers text={line} />
                      </span>
                    </span>
                  ))}
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                  {[day1, day2, day3].map((t) => t.what).join(', ')}. Then {weeks.what.toLowerCase()}, and you're {live.what.toLowerCase()}.
                </p>

                <dl className="mt-auto grid grid-cols-3 gap-3 pt-8">
                  {[migration, goLive, close].map((st) => (
                    <div key={st.label} className="rounded-2xl bg-mist px-4 py-3">
                      <dd className="ob-count text-2xl font-semibold tracking-tight text-ink sm:text-3xl" data-value={st.value}>
                        {st.value}
                      </dd>
                      <dt className="mt-0.5 text-xs text-muted">{st.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Infinity loop: the books keep running, 24×7 */}
              <div className="ob-soft relative hidden min-h-[360px] place-items-center sm:grid" aria-hidden="true">
                <InfinityLoop className="w-[86%] max-w-[340px]" />
              </div>
            </div>
          </Tile>

          {/* Secondary — the five steps */}
          <Tile className="relative overflow-hidden bg-gradient-to-br from-navy to-brand-deep p-7 text-white">
            <p className="text-xs font-semibold tracking-[0.2em] text-seal-bright/80 uppercase">The plan</p>
            <ol className="relative mt-5 grid gap-3.5">
              <span className="absolute top-3 bottom-3 left-[15px] w-px bg-white/15" aria-hidden="true" />
              {onboarding.timeline.map((t, i) => {
                const Icon = stepIcons[i]
                return (
                  <li key={t.when} className="ob-step relative flex items-center gap-3">
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full ${i === 4 ? 'bg-crimson' : 'bg-white/10 ring-1 ring-white/20'}`}>
                      <Icon className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold text-seal-bright">{t.when}</span>
                      <span className="block truncate text-sm text-white/85">{t.what}</span>
                    </span>
                  </li>
                )
              })}
            </ol>
            <span className="absolute right-5 bottom-5 flex items-center gap-2 rounded-full bg-white/95 py-1.5 pr-4 pl-1.5 text-xs font-semibold text-ink shadow-xl">
              <span className="grid size-7 place-items-center rounded-full bg-ink text-white">
                <Plus className="size-3.5" aria-hidden="true" />
              </span>
              {close.value} close
            </span>
          </Tile>

          {/* Secondary — onboarding team note */}
          <Tile className="flex flex-col bg-white p-7">
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-b from-brand-soft to-brand-deep shadow-md shadow-brand/30">
                <img src={monogram} alt="" className="w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink">PairO onboarding</p>
                <p className="text-xs text-muted">onboarding · {weeks.when}</p>
              </div>
              <span className="grid size-9 place-items-center rounded-full bg-mist text-muted" aria-hidden="true">
                <ShieldCheck className="size-4" />
              </span>
            </div>
            <p className="mt-6 leading-relaxed text-muted">
              “{day1.what} is in. Opening balances next, then I'll reconcile everything to your legacy books by {day3.when}.”
            </p>
            <div className="mt-auto flex items-center gap-3 rounded-full bg-mist py-1.5 pr-1.5 pl-5 pt-1.5">
              <span className="flex-1 truncate text-sm text-muted">Ask about your onboarding…</span>
              <span className="grid size-11 place-items-center rounded-full bg-gradient-to-b from-brand-soft to-brand text-white shadow-lg shadow-brand/40" aria-hidden="true">
                <Plus className="size-5" />
              </span>
            </div>
          </Tile>

          {/* Secondary — orbit + call to action */}
          <Tile className="flex flex-col overflow-hidden bg-white">
            <div className="relative h-56 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-seal-bright via-brand-soft to-brand" aria-hidden="true">
              <span className="absolute top-1/2 left-1/2 size-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
              <span className="absolute top-1/2 left-1/2 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40" />
              <span className="absolute top-1/2 left-1/2 size-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50" />
              <div className="ob-orbit absolute top-1/2 left-1/2 size-[85%] -translate-x-1/2 -translate-y-1/2">
                {stepIcons.map((Icon, i) => {
                  const a = (i / stepIcons.length) * 2 * Math.PI
                  return (
                    <span
                      key={i}
                      className="absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/30 text-white ring-1 ring-white/50 backdrop-blur-sm"
                      style={{ left: `${50 + 50 * Math.sin(a)}%`, top: `${50 - 50 * Math.cos(a)}%` }}
                    >
                      <Icon className="ob-orbit-icon size-3.5" />
                    </span>
                  )
                })}
              </div>
              <span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/35 shadow-[0_0_40px_rgba(255,255,255,0.6)] ring-1 ring-white/60 backdrop-blur-md">
                <Sparkles className="size-8 text-white" />
              </span>
            </div>
            <div className="flex items-end justify-between gap-4 px-6 pt-5 pb-6">
              <p className="text-lg leading-snug text-ink">
                Live in <span className="font-semibold">{goLive.value}</span>.
                <br />
                <span className="text-muted">Book your onboarding.</span>
              </p>
              <Button to={demoLink} variant="outline" className="shrink-0 !py-1.5 text-xs">
                Book a demo
              </Button>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  )
}

// Month-end close, before and with PairO: eight days of closing work become Day 0.
function CloseCompare() {
  return (
    <>
      <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">{close.label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-ink">
        <span className="text-muted line-through decoration-crimson/60 decoration-2">8 days</span>
        <span className="mx-2 text-muted">→</span>
        <GradientNumbers text={close.value.replace('Day 0', '0 days')} />
      </p>

      <div className="mt-auto grid gap-5 pt-8">
        <div>
          <div className="flex justify-between text-xs">
            <span className="font-medium text-muted">Before</span>
            <span className="font-semibold text-muted">8 days</span>
          </div>
          <div className="mt-2 flex gap-1" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="bh-seg h-3 flex-1 rounded-full bg-line" />
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs">
            <span className="font-medium text-ink">With PairO</span>
            <span className="font-semibold text-brand">{close.value}</span>
          </div>
          <div className="mt-2 flex items-center gap-2" aria-hidden="true">
            <span className="bh-seg h-3 w-6 rounded-full bg-gradient-to-r from-brand to-[#46b7d4]" />
            <span className="grid size-6 place-items-center rounded-full bg-emerald-500 text-white">
              <Check className="size-3.5" />
            </span>
            <span className="text-xs font-medium text-emerald-700">books closed</span>
          </div>
        </div>
      </div>
    </>
  )
}
