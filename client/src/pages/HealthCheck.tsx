import { Check } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import Marquee from '../components/Marquee'
import SectionHeader, { Eyebrow } from '../components/SectionHeader'
import CtaBanner from '../components/CtaBanner'
import { DarkHeading, DarkPanel, GlowCard, type Glow } from '../components/Dark'
import { BentoHero } from '../components/Bento'
import { CustomCheckCard, HealthPanel, HealthScoreCard } from '../components/Health'
import { StepRow } from '../components/SolutionBlocks'
import { demoLink, globalCta, healthCheck } from '../content/site'

const glows: Glow[] = ['bl', 'b', 'br']

export default function HealthCheck() {
  const h = healthCheck
  const c = h.custom
  return (
    <>
      <Seo title="Real-time Health Check | Your auditor, always on · PairO" description={h.lead} path="/health-check" />

      <section className="container-x pt-14 pb-12 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <Eyebrow>{h.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl 2xl:text-7xl">{h.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{h.lead}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {h.tags.map((t) => (
                <li key={t} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium ring-1 ring-line">
                  <Check className="size-3.5 text-brand" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={demoLink}>Book a demo</Button>
              <Button to="/pricing" variant="outline" arrow={false}>
                View packs
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120} variant="rise">
            <HealthPanel />
          </Reveal>
        </div>
      </section>

      <Marquee items={h.ticker} className="container-x" />

      {/* 70 checks across the audit areas */}
      <DarkPanel className="mt-10">
        <BentoHero eyebrow="Health Check" title={h.scope} text={h.homeEyebrow} stats={h.stats} aside={<HealthScoreCard />} />
        <div className="mt-16">
          <DarkHeading eyebrow={h.homeEyebrow} title={h.scope} align="left" />
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {h.areas.map((a, i) => (
            <li key={a.name}>
              <GlowCard glow={glows[i % 3]} className="flex h-full min-h-[180px] flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-medium">{a.name}</h3>
                  <span className="text-4xl leading-none font-medium tracking-tight">{a.count}</span>
                </div>
                <p className="mt-auto pt-6 text-sm text-white/60">{a.text}</p>
              </GlowCard>
            </li>
          ))}
        </ul>
      </DarkPanel>

      {/* Custom checks */}
      <section id="custom" className="container-x scroll-mt-24 py-20 sm:py-28">
        <SectionHeader eyebrow={c.eyebrow} title={c.title} />
        <StepRow steps={c.steps.map((s) => ({ title: s }))} />
        <div className="mt-16 grid gap-4 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <ul className="grid gap-4">
            {c.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 90} className="rounded-[2rem] bg-white p-7 ring-1 ring-line">
                <span className="text-sm font-semibold text-crimson">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{f.text}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={120} variant="rise">
            <CustomCheckCard />
          </Reveal>
        </div>
        <p className="mt-6 rounded-2xl bg-seal-soft px-5 py-4 text-sm text-navy ring-1 ring-seal">{c.note}</p>
      </section>

      <CtaBanner title={globalCta.title} primary={globalCta.primary} secondary={globalCta.secondary} />
    </>
  )
}
