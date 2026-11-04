import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { scrollToTarget, startSmoothScroll } from '../lib/smoothScroll'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => startSmoothScroll(), [])

  useEffect(() => {
    if (hash) {
      scrollToTarget(hash, { offset: -100 })
    } else {
      scrollToTarget(0, { immediate: true })
    }
  }, [pathname, hash])
  return null
}

// Thin brand-gradient bar at the top of the window that fills as the page is read.
function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-brand via-brand-deep to-crimson"
      style={{ transform: 'scaleX(0)' }}
    />
  )
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <ScrollProgress />
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
