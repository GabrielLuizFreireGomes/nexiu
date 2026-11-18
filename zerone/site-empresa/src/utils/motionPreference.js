const STORAGE_KEY = 'zeroone-reduced-motion'
const CHANGE_EVENT = 'zeroone:motion-preference'
let fallbackPreference = false

export function getReducedMotion() {
  if (typeof window === 'undefined') return false
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === null ? fallbackPreference : stored === 'true'
  } catch {
    return fallbackPreference
  }
}

export function setReducedMotion(value) {
  fallbackPreference = value
  try {
    window.localStorage.setItem(STORAGE_KEY, String(value))
  } catch {
    // A preferência continua valendo nesta aba quando o armazenamento falha.
  }
  document.documentElement.dataset.motion = value ? 'reduced' : 'full'
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function subscribeReducedMotion(onChange) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}
