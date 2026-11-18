// Desenha o buraco negro fora da thread principal, num OffscreenCanvas que a
// página transfere para cá. Assim a animação não disputa o processador com
// toques, rolagem e o carregamento da página.
import { createSceneLoop } from './heroLoop'

let loop = null

self.onmessage = ({ data }) => {
  if (data.type === 'start') loop = createSceneLoop(data.canvas, data)
  else if (data.type === 'resize') loop?.resize(data.size)
  else if (data.type === 'visibility') loop?.setOnScreen(data.isOnScreen)
}
