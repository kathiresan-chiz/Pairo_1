import Reveal from './Reveal'
import Button from './Button'
import InfinityVisual from './InfinityVisual'

export const brandGradient =
  'radial-gradient(circle at 85% 110%, rgba(253,110,136,0.45) 0%, rgba(253,110,136,0) 50%), linear-gradient(135deg, #0E2547 0%, #1B4A8C 55%, #3A78C2 100%)'

interface CtaLink {
  label: string
  to: string
}

interface CtaBannerProps {
  title: string
  text?: string
  primary?: CtaLink
  secondary?: CtaLink | null
}

export default function CtaBanner({
  title,
  text,
  primary = { label: 'Book a demo', to: '/contact?intent=demo' },
  secondary = { label: 'Explore solutions', to: '/services' },
}: CtaBannerProps) {
  return (
    <section className="container-x py-16 sm:py-24">
      <Reveal
        className="grain relative isolate overflow-hidden rounded-[2.5rem] px-6 py-14 text-white sm:px-14 sm:py-20"
        style={{ background: brandGradient }}
      >
        <div
          className="dot-grid absolute inset-y-0 left-0 -z-10 w-1/2 opacity-40 [mask-image:linear-gradient(90deg,#000,transparent)]"
          aria-hidden="true"
        />
        <InfinityVisual className="absolute top-1/2 -right-24 -z-10 hidden w-[620px] -translate-y-1/2 opacity-80 md:block" />
        <div className="max-w-xl">
          <h2 className="text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl">{title}</h2>
          {text && <p className="mt-5 text-lg text-white/70">{text}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={primary.to} variant="light">
              {primary.label}
            </Button>
            {secondary && (
              <Button to={secondary.to} variant="ghost">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
