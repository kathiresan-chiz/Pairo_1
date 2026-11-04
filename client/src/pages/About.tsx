import { ArrowDownRight } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import InfinityVisual from '../components/InfinityVisual'
import CtaBanner, { brandGradient } from '../components/CtaBanner'
import monogram from '../assets/brand/monogram-white.png'
import grid from '../assets/brand/monogram-grid.png'
import { philosophy } from '../content/site'

const approach = [
  { title: 'Understand', text: 'We start with how your business actually works: your processes, your people and the decisions you need to make.' },
  { title: 'Configure', text: 'PAIRO is set up around those processes, with clear roles, approvals and reports, rather than forcing a new way of working.' },
  { title: 'Support', text: 'After go-live, we stay close, helping teams adopt new features and improve processes as the business grows.' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About PairoApps | Our Vision, Mission & ERP Technology"
        description="PairoApps builds AI-powered ERP software that connects business functions, makes technology more useful and helps organisations keep improving."
        path="/about"
      />

      <PageHero
        eyebrow="About PAIRO"
        title="Technology Should Move Business Forward."
        text="We build business software that connects the work, clears away the friction and gives teams the clarity to grow."
      >
        <Reveal
          className="grain relative isolate mt-12 grid min-h-[420px] overflow-hidden rounded-[2.5rem] p-8 text-white sm:p-12 lg:grid-cols-2"
          style={{ background: brandGradient }}
        >
          <InfinityVisual className="absolute -right-24 -bottom-16 -z-10 w-[680px] opacity-60" />
          <img src={monogram} alt="" className="w-14" />
          <div className="mt-16 self-end lg:col-start-1">
            <p className="text-4xl leading-[1.05] font-light tracking-tight uppercase sm:text-5xl">
              We connect
              <br />
              finance, stock
              <br />& people
            </p>
            <span className="mt-6 block h-px w-10 bg-white/50" aria-hidden="true" />
            <p className="mt-6 max-w-sm text-white/75">
              PAIRO brings finance, inventory, procurement and people into one calm, connected system for growing businesses.
            </p>
          </div>
          <ArrowDownRight className="absolute right-8 bottom-8 size-8 text-white/80" aria-hidden="true" />
        </Reveal>
      </PageHero>

      {/* Our story — placeholder copy: replace with the confirmed company story */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeader eyebrow="Our story" title="Built on a Better Way to Manage Business." />
          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              PAIRO began with a familiar problem: capable teams slowed down by systems that did not talk to each other.
              Finance waited on operations, operations waited on purchasing, and everyone waited on the spreadsheet.
            </p>
            <p>
              We set out to build an ERP that works the way businesses do, where every function shares the same
              information, routine work runs in the background and insight is available when the decision is being made.
            </p>
            <p>
              The name says it: PAIRO is about pairing the parts of a business together, so they move as one.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <SectionHeader eyebrow="Our philosophy" title="Three Principles Behind Everything We Build." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {philosophy.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className="relative overflow-hidden rounded-[2rem] bg-white p-8 ring-1 ring-line">
              <span className="text-sm font-semibold text-crimson">0{i + 1}</span>
              <h3 className="mt-16 text-3xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              {i === 0 && <img src={grid} alt="" className="absolute -top-6 -right-10 w-48 opacity-25" />}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="rounded-[2.5rem] bg-navy p-8 text-white sm:p-12">
            <span className="text-xs font-semibold tracking-[0.2em] text-seal/70 uppercase">Our vision</span>
            <p className="mt-8 text-2xl leading-snug font-light sm:text-3xl">
              A world where every growing business runs as one connected organisation, with the clarity to make better
              decisions every day.
            </p>
          </Reveal>
          <Reveal delay={100} className="rounded-[2.5rem] bg-seal p-8 text-navy sm:p-12">
            <span className="text-xs font-semibold tracking-[0.2em] text-navy/60 uppercase">Our mission</span>
            <p className="mt-8 text-2xl leading-snug font-light sm:text-3xl">
              To deliver an intelligent, easy-to-use ERP platform, and the support around it, that connects operations and
              helps businesses grow with confidence.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-4">
        <SectionHeader
          eyebrow="Our approach"
          title="Designed Around the Way Businesses Work."
          text="Good software is only half of it. How it is introduced and supported matters just as much."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {approach.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 100} className="rounded-[2rem] bg-white p-8 ring-1 ring-line">
              <span className="grid size-12 place-items-center rounded-full bg-ink text-sm font-semibold text-white">0{i + 1}</span>
              <h3 className="mt-8 text-xl font-semibold">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{a.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaBanner
        title="Let's Build a Smarter Way Forward."
        text="Talk to our team about where your business is today and where you want it to go."
        secondary={{ label: 'Explore solutions', to: '/services' }}
      />
    </>
  )
}
