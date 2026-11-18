import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { readTokenColor } from '../../utils/readTokenColor'
import { createSceneLoop } from './heroLoop'
import styles from './HeroVisual.module.css'

// Acima disso o ganho de nitidez não compensa o custo de desenhar.
const MAX_PIXEL_RATIO = 2
// Mesma largura em que o CSS troca o layout do celular pelo de telas largas.
const SMALL_SCREEN = 768

function createCanvas(container) {
  const canvas = document.createElement('canvas')
  canvas.className = styles.canvas
  container.append(canvas)
  return canvas
}

function startOnMainThread(container, options) {
  const canvas = createCanvas(container)
  const loop = createSceneLoop(canvas, options)
  return {
    ...loop,
    stop() {
      loop.stop()
      canvas.remove()
    },
  }
}

// Anima num Web Worker quando o navegador permite; senão, na própria página.
// Devolve sempre o mesmo controle: resize, setOnScreen e stop.
function startScene(container, options) {
  const canSendCanvas =
    typeof Worker === 'function' &&
    typeof HTMLCanvasElement.prototype.transferControlToOffscreen === 'function'
  if (!canSendCanvas) return startOnMainThread(container, options)

  let worker
  try {
    worker = new Worker(new URL('./heroScene.worker.js', import.meta.url), { type: 'module' })
  } catch {
    return startOnMainThread(container, options)
  }
  const canvas = createCanvas(container)
  const offscreen = canvas.transferControlToOffscreen()
  worker.postMessage({ type: 'start', canvas: offscreen, ...options }, [offscreen])

  let fallback = null
  let lastSize = null
  let isOnScreen = true
  // Se o worker não carregar, o canvas já transferido não serve mais: troca
  // por um novo e desenha na página.
  worker.addEventListener('error', () => {
    worker.terminate()
    canvas.remove()
    fallback = startOnMainThread(container, options)
    if (lastSize) fallback.resize(lastSize)
    fallback.setOnScreen(isOnScreen)
  })

  return {
    resize(size) {
      lastSize = size
      if (fallback) fallback.resize(size)
      else worker.postMessage({ type: 'resize', size })
    },
    setOnScreen(value) {
      isOnScreen = value
      if (fallback) fallback.setOnScreen(value)
      else worker.postMessage({ type: 'visibility', isOnScreen: value })
    },
    stop() {
      worker.terminate()
      canvas.remove()
      fallback?.stop()
    },
  }
}

/**
 * Ilustração de fundo do topo do site: o buraco negro cercado de código,
 * desenhado em <canvas> (veja heroScene.js). É puramente decorativa. A
 * animação pausa quando sai da tela; com movimento reduzido nada muda de
 * lugar, mas os símbolos continuam cintilando.
 */
export function HeroVisual() {
  const containerRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    // O canvas é criado aqui, e não no JSX, porque um canvas transferido para
    // o worker não pode ser reaproveitado quando o efeito roda de novo.
    const scene = startScene(container, {
      palette: {
        core: readTokenColor('--text'),
        inner: readTokenColor('--blue-light'),
        middle: readTokenColor('--blue'),
        outer: readTokenColor('--purple'),
        void: readTokenColor('--bg'),
      },
      moves: !reducedMotion,
    })

    const resizeObserver = new ResizeObserver(() => {
      const isSmallScreen = window.innerWidth < SMALL_SCREEN
      scene.resize({
        width: container.clientWidth,
        height: container.clientHeight,
        pixelRatio: Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.5 : MAX_PIXEL_RATIO),
        isSmallScreen,
      })
    })
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      scene.setOnScreen(entry.isIntersecting)
    })
    intersectionObserver.observe(container)

    return () => {
      scene.stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [reducedMotion])

  return <div ref={containerRef} className={styles.visual} aria-hidden="true" />
}
