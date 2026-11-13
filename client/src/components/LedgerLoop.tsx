import { useEffect, useRef } from 'react'
import { createLedgerScene, type HeroTheme, type LedgerScene } from './ledgerScene'
import type { LedgerMessage } from './ledgerLoop.worker'

export type { HeroTheme } from './ledgerScene'

/*
 * Hero background: "the ledger loop" (the scene itself is in ledgerScene.ts).
 *
 * Where the browser supports it, the scene runs in a Web Worker on an OffscreenCanvas,
 * so creating the WebGL context (which can stall a page for half a second on integrated
 * graphics), compiling shaders and drawing frames never block scrolling or the intro.
 * Otherwise it runs on the page, set up once the browser is idle after the first paint.
 * Either way it pauses off screen or in a hidden tab, and draws one still frame for
 * reduced motion.
 */

// The commands both versions accept: posted to the worker, or called on the scene directly.
interface Driver {
  send(m: Exclude<LedgerMessage, { type: 'init' }>): void
  dispose(): void
}

const supportsOffscreen = () =>
  typeof Worker !== 'undefined' &&
  typeof OffscreenCanvas !== 'undefined' &&
  'transferControlToOffscreen' in HTMLCanvasElement.prototype

export default function LedgerLoop({ theme, className = '' }: { theme: HeroTheme; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const themeRef = useRef(theme)
  const driverRef = useRef<Driver | null>(null)

  useEffect(() => {
    themeRef.current = theme
    driverRef.current?.send({ type: 'theme', theme })
  }, [theme])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = document.createElement('canvas')
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'
    host.appendChild(canvas)

    const rect = host.getBoundingClientRect()
    const init = {
      width: rect.width,
      height: rect.height,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      theme: themeRef.current,
      small: window.innerWidth < 640,
      reduce,
    }

    let driver: Driver | null = null
    let idle = 0
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (supportsOffscreen()) {
      const offscreen = canvas.transferControlToOffscreen()
      const worker = new Worker(new URL('./ledgerLoop.worker.ts', import.meta.url), { type: 'module' })
      worker.postMessage({ type: 'init', canvas: offscreen, ...init } satisfies LedgerMessage, [offscreen])
      driver = {
        send: (m) => worker.postMessage(m),
        dispose: () => {
          worker.postMessage({ type: 'dispose' })
          worker.terminate()
        },
      }
    } else {
      // Fallback: on the page, once the browser is idle after the first paint.
      let scene: LedgerScene | null = null
      const queue: Exclude<LedgerMessage, { type: 'init' }>[] = []
      const run = (m: Exclude<LedgerMessage, { type: 'init' }>) => {
        if (!scene) return
        if (m.type === 'resize') scene.resize(m.width, m.height)
        else if (m.type === 'theme') scene.setTheme(m.theme)
        else if (m.type === 'pointer') scene.setPointer(m.x, m.y)
        else if (m.type === 'anchor') scene.setAnchor(m.y)
        else if (m.type === 'play') scene.play()
        else if (m.type === 'pause') scene.pause()
      }
      const start = () => {
        scene = createLedgerScene({ canvas, ...init, theme: themeRef.current })
        queue.splice(0).forEach(run)
      }
      if (w.requestIdleCallback) idle = w.requestIdleCallback(start, { timeout: 600 })
      else idle = window.setTimeout(start, 120)
      driver = {
        send: (m) => (scene ? run(m) : queue.push(m)),
        dispose: () => scene?.dispose(),
      }
    }
    driverRef.current = driver
    const send = driver.send

    // Size, visibility and pointer, all forwarded to the scene
    let onScreen = true
    const sync = () => send({ type: onScreen && !document.hidden ? 'play' : 'pause' })
    // Phones (portrait): place the loop in the gap between the two stacked hero cards.
    const measureAnchor = () => {
      const r = host.getBoundingClientRect()
      const cards = host.parentElement?.querySelectorAll('.hs-card')
      if (r.height <= r.width || !cards || cards.length < 2) return send({ type: 'anchor', y: null })
      const a = cards[0].getBoundingClientRect()
      const b = cards[1].getBoundingClientRect()
      if (b.top < a.bottom) return send({ type: 'anchor', y: null }) // side by side, not stacked
      send({ type: 'anchor', y: (a.bottom + b.top) / 2 - r.top })
    }
    const ro = new ResizeObserver(([e]) => {
      send({ type: 'resize', width: e.contentRect.width, height: e.contentRect.height })
      measureAnchor()
    })
    ro.observe(host)
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      sync()
    })
    io.observe(host)
    document.addEventListener('visibilitychange', sync)

    const stage = host.parentElement ?? host
    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      send({ type: 'pointer', x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 })
    }
    const onLeave = () => send({ type: 'pointer', x: 0, y: 0 })
    stage.addEventListener('pointermove', onPointer)
    stage.addEventListener('pointerleave', onLeave)

    sync()
    measureAnchor()
    const settle = window.setTimeout(measureAnchor, 1200) // after fonts and the intro settle

    return () => {
      window.clearTimeout(settle)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      stage.removeEventListener('pointermove', onPointer)
      stage.removeEventListener('pointerleave', onLeave)
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      driver?.dispose()
      driverRef.current = null
      canvas.remove()
    }
  }, [])

  return <div ref={hostRef} className={className} aria-hidden="true" />
}
