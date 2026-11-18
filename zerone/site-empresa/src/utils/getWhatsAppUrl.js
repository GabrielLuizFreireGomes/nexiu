/**
 * Monta o link de conversa do WhatsApp (wa.me) a partir do número com DDI e
 * de uma mensagem inicial opcional. Retorna null quando não há número.
 */
export function getWhatsAppUrl({ number, message } = {}) {
  const digits = String(number ?? '').replace(/\D/g, '')
  if (!digits) return null

  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${query}`
}
