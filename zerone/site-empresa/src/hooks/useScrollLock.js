import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

const LOCK_CLASS = 'scroll-locked'

/**
 * Bloqueia a rolagem da página enquanto o componente estiver montado. Pausa
 * também o Lenis, que do contrário continuaria rolando a página via JS.
 */
export function useScrollLock() {
  const lenis = useLenis()

  useEffect(() => {
    const root = document.documentElement
    root.classList.add(LOCK_CLASS)
    lenis?.stop()

    return () => {
      root.classList.remove(LOCK_CLASS)
      lenis?.start()
    }
  }, [lenis])
}
