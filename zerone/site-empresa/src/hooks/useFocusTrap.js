import { useEffect } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Mantém o foco dentro do elemento de `containerRef` enquanto ele estiver
 * montado: foca o primeiro controle, faz o Tab circular entre os controles,
 * torna o restante da página inerte e, ao desmontar, devolve o foco a quem o
 * tinha antes.
 */
export function useFocusTrap(containerRef) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const previouslyFocused = document.activeElement
    const getFocusable = () => Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))

    const outsideElements = Array.from(document.body.children).filter(
      (element) => !element.contains(container) && !element.inert,
    )
    outsideElements.forEach((element) => {
      element.inert = true
    })

    const [firstFocusable] = getFocusable()
    ;(firstFocusable ?? container).focus()

    const handleKeyDown = (event) => {
      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable.at(-1)
      const current = document.activeElement

      if (event.shiftKey && (current === first || !container.contains(current))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (current === last || !container.contains(current))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      outsideElements.forEach((element) => {
        element.inert = false
      })
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [containerRef])
}
