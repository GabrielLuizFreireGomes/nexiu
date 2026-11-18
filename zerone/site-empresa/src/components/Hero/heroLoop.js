import { createColorScale, createParticles, drawScene } from './heroScene'

// No celular, 30 quadros por segundo preservam a rolagem sem perder o brilho da cena.
const SMALL_SCREEN_FRAME_MS = 32

/**
 * Anima a cena num canvas comum ou num OffscreenCanvas. Roda igual na página e
 * dentro de um Web Worker (veja heroScene.worker.js), por isso não usa nada do
 * DOM: as cores chegam prontas em `palette` e as medidas, por `resize`.
 */
export function createSceneLoop(canvas, { palette, moves }) {
  const context = canvas.getContext('2d')
  const scene = {
    particles: createParticles(),
    colors: createColorScale(palette),
    palette,
    moves,
    width: 0,
    height: 0,
    pixelRatio: 1,
  }
  // Workers do Safari antigo não têm requestAnimationFrame.
  const requestFrame =
    globalThis.requestAnimationFrame?.bind(globalThis) ??
    ((callback) => setTimeout(() => callback(performance.now()), 16))
  const cancelFrame = globalThis.cancelAnimationFrame?.bind(globalThis) ?? clearTimeout

  let frame = 0
  let isOnScreen = true
  let isSmallScreen = false
  let lastDraw = 0

  const draw = (timestamp) => {
    frame = 0
    if (!context || scene.width === 0) return
    if (!isSmallScreen || timestamp - lastDraw >= SMALL_SCREEN_FRAME_MS) {
      drawScene(context, { ...scene, time: timestamp / 1000 })
      lastDraw = timestamp
    }
    if (isOnScreen) frame = requestFrame(draw)
  }

  const requestDraw = () => {
    if (frame === 0) frame = requestFrame(draw)
  }

  return {
    resize(size) {
      scene.width = size.width
      scene.height = size.height
      scene.pixelRatio = size.pixelRatio
      isSmallScreen = size.isSmallScreen
      canvas.width = Math.round(size.width * size.pixelRatio)
      canvas.height = Math.round(size.height * size.pixelRatio)
      requestDraw()
    },
    setOnScreen(value) {
      isOnScreen = value
      if (isOnScreen) requestDraw()
    },
    stop() {
      isOnScreen = false
      cancelFrame(frame)
      frame = 0
    },
  }
}
