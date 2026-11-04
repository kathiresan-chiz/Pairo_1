import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Article } from '../content/site'

const covers = [
  'linear-gradient(135deg, #0E2547 0%, #1B4A8C 60%, #3A78C2 100%)',
  'linear-gradient(160deg, #DBF2FC 0%, #7FB1F0 100%)',
  'radial-gradient(circle at 80% 100%, rgba(253,110,136,0.55), transparent 55%), linear-gradient(135deg, #072D59, #3A78C2)',
]

export function ArticleCover({ index = 0, className = '' }: { index?: number; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: covers[index % covers.length] }}
      aria-hidden="true"
    >
      <div className="dot-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(120deg,#000,transparent_70%)]" />
      <span className="absolute -top-10 right-[12%] size-40 rounded-full bg-seal/60 blur-2xl" />
      <span className="absolute -bottom-12 left-[18%] size-48 rounded-full bg-crimson/40 blur-3xl" />
    </div>
  )
}

interface ArticleCardProps {
  article: Article
  index?: number
  large?: boolean
}

export default function ArticleCard({ article, index = 0, large = false }: ArticleCardProps) {
  return (
    <Link
      to={`/insights/${article.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-line transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 ${
        large ? 'lg:flex-row' : ''
      }`}
    >
      <ArticleCover index={index} className={large ? 'aspect-[16/10] lg:aspect-auto lg:w-1/2' : 'aspect-[16/10]'} />
      <div className={`flex flex-1 flex-col p-6 ${large ? 'lg:p-10' : ''}`}>
        <span className="w-fit rounded-full bg-seal px-3 py-1 text-xs font-semibold text-navy">{article.category}</span>
        <h3 className={`mt-4 font-semibold tracking-tight text-balance ${large ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted">
          <span>PAIRO Editorial · {article.readTime}</span>
          <span className="grid size-9 place-items-center rounded-full bg-ink text-white">
            <ArrowUpRight className="arrow-turn size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}
