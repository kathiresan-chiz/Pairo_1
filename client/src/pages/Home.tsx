import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Quote, X } from 'lucide-react'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import SectionHeader from '../components/SectionHeader'
import InfinityVisual from '../components/InfinityVisual'
import DashboardMock from '../components/DashboardMock'
import QuickDemoForm from '../components/QuickDemoForm'
import LiquidFill from '../components/LiquidFill'
import ModuleExplorer from '../components/ModuleExplorer'
import AiSection from '../components/AiSection'
import WhySection from '../components/WhySection'
import ArticleCard from '../components/ArticleCard'
import CtaBanner, { brandGradient } from '../components/CtaBanner'
import monogram from '../assets/brand/monogram-white.png'
import {
  articles,
  company,
  integrations,
  steps,
  testimonials,
  tickerWords,
  type Integration,
} from '../content/site'

const heroPills = [
  { label: 'Finance & Accounting', r: '-7deg', solid: false },
  { label: 'Inventory', r: '6deg', solid: true },
  { label: 'Sales & CRM', r: '-3deg', solid: false },
  { label: 'HR & Payroll', r: '4deg', solid: true },
  { label: 'AI assistance', r: '-5deg', solid: false },
]

const problems = [
  { title: 'Disconnected systems', text: 'Finance, stock and sales live in separate tools that never quite agree.' },
  { title: 'Repetitive manual work', text: 'Teams re-key the same data, chase approvals and rebuild the same reports.' },
  { title: 'Scattered information', text: 'Answers are spread across inboxes and spreadsheets, so decisions wait.' },
]

export default function Home() {
  return (
    <>
      <Seo
        title="PairoApps | AI-Powered ERP Software for Smarter Business Management"
        description="PAIRO is AI-powered ERP software that connects finance, inventory, sales and people in one intelligent platform. Simplify operations and make smarter decisions."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'PAIRO',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: company.description,
        }}
      />

      {/* 01 — Hero */}
      <section className="container-x pt-10 pb-8 sm:pt-16">
        <div className="grid gap-8 xl:grid-cols-[1.75fr_1fr] xl:items-end">
          <Reveal>
            <h1 className="text-[2.4rem] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-[4.2rem] 2xl:text-[5.2rem]">
              <span className="block">Business, Connected.</span>
              <span className="block">
                <InfinityVisual glow={false} className="mr-3 inline-block h-[0.62em] w-auto align-[0.02em] sm:mr-5" />
                Intelligence, <span className="whitespace-nowrap text-brand">Built In.</span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={150} className="xl:pb-3">
            <p className="max-w-sm leading-relaxed text-muted">
              <strong className="font-semibold text-ink">PAIRO</strong> is AI-powered ERP that brings your entire business
              together. Simplify operations, connect workflows and make smarter decisions through one intelligent platform.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/services">Explore solutions</Button>
              <Button to="/contact?intent=demo" variant="outline" arrow={false}>
                Book a demo
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={tickerWords} className="container-x" />

      <section className="container-x pt-8 pb-6">
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
            <div className="flex justify-between text-[11px] font-medium tracking-[0.2em] text-seal/80 uppercase">
              <span>
                Smart ledgers
                <br />
                Strong connections
              </span>
              <span className="text-right">
                All modules
                <br />
                connected
              </span>
            </div>
            <DashboardMock className="relative mt-8 sm:ml-auto sm:w-[80%] lg:w-[66%] xl:w-[64%]" />
            <ul className="relative z-10 mt-6 flex flex-wrap gap-2 lg:absolute lg:bottom-10 lg:left-8 lg:mt-0 lg:max-w-[28%] xl:max-w-[32%]">
              {heroPills.map((p, i) => (
                <li
                  key={p.label}
                  className={`rounded-full px-4 py-2 text-sm font-medium sm:animate-float ${
                    p.solid ? 'bg-white text-ink shadow-lg shadow-navy/30' : 'bg-white/10 text-white ring-1 ring-white/30 backdrop-blur'
                  }`}
                  style={{ '--r': p.r, animationDelay: `${i * 0.6}s` } as CSSProperties}
                >
                  {p.label}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal delay={120} className="flex-1 rounded-[2.5rem] bg-ink p-6 text-white sm:p-8">
              <h2 className="text-xl font-semibold text-seal">See PAIRO in action</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Share your details and we will arrange a walkthrough tailored to the way your business works.
              </p>
              <QuickDemoForm />
            </Reveal>
            <Reveal delay={200}>
              <Link
                to="#ecosystem"
                className="group relative isolate flex items-center justify-between overflow-hidden rounded-full bg-gradient-to-r from-navy via-brand-deep to-brand py-2 pr-2 pl-7 text-base font-semibold text-white"
              >
                <LiquidFill className="bg-ink" />
                Explore the modules
                <span className="grid size-12 place-items-center rounded-full bg-white text-ink">
                  <ArrowUpRight className="arrow-turn size-5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — Brand statement */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="The challenge"
              title="Your Business Deserves More Than Disconnected Systems."
              text="Growing businesses often run on a patchwork of tools. Each one works on its own, but together they create gaps, duplicate effort and delay decisions."
            />
            <Reveal delay={100}>
              <p className="mt-6 max-w-xl leading-relaxed text-muted">
                PAIRO replaces the patchwork with one unified platform, where finance, operations and people share the same
                information and move in step, without the friction.
              </p>
            </Reveal>
          </div>
          <ol className="grid gap-3">
            {problems.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 100} className="flex gap-5 rounded-[1.75rem] bg-white p-6 ring-1 ring-line">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-crimson/10 text-crimson">
                  <X className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
            <Reveal
              as="li"
              delay={300}
              className="flex items-center gap-5 rounded-[1.75rem] p-6 text-white"
              style={{ background: brandGradient }}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15">
                <img src={monogram} alt="" className="w-6" />
              </span>
              <div>
                <h3 className="font-semibold">One connected system</h3>
                <p className="mt-1 text-sm text-white/75">Every function on one platform, with one version of the truth.</p>
              </div>
            </Reveal>
          </ol>
        </div>
      </section>

      {/* 03 — ERP ecosystem */}
      <section id="ecosystem" className="container-x scroll-mt-24 pb-20 sm:pb-28">
        <SectionHeader
          eyebrow="The ERP ecosystem"
          title="One Platform. A More Connected Business."
          text="Each module is powerful on its own. Together, they share one data model, so every transaction, record and approval flows to the teams that need it."
        />
        <ModuleExplorer />
      </section>

      {/* 04 — AI differentiation */}
      <AiSection
        id="ai"
        title="Intelligence That Works Behind Your Business."
        text="AI in PAIRO is built into everyday work: answering questions, capturing data and surfacing what needs attention, so your teams can focus on decisions."
      />

      {/* 05 — How it works */}
      <section className="container-x py-20 sm:py-28">
        <SectionHeader
          eyebrow="How it works"
          title="From Business Complexity to Operational Clarity."
          align="center"
        />
        <ol className="relative mt-14 grid gap-6 md:grid-cols-5 md:gap-4">
          <span className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-brand via-brand-deep to-crimson md:block" aria-hidden="true" />
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span className="relative grid size-14 shrink-0 place-items-center rounded-full bg-white text-lg font-semibold text-navy ring-1 ring-line">
                0{i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold md:mt-5">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* 06 — Why PAIRO */}
      <WhySection />

      {/* 07 — Customer proof */}
      <section className="container-x pb-20 sm:pb-28">
        <SectionHeader eyebrow="Customer proof" title="Better Systems. Better Business Outcomes." />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              as="figure"
              key={t.name}
              delay={i * 100}
              className={`flex flex-col justify-between rounded-[2rem] p-8 ${i === 0 ? 'bg-navy text-white' : 'bg-white ring-1 ring-line'}`}
            >
              <Quote className={`size-8 ${i === 0 ? 'text-crimson' : 'text-brand'}`} aria-hidden="true" />
              <blockquote className={`mt-6 text-lg leading-relaxed ${i === 0 ? 'text-white' : 'text-ink'}`}>“{t.quote}”</blockquote>
              <figcaption className="mt-8 border-t border-current/10 pt-5 text-sm">
                <span className="block font-semibold">{t.name}</span>
                <span className={i === 0 ? 'text-white/60' : 'text-muted'}>{t.company}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 08 — Integrations */}
      <section className="container-x pb-20 sm:pb-28">
        <div className="grid items-center gap-12 rounded-[2.5rem] bg-seal-soft p-6 ring-1 ring-seal sm:p-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Integrations"
              title="Works With the Tools Your Business Relies On."
              text="PAIRO connects with the systems around it, so information keeps moving in and out of your ERP without manual exports and imports."
            />
            <Reveal delay={100}>
              <Button to="/contact?intent=sales" variant="dark" className="mt-8">
                Ask about an integration
              </Button>
            </Reveal>
          </div>
          <Reveal delay={100} className="grid grid-cols-3 gap-3">
            {integrations.slice(0, 4).map((item) => (
              <IntegrationTile key={item.name} item={item} />
            ))}
            <div
              className="grid aspect-square place-items-center rounded-[1.5rem] shadow-xl shadow-brand/30"
              style={{ background: brandGradient }}
            >
              <img src={monogram} alt="PAIRO" className="w-1/2" />
            </div>
            {integrations.slice(4).map((item) => (
              <IntegrationTile key={item.name} item={item} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* 09 — Insights */}
      <section className="container-x pb-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader eyebrow="Insights" title="Ideas for a Smarter Way to Do Business." />
          <Reveal>
            <Button to="/insights" variant="outline">
              All insights
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {articles
            .filter((a) => a.featured)
            .map((a, i) => (
              <Reveal key={a.slug} delay={i * 100}>
                <ArticleCard article={a} index={i} />
              </Reveal>
            ))}
        </div>
      </section>

      {/* 10 — Final CTA */}
      <CtaBanner
        title="Ready to Bring Your Business Together?"
        text="See how PAIRO connects finance, stock and people in one calm, intelligent system."
      />
    </>
  )
}

function IntegrationTile({ item }: { item: Integration }) {
  return (
    <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-[1.5rem] bg-white p-3 text-center ring-1 ring-line">
      <item.icon className="size-6 text-brand" aria-hidden="true" />
      <span className="text-xs font-semibold sm:text-sm">{item.name}</span>
    </div>
  )
}
