/**
 * Retorna até duas iniciais de um nome, ignorando pontuação
 * (ex.: "Estúdio Alfa Web" vira "EW" e "[Nome da Empresa]" vira "NE").
 */
export function getInitials(name = '') {
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .split(/\s+/)
    .filter(Boolean)
  if (words.length === 0) return '?'

  const first = words[0][0]
  const last = words.length > 1 ? words.at(-1)[0] : ''
  return (first + last).toUpperCase()
}
