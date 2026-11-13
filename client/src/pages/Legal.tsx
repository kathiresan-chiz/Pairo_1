import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import { company } from '../content/site'

const pages = {
  privacy: {
    title: 'Privacy Policy',
    path: '/privacy',
    intro: `How ${company.legalName} collects, uses and protects your information.`,
  },
  terms: {
    title: 'Terms and Conditions',
    path: '/terms',
    intro: `The terms that apply when you use the ${company.legalName} website.`,
  },
}

// placeholder: replace with the approved legal text
export default function Legal({ page }: { page: keyof typeof pages }) {
  const p = pages[page]
  return (
    <>
      <Seo title={`${p.title} | PairO`} description={p.intro} path={p.path} />
      <PageHero eyebrow="Legal" title={p.title} text={p.intro} />
      <section className="container-x pb-20">
        <div className="max-w-3xl rounded-[2rem] bg-white p-8 leading-relaxed text-muted ring-1 ring-line sm:p-12">
          <p>
            The full {p.title.toLowerCase()} is being finalised. For any questions in the meantime, contact us at{' '}
            <a href={`mailto:${company.email}`} className="font-medium text-brand hover:underline">
              {company.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
