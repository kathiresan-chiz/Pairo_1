import { useSearchParams } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import InfinityVisual from '../components/InfinityVisual'
import { company } from '../content/site'
import type { Intent } from '../lib/api'

const intros: Record<Intent, string> = {
  demo: 'Book a personalised demo and see how PAIRO would work for your business, with your processes in mind.',
  sales: 'Talk to our sales team about modules, plans and what the right setup for your business would cost.',
  general: 'Questions about PAIRO, a project in mind, or just exploring? Tell us a little about your business and we will be in touch.',
}

export default function Contact() {
  const [params] = useSearchParams()
  const requested = params.get('intent')
  const intent: Intent = requested === 'demo' || requested === 'sales' ? requested : 'general'

  const details = [
    { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
    { icon: Phone, label: 'Phone', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Office', value: company.address },
    { icon: Clock, label: 'Business hours', value: company.hours },
  ]

  return (
    <>
      <Seo
        title="Contact PairoApps | Talk to Our ERP Software Team"
        description="Book a PAIRO demo or talk to our ERP software team about your business, modules, pricing and implementation."
        path="/contact"
      />

      <PageHero eyebrow={intent === 'demo' ? 'Book a demo' : 'Contact'} title="Let's Talk About What's Possible." text={intros[intent]} />

      <section className="container-x pb-16 sm:pb-24">
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <ContactForm key={intent} intent={intent} />
          </Reveal>
          <Reveal delay={100} className="relative isolate flex flex-col overflow-hidden rounded-[2rem] bg-ink p-8 text-white sm:p-10">
            <InfinityVisual glow={false} className="absolute -top-16 -right-32 -z-10 w-[420px] rotate-12 opacity-20" />
            <h2 className="text-xl font-semibold text-seal">Reach us directly</h2>
            <ul className="mt-8 grid gap-6">
              {details.map((d) => (
                <li key={d.label} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/[0.07] ring-1 ring-white/10">
                    <d.icon className="size-5 text-seal" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs tracking-[0.15em] text-white/50 uppercase">{d.label}</p>
                    {d.href ? (
                      <a href={d.href} className="mt-1 block font-medium hover:text-seal">
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-2 pt-10">
              {company.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-4 py-2 text-sm ring-1 ring-white/20 hover:bg-white/10"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-4">
        <Reveal className="border-t border-line py-16 text-center sm:py-24">
          <h2 className="mx-auto max-w-3xl text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
            Your Next Business Improvement Starts with a <span className="text-brand">Conversation.</span>
          </h2>
          <a href={`mailto:${company.email}`} className="mt-6 inline-block text-lg font-medium text-muted underline-offset-4 hover:text-ink hover:underline">
            {company.email}
          </a>
        </Reveal>
      </section>
    </>
  )
}
