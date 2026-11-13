import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import Accordion from '../components/Accordion'
import CtaBanner, { brandGradient } from '../components/CtaBanner'
import { formatInr, globalCta, pricing } from '../content/site'

export default function Pricing() {
  const p = pricing
  const [monthly, setMonthly] = useState(false)

  // Monthly billing is one-tenth of the yearly price, each month (see FAQs).
  const price = (yearly: number) => (monthly ? formatInr(yearly / 10) : formatInr(yearly))
  const per = monthly ? 'per company / month' : 'per company / year'

  return (
    <>
      <Seo title="Packs and pricing | One simple price per company · PairO" description={`${p.title} ${p.lead}`} path="/pricing" />

      <PageHero eyebrow={p.eyebrow} title={p.title} text={p.lead}>
        <div className="mt-10 inline-flex rounded-full bg-white p-1 ring-1 ring-line" role="radiogroup" aria-label="Billing period">
          {[false, true].map((isMonthly) => {
            const on = monthly === isMonthly
            return (
              <button
                key={String(isMonthly)}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setMonthly(isMonthly)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${on ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}
              >
                {isMonthly ? p.billing.monthly : p.billing.yearly}
                {!isMonthly && (
                  <span className={`rounded-full px-2 py-0.5 text-[11px] ${on ? 'bg-crimson text-white' : 'bg-crimson/10 text-[#c23a56]'}`}>
                    {p.billing.yearlyNote}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </PageHero>

      <section id="packs" className="container-x scroll-mt-24 pb-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {p.packs.map((plan, i) => {
            const featured = 'featured' in plan && plan.featured
            return (
              <Reveal
                key={plan.name}
                delay={(i % 3) * 100}
                className={`relative flex flex-col overflow-hidden rounded-[2.5rem] p-7 sm:p-8 xl:p-6 ${
                  featured ? 'text-white shadow-2xl shadow-brand/30' : 'bg-white ring-1 ring-line'
                }`}
                style={featured ? { background: brandGradient } : undefined}
              >
                {featured && (
                  <span className="mb-4 w-fit rounded-full bg-crimson px-3 py-1 text-xs font-semibold text-white">Most popular</span>
                )}
                <p className={`text-sm font-medium ${featured ? 'text-seal' : 'text-brand-deep'}`}>{plan.audience}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">{plan.name}</h2>
                <p className="mt-8 text-3xl font-semibold tracking-tight">{plan.price === null ? 'Free' : price(plan.price)}</p>
                <p className={`text-sm ${featured ? 'text-white/60' : 'text-muted'}`}>
                  {plan.price === null ? 'forever' : `${per} + GST`}
                </p>
                <ul className={`mt-8 grid gap-3 border-t pt-8 text-sm ${featured ? 'border-white/15' : 'border-line'}`}>
                  {plan.features.map((f, k) => (
                    <li key={f} className={`flex items-start gap-3 ${k === 0 && i > 0 ? 'font-semibold' : ''}`}>
                      <span
                        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
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
                  <Button to={plan.cta.to} variant={featured ? 'light' : 'dark'} className="w-full">
                    {plan.cta.label}
                  </Button>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* What every pack comes with, and the suites */}
      <section className="container-x py-14 sm:py-20">
        <div className="grid gap-10 rounded-[2.5rem] bg-ink p-8 text-white sm:p-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
            {p.assurances.map((a, i) => (
              <Reveal as="li" key={a} delay={i * 70} className="flex items-center gap-4 rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10">
                <span className="text-sm font-semibold text-crimson">0{i + 1}</span>
                <span className="font-medium">{a}</span>
              </Reveal>
            ))}
          </ul>
          <div className="grid gap-3 sm:grid-cols-2">
            {p.suites.map((s, i) => (
              <Reveal key={s.name} delay={i * 100} className="flex flex-col rounded-[2rem] bg-white/[0.06] p-7 ring-1 ring-white/10">
                <span className="w-fit rounded-full bg-seal px-3 py-1 text-xs font-semibold text-navy">Coming soon</span>
                <h3 className="mt-6 text-2xl font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.text}</p>
                <p className="mt-auto pt-8 text-2xl font-semibold">{formatInr(s.price)}</p>
                <p className="text-sm text-white/55">per company / year</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="container-x scroll-mt-24 pb-20 sm:pb-28">
        <SectionHeader eyebrow={p.compare.eyebrow} title={p.compare.title} />
        <Reveal className="mt-12 overflow-x-auto rounded-[2rem] bg-white ring-1 ring-line">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="p-5 font-medium text-muted">
                  <span className="sr-only">Feature</span>
                </th>
                {p.packs.map((plan) => (
                  <th key={plan.name} scope="col" className={`p-5 text-center font-semibold ${'featured' in plan && plan.featured ? 'text-brand-deep' : ''}`}>
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.compare.rows.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-0 even:bg-mist/60">
                  <th scope="row" className="p-4 pl-5 font-medium">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className="p-4 text-center">
                      {v === true ? (
                        <Check className="mx-auto size-4 text-brand" aria-label="Included" />
                      ) : v === false ? (
                        <Minus className="mx-auto size-4 text-line" aria-label="Not included" />
                      ) : (
                        <span className="font-medium">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      <section className="container-x pb-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader eyebrow={p.faqs.eyebrow} title={p.faqs.title} />
          <Reveal delay={100}>
            <Accordion items={p.faqs.items} />
          </Reveal>
        </div>
      </section>

      <CtaBanner title={globalCta.title} primary={globalCta.primary} secondary={globalCta.secondary} />
    </>
  )
}
