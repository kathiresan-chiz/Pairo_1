import { useEffect, useRef } from 'react'

/*
 * Glass bubbles, ray traced with WebGL on a transparent canvas, so whatever is
 * behind the canvas (a CSS gradient panel) shows through. Each pixel's ray finds
 * the nearest sphere, refracts through it and is traced again so spheres behind
 * show through the ones in front; strongly bent rays pick up deep cobalt for the
 * thick-glass rims, with slight colour fringes and a soft studio highlight.
 *
 * The cluster turns slowly in 3D while bubbles rise, swing side to side and hop.
 * Pauses off screen and in hidden tabs; one still frame for reduced motion.
 */

const MAX = 16

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uScale;
uniform float uF;
uniform vec3 uBgA;
uniform vec3 uBgB;
uniform vec4 uS[${MAX}];
uniform int uN;

const float IOR = 1.33;

vec3 screenBg(vec2 q){
  float t = clamp(q.y * 0.6 + q.x * 0.4, 0.0, 1.0);
  return mix(uBgA, uBgB, t);
}

vec3 backdrop(vec3 d){
  float z = max(-d.z, 0.2);
  vec2 s = d.xy * uF / z;
  vec2 q = vec2(s.x + uRes.x * 0.5, uRes.y * 0.5 - s.y) / uRes;
  return screenBg(clamp(q, -0.5, 1.5));
}

vec3 transEnv(vec3 d, vec3 d0){
  float dev = 1.0 - dot(d, d0);
  vec3 deep = vec3(0.02, 0.11, 0.52);
  vec3 c = mix(backdrop(d), deep, smoothstep(0.05, 0.55, dev) * 0.85);
  float b1 = pow(max(dot(d, normalize(vec3(0.25, 0.9, -0.35))), 0.0), 14.0);
  float b2 = pow(max(dot(d, normalize(vec3(-0.65, -0.55, -0.5))), 0.0), 20.0);
  c += vec3(0.96, 0.98, 1.0) * b1 * 0.95 + vec3(0.80, 0.90, 1.0) * b2 * 0.4;
  return c;
}

vec3 reflEnv(vec3 r){
  vec3 base = vec3(0.24, 0.40, 0.84);
  base *= mix(0.72, 1.0, smoothstep(-0.6, 0.7, r.y));
  float key = pow(max(dot(r, normalize(vec3(-0.55, 0.65, 0.5))), 0.0), 40.0);
  float strip = smoothstep(0.965, 0.995, dot(normalize(vec2(r.x, r.z) + 1e-4), normalize(vec2(0.85, 0.5)))) * smoothstep(-0.3, 0.5, r.y);
  return base + key * 1.6 + strip * 0.55;
}

float hitSphere(vec3 ro, vec3 rd, vec4 s){
  vec3 oc = ro - s.xyz;
  float b = dot(oc, rd);
  float h = b * b - (dot(oc, oc) - s.w * s.w);
  if (h < 0.0) return -1.0;
  return -b - sqrt(h);
}

vec3 through(vec3 P, vec3 rd, vec4 s, out vec3 exitP, out float F){
  vec3 N = (P - s.xyz) / s.w;
  float ci = clamp(-dot(rd, N), 0.0, 1.0);
  F = 0.04 + 0.96 * pow(1.0 - ci, 5.0);
  vec3 T1 = refract(rd, N, 1.0 / IOR);
  vec3 oc = P - s.xyz;
  float b = dot(oc, T1);
  float t = -b + sqrt(max(b * b - (dot(oc, oc) - s.w * s.w), 0.0));
  exitP = P + T1 * t;
  vec3 N2 = (exitP - s.xyz) / s.w;
  vec3 T2 = refract(T1, -N2, IOR);
  if (dot(T2, T2) < 0.01) T2 = reflect(T1, -N2);
  return normalize(T2);
}

vec3 dispersed(vec3 rd, vec3 T, vec3 d0){
  return vec3(
    transEnv(normalize(mix(rd, T, 0.93)), d0).r,
    transEnv(T, d0).g,
    transEnv(normalize(mix(rd, T, 1.08)), d0).b
  );
}

void main(){
  vec2 p = vec2(gl_FragCoord.x, uRes.y * uScale - gl_FragCoord.y) / uScale;
  vec3 rd = normalize(vec3(p.x - uRes.x * 0.5, uRes.y * 0.5 - p.y, -uF));

  float t0 = 1e9;
  vec4 s0 = vec4(0.0);
  int i0 = -1;
  for (int i = 0; i < ${MAX}; i++) {
    if (i >= uN) break;
    float t = hitSphere(vec3(0.0), rd, uS[i]);
    if (t > 0.0 && t < t0) { t0 = t; s0 = uS[i]; i0 = i; }
  }
  if (i0 < 0) { gl_FragColor = vec4(0.0); return; }

  vec3 P = rd * t0;
  vec3 N = (P - s0.xyz) / s0.w;
  vec3 eP; float F;
  vec3 T = through(P, rd, s0, eP, F);

  float tb = 1e9; vec4 sb = vec4(0.0); bool behind = false;
  for (int j = 0; j < ${MAX}; j++) {
    if (j >= uN) break;
    if (j == i0) continue;
    float t = hitSphere(eP, T, uS[j]);
    if (t > 0.5 && t < tb) { tb = t; sb = uS[j]; behind = true; }
  }
  vec3 tr;
  if (behind) {
    vec3 P2 = eP + T * tb;
    vec3 eP2; float F2;
    vec3 T2 = through(P2, T, sb, eP2, F2);
    tr = mix(dispersed(rd, T2, rd), reflEnv(reflect(T, (P2 - sb.xyz) / sb.w)), F2);
  } else {
    tr = dispersed(rd, T, rd);
  }

  vec3 R = reflect(rd, N);
  vec3 col = mix(tr, reflEnv(R), min(1.0, F * 1.25));
  col += pow(max(dot(R, normalize(vec3(-0.5, 0.6, 0.62))), 0.0), 400.0) * 1.6;

  // anti-aliased edge, as transparency over the panel behind
  float dist = length(s0.xyz - rd * dot(s0.xyz, rd));
  float px = t0 / uF / uScale;
  float a = clamp((s0.w - dist) / (px * 1.3), 0.0, 1.0);
  gl_FragColor = vec4(col, a);
}`

interface Sphere {
  lx: number
  ly: number // fraction of the vertical wrap range, -1…1
  lz: number
  r: number
  rise: number
  wob: number
  freq: number
  hop: number
  hopRate: number
  phase: number
}

function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const SPAN = 0.95

function makeSpheres(count: number, seed: number): Sphere[] {
  const rand = rng(seed)
  const list: Sphere[] = []
  for (let i = 0; i < count; i++) {
    const tier = i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2
    const r = tier === 0 ? 0.075 + rand() * 0.025 : tier === 1 ? 0.05 + rand() * 0.018 : 0.03 + rand() * 0.014
    list.push({
      lx: (rand() - 0.5) * 0.9, // spread across the whole panel
      ly: (i / count) * 2 - 1 + (rand() - 0.5) * 0.1,
      lz: (rand() - 0.5) * 0.3,
      r,
      rise: 0.05 + rand() * 0.04,
      wob: 0.03 + rand() * 0.03,
      freq: 0.6 + rand() * 0.5,
      hop: 0.02 + rand() * 0.025,
      hopRate: 0.45 + rand() * 0.35,
      phase: rand() * Math.PI * 2,
    })
  }
  return list
}

const hex = (c: string) => {
  const n = parseInt(c.replace('#', ''), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255] as const
}

interface GlassBubblesProps {
  /** the panel's gradient, top-left and bottom-right, used for refraction */
  colors: [string, string]
  count?: number
  seed?: number
  className?: string
}

export default function GlassBubbles({ colors, count = 14, seed = 11, className = '' }: GlassBubblesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const host = canvas.parentElement!
    const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false })
    if (!gl) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const shader = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(sh))
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const U = (n: string) => gl.getUniformLocation(prog, n)
    gl.uniform3fv(U('uBgA'), hex(colors[0]))
    gl.uniform3fv(U('uBgB'), hex(colors[1]))
    const uRes = U('uRes')
    const uScale = U('uScale')
    const uF = U('uF')
    const uS = U('uS')
    const uN = U('uN')

    const spheres = makeSpheres(Math.min(count, MAX), seed)
    const data = new Float32Array(MAX * 4)
    const st = { w: 1, h: 1, scale: 0, t: 6, last: 0, raf: 0, onScreen: true, slow: 0 }

    const draw = () => {
      const { w, h, t } = st
      const f = h * 1.15
      const zc = -f * 1.25
      const k = -zc / f
      const W = w * k
      const H = h * k
      const cx = Math.sin(t * 0.35) * 0.04 * W
      const th = t * 0.3
      const ct = Math.cos(th)
      const sn = Math.sin(th)
      const tilt = 0.28
      const cti = Math.cos(tilt)
      const sti = Math.sin(tilt)
      const range = (H / W) * SPAN
      // keep sizes sensible on very wide or very tall panels
      const unit = Math.min(W, H * 1.6)

      spheres.forEach((s, i) => {
        const f01 = (((s.ly + s.rise * t + 1) % 2) + 2) % 2
        const u = (((t * s.hopRate + s.phase) % 1) + 1) % 1
        const ly = (f01 - 1) * range + 4 * u * (1 - u) * s.hop
        const lx = (s.lx + Math.sin(t * s.freq + s.phase) * s.wob) * W
        const lz = s.lz * W
        const x = lx * ct + lz * sn * 0.3 // a gentle turn: the panel is wide
        let z = -lx * sn * 0.3 + lz * ct
        let y = ly * W
        const y2 = y * cti - z * sti
        z = y * sti + z * cti
        y = y2
        data[i * 4] = cx + x
        data[i * 4 + 1] = y
        data[i * 4 + 2] = zc + z
        data[i * 4 + 3] = s.r * unit
      })
      // keep bubbles from passing through each other
      const n = spheres.length
      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            const dx = data[j * 4] - data[i * 4]
            const dy = data[j * 4 + 1] - data[i * 4 + 1]
            const dz = data[j * 4 + 2] - data[i * 4 + 2]
            const min = (data[i * 4 + 3] + data[j * 4 + 3]) * 1.04
            const d2 = dx * dx + dy * dy + dz * dz
            if (d2 >= min * min) continue
            const d = Math.sqrt(d2) || 1e-3
            const push = (min - d) / 2 / d
            data[i * 4] -= dx * push
            data[i * 4 + 1] -= dy * push
            data[i * 4 + 2] -= dz * push
            data[j * 4] += dx * push
            data[j * 4 + 1] += dy * push
            data[j * 4 + 2] += dz * push
          }
        }
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uRes, w, h)
      gl.uniform1f(uScale, canvas.width / w)
      gl.uniform1f(uF, f)
      gl.uniform4fv(uS, data)
      gl.uniform1i(uN, n)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const size = () => {
      canvas.width = Math.max(1, Math.round(st.w * st.scale))
      canvas.height = Math.max(1, Math.round(st.h * st.scale))
    }
    const resize = () => {
      const r = host.getBoundingClientRect()
      st.w = Math.max(1, r.width)
      st.h = Math.max(1, r.height)
      const maxScale = Math.min(window.devicePixelRatio || 1, 1.25)
      st.scale = st.scale ? Math.min(st.scale, maxScale) : maxScale
      size()
      draw()
    }
    const step = (now: number) => {
      const dt = st.last ? Math.min((now - st.last) / 1000, 0.05) : 0
      st.last = now
      st.t += dt
      if (dt > 0.024) st.slow++
      else st.slow = Math.max(0, st.slow - 1)
      if (st.slow > 30 && st.scale > 0.5) {
        st.scale = Math.max(0.5, st.scale * 0.85)
        st.slow = 0
        size()
      }
      draw()
      st.raf = requestAnimationFrame(step)
    }
    const play = () => {
      if (reduce || st.raf || !st.onScreen || document.hidden) return
      st.last = 0
      st.raf = requestAnimationFrame(step)
    }
    const pause = () => {
      cancelAnimationFrame(st.raf)
      st.raf = 0
    }

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const io = new IntersectionObserver(([e]) => {
      st.onScreen = e.isIntersecting
      if (st.onScreen) play()
      else pause()
    })
    io.observe(host)
    const onVis = () => (document.hidden ? pause() : play())
    document.addEventListener('visibilitychange', onVis)

    resize()
    play()
    return () => {
      pause()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      gl.deleteProgram(prog)
      gl.deleteBuffer(buf)
    }
  }, [colors, count, seed])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
