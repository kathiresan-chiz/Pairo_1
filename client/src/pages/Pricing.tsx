import { Check } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import Accordion from '../components/Accordion'
import CtaBanner, { brandGradient } from '../components/CtaBanner'
import { faqs, plans, pricingFactors } from '../content/site'

export default function Pricing() {
  return (
    <>
      <Seo
        title="PairoApps ERP Pricing | Flexible Business Software Plans"
        description="Flexible ERP pricing based on your users, modules, implementation and support needs. Compare PAIRO plans for small, growing and enterprise businesses."
        path="/pricing"
      />

      <PageHero
        eyebrow="Pricing"
        title="The Right ERP Solution for Your Business."
        text="Every business is different, so every PAIRO plan is shaped around your users, modules and support needs."
      />

      <section className="container-x pb-20 sm:pb-28">
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const featured = plan.featured
            return (
              <Reveal
                key={plan.name}
                delay={i * 100}
                className={`relative flex flex-col overflow-hidden rounded-[2.5rem] p-8 sm:p-10 ${
                  featured ? 'text-white shadow-2xl shadow-brand/30' : 'bg-white ring-1 ring-line'
                }`}
                style={featured ? { background: brandGradient } : undefined}
              >
                {featured && (
                  <span className="absolute top-8 right-8 rounded-full bg-crimson px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <p className={`text-sm font-medium ${featured ? 'text-seal' : 'text-brand-deep'}`}>{plan.audience}</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">{plan.name}</h2>
                <p className={`mt-4 leading-relaxed ${featured ? 'text-white/75' : 'text-muted'}`}>{plan.text}</p>
                <p className="mt-8 text-2xl font-semibold">Custom quote</p>
                <p className={`text-sm ${featured ? 'text-white/60' : 'text-muted'}`}>Based on your requirements</p>
                <ul className={`mt-8 grid gap-3 border-t pt-8 text-sm ${featured ? 'border-white/15' : 'border-line'}`}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-full ${
                          featured ? 'bg-white/15 text-white' : 'bg-brand/10 text-brand'
                        }`}
                      >
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <Button to="/contact?intent=sales" variant={featured ? 'light' : 'dark'} className="w-full">
                    Talk to sales
                  </Button>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="container-x pb-20 sm:pb-28">
        <div className="grid gap-10 rounded-[2.5rem] bg-ink p-8 text-white sm:p-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <SectionHeader
            eyebrow="Pricing factors"
            title="What Shapes Your Price."
            text="Your quote reflects what you actually use, nothing more."
            tone="light"
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {pricingFactors.map((f, i) => (
              <Reveal
                as="li"
                key={f}
                delay={i * 70}
                className={`flex items-center gap-4 rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10 ${
                  i === pricingFactors.length - 1 ? 'sm:col-span-2' : ''
                }`}
              >
                <span className="text-sm font-semibold text-crimson">0{i + 1}</span>
                <span className="font-medium">{f}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x pb-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader eyebrow="FAQ" title="Questions, Answered." text="Can't find what you're looking for? Our team is happy to help." />
          <Reveal delay={100}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Not Sure Which Plan Is Right for You?"
        text="Tell us about your business and we will recommend the right modules and plan."
        primary={{ label: 'Talk to sales', to: '/contact?intent=sales' }}
        secondary={{ label: 'Book a demo', to: '/contact?intent=demo' }}
      />
    </>
  )
}
