import { useState } from 'react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import ArticleCard from '../components/ArticleCard'
import NewsletterForm from '../components/NewsletterForm'
import { liquidColor, useLiquidPill } from '../components/LiquidPill'
import { articles, insightCategories } from '../content/site'

interface CategoryFilterProps {
  categories: string[]
  active: string
  onChange: (category: string) => void
}

// Category chips as a liquid segmented control; scrolls sideways on small screens.
function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const activeIndex = categories.indexOf(active)
  const { itemRef, layer } = useLiquidPill(activeIndex)

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2">
      <div
        role="group"
        aria-label="Filter articles by category"
        className="relative flex w-max gap-1 rounded-full bg-white p-1 ring-1 ring-line"
      >
        {layer}
        {categories.map((c, i) => (
          <button
            key={c}
            ref={itemRef(i)}
            type="button"
            aria-pressed={i === activeIndex}
            onClick={() => onChange(c)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              i === activeIndex ? `${liquidColor(i).text} delay-300` : 'text-muted hover:text-ink'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Insights() {
  const [category, setCategory] = useState('All')
  const [lead, ...rest] = articles
  const filtered = category === 'All' ? rest : articles.filter((a) => a.category === category)

  return (
    <>
      <Seo
        title="Business & ERP Insights | PairoApps"
        description="Articles on ERP, artificial intelligence, business automation, finance and operations from the PAIRO team."
        path="/insights"
      />

      <PageHero
        eyebrow="Insights"
        title="Ideas for a Smarter Way to Do Business."
        text="Practical thinking on ERP, AI, automation and the everyday work of running a growing business."
      />

      {category === 'All' && (
        <section className="container-x pb-12">
          <Reveal>
            <ArticleCard article={lead} index={0} large />
          </Reveal>
        </section>
      )}

      <section className="container-x pb-20 sm:pb-28">
        <CategoryFilter categories={['All', ...insightCategories]} active={category} onChange={setCategory} />

        {filtered.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 80}>
                <ArticleCard article={a} index={i + 1} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-[2rem] bg-white p-10 text-center text-muted ring-1 ring-line">
            New articles in this category are on the way.
          </p>
        )}
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <Reveal className="grid grid-cols-1 gap-8 rounded-[2.5rem] bg-seal p-6 sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-navy sm:text-4xl">Stay Ahead of What's Next.</h2>
            <p className="mt-3 text-navy/70">New insights on ERP, AI and business operations, delivered to your inbox. No noise.</p>
          </div>
          <NewsletterForm />
        </Reveal>
      </section>
    </>
  )
}
