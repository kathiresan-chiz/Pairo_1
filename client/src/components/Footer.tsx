import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import Button from './Button'
import wordmarkWhite from '../assets/brand/wordmark-white.png'
import oMask from '../assets/brand/wordmark-o-mask.png'
import { company, modules, nav } from '../content/site'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="container-x pb-4">
      <div className="grain relative isolate overflow-hidden rounded-[2.5rem] bg-ink px-6 pt-14 pb-8 text-white sm:px-12">
        <div
          className="dot-grid pointer-events-none absolute inset-y-0 left-0 w-2/3 opacity-30 [mask-image:linear-gradient(90deg,#000,transparent)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full bg-brand/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo tone="light" className="h-12 sm:h-14" />
            <p className="mt-6 max-w-xl text-2xl leading-tight font-light text-balance text-seal sm:text-3xl">
              {company.promise}
            </p>
          </div>
          <Button to="/contact?intent=demo" variant="light">
            Book a demo
          </Button>
        </div>

        <div className="relative grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Company">
            {nav.map((item) => (
              <FooterLink key={item.to} to={item.to}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="Platform">
            {modules.slice(0, 6).map((m) => (
              <FooterLink key={m.id} to="/services#modules">
                {m.name}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="Contact">
            <li>
              <a href={`mailto:${company.email}`} className="text-white/70 hover:text-white">
                {company.email}
              </a>
            </li>
            <li>
              <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="text-white/70 hover:text-white">
                {company.phone}
              </a>
            </li>
            <li className="text-white/50">{company.hours}</li>
          </FooterColumn>
          <FooterColumn title="Follow">
            {company.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="relative flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms and Conditions
            </Link>
          </div>
        </div>

        {/* Oversized wordmark watermark */}
        <div aria-hidden="true" className="pointer-events-none relative mt-6 -mb-[12%] aspect-[1511/522] w-full opacity-[0.06] select-none">
          <img src={wordmarkWhite} alt="" className="absolute inset-0 size-full" />
          <span className="logo-o absolute inset-0 bg-white [animation:none]" style={{ '--mask': `url(${oMask})` } as CSSProperties} />
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-[0.2em] text-seal/60 uppercase">{title}</h3>
      <ul className="mt-5 grid gap-3 text-sm">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-white/70 hover:text-white">
        {children}
      </Link>
    </li>
  )
}
