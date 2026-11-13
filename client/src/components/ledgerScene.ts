import * as THREE from 'three'

export type HeroTheme = 'light' | 'dark'

/*
 * The ledger loop scene: PairO's infinity mark drawn in 3D from thousands of particles
 * flowing along a lemniscate in the brand gradient.
 *
 * It has no DOM dependencies, so it runs on a normal canvas or, preferably, on an
 * OffscreenCanvas inside a Web Worker (ledgerLoop.worker.ts): then creating the WebGL
 * context, compiling the shaders and drawing every frame all happen off the page's main
 * thread and never stall scrolling or the intro animations.
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

export interface LedgerOptions {
  canvas: HTMLCanvasElement | OffscreenCanvas
  width: number
  height: number
  dpr: number
  theme: HeroTheme
  /** small screens draw fewer particles */
  small: boolean
  reduce: boolean
}

export interface LedgerScene {
  resize(width: number, height: number): void
  setTheme(theme: HeroTheme): void
  /** pointer position over the hero, each −0.5…0.5 (0, 0 to level out) */
  setPointer(x: number, y: number): void
  /** phones: the loop's vertical centre, in px from the top of the canvas (null: default) */
  setAnchor(y: number | null): void
  play(): void
  pause(): void
  dispose(): void
}

// GSAP's power2.inOut, for the draw-on intro
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

export function createLedgerScene(o: LedgerOptions): LedgerScene | null {
  let renderer: THREE.WebGLRenderer
  try {
    // No MSAA: the scene is soft round points, which need no edge smoothing.
    renderer = new THREE.WebGLRenderer({ canvas: o.canvas, antialias: false, alpha: true, powerPreference: 'default' })
  } catch {
    return null // no WebGL: the CSS background shows
  }
  renderer.setPixelRatio(o.dpr)
  renderer.setClearColor(0x000000, 0)

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
  const N = o.small ? 6000 : 11000
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
    uDraw: { value: o.reduce ? 1 : 0 },
    uOpacity: { value: 1 },
    uC0: { value: new THREE.Color() },
    uC1: { value: new THREE.Color() },
    uC2: { value: new THREE.Color() },
    uC3: { value: new THREE.Color() },
  }
  const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true, depthWrite: false })
  loop.add(new THREE.Points(geo, mat))

  /* ---------------- frame */
  let time = o.reduce ? 6 : 0
  let drawClock = 0 // seconds since the draw-on began
  const tilt = { x: 0, y: 0, tx: 0, ty: 0 }
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
    // Draw-on: 2.6 s, starting 0.2 s in
    if (uniforms.uDraw.value < 1) {
      drawClock += dt
      uniforms.uDraw.value = easeInOut(Math.min(1, Math.max(0, (drawClock - 0.2) / 2.6)))
    }
    // Pointer tilt eases toward its target (about 1.2 s to settle)
    const k = 1 - Math.exp(-dt * 3.2)
    tilt.x += (tilt.tx - tilt.x) * k
    tilt.y += (tilt.ty - tilt.y) * k
    rig.rotation.x = tilt.x
    rig.rotation.y = tilt.y
    render()
  }

  const size = { w: 1, h: 1, anchor: null as number | null }
  const api: LedgerScene = {
    resize(width, height) {
      const w = Math.max(1, width)
      const h = Math.max(1, height)
      size.w = w
      size.h = h
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      const viewH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      const viewW = viewH * camera.aspect
      const portrait = h > w
      // Phones: a smaller, quieter loop.
      const a = portrait ? viewW * 0.24 : Math.min(viewW * 0.165, viewH * 0.36)
      uniforms.uOpacity.value = portrait ? 0.6 : 1
      uniforms.uA.value = a
      // Phones: centred across the card, in the gap between the two stacked hero cards
      // (the page measures it and sends it as the anchor). Tablets in portrait, where the
      // cards sit side by side: in the open band at the top right. Wide screens: right of centre.
      if (portrait && size.anchor !== null) rig.position.set(0, viewH / 2 - (size.anchor / h) * viewH, 0)
      else if (portrait) rig.position.set(viewW * 0.18, viewH / 2 - viewW * 0.2, 0)
      else rig.position.set(viewW * 0.1, 0, 0)
      render()
    },
    setAnchor(y) {
      size.anchor = y
      api.resize(size.w, size.h)
    },
    setTheme(t) {
      const p = PALETTE[t]
      uniforms.uC0.value.set(p[0])
      uniforms.uC1.value.set(p[1])
      uniforms.uC2.value.set(p[2])
      uniforms.uC3.value.set(p[3])
      mat.blending = t === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending
      mat.needsUpdate = true
      if (!running) render()
    },
    setPointer(x, y) {
      if (o.reduce) return
      tilt.ty = x * 0.35
      tilt.tx = y * 0.25
    },
    play() {
      if (o.reduce || running) return
      running = true
      last = 0
      renderer.setAnimationLoop(tick)
    },
    pause() {
      running = false
      renderer.setAnimationLoop(null)
    },
    dispose() {
      api.pause()
      geo.dispose()
      mat.dispose()
      renderer.dispose()
    },
  }

  api.setTheme(o.theme)
  api.resize(o.width, o.height)
  return api
}
