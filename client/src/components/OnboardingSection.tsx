import { useLayoutEffect, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button'
import { DarkHeading, GiantWord, GlowCard, MetricCard } from './Dark'
import { demoLink, home, onboarding } from '../content/site'

gsap.registerPlugin(ScrollTrigger)

// Where each figure counts from: 3 days and 2 weeks count up; Day 0 counts down
// from the 8-day close it replaces (see the Accounting page, "8 days → Day 0").
const countFrom: Record<string, number> = { '3 days': 0, '2 weeks': 0, 'Day 0': 8 }

/*
 * Onboarding, animated as it scrolls into view:
 * the wordmark wipes in left → right, the metric fills grow like chart bars in
 * turn while their figures count, a progress line draws across the timeline and
 * each step rises in as the line reaches it. The fills' gradient keeps drifting
 * left ↔ right (CSS, see .metric-fill).
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
        scrollTrigger: { trigger: el, start: 'top 72%', once: true },
      })

      tl.from(q('.ob-heading'), { y: 30, autoAlpha: 0, duration: 0.8 })
        .fromTo(
          q('.giant-word'),
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power2.inOut' },
          '-=0.4',
        )
        .from(q('.ob-metric'), { y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.15 }, '-=1')

      // Bars grow from the bottom, left to right; the striped one sweeps in sideways.
      q('.ob-metric').forEach((card, i) => {
        const bar = card.querySelector('.metric-bar')
        const value = card.querySelector<HTMLElement>('.metric-value')
        const at = 1.1 + i * 0.25
        if (bar?.classList.contains('metric-stripes')) {
          tl.fromTo(bar, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power2.inOut' }, at)
        } else if (bar) {
          tl.fromTo(bar, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 1.1, ease: 'expo.out' }, at)
        }
        // Count the figure
        const text = value?.dataset.value ?? ''
        const match = text.match(/\d+/)
        if (value && match) {
          const target = Number(match[0])
          const counter = { n: countFrom[text] ?? 0 }
          value.textContent = text.replace(match[0], String(counter.n))
          tl.to(
            counter,
            {
              n: target,
              duration: 1.2,
              ease: 'power2.out',
              onUpdate: () => {
                value.textContent = text.replace(match[0], String(Math.round(counter.n)))
              },
            },
            at,
          )
        }
      })

      tl.from(q('.ob-cta'), { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.6')
        // The progress line draws across the timeline; each step rises as it arrives.
        .fromTo(q('.ob-line'), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'power1.inOut' }, '-=0.2')
        .from(q('.ob-step'), { y: 24, autoAlpha: 0, duration: 0.6, stagger: 1.6 / onboarding.timeline.length }, '<0.1')
        .from(q('.ob-dot'), { scale: 0, duration: 0.4, ease: 'back.out(3)', stagger: 1.6 / onboarding.timeline.length }, '<')
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} className="container-x scroll-mt-24 py-6">
      <div className="dark-panel overflow-hidden px-5 py-14 sm:px-10 sm:py-20 lg:px-14">
        <div className="ob-heading">
          <DarkHeading eyebrow={onboarding.eyebrow} title={onboarding.title} />
        </div>

        <div className="relative mt-12">
          <GiantWord className="-mb-[0.32em]">Onboarding</GiantWord>
          <div className="relative grid gap-3 sm:grid-cols-3">
            {home.onboardingStats.map((st, i) => (
              <div key={st.label} className="ob-metric">
                <MetricCard
                  label={st.label}
                  value={st.value}
                  variant={i === 0 ? 'stripes' : 'fill'}
                  fill={[0.6, 0.38, 0.5][i]}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="ob-cta">
          <Button to={demoLink} variant="ghost" className="mt-4 w-full">
            Book a demo
          </Button>
        </div>

        {/* Timeline with a progress line */}
        <div className="relative mt-12">
          <div className="absolute top-0 right-[10%] left-[10%] hidden h-px bg-white/10 lg:block" aria-hidden="true" />
          <div
            className="ob-line absolute top-0 right-[10%] left-[10%] hidden h-px origin-left bg-gradient-to-r from-[#5448ff] via-brand to-seal-bright shadow-[0_0_12px_rgba(94,224,242,0.7)] lg:block"
            aria-hidden="true"
          />
          <ol className="grid gap-3 pt-0 sm:grid-cols-2 lg:grid-cols-5 lg:pt-8">
            {onboarding.timeline.map((t, i) => (
              <li key={t.when} className="ob-step relative">
                <span
                  className="ob-dot absolute -top-8 left-1/2 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-seal-bright shadow-[0_0_14px_rgba(94,224,242,0.9)] lg:block"
                  aria-hidden="true"
                />
                <GlowCard
                  glow="sweep"
                  className="flex h-full min-h-[150px] flex-col p-5"
                  style={{ '--drift-delay': `${-i * 1.1}s` } as CSSProperties}
                >
                  <span className="text-sm font-semibold text-seal-bright">{t.when}</span>
                  <span className="mt-auto pt-6 font-medium">{t.what}</span>
                </GlowCard>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
