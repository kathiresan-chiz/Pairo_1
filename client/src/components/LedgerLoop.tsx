import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

export type HeroTheme = 'light' | 'dark'

/*
 * Hero background: "the ledger loop".
 *
 * PairO's infinity mark drawn in 3D from thousands of particles flowing along a
 * lemniscate in the brand gradient.
 *
 * three.js renders it; GSAP draws the loop on and eases the pointer tilt. It pauses off screen or in a hidden tab and draws one still
 * frame for reduced motion.
 */

const PALETTE: Record<HeroTheme, string[]> = {
  // seal → blue → navy → crimson, as in the brand infinity mark
  light: ['#7fb1f0', '#3a78c2', '#1b4a8c', '#fd6e88'],
  dark: ['#ffffff', '#dbf2fc', '#9fdcfa', '#fd6e88'],
}

const VERT = /* glsl */ `
uniform float uTime;
uniform float uA;
uniform float uPixel;
uniform float uDraw;
uniform vec3 uC0, uC1, uC2, uC3;
attribute float aT;
attribute vec2 aOff;
attribute float aSpeed;
attribute float aSize;
attribute float aSeed;
varying vec3 vColor;
varying float vAlpha;

vec3 lem(float t) {
  float s = sin(t), c = cos(t);
  float d = 1.0 + s * s;
  return vec3(uA * c / d, uA * s * c / d, uA * 0.22 * s);
}

vec3 grad(float k) {
  k = fract(k) * 4.0;
  if (k < 1.0) return mix(uC0, uC1, k);
  if (k < 2.0) return mix(uC1, uC2, k - 1.0);
  if (k < 3.0) return mix(uC2, uC3, k - 2.0);
  return mix(uC3, uC0, k - 3.0);
}

void main() {
  float t = aT + uTime * aSpeed;
  vec3 p = lem(t);
  vec3 tang = normalize(lem(t + 0.01) - p);
  vec3 n = normalize(cross(tang, vec3(0.0, 0.0, 1.0)));
  vec3 b = cross(tang, n);
  float breathe = 1.0 + 0.18 * sin(uTime * 0.7 + aSeed * 6.2832);
  p += (n * aOff.x + b * aOff.y) * breathe;

  vColor = grad(t / 6.2832);
  // draw-on: particles appear along the loop as uDraw goes 0 → 1
  vAlpha = smoothstep(aSeed - 0.04, aSeed, uDraw) * (0.6 + 0.4 * fract(aSeed * 13.7));

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uPixel * (9.0 / -mv.z);
}
`

const FRAG = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
}
`

export default function LedgerLoop({ theme, className = '' }: { theme: HeroTheme; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const themeRef = useRef(theme)
  const applyThemeRef = useRef<(t: HeroTheme) => void>(() => {})

  useEffect(() => {
    themeRef.current = theme
    applyThemeRef.current(theme)
  }, [theme])

  useEffect(() => {
    const host = hostRef.current!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return // no WebGL: the CSS background shows
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0, 10)

    // The loop sits right of centre, between the headline and the cards.
    const rig = new THREE.Group()
    const loop = new THREE.Group()
    rig.add(loop)
    scene.add(rig)
    loop.rotation.set(-0.35, 0.25, -0.08)

    /* ---------------- particles */
    const N = window.innerWidth < 640 ? 6000 : 11000
    const aT = new Float32Array(N)
    const aOff = new Float32Array(N * 2)
    const aSpeed = new Float32Array(N)
    const aSize = new Float32Array(N)
    const aSeed = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      aT[i] = Math.random() * Math.PI * 2
      const dust = Math.random() < 0.12
      // gaussian-ish tube, with a little dust further out
      const r = dust ? 0.2 + Math.random() * 0.35 : Math.abs((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 0.2
      const ang = Math.random() * Math.PI * 2
      aOff[i * 2] = Math.cos(ang) * r
      aOff[i * 2 + 1] = Math.sin(ang) * r
      aSpeed[i] = 0.05 + Math.random() * 0.07
      aSize[i] = dust ? 0.7 + Math.random() * 0.8 : 1.1 + Math.random() * 2
      aSeed[i] = Math.random()
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3))
    geo.setAttribute('aT', new THREE.BufferAttribute(aT, 1))
    geo.setAttribute('aOff', new THREE.BufferAttribute(aOff, 2))
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(aSpeed, 1))
    geo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 1))
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50)

    const uniforms = {
      uTime: { value: 0 },
      uA: { value: 2.4 },
      uPixel: { value: renderer.getPixelRatio() },
      uDraw: { value: reduce ? 1 : 0 },
      uOpacity: { value: 1 },
      uC0: { value: new THREE.Color() },
      uC1: { value: new THREE.Color() },
      uC2: { value: new THREE.Color() },
      uC3: { value: new THREE.Color() },
    }
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true, depthWrite: false })
    loop.add(new THREE.Points(geo, mat))

    /* ---------------- theme */
    const applyTheme = (t: HeroTheme) => {
      const p = PALETTE[t]
      uniforms.uC0.value.set(p[0])
      uniforms.uC1.value.set(p[1])
      uniforms.uC2.value.set(p[2])
      uniforms.uC3.value.set(p[3])
      mat.blending = t === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending
      mat.needsUpdate = true
      if (reduce || !running) render()
    }
    applyThemeRef.current = applyTheme

    /* ---------------- layout */
    let w = 1
    let h = 1

    const resize = () => {
      const r = host.getBoundingClientRect()
      w = Math.max(1, r.width)
      h = Math.max(1, r.height)
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      const viewH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      const viewW = viewH * camera.aspect
      const portrait = h > w
      // Phones: a smaller, quieter loop in the open band at the top.
      const a = portrait ? viewW * 0.24 : Math.min(viewW * 0.165, viewH * 0.36)
      uniforms.uOpacity.value = portrait ? 0.6 : 1
      uniforms.uA.value = a
      rig.position.set(portrait ? viewW * 0.18 : viewW * 0.1, portrait ? viewH / 2 - viewW * 0.2 : 0, 0)
      render()
    }

    /* ---------------- frame */
    let time = reduce ? 6 : 0
    const render = () => {
      uniforms.uTime.value = time
      renderer.render(scene, camera)
    }

    let running = false
    let last = 0
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
      last = now
      time += dt
      render()
    }
    const play = () => {
      if (reduce || running || !onScreen || document.hidden) return
      running = true
      last = 0
      renderer.setAnimationLoop(tick)
      timeline.resume()
    }
    const pause = () => {
      running = false
      renderer.setAnimationLoop(null)
      timeline.pause()
    }

    /* ---------------- GSAP: draw-on intro */
    const timeline = gsap.timeline({ paused: true })
    if (!reduce) {
      timeline.to(uniforms.uDraw, { value: 1, duration: 2.6, ease: 'power2.inOut' }, 0.2)
    }

    // Pointer tilt, eased with GSAP.
    const tiltX = gsap.quickTo(rig.rotation, 'x', { duration: 1.2, ease: 'power3.out' })
    const tiltY = gsap.quickTo(rig.rotation, 'y', { duration: 1.2, ease: 'power3.out' })
    const onPointer = (e: PointerEvent) => {
      if (reduce) return
      const r = host.getBoundingClientRect()
      tiltY(((e.clientX - r.left) / r.width - 0.5) * 0.35)
      tiltX(((e.clientY - r.top) / r.height - 0.5) * 0.25)
    }
    const onLeave = () => {
      tiltX(0)
      tiltY(0)
    }
    const stage = host.parentElement ?? host
    stage.addEventListener('pointermove', onPointer)
    stage.addEventListener('pointerleave', onLeave)

    let onScreen = true
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      if (onScreen) play()
      else pause()
    })
    io.observe(host)
    const onVis = () => (document.hidden ? pause() : play())
    document.addEventListener('visibilitychange', onVis)

    applyTheme(themeRef.current)
    resize()
    play()

    return () => {
      pause()
      timeline.kill()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      stage.removeEventListener('pointermove', onPointer)
      stage.removeEventListener('pointerleave', onLeave)
      applyThemeRef.current = () => {}
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        m.geometry?.dispose()
        const material = m.material as THREE.Material | undefined
        if (material) {
          ;(material as THREE.MeshBasicMaterial).map?.dispose()
          material.dispose()
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={hostRef} className={className} aria-hidden="true" />
}
