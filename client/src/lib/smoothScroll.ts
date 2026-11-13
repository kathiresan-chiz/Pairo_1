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
// Pages load on demand, so wait up to ~2 s for the section to appear.
export function scrollToHash(hash: string, tries = 120) {
  const target = document.getElementById(hash.slice(1))
  if (!target) {
    if (tries > 0) requestAnimationFrame(() => scrollToHash(hash, tries - 1))
    return
  }
  if (!lenis) {
    target.scrollIntoView()
    return
  }
  // A page that just loaded is taller than Lenis last measured, so re-measure first,
  // then correct once more after images and fonts have settled the layout. The exact
  // pixel position is passed, because given an element Lenis would also add the
  // section's scroll-margin and the page's scroll-padding to the header offset.
  const glide = () => {
    if (!lenis) return
    lenis.resize()
    lenis.scrollTo(target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET)
  }
  glide()
  window.setTimeout(glide, 700)
}

export function scrollToTop(options: ScrollOptions = { immediate: true }) {
  if (lenis) lenis.scrollTo(0, options)
  else window.scrollTo(0, 0)
}
