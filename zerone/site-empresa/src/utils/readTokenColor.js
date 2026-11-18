/**
 * Lê uma cor dos design tokens (ex.: '--blue') e a devolve como [r, g, b].
 * Serve para desenhar em <canvas>, que não entende variáveis CSS.
 */
export function readTokenColor(name) {
  const probe = document.createElement('span')
  probe.style.display = 'none'
  probe.style.color = `var(${name})`
  document.body.appendChild(probe)
  const computed = getComputedStyle(probe).color
  probe.remove()

  const [r = 255, g = 255, b = 255] = (computed.match(/[\d.]+/g) ?? []).map(Number)
  return [r, g, b]
}
