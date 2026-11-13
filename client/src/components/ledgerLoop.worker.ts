import { createLedgerScene, type HeroTheme, type LedgerScene } from './ledgerScene'

// Runs the hero's ledger loop on an OffscreenCanvas, off the page's main thread.
// Messages come from LedgerLoop.tsx.
export type LedgerMessage =
  | { type: 'init'; canvas: OffscreenCanvas; width: number; height: number; dpr: number; theme: HeroTheme; small: boolean; reduce: boolean }
  | { type: 'resize'; width: number; height: number }
  | { type: 'theme'; theme: HeroTheme }
  | { type: 'pointer'; x: number; y: number }
  | { type: 'anchor'; y: number | null }
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'dispose' }

let scene: LedgerScene | null = null

self.onmessage = (e: MessageEvent<LedgerMessage>) => {
  const m = e.data
  if (m.type === 'init') {
    scene = createLedgerScene(m)
    return
  }
  if (!scene) return
  if (m.type === 'resize') scene.resize(m.width, m.height)
  else if (m.type === 'theme') scene.setTheme(m.theme)
  else if (m.type === 'pointer') scene.setPointer(m.x, m.y)
  else if (m.type === 'anchor') scene.setAnchor(m.y)
  else if (m.type === 'play') scene.play()
  else if (m.type === 'pause') scene.pause()
  else if (m.type === 'dispose') {
    scene.dispose()
    scene = null
  }
}
