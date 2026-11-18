import { useCallback, useSyncExternalStore } from 'react'

// Fração da altura da janela em que uma seção passa a contar como "a visível".
const MARKER_RATIO = 0.4

function subscribe(onChange) {
  window.addEventListener('scroll', onChange, { passive: true })
  window.addEventListener('resize', onChange)
  return () => {
    window.removeEventListener('scroll', onChange)
    window.removeEventListener('resize', onChange)
  }
}

function findActiveSection(sectionIds) {
  const marker = window.innerHeight * MARKER_RATIO
  let activeId = null
  let lastId = null

  for (const id of sectionIds) {
    const element = document.getElementById(id)
    if (!element) continue
    lastId = id
    if (element.getBoundingClientRect().top <= marker) activeId = id
  }

  // No fim da página a última seção pode ser curta demais para alcançar o
  // marcador, então ela vence assim que a rolagem chega ao final.
  const scrollBottom = window.scrollY + window.innerHeight
  const reachedEnd = scrollBottom >= document.documentElement.scrollHeight - 2
  if (reachedEnd && window.scrollY > 0) activeId = lastId

  return activeId
}

const getServerSnapshot = () => null

/**
 * Retorna o id da seção que está na área de leitura da janela, ou null
 * enquanto nenhuma das seções informadas foi alcançada. `sectionIds` deve ser
 * uma referência estável (ex.: uma constante de módulo).
 */
export function useActiveSection(sectionIds) {
  const getSnapshot = useCallback(() => findActiveSection(sectionIds), [sectionIds])
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
