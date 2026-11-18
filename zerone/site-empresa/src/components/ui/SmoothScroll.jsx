import { useEffect, useMemo, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const easeOutCubic = (t) => 1 - (1 - t) ** 3
const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2
const GESTURE_IDLE_MS = 170

// Seções que passam pouco da tela ganham uma segunda parada com o fim à
// mostra; as bem mais altas que isso são roladas livremente.
const GUIDED_OVERFLOW = 0.6
// Respiro entre o conteúdo e as bordas da área visível.
const EDGE_GAP = 16
const MIN_STOP_GAP = 40

// Mesma condição em que o CSS do cabeçalho o esconde depois que a página rola.
const HIDDEN_HEADER_QUERY = '(min-width: 48rem) and (hover: hover) and (pointer: fine)'

function getMetrics() {
  const viewport = window.innerHeight
  // Com o cabeçalho escondido, a área visível é a janela inteira.
  const headerOffset = window.matchMedia(HIDDEN_HEADER_QUERY).matches
    ? 0
    : document.querySelector('header')?.offsetHeight || 64
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewport)
  return { viewport, headerOffset, maxScroll, available: viewport - headerOffset }
}

const clampScroll = (value, maxScroll) => Math.max(0, Math.min(maxScroll, Math.round(value)))

// Onde parar para mostrar a seção: com o conteúdo (sem o padding) centrado na
// área visível quando cabe; senão, começando no topo dela.
function getSectionBounds(element, metrics) {
  const { headerOffset, maxScroll, available } = metrics
  const rect = element.getBoundingClientRect()
  const style = window.getComputedStyle(element)
  const contentTop = rect.top + window.scrollY + parseFloat(style.paddingTop)
  // A última seção vai junto com o rodapé: a parada dela é o fim da página.
  const isLast = !element.nextElementSibling
  const footer = isLast && document.querySelector('footer')
  const contentBottom = footer
    ? footer.getBoundingClientRect().bottom + window.scrollY
    : rect.bottom + window.scrollY - parseFloat(style.paddingBottom)
  const contentHeight = contentBottom - contentTop

  if (rect.top + window.scrollY <= 0) return { start: 0, exit: 0, free: false }

  if (contentHeight + EDGE_GAP * 2 <= available) {
    const start = clampScroll(contentTop - headerOffset - (available - contentHeight) / 2, maxScroll)
    return { start, exit: start, free: false }
  }

  const start = clampScroll(contentTop - headerOffset - EDGE_GAP, maxScroll)
  // Ponto em que o fim do conteúdo encosta no rodapé da janela.
  const exit = Math.max(start, clampScroll(contentBottom + EDGE_GAP - metrics.viewport, maxScroll))
  return { start, exit, free: exit - start > metrics.viewport * GUIDED_OVERFLOW }
}

function getLayout() {
  const metrics = getMetrics()
  const sections = [...document.querySelectorAll('main > section')].map((element) => (
    getSectionBounds(element, metrics)
  ))

  const stops = [0, metrics.maxScroll]
  sections.forEach(({ start, exit }) => {
    stops.push(start)
    if (exit > start + 12) stops.push(exit)
  })

  // Paradas quase iguais viram uma só (fica a de baixo, que mostra mais).
  const sorted = [...new Set(stops)].sort((a, b) => a - b)
  const merged = sorted.filter((point, index) => (
    point === 0 || index === sorted.length - 1 || sorted[index + 1] - point >= MIN_STOP_GAP
  ))

  return {
    stops: merged,
    freeZones: sections.filter((section) => section.free),
  }
}

// Destino de um link de âncora: as seções usam a mesma parada da roda.
function getAnchorTarget(element) {
  const metrics = getMetrics()
  if (element.matches('main > section')) return getSectionBounds(element, metrics).start
  const top = element.getBoundingClientRect().top + window.scrollY - metrics.headerOffset
  return clampScroll(top, metrics.maxScroll)
}

/** Roda guiada entre seções e livre dentro das muito altas; toque e teclado seguem nativos. */
export function SmoothScroll() {
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef(null)
  const wheelRef = useRef({ lastAt: 0, direction: 0, accumulated: 0, committed: false, target: null })

  const options = useMemo(() => ({
    // Os links de âncora são tratados abaixo, com as mesmas paradas da roda.
    anchors: false,
    lerp: 0.12,
    wheelMultiplier: 1,
    // O modo inicial mantém a jornada suave; preferências salvas são respeitadas.
    respectReducedMotion: false,
    virtualScroll: ({ deltaX, deltaY, event }) => {
      if (event.type !== 'wheel' || event.ctrlKey || Math.abs(deltaX) > Math.abs(deltaY)) return true
      if (event.target instanceof Element && event.target.closest('[data-lenis-prevent], [role="dialog"]')) return true

      const direction = Math.sign(deltaY)
      if (direction === 0) return false

      const state = wheelRef.current
      const now = performance.now()
      const lenis = lenisRef.current?.lenis
      if (!lenis) return false
      const current = state.target !== null && Math.abs(lenis.targetScroll - state.target) < 12
        ? state.target
        : lenis.targetScroll
      const layout = getLayout()
      const zone = layout.freeZones.find((area) => (
        direction > 0
          ? current >= area.start - 12 && current < area.exit - 12
          : current > area.start + 12 && current <= area.exit + 12
      ))

      if (zone) {
        state.target = null
        state.accumulated = 0
        state.lastAt = now
        state.direction = direction

        const boundary = direction > 0 ? zone.exit : zone.start
        const reachesBoundary = direction > 0
          ? current + deltaY >= boundary
          : current + deltaY <= boundary
        if (reachesBoundary) {
          state.committed = true
          lenis.scrollTo(boundary, { programmatic: false, lerp: 0.12 })
          if (event.cancelable) event.preventDefault()
          return false
        }

        state.committed = false
        return true
      }

      if (event.cancelable) event.preventDefault()
      if (now - state.lastAt > GESTURE_IDLE_MS || direction !== state.direction) {
        state.accumulated = 0
        state.committed = false
      }
      state.lastAt = now
      state.direction = direction
      state.accumulated += Math.abs(deltaY)

      // Vários eventos de um mesmo gesto no trackpad avançam apenas uma etapa.
      const threshold = event.deltaMode === 0 && Math.abs(deltaY) < 48 ? 22 : 1
      if (state.committed || state.accumulated < threshold) return false
      state.committed = true
      state.accumulated = 0

      // O Lenis guarda o tamanho da página; atualiza antes de mirar o fim dela.
      lenis.resize()
      const { stops } = layout
      const target = direction > 0
        ? stops.find((point) => point > current + 12) ?? stops.at(-1)
        : [...stops].reverse().find((point) => point < current - 12) ?? stops[0]

      state.target = target
      const distance = Math.abs(target - lenis.animatedScroll)
      // Passos curtos (o fim de uma seção alta) andam mais rápido.
      const duration = Math.min(1.08, Math.max(0.45, 0.45 + distance / 2200))
      lenis.scrollTo(target, { duration, easing: easeInOutSine })
      return false
    },
  }), [])

  useEffect(() => {
    if (reducedMotion) return undefined

    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null
      const lenis = lenisRef.current?.lenis
      const id = link ? decodeURIComponent(link.getAttribute('href').slice(1)) : ''
      const target = id && document.getElementById(id)
      // O link de pular para o conteúdo mantém o comportamento nativo (move o foco).
      if (!lenis || !target || target.tagName === 'MAIN') return

      event.preventDefault()
      lenis.resize()
      const destination = getAnchorTarget(target)
      const distance = Math.abs(destination - lenis.animatedScroll)
      wheelRef.current.target = destination
      lenis.scrollTo(destination, {
        duration: Math.min(1.4, Math.max(0.85, 0.7 + distance / 4000)),
        easing: easeOutCubic,
      })
      if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [reducedMotion])

  if (reducedMotion) return null
  return <ReactLenis ref={lenisRef} root options={options} />
}
