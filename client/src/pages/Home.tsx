import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, BellRing, Check, ListChecks, Scale, ShieldAlert, SlidersHorizontal, Wand2 } from 'lucide-react'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import SectionHeader from '../components/SectionHeader'
import InfinityVisual from '../components/InfinityVisual'
import DashboardMock from '../components/DashboardMock'
import QuickDemoForm from '../components/QuickDemoForm'
import HeroStage from '../components/HeroStage'
import LiquidFill from '../components/LiquidFill'
import ModuleExplorer from '../components/ModuleExplorer'
import AiSection from '../components/AiSection'
import WhySection from '../components/WhySection'
import ParrotChat from '../components/ParrotChat'
import { CustomCheckCard, HealthPanel } from '../components/Health'
import { StepRow } from '../components/SolutionBlocks'
import OnboardingSection from '../components/OnboardingSection'
import CtaBanner, { brandGradient } from '../components/CtaBanner'
import monogram from '../assets/brand/monogram-white.png'
import { homeChat } from '../content/chat'
import { solutions, solutionsHub } from '../content/solutions'
import {
  agentDay,
  company,
  compliance,
  dualRole,
  globalCta,
  healthCheck,
  home,
  parrotIntro,
} from '../content/site'

const pillTilt = ['-7deg', '6deg', '-3deg', '4deg', '-5deg', '3deg']

const healthCards = [
  {
    icon: ListChecks,
    title: '70 built-in checks',
    text: '70 checks across 12 audit areas, live with every posting.',
    highlight: 'live with every posting',
    to: healthCheck.link.to,
  },
  {
    icon: ShieldAlert,
    title: healthCheck.alert.title,
    text: healthCheck.alert.text,
    highlight: 'Reverse it before filing GSTR-3B.',
    to: healthCheck.link.to,
  },
  {
    icon: Scale,
    title: 'GSTR-3B, GSTR-1 and books agree',
    text: 'Trial balance balances Dr = Cr. TDS register equals ledger. Stock value equals inventory ledgers.',
    highlight: 'Dr = Cr',
    to: healthCheck.link.to,
  },
  {
    icon: Wand2,
    title: 'Any rule, zero code',
    text: 'Custom checks: your rules, enforced every day.',
    highlight: 'enforced every day',
    to: `${healthCheck.link.to}#custom`,
  },
  {
    icon: SlidersHorizontal,
    title: 'Severity you define',
    text: 'Fine-tune the built-in checks, and set the severity of every rule you add.',
    highlight: 'Fine-tune the built-in checks',
    to: `${healthCheck.link.to}#custom`,
  },
  {
    icon: BellRing,
    title: 'Alerts routed to the right people',
    text: 'Owner, Accounts head · daily 8 am.',
    highlight: 'daily 8 am',
    to: `${healthCheck.link.to}#custom`,
  },
]

/*
 * The home page is long. Building all of it at once froze the page for ~0.4 s on entry, so
 * the hero renders first and each later section mounts in turn whenever the browser is
 * idle (all of them within about a second), long before a visitor can scroll to them.
 */
const SECTIONS = 9

function useStagedSections(total: number) {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    if (stage >= total) return
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const next = () => setStage((n) => n + 1)
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(next, { timeout: 250 })
      return () => w.cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(next, 40)
    return () => window.clearTimeout(id)
  }, [stage, total])
  return stage
}

export default function Home() {
  const stage = useStagedSections(SECTIONS)
  return (
    <>
      <Seo
        title="PairO | The agentic ERP built for Indian business"
        description="The agentic accountant that closes your books. Fully automated, 24×7: twelve agents on one ledger, real-time Health Check, Parrot AI and statutory compliance built in."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: company.name,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: company.description,
        }}
      />

      {/* 01 — Hero */}
      <HeroStage />

      <Marquee items={solutions.map((s) => s.agent)} className="container-x" />

      {stage > 0 && (
        <>
          {/* 02 — The agent at work */}
          <section id="overview" className="container-x scroll-mt-24 pt-8 pb-6">
            <div className="grid gap-4 xl:grid-cols-[1.75fr_1fr]">
              <Reveal
                className="grain relative isolate overflow-hidden rounded-[2.5rem] p-6 text-white sm:min-h-[560px] sm:p-10"
                style={{ background: brandGradient }}
              >
                <div
                  className="dot-grid absolute inset-y-0 left-0 -z-10 w-1/2 opacity-50 [mask-image:linear-gradient(90deg,#000,transparent)]"
                  aria-hidden="true"
                />
                <InfinityVisual className="absolute top-[18%] -left-28 -z-10 w-[720px] opacity-70" />
                <div className="flex flex-col gap-2 text-[11px] font-medium tracking-[0.2em] text-seal/80 uppercase sm:flex-row sm:justify-between sm:gap-6">
                  <span className="max-w-[18rem]">{home.builtBy}</span>
                  <span className="sm:text-right">
                    {home.liveAgent.label}
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> · </span>
                    {home.liveAgent.status}
                  </span>
                </div>
                <DashboardMock className="relative mt-8 sm:ml-auto sm:w-[80%] lg:w-[66%] xl:w-[64%]" />
                <ul className="relative z-10 mt-6 flex flex-wrap gap-2 lg:absolute lg:bottom-10 lg:left-8 lg:mt-0 lg:max-w-[28%] xl:max-w-[32%]">
                  {home.agentTicker.map((label, i) => (
                    <li
                      key={label}
                      className={`rounded-full px-4 py-2 text-sm font-medium sm:animate-float ${
                        i % 2 ? 'bg-white text-ink shadow-lg shadow-navy/30' : 'bg-white/15 text-white ring-1 ring-white/30'
                      }`}
                      style={{ '--r': pillTilt[i % pillTilt.length], animationDelay: `${i * 0.6}s` } as CSSProperties}
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <div className="flex flex-col gap-4">
                <Reveal delay={120} className="flex-1 rounded-[2.5rem] bg-ink p-6 text-white sm:p-8">
                  <h2 className="text-xl font-semibold text-seal">Book a demo</h2>
                  <ul className="mt-4 grid gap-2 text-sm text-white/70">
                    {home.onboardingStats.map((st) => (
                      <li key={st.label} className="flex items-center gap-2">
                        <Check className="size-4 text-seal-bright" aria-hidden="true" />
                        <span className="font-semibold text-white">{st.value}</span> {st.label}
                      </li>
                    ))}
                  </ul>
                  <QuickDemoForm />
                </Reveal>
                <Reveal delay={200}>
                  <Link
                    to={solutionsHub.link.to}
                    className="group relative isolate flex items-center justify-between overflow-hidden rounded-full bg-gradient-to-r from-navy via-brand-deep to-brand py-2 pr-2 pl-7 text-base font-semibold text-white"
                  >
                    <LiquidFill className="bg-ink" />
                    {solutionsHub.link.label}
                    <span className="grid size-12 place-items-center rounded-full bg-white text-ink">
                      <ArrowUpRight className="arrow-turn size-5" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>
        </>
      )}

      {stage > 1 && (
        <>
          {/* 03 — One agent, a dual role */}
          <section className="container-x py-20 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <SectionHeader eyebrow={dualRole.eyebrow} title={dualRole.title} text={home.builtBy} />
                <Reveal delay={100} className="mt-8 rounded-[1.75rem] bg-white p-6 ring-1 ring-line">
                  <p className="text-xs font-semibold tracking-[0.2em] text-brand-deep uppercase">
                    {dualRole.accountant.role} · {dualRole.accountant.caption}
                  </p>
                  <ul className="mt-4 grid gap-3">
                    {dualRole.accountant.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 font-medium">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-seal text-navy">
                          <Check className="size-4" aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
              <ol className="grid gap-3">
                <Reveal as="li" className="px-2 text-xs font-semibold tracking-[0.2em] text-brand-deep uppercase">
                  {dualRole.auditor.role} · {dualRole.auditor.caption}
                </Reveal>
                {dualRole.auditor.items.map((item, i) => (
                  <Reveal as="li" key={item} delay={i * 100} className="flex items-center gap-5 rounded-[1.75rem] bg-white p-6 ring-1 ring-line">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <Check className="size-4" aria-hidden="true" />
                    </span>
                    <h3 className="font-semibold">{item}</h3>
                  </Reveal>
                ))}
                <Reveal as="li" delay={400} className="flex items-center gap-5 rounded-[1.75rem] p-6 text-white" style={{ background: brandGradient }}>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15">
                    <img src={monogram} alt="" className="w-6" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{home.liveAgent.label}</h3>
                    <p className="mt-1 text-sm text-white/75">{dualRole.outcomes.join(' · ')}</p>
                  </div>
                </Reveal>
              </ol>
            </div>
          </section>
        </>
      )}

      {stage > 2 && (
        <>
          {/* 04 — One business day */}
          <section className="container-x pb-20 sm:pb-28">
            <SectionHeader eyebrow={agentDay.eyebrow} title={agentDay.title} align="center" />
            <StepRow
              steps={agentDay.events.map((e) => ({
                label: e.time,
                title: e.agent,
                text: e.text,
                flag: e.needsYou ? 'needs you' : undefined,
              }))}
            />
            <Reveal className="mt-12 flex flex-wrap justify-center gap-2">
              {agentDay.summary.map((s) => (
                <span key={s} className="rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-line">
                  {s}
                </span>
              ))}
            </Reveal>
          </section>
        </>
      )}

      {stage > 3 && (
        <>
          {/* 05 — Twelve agentic solutions */}
          <section id="ecosystem" className="container-x scroll-mt-24 pb-20 sm:pb-28">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader eyebrow={solutionsHub.eyebrow} title={solutionsHub.homeTitle} text={solutionsHub.lead} />
              <Reveal>
                <Button to={solutionsHub.link.to} variant="outline">
                  {solutionsHub.link.label}
                </Button>
              </Reveal>
            </div>
            <ModuleExplorer />
          </section>
        </>
      )}

      {stage > 4 && (
        <>
          {/* 06 — Parrot AI */}
          <AiSection
            id="parrot"
            eyebrow={parrotIntro.eyebrow}
            title={parrotIntro.title}
            items={parrotIntro.features}
            closing="Runs on PairO's own model. Your data is never sent to an external AI."
            cta={parrotIntro.link}
          />

          {/* 06b — Parrot AI, live */}
          <section className="container-x py-6">
            <Reveal className="grid gap-10 rounded-[2.5rem] bg-white p-6 ring-1 ring-line sm:p-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
              <div>
                <SectionHeader eyebrow="Parrot AI · live" title="Ask. Get answers straight from your books." />
                <ul className="mt-8 grid gap-2">
                  {homeChat
                    .filter((m) => m.from === 'you' && m.text && m.text !== 'Confirm')
                    .map((m) => (
                      <li key={m.text} className="w-fit rounded-full bg-mist px-4 py-2 text-sm font-medium ring-1 ring-line">
                        {m.voice ? m.text : `“${m.text}”`}
                      </li>
                    ))}
                </ul>
                <Button to="/parrot-ai#parrot-live" variant="dark" className="mt-8">
                  See Parrot AI in action
                </Button>
              </div>
              <ParrotChat messages={homeChat} />
            </Reveal>
          </section>
        </>
      )}

      {stage > 5 && (
        <>
          {/* 07 — Real-time Health Check */}
          <div className="pt-20 sm:pt-28">
            <WhySection
              id="health"
              eyebrow={healthCheck.homeEyebrow}
              title={
                <>
                  An auditor that is <span className="text-brand">always in the room.</span>
                </>
              }
              lead={
                <p>
                  Health <span className="text-seal-bright">{healthCheck.score}</span> · {healthCheck.counts.clear} ·{' '}
                  {healthCheck.counts.warnings} · {healthCheck.counts.problems}. {healthCheck.live}.
                </p>
              }
              items={healthCards}
            />
          </div>

          {/* 07b — Health Check, live, and custom checks */}
          <section className="container-x pb-20 sm:pb-28">
            <Reveal className="grid gap-10 rounded-[2.5rem] bg-white p-6 ring-1 ring-line sm:p-12 lg:grid-cols-2 lg:items-start lg:gap-12">
              <HealthPanel />
              <div className="flex flex-col gap-6">
                <SectionHeader eyebrow={healthCheck.custom.eyebrow} title={healthCheck.custom.homeTitle} />
                <ul className="flex flex-wrap gap-2">
                  {healthCheck.custom.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-1.5 rounded-full bg-mist px-4 py-2 text-sm font-medium ring-1 ring-line">
                      <Check className="size-3.5 text-brand" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <CustomCheckCard />
                <div>
                  <Button to={healthCheck.link.to} variant="dark">
                    {healthCheck.link.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          </section>
        </>
      )}

      {stage > 6 && (
        <>
          {/* 08 — Onboarding */}
          <OnboardingSection />
        </>
      )}

      {stage > 7 && (
        <>
          {/* 09 — Statutory compliance */}
          <section className="container-x py-20 sm:py-28">
            <div className="grid items-center gap-12 rounded-[2.5rem] bg-seal-soft p-6 ring-1 ring-seal sm:p-12 lg:grid-cols-2">
              <div>
                <SectionHeader eyebrow={compliance.eyebrow} title={compliance.homeTitle} text={compliance.lead} />
                <Reveal delay={100}>
                  <Button to={compliance.link.to} variant="dark" className="mt-8">
                    {compliance.link.label}
                  </Button>
                </Reveal>
              </div>
              <Reveal delay={100} className="grid grid-cols-2 gap-3">
                {compliance.refs.map((r, i) => (
                  <Link
                    key={r.name}
                    to={`${compliance.link.to}#${compliance.acts[i].id}`}
                    className={`flex aspect-[4/3] flex-col justify-between rounded-[1.5rem] p-5 transition hover:-translate-y-1 ${
                      i === 0 ? 'text-white shadow-xl shadow-brand/30' : 'bg-white ring-1 ring-line'
                    }`}
                    style={i === 0 ? { background: brandGradient } : undefined}
                  >
                    <span className={`text-xs font-semibold ${i === 0 ? 'text-seal' : 'text-crimson'}`}>0{i + 1}</span>
                    <span>
                      <span className="block text-lg font-semibold sm:text-xl">{r.name}</span>
                      <span className={`mt-1 block text-xs sm:text-sm ${i === 0 ? 'text-white/70' : 'text-muted'}`}>{r.act}</span>
                    </span>
                  </Link>
                ))}
              </Reveal>
            </div>
          </section>
        </>
      )}

      {stage > 8 && (
        <>
          {/* 10 — Global conversion */}
          <CtaBanner title={globalCta.title} primary={globalCta.primary} secondary={globalCta.secondary} />
        </>
      )}
    </>
  )
}
