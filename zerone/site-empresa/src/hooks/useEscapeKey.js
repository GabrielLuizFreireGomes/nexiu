import { useEffect } from 'react'

/** Chama `onEscape` quando a tecla Esc é pressionada, enquanto `active` for true. */
export function useEscapeKey(onEscape, active = true) {
  useEffect(() => {
    if (!active) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onEscape(event)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onEscape, active])
}
