import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

type ScrollOptions = Parameters<Lenis['scrollTo']>[1]

let lenis: Lenis | null = null

// Clears the fixed header when jumping to a section.
const HEADER_OFFSET = -96

/*
 * Eased scrolling for mouse wheels and trackpads. Touch devices keep native momentum
 * scrolling (Lenis leaves touch alone unless `syncTouch` is on), and visitors who prefer
 * reduced motion get plain native scrolling. lerp 0.1 is Lenis's tuned default: each
 * frame covers 10% of the remaining distance, which glides without feeling floaty.
 * A single requestAnimationFrame loop (autoRaf) drives it, so it never competes with React.
 */
export function startSmoothScroll(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  // allowNestedScroll: sideways scrollers (module tabs, category filter) keep native scrolling.
  lenis = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true, allowNestedScroll: true })
  return () => {
    lenis?.destroy()
    lenis = null
  }
}

// Glide to a #section (below the header), or jump to the top on page changes.
export function scrollToHash(hash: string) {
  const target = document.getElementById(hash.slice(1))
  if (!target) return
  if (lenis) lenis.scrollTo(target, { offset: HEADER_OFFSET })
  else target.scrollIntoView()
}

export function scrollToTop(options: ScrollOptions = { immediate: true }) {
  if (lenis) lenis.scrollTo(0, options)
  else window.scrollTo(0, 0)
}
