// React 19 hoists <title>, <meta> and <link> into the document head.
export const SITE_URL = 'https://www.pairoapps.com'

interface SeoProps {
  title: string
  description: string
  path?: string
  jsonLd?: Record<string, unknown>
}

export default function Seo({ title, description, path = '/', jsonLd }: SeoProps) {
  const url = `${SITE_URL}${path}`
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </>
  )
}
