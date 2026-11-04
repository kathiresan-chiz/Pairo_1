import Seo from '../components/Seo'
import Button from '../components/Button'
import InfinityVisual from '../components/InfinityVisual'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | PairoApps" description="The page you are looking for could not be found." path="/404" />
      <meta name="robots" content="noindex" />
      <section className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
        <div>
          <InfinityVisual className="mx-auto w-64" />
          <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">This connection is missing.</h1>
          <p className="mt-4 text-muted">The page you are looking for has moved or does not exist.</p>
          <Button to="/" className="mt-8">
            Back to home
          </Button>
        </div>
      </section>
    </>
  )
}
