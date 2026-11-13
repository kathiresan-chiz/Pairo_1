import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { HeroTheme } from './LedgerLoop'

/*
 * A silk-ribbon waveform along the bottom of the hero: soft translucent wave
 * fills, a ribbon of fine strands drifting in and out of phase, and one bright
 * line in the brand gradient (seal → blue → navy → crimson). It breathes like a
 * Parrot AI voice waveform, and the pointer sends a ripple through it.
 */

const THEMES: Record<HeroTheme, { line: string[]; fill: string; strand: string }> = {
  light: {
    line: ['rgba(127,177,240,0)', '#3a78c2', '#1b4a8c', '#fd6e88', 'rgba(253,110,136,0)'],
    fill: '58,120,194',
    strand: '27,74,140',
  },
  dark: {
    line: ['rgba(255,255,255,0)', '#ffffff', '#dbf2fc', '#fd6e88', 'rgba(253,110,136,0)'],
    fill: '255,255,255',
    strand: '255,255,255',
  },
}

const STRANDS = 22

export default function HeroWaves({ theme, className = '' }: { theme: HeroTheme; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef(theme)
  const redrawRef = useRef<() => void>(() => {})

  useEffect(() => {
    themeRef.current = theme
    redrawRef.current()
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 1
    let h = 1
    let dpr = 1
    let time = reduce ? 4 : 0
    let raf = 0
    let last = 0
    let onScreen = true

    // Breathing swell and pointer ripple, both eased by GSAP.
    const swell = { v: reduce ? 1 : 0 }
    const ripple = { x: 0.5, amp: 0 }
    // Rises in on load, then swells every few seconds, like the voice rings.
    const pulse = reduce ? null : gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 3 })
    if (pulse) {
      gsap.to(swell, { v: 1, duration: 2.4, ease: 'power2.out', delay: 0.4 })
      pulse.to(swell, { v: 1.3, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: 1 })
    }
    const rippleX = gsap.quickTo(ripple, 'x', { duration: 0.9, ease: 'power3.out' })
    const rippleAmp = gsap.quickTo(ripple, 'amp', { duration: 0.6, ease: 'power2.out' })
    let calm = 0

    /*
     * The wave at x (0–1) for a phase p is
     *   (0.55·sin(6.2x + 0.9t + p) + 0.28·sin(11.5x − 1.3t + 1.7p) + 0.45·sin(2.4x + 0.45t + 0.6p))·env(x)
     *   + ripple(x)
     * Every curve shares x and t and differs only in p, so each frame the sines and cosines
     * of the x/t parts are worked out once per column (cols), and each curve combines them
     * with its own phase by angle addition: sin(a + p) = sin a·cos p + cos a·sin p.
     */
    let cols = { n: 0, step: 1, env: new Float32Array(0), s: new Float32Array(0), c: new Float32Array(0), rip: new Float32Array(0) }
    const prepare = (step: number) => {
      const n = Math.ceil((w + step) / step) + 1
      if (cols.n !== n) {
        cols = { n, step, env: new Float32Array(n), s: new Float32Array(n * 3), c: new Float32Array(n * 3), rip: new Float32Array(n) }
      }
      cols.step = step
      const ripOn = ripple.amp > 0.001
      for (let j = 0; j < n; j++) {
        const x = (j * step) / w
        cols.env[j] = Math.sin(Math.PI * Math.min(1, Math.max(0, x))) ** 0.8 // quieter at the edges
        const a1 = x * 6.2 + time * 0.9
        const a2 = x * 11.5 - time * 1.3
        const a3 = x * 2.4 + time * 0.45
        cols.s[j * 3] = Math.sin(a1)
        cols.c[j * 3] = Math.cos(a1)
        cols.s[j * 3 + 1] = Math.sin(a2)
        cols.c[j * 3 + 1] = Math.cos(a2)
        cols.s[j * 3 + 2] = Math.sin(a3)
        cols.c[j * 3 + 2] = Math.cos(a3)
        cols.rip[j] = ripOn ? Math.exp(-(((x - ripple.x) / 0.09) ** 2)) * ripple.amp * Math.sin(x * 40 - time * 6) : 0
      }
    }

    const draw = () => {
      const t = THEMES[themeRef.current]
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const base = h * 0.58
      const amp = h * 0.24 * swell.v
      prepare(Math.max(4, w / 260))
      const { n, step, env, s, c, rip } = cols

      const path = (phase: number, a: number, offset: number) => {
        const sp1 = Math.sin(phase), cp1 = Math.cos(phase)
        const sp2 = Math.sin(phase * 1.7), cp2 = Math.cos(phase * 1.7)
        const sp3 = Math.sin(phase * 0.6), cp3 = Math.cos(phase * 0.6)
        ctx.beginPath()
        for (let j = 0; j < n; j++) {
          const k = j * 3
          const v =
            (s[k] * cp1 + c[k] * sp1) * 0.55 +
            (s[k + 1] * cp2 + c[k + 1] * sp2) * 0.28 +
            (s[k + 2] * cp3 + c[k + 2] * sp3) * 0.45
          const y = base + offset + (v * env[j] + rip[j]) * a
          if (j === 0) ctx.moveTo(0, y)
          else ctx.lineTo(j * step, y)
        }
      }

      // Soft wave fills, back to front
      const fills = [
        { phase: 2.1, a: amp * 0.9, off: -h * 0.04, alpha: 0.09 },
        { phase: 4.0, a: amp * 0.7, off: h * 0.1, alpha: 0.12 },
        { phase: 0.9, a: amp * 0.5, off: h * 0.24, alpha: 0.16 },
      ]
      for (const f of fills) {
        path(f.phase, f.a, f.off)
        ctx.lineTo(w, h)
        ctx.lineTo(0, h)
        ctx.closePath()
        const g = ctx.createLinearGradient(0, base - amp, 0, h)
        g.addColorStop(0, `rgba(${t.fill},${f.alpha})`)
        g.addColorStop(1, `rgba(${t.fill},${f.alpha * 0.35})`)
        ctx.fillStyle = g
        ctx.fill()
      }

      // Silk ribbon: fine strands drifting in and out of phase
      const strandGrad = ctx.createLinearGradient(0, 0, w, 0)
      strandGrad.addColorStop(0, `rgba(${t.strand},0)`)
      strandGrad.addColorStop(0.2, `rgba(${t.strand},0.34)`)
      strandGrad.addColorStop(0.8, `rgba(${t.strand},0.34)`)
      strandGrad.addColorStop(1, `rgba(${t.strand},0)`)
      ctx.strokeStyle = strandGrad
      ctx.lineWidth = 1
      for (let i = 0; i < STRANDS; i++) {
        const k = i / (STRANDS - 1)
        // strands fan out and twist, like a silk ribbon
        path(k * 2.2 + Math.sin(time * 0.3) * 0.5, amp * (0.55 + k * 0.6), (k - 0.5) * h * 0.2)
        ctx.globalAlpha = 0.35 + 0.65 * Math.sin(k * Math.PI)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // The bright line, in the brand gradient, with a soft glow. The glow is two wide,
      // faint strokes under the line: it looks like a blur shadow but costs far less to draw.
      const lineGrad = ctx.createLinearGradient(0, 0, w, 0)
      t.line.forEach((col, i) => lineGrad.addColorStop(i / (t.line.length - 1), col))
      path(0.7, amp * 1.05, 0)
      ctx.strokeStyle = lineGrad
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.globalAlpha = 0.1
      ctx.lineWidth = 14
      ctx.stroke()
      ctx.globalAlpha = 0.22
      ctx.lineWidth = 6
      ctx.stroke()
      ctx.globalAlpha = 1
      ctx.lineWidth = 2.5
      ctx.stroke()
    }
    redrawRef.current = draw

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.5) // 1.5× stays sharp for soft waves, at far less GPU work
      w = Math.max(1, r.width)
      h = Math.max(1, r.height)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      draw()
    }

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
      last = now
      time += dt
      calm += dt
      if (calm > 0.25 && ripple.amp > 0.001) rippleAmp(0) // ripple settles once the pointer rests
      draw()
      raf = requestAnimationFrame(tick)
    }
    const play = () => {
      if (reduce || raf || !onScreen || document.hidden) return
      last = 0
      raf = requestAnimationFrame(tick)
      pulse?.resume()
    }
    const pause = () => {
      cancelAnimationFrame(raf)
      raf = 0
      pulse?.pause()
    }

    // The pointer anywhere over the hero sends a ripple along the wave.
    const stage = canvas.closest('.hs-screen') ?? canvas.parentElement!
    const onMove = (e: Event) => {
      if (reduce) return
      const r = canvas.getBoundingClientRect()
      rippleX(((e as PointerEvent).clientX - r.left) / r.width)
      rippleAmp(0.35)
      calm = 0
    }
    stage.addEventListener('pointermove', onMove)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      if (onScreen) play()
      else pause()
    })
    io.observe(canvas)
    const onVis = () => (document.hidden ? pause() : play())
    document.addEventListener('visibilitychange', onVis)

    resize()
    play()
    return () => {
      pause()
      pulse?.kill()
      gsap.killTweensOf([swell, ripple])
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      stage.removeEventListener('pointermove', onMove)
      redrawRef.current = () => {}
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
