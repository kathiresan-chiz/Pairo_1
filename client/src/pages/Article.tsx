import { Link, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import ArticleCard, { ArticleCover } from '../components/ArticleCard'
import CtaBanner from '../components/CtaBanner'
import NotFound from './NotFound'
import { articles } from '../content/site'

export default function Article() {
  const { slug } = useParams()
  const index = articles.findIndex((a) => a.slug === slug)
  if (index === -1) return <NotFound />

  const article = articles[index]
  const related = articles.filter((a) => a.slug !== slug && a.category === article.category).slice(0, 3)
  const more = related.length ? related : articles.filter((a) => a.slug !== slug).slice(0, 3)
  const path = `/insights/${article.slug}`

  return (
    <>
      <Seo
        title={`${article.title} | PairoApps`}
        description={article.excerpt}
        path={path}
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: article.title,
              description: article.excerpt,
              author: { '@type': 'Organization', name: 'PairoApps' },
              publisher: { '@type': 'Organization', name: 'PairoApps' },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pairoapps.com/' },
                { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://www.pairoapps.com/insights' },
                { '@type': 'ListItem', position: 3, name: article.title },
              ],
            },
          ],
        }}
      />

      <article className="container-x pt-12 sm:pt-16">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight className="size-4" aria-hidden="true" />
          <Link to="/insights" className="hover:text-ink">
            Insights
          </Link>
        </nav>

        <Reveal className="mx-auto mt-10 max-w-3xl text-center">
          <span className="rounded-full bg-seal px-3 py-1 text-xs font-semibold text-navy">{article.category}</span>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 text-sm text-muted">PAIRO Editorial · {article.readTime}</p>
        </Reveal>

        <Reveal delay={100}>
          <ArticleCover index={index} className="mt-12 aspect-[3/1] rounded-[2.5rem]" />
        </Reveal>

        <div className="mx-auto mt-14 max-w-2xl">
          <p className="text-xl leading-relaxed">{article.excerpt}</p>
          <div className="mt-10 rounded-[2rem] bg-white p-8 ring-1 ring-line">
            <h2 className="text-sm font-semibold tracking-[0.2em] text-brand-deep uppercase">In this article</h2>
            <ol className="mt-5 grid gap-3">
              {article.outline.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="text-sm font-semibold text-crimson">0{i + 1}</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-8 text-muted">
            The full article is being prepared by our team. In the meantime, talk to us about any of these topics.
          </p>
        </div>
      </article>

      <section className="container-x pt-20">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Keep reading</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {more.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i + 1} />
          ))}
        </div>
      </section>

      <CtaBanner title="Ready to Bring Your Business Together?" />
    </>
  )
}
