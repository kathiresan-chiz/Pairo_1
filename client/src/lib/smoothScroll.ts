import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

type ScrollOptions = Parameters<Lenis['scrollTo']>[1]

let lenis: Lenis | null = null

// Eased page scrolling. Skipped entirely for visitors who prefer reduced motion.
export function startSmoothScroll(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ autoRaf: true, lerp: 0.09, wheelMultiplier: 1 })
  return () => {
    lenis?.destroy()
    lenis = null
  }
}

// Scroll to a pixel offset or a CSS selector, through Lenis when it is running.
export function scrollToTarget(target: number | string, options: ScrollOptions = {}) {
  if (lenis) {
    lenis.scrollTo(target, options)
  } else if (typeof target === 'number') {
    window.scrollTo(0, target)
  } else {
    document.querySelector(target)?.scrollIntoView()
  }
}
