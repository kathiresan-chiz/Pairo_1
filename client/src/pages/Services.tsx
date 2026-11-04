import { Check } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import AiSection from '../components/AiSection'
import CtaBanner from '../components/CtaBanner'
import { modules, services } from '../content/site'

const groups = [
  { title: 'Finance & Compliance', ids: ['finance', 'tax'] },
  { title: 'Commercial', ids: ['sales', 'purchase'] },
  { title: 'Operations', ids: ['inventory', 'projects'] },
  { title: 'People & Insight', ids: ['hr', 'analytics'] },
]

const byId = Object.fromEntries(modules.map((m) => [m.id, m]))

export default function Services() {
  return (
    <>
      <Seo
        title="ERP Software & Business Automation Solutions | PairoApps"
        description="Explore PAIRO's ERP modules, AI capabilities and implementation services: finance, sales, purchasing, inventory, HR, tax, projects and analytics in one platform."
        path="/services"
      />

      <PageHero
        eyebrow="Services"
        title="Everything Your Business Needs. Connected in One Place."
        text="A connected set of ERP modules, intelligence built into the work, and a team that helps you make it all run."
      />

      <section id="modules" className="container-x scroll-mt-24 pt-10 pb-20 sm:pt-16 sm:pb-28">
        <SectionHeader
          eyebrow="ERP capabilities"
          title="A Connected Ecosystem for Every Business Function."
          text="Start with the modules you need and add more as you grow. Every module shares the same data, so nothing is entered twice."
        />
        <div className="mt-12 grid gap-10">
          {groups.map((group) => (
            <div key={group.title} className="grid gap-4 border-t border-line pt-8 lg:grid-cols-[240px_1fr]">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-brand-deep uppercase">{group.title}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {group.ids.map((id, i) => {
                  const m = byId[id]
                  return (
                    <Reveal key={id} delay={i * 100} className="rounded-[2rem] bg-white p-7 ring-1 ring-line">
                      <div className="flex items-center gap-4">
                        <span className="grid size-12 place-items-center rounded-2xl bg-seal text-navy">
                          <m.icon className="size-5" aria-hidden="true" />
                        </span>
                        <h4 className="text-xl font-semibold">{m.name}</h4>
                      </div>
                      <p className="mt-5 leading-relaxed text-muted">{m.detail}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {m.points.map((p) => (
                          <li key={p} className="flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-xs font-medium">
                            <Check className="size-3 text-brand" aria-hidden="true" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <AiSection
        id="ai"
        eyebrow="AI capabilities"
        title="Make Your Business Systems More Intelligent."
        text="Practical intelligence that removes routine effort and brings the right information forward at the right time."
      />

      <section id="support" className="container-x scroll-mt-24 py-20 sm:py-28">
        <SectionHeader
          eyebrow="Implementation & support"
          title="Beyond Software. Support That Makes It Work."
          text="From the first workshop to everyday use, our team helps you get value from PAIRO quickly and keep improving."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 80} className="group rounded-[2rem] bg-white p-7 ring-1 ring-line transition hover:bg-ink">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-seal text-navy">
                  <s.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-muted group-hover:text-white/40">0{i + 1}</span>
              </div>
              <h3 className="mt-10 text-lg font-semibold group-hover:text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted group-hover:text-white/60">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Let's Find the Right Solution for Your Business."
        text="Tell us how you work today and we will show you how PAIRO fits."
        secondary={{ label: 'See pricing', to: '/pricing' }}
      />
    </>
  )
}
