import { useCallback, useEffect, useId, useLayoutEffect, useRef } from 'react'

// Pill colour and label colour, cycled across the options of a liquid control (brand palette).
export const liquidPalette = [
  { bg: '#3A78C2', text: 'text-white' }, // brand blue
  { bg: '#FD6E88', text: 'text-ink' }, // crimson pink
  { bg: '#072D59', text: 'text-white' }, // navy
  { bg: '#7FB1F0', text: 'text-ink' }, // soft blue
  { bg: '#1B4A8C', text: 'text-white' }, // deep blue
  { bg: '#FD6E88', text: 'text-ink' }, // crimson pink
] as const

export const liquidColor = (i: number) => liquidPalette[i % liquidPalette.length]

const DURATION = 520
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)'
const STREAM_EASE = 'cubic-bezier(0.55, 0, 0.2, 1)'
// Droplets in the stream: the head leads, smaller ones trail behind and form the tail.
const STREAM = [1, 0.86, 0.74, 0.62, 0.5, 0.4]

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/*
 * Liquid selection pill for segmented controls (navbar, filters, option chips).
 * When the selection changes, the old pill pours toward the new option as a stream
 * of droplets (head in front, tapering tail behind), the colour blending on the way,
 * and the new pill swells up where the stream lands. A "goo" SVG filter (blur, then a
 * sharp alpha threshold) fuses the overlapping shapes into one liquid form.
 *
 * Usage: render `layer` as the first child of a `relative` container with `p-1`,
 * attach `itemRef(i)` to each option (which must be `relative`, to paint above it).
 */
export function useLiquidPill(activeIndex: number) {
  const filterId = `goo-${useId().replace(/:/g, '')}`
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const layerRef = useRef<HTMLDivElement>(null)
  const fromRef = useRef<HTMLSpanElement>(null)
  const dropRefs = useRef<(HTMLSpanElement | null)[]>([])
  const pillRef = useRef<HTMLSpanElement>(null)
  const prevIndex = useRef(-1)

  const geometry = useCallback((i: number) => {
    const item = itemRefs.current[i]
    const layer = layerRef.current
    if (!item || !layer) return null
    return { x: item.offsetLeft - layer.offsetLeft, w: item.offsetWidth }
  }, [])

  // Put the resting pill on option `i` without animating.
  const place = useCallback(
    (i: number) => {
      const pill = pillRef.current
      if (!pill) return
      pill.getAnimations().forEach((a) => a.cancel())
      const g = i >= 0 ? geometry(i) : null
      if (!g) {
        pill.style.opacity = '0'
        return
      }
      pill.style.opacity = '1'
      pill.style.width = `${g.w}px`
      pill.style.transform = `translateX(${g.x}px)`
      pill.style.backgroundColor = liquidColor(i).bg
    },
    [geometry],
  )

  const flow = useCallback(
    (fromIndex: number, toIndex: number) => {
      const a = geometry(fromIndex)
      const b = geometry(toIndex)
      const layer = layerRef.current
      const from = fromRef.current
      const drops = dropRefs.current.filter((el): el is HTMLSpanElement => el !== null)
      const pill = pillRef.current
      if (!a || !b || !layer || !from || !pill) return place(toIndex)

      ;[from, pill, ...drops].forEach((el) => el.getAnimations().forEach((anim) => anim.cancel()))

      const h = layer.offsetHeight
      const colorA = liquidColor(fromIndex).bg
      const colorB = liquidColor(toIndex).bg
      const ca = a.x + a.w / 2
      const cb = b.x + b.w / 2
      const dir = Math.sign(cb - ca)

      // 1. The old pill leans into the pour and drains away as the stream leaves it.
      from.style.width = `${a.w}px`
      from.style.backgroundColor = colorA
      from.animate(
        [
          { transform: `translateX(${a.x}px) scale(1, 1)`, opacity: 1 },
          { transform: `translateX(${a.x + dir * a.w * 0.18}px) scale(0.85, 0.88)`, opacity: 1, offset: 0.4 },
          { transform: `translateX(${a.x + dir * a.w * 0.4}px) scale(0.25, 0.35)`, opacity: 0 },
        ],
        { duration: DURATION, easing: EASE, fill: 'forwards' },
      )

      // 2. The stream: droplets trail the head a fixed, overlapping distance, so the goo
      //    fuses them into one tapering tail that stretches mid-flight and gathers on landing.
      const mid = (ca + cb) / 2
      const gap = Math.min(h * 0.45, Math.abs(cb - ca) / 2 / (STREAM.length - 1))
      drops.forEach((drop, k) => {
        const size = h * (STREAM[k] ?? 0.4)
        const lag = dir * k * gap
        drop.style.width = `${size}px`
        drop.style.height = `${size}px`
        drop.style.top = `${(h - size) / 2}px`
        drop.animate(
          [
            { transform: `translateX(${ca - size / 2}px) scale(0.6)`, backgroundColor: colorA, opacity: 1 },
            { transform: `translateX(${mid - lag - size / 2}px) scale(0.95)`, offset: 0.5, opacity: 1 },
            { transform: `translateX(${cb - size / 2}px) scale(1)`, backgroundColor: colorB, opacity: 1, offset: 0.85 },
            { transform: `translateX(${cb - size / 2}px) scale(0.9)`, backgroundColor: colorB, opacity: 0 },
          ],
          { duration: DURATION, delay: 60, easing: STREAM_EASE, fill: 'backwards' },
        )
      })

      // 3. The new pill swells up where the head lands, overshoots slightly and settles.
      pill.style.opacity = '1'
      pill.style.width = `${b.w}px`
      pill.style.transform = `translateX(${b.x}px)`
      pill.style.backgroundColor = colorB
      pill.animate(
        [
          { transform: `translateX(${b.x - dir * b.w * 0.35}px) scale(0.3, 0.45)`, opacity: 0 },
          { transform: `translateX(${b.x - dir * b.w * 0.12}px) scale(0.8, 0.85)`, opacity: 1, offset: 0.45 },
          { transform: `translateX(${b.x}px) scale(1.06, 0.94)`, offset: 0.78 },
          { transform: `translateX(${b.x}px) scale(1, 1)`, opacity: 1 },
        ],
        { duration: DURATION, delay: DURATION * 0.5, easing: EASE, fill: 'backwards' },
      )
    },
    [geometry, place],
  )

  useLayoutEffect(() => {
    const prev = prevIndex.current
    prevIndex.current = activeIndex
    if (prev < 0 || activeIndex < 0 || prev === activeIndex || prefersReducedMotion()) {
      place(activeIndex)
    } else {
      flow(prev, activeIndex)
    }
  }, [activeIndex, flow, place])

  // Re-place the pill when the web font loads or the layout changes size.
  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    const observer = new ResizeObserver(() => place(prevIndex.current))
    observer.observe(layer)
    return () => observer.disconnect()
  }, [place])

  const itemRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      itemRefs.current[i] = el
    },
    [],
  )

  const layer = (
    <>
      <svg aria-hidden="true" className="absolute size-0">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
          </filter>
        </defs>
      </svg>
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-1"
        style={{ filter: `url(#${filterId}) drop-shadow(0 6px 10px rgba(7, 45, 89, 0.22))` }}
      >
        <span ref={fromRef} className="absolute top-0 left-0 h-full rounded-full opacity-0" />
        {STREAM.map((_, k) => (
          <span
            key={k}
            ref={(el) => {
              dropRefs.current[k] = el
            }}
            className="absolute left-0 rounded-full opacity-0"
          />
        ))}
        <span ref={pillRef} className="absolute top-0 left-0 h-full rounded-full opacity-0" />
      </div>
    </>
  )

  return { itemRef, layer }
}
