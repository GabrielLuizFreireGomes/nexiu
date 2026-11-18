// Mesma curva de --ease em tokens.css, no formato aceito pela biblioteca motion.
const EASE_OUT = [0.22, 1, 0.36, 1]

/**
 * Transição padrão das animações em JS. Com movimento reduzido ela é
 * instantânea, para que nada se mova nem apareça gradualmente.
 */
export function getTransition(reducedMotion, overrides = {}) {
  if (reducedMotion) return { duration: 0 }
  return { duration: 0.3, ease: EASE_OUT, ...overrides }
}
