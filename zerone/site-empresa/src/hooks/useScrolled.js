import { useCallback, useSyncExternalStore } from 'react'

function subscribe(onChange) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

const getServerSnapshot = () => false

/** Indica se a página foi rolada além de `threshold` pixels. */
export function useScrolled(threshold = 8) {
  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold])
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
